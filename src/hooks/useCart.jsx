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
import { queryKeys } from "../constants/queryKeys";

export const useCart = () => {
  const { user } = useAuth();

  const cartKey = queryKeys.cart(user);

  return useQuery({
    queryKey: cartKey,
    queryFn: () => {
      if (!user) return getLocalCart();
      return getCart();
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const cartKey = queryKeys.cart(user);

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
        queryKey: cartKey,
      });

      const previous = queryClient.getQueryData(cartKey);

      queryClient.setQueryData(cartKey, (old = []) => {
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
        queryClient.setQueryData(cartKey, context.previous);
      }
    },

    onSuccess: () => {
      // NO refetch aquí
    },
  });
};

export const useDecreaseCartItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const cartKey = queryKeys.cart(user);

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
        queryKey: cartKey,
      });

      const previous = queryClient.getQueryData(cartKey);

      queryClient.setQueryData(cartKey, (old = []) =>
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
        queryClient.setQueryData(cartKey, context.previous);
      }
    },

    onSuccess: () => {
      // NO refetch aquí
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const cartKey = queryKeys.cart(user);

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
        queryKey: cartKey,
      });

      const previous = queryClient.getQueryData(cartKey);

      queryClient.setQueryData(cartKey, (old = []) =>
        old.filter((item) => item.id !== bookId),
      );

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(cartKey, context.previous);
      }
    },

    onSuccess: () => {
      // NO refetch aquí
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const cartKey = queryKeys.cart(user);

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        clearLocalCart();
        return;
      }

      await clearCart();
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: cartKey });

      const previous = queryClient.getQueryData(cartKey);

      queryClient.setQueryData(cartKey, []);

      return { previous };
    },

    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(cartKey, context.previous);
      }
    },

    onSuccess: () => {
      // NO refetch aquí
    },
  });
};
