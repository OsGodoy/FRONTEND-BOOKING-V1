import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

import {
  getLocalFavorites,
  addLocalFavorite,
  removeLocalFavorite,
} from "../utils/favoritesLocalStore";
import { useAuth } from "./useAuthData";

export const useFavorites = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?.id],

    queryFn: async () => {
      if (!user) {
        return getLocalFavorites().map((id) => ({ id }));
      }

      const { data } = await api.get("/favorites");
      return data;
    },
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (bookId) => {
      if (!user) {
        addLocalFavorite(bookId);
        return;
      }

      return api.post(`/favorites/${bookId}`);
    },

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({
        queryKey: ["favorites", user?.id],
      });

      const previous = queryClient.getQueryData(["favorites", user?.id]);

      queryClient.setQueryData(["favorites", user?.id], (old = []) => {
        // evitar duplicados 🔥
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
    mutationFn: async (bookId) => {
      if (!user) {
        removeLocalFavorite(bookId);
        return;
      }

      return api.delete(`/favorites/${bookId}`);
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
