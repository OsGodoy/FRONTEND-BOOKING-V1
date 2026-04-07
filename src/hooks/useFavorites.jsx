import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getLocalFavorites,
  addLocalFavorite,
  removeLocalFavorite,
} from "../utils/favoritesLocalStore";

import { useAuth } from "./useAuthData";

import { getFavorites, addFavorite, removeFavorite } from "../api/favoritesApi";
import { queryKeys } from "../constants/queryKeys";

export const useFavorites = () => {
  const { user } = useAuth();

  const favKey = queryKeys.favorites(user);

  return useQuery({
    queryKey: favKey,
    queryFn: () => {
      if (!user) {
        return getLocalFavorites().map((id) => ({ id }));
      }
      return getFavorites();
    },
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const favKey = queryKeys.favorites(user);

  return useMutation({
    mutationFn: (bookId) => {
      if (!user) {
        addLocalFavorite(bookId);
        return Promise.resolve();
      }

      return addFavorite(bookId);
    },

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({ queryKey: favKey });

      const previous = queryClient.getQueryData(favKey);

      if (!user) {
        addLocalFavorite(bookId);

        const updated = getLocalFavorites().map((id) => ({ id }));
        queryClient.setQueryData(favKey, updated);

        return { previous };
      }

      queryClient.setQueryData(favKey, (old = []) => {
        if (old.some((fav) => fav.id === bookId)) return old;
        return [...old, { id: bookId }];
      });

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(favKey, context.previous);
      }
    },

    onSettled: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: favKey });
      }
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const favKey = queryKeys.favorites(user);

  return useMutation({
    mutationFn: (bookId) => {
      if (!user) {
        removeLocalFavorite(bookId);
        return Promise.resolve();
      }

      return removeFavorite(bookId);
    },

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({ queryKey: favKey });

      const previous = queryClient.getQueryData(favKey);

      if (!user) {
        removeLocalFavorite(bookId);

        const updated = getLocalFavorites().map((id) => ({ id }));
        queryClient.setQueryData(favKey, updated);

        return { previous };
      }

      queryClient.setQueryData(favKey, (old = []) =>
        old.filter((fav) => fav.id !== bookId),
      );

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(favKey, context.previous);
      }
    },

    onSettled: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: favKey });
      }
    },
  });
};
