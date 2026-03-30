import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

import {
  getLocalFavorites,
  addLocalFavorite,
  removeLocalFavorite,
} from "../utils/favoritesLocalStore";
import { useAuthStore } from "../store/authStore";

// 📥 GET favoritos
export const useFavorites = () => {
  const user = useAuthStore((state) => state.user);

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

// ➕ ADD favorito
export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: async (bookId) => {
      if (!user) {
        addLocalFavorite(bookId);
        return;
      }

      return api.post(`/favorites/${bookId}`);
    },

    onMutate: async (bookId) => {
      await queryClient.cancelQueries(["favorites"]);

      const previous = queryClient.getQueryData(["favorites", user?.id]);

      queryClient.setQueryData(["favorites", user?.id], (old = []) => [
        ...old,
        { id: bookId },
      ]);

      return { previous };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["favorites", user?.id], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["favorites"]);
    },
  });
};

// ❌ REMOVE favorito
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: async (bookId) => {
      if (!user) {
        removeLocalFavorite(bookId);
        return;
      }

      return api.delete(`/favorites/${bookId}`);
    },

    onMutate: async (bookId) => {
      await queryClient.cancelQueries(["favorites"]);

      const previous = queryClient.getQueryData(["favorites", user?.id]);

      queryClient.setQueryData(["favorites", user?.id], (old = []) =>
        old.filter((fav) => fav.id !== bookId),
      );

      return { previous };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["favorites", user?.id], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["favorites"]);
    },
  });
};
