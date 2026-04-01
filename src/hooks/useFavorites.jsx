import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

import {
  getLocalFavorites,
  addLocalFavorite,
  removeLocalFavorite,
} from "../utils/favoritesLocalStore";
import { useAuth } from "./useAuthData";

export const useFavorites = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["authUser"]);

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
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

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
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
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
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

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
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
