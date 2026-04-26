import { useQueryClient } from "@tanstack/react-query";
import { useGetData, useMutationData } from "./useQueryBase";
import { useAuth } from "./useAuthData";
import { queryKeys } from "../constants/queryKeys";
import { getFavorites, addFavorite, removeFavorite } from "../api/favoritesApi";
import {
  getLocalFavorites,
  addLocalFavorite,
  removeLocalFavorite,
} from "../utils/favoritesLocalStore";

export const useGetFavorites = () => {
  const { user } = useAuth();
  const favKey = queryKeys.favorites(user);

  const { data, isLoading, isError, error, refetch } = useGetData(
    favKey,
    () => {
      if (!user) {
        return getLocalFavorites().map((id) => ({ id }));
      }
      return getFavorites();
    },
    {}, // sin filtros
    {
      // Sin reintentos infinitos
      retry: false,
    },
  );

  return {
    favorites: data,
    isFavoritesLoading: isLoading,
    isFavoritesError: isError,
    favoritesError: error,
    refetchFavorites: refetch,
  };
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const favKey = queryKeys.favorites(user);

  const { execute, isPending, ...rest } = useMutationData(
    favKey,
    (bookId) => {
      if (!user) {
        addLocalFavorite(bookId);
        return Promise.resolve();
      }
      return addFavorite(bookId);
    },
    {
      onMutate: async (bookId) => {
        await queryClient.cancelQueries({ queryKey: favKey });
        const previous = queryClient.getQueryData(favKey);

        if (!user) {
          addLocalFavorite(bookId);
          const updated = getLocalFavorites().map((id) => ({ id }));
          queryClient.setQueryData(favKey, updated);
        } else {
          queryClient.setQueryData(favKey, (old = []) => {
            if (old.some((fav) => fav.id === bookId)) return old;
            return [...old, { id: bookId }];
          });
        }
        return { previous };
      },
      onError: (err, variables, context) => {
        if (context?.previous) {
          queryClient.setQueryData(favKey, context.previous);
        }
      },
    },
  );

  return {
    addFavoriteMethod: execute,
    isAddingFavorite: isPending,
    ...rest,
  };
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const favKey = queryKeys.favorites(user);

  const { execute, isPending, ...rest } = useMutationData(
    favKey,
    (bookId) => {
      if (!user) {
        removeLocalFavorite(bookId);
        return Promise.resolve();
      }
      return removeFavorite(bookId);
    },
    {
      onMutate: async (bookId) => {
        await queryClient.cancelQueries({ queryKey: favKey });
        const previous = queryClient.getQueryData(favKey);

        if (!user) {
          removeLocalFavorite(bookId);
          const updated = getLocalFavorites().map((id) => ({ id }));
          queryClient.setQueryData(favKey, updated);
        } else {
          queryClient.setQueryData(favKey, (old = []) =>
            old.filter((fav) => fav.id !== bookId),
          );
        }
        return { previous };
      },
      onError: (err, variables, context) => {
        if (context?.previous) {
          queryClient.setQueryData(favKey, context.previous);
        }
      },
    },
  );

  return {
    removeFavoriteMethod: execute,
    isRemovingFavorite: isPending,
    ...rest,
  };
};
