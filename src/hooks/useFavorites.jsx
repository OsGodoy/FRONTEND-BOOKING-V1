import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getLocalFavorites,
  addLocalFavorite,
  removeLocalFavorite,
} from "../utils/favoritesLocalStore";

import { useAuth } from "./useAuthData";

import { getFavorites, addFavorite, removeFavorite } from "../api/favoritesApi";

export const useFavorites = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?.id],

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

  return useMutation({
    mutationFn: (bookId) => {
      if (!user) {
        addLocalFavorite(bookId);
        return Promise.resolve();
      }

      return addFavorite(bookId);
    },

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({
        queryKey: ["favorites", user?.id],
      });

      const previous = queryClient.getQueryData(["favorites", user?.id]);

      queryClient.setQueryData(["favorites", user?.id], (old = []) => {
        if (old.some((fav) => fav.id === bookId)) return old;
        return [...old, { id: bookId }];
      });

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["favorites", user?.id], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", user?.id],
      });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (bookId) => {
      if (!user) {
        removeLocalFavorite(bookId);
        return Promise.resolve();
      }

      return removeFavorite(bookId);
    },

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({
        queryKey: ["favorites", user?.id],
      });

      const previous = queryClient.getQueryData(["favorites", user?.id]);

      queryClient.setQueryData(["favorites", user?.id], (old = []) =>
        old.filter((fav) => fav.id !== bookId),
      );

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["favorites", user?.id], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", user?.id],
      });
    },
  });
};
