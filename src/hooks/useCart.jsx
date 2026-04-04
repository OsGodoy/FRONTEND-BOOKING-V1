import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuthData";
import {
  getLocalCart,
  addLocalCartItem,
  decreaseLocalCartItem,
  removeLocalCartItem,
  clearLocalCart,
} from "../utils/cartLocalStore";
import {
  addCartItem,
  clearCart,
  decreaseCartItem,
  getCart,
  removeCartItem,
} from "../api/cartApi";

export const useCart = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["cart", user?.id],

    queryFn: () => {
      if (!user) {
        return getLocalCart();
      }

      return getCart();
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (bookId) => {
      if (!user) {
        addLocalCartItem(bookId);
        return Promise.resolve();
      }

      return addCartItem(bookId);
    },

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({
        queryKey: ["cart", user?.id],
      });

      const previous = queryClient.getQueryData(["cart", user?.id]);

      queryClient.setQueryData(["cart", user?.id], (old = []) => {
        const existing = old.find((item) => item.id === bookId);

        if (existing) {
          return old.map((item) =>
            item.id === bookId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [...old, { id: bookId, quantity: 1 }];
      });

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["cart", user?.id], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", user?.id],
      });
    },
  });
};

export const useDecreaseCartItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (bookId) => {
      if (!user) {
        decreaseLocalCartItem(bookId);
        return Promise.resolve();
      }

      return decreaseCartItem(bookId);
    },

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({
        queryKey: ["cart", user?.id],
      });

      const previous = queryClient.getQueryData(["cart", user?.id]);

      queryClient.setQueryData(["cart", user?.id], (old = []) =>
        old
          .map((item) =>
            item.id === bookId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["cart", user?.id], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", user?.id],
      });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (bookId) => {
      if (!user) {
        removeLocalCartItem(bookId);
        return Promise.resolve();
      }

      return removeCartItem(bookId);
    },

    onMutate: async (bookId) => {
      await queryClient.cancelQueries({
        queryKey: ["cart", user?.id],
      });

      const previous = queryClient.getQueryData(["cart", user?.id]);

      queryClient.setQueryData(["cart", user?.id], (old = []) =>
        old.filter((item) => item.id !== bookId),
      );

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["cart", user?.id], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", user?.id],
      });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: () => {
      if (!user) {
        clearLocalCart();
        return Promise.resolve();
      }

      return clearCart();
    },

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["cart", user?.id],
      });

      const previous = queryClient.getQueryData(["cart", user?.id]);

      queryClient.setQueryData(["cart", user?.id], []);

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["cart", user?.id], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", user?.id],
      });
    },
  });
};
