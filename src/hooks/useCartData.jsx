import { useQueryClient } from "@tanstack/react-query";
import { useGetData, useMutationData } from "./useQueryBase";
import { useAuth } from "./useAuthData";
import { queryKeys } from "../constants/queryKeys";
import {
  getCart,
  addCartItem,
  decreaseCartItem,
  removeCartItem,
  clearCart,
} from "../api/cartApi";
import {
  getLocalCart,
  addLocalCartItem,
  decreaseLocalCartItem,
  removeLocalCartItem,
  clearLocalCart,
} from "../utils/cartLocalStore";

export const useGetCart = () => {
  const { user } = useAuth();
  const cartKey = queryKeys.cart(user);

  const { data, isLoading, isError, error, refetch } = useGetData(
    cartKey,
    () => (!user ? getLocalCart() : getCart()),
    {},
    { retry: false },
  );

  return {
    cart: data,
    isCartLoading: isLoading,
    isCartError: isError,
    cartError: error,
    refetchCart: refetch,
  };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const cartKey = queryKeys.cart(user);

  const { execute, isPending, ...rest } = useMutationData(
    cartKey,
    (bookId) => {
      if (!user) {
        addLocalCartItem(bookId);
        return Promise.resolve();
      }
      return addCartItem(bookId);
    },
    {
      onMutate: async (bookId) => {
        await queryClient.cancelQueries({ queryKey: cartKey });
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
        if (context?.previous)
          queryClient.setQueryData(cartKey, context.previous);
      },
    },
  );

  return {
    addToCart: execute,
    isAddingToCart: isPending,
    ...rest,
  };
};

export const useDecreaseCartItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const cartKey = queryKeys.cart(user);

  const { execute, isPending, ...rest } = useMutationData(
    cartKey,
    (bookId) => {
      if (!user) {
        decreaseLocalCartItem(bookId);
        return Promise.resolve();
      }
      return decreaseCartItem(bookId);
    },
    {
      onMutate: async (bookId) => {
        await queryClient.cancelQueries({ queryKey: cartKey });
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
        if (context?.previous)
          queryClient.setQueryData(cartKey, context.previous);
      },
    },
  );

  return {
    decreaseCartItem: execute,
    isDecreasing: isPending,
    ...rest,
  };
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const cartKey = queryKeys.cart(user);

  const { execute, isPending, ...rest } = useMutationData(
    cartKey,
    (bookId) => {
      if (!user) {
        removeLocalCartItem(bookId);
        return Promise.resolve();
      }
      return removeCartItem(bookId);
    },
    {
      onMutate: async (bookId) => {
        await queryClient.cancelQueries({ queryKey: cartKey });
        const previous = queryClient.getQueryData(cartKey);

        queryClient.setQueryData(cartKey, (old = []) =>
          old.filter((item) => item.id !== bookId),
        );
        return { previous };
      },
      onError: (err, variables, context) => {
        if (context?.previous)
          queryClient.setQueryData(cartKey, context.previous);
      },
    },
  );

  return {
    removeFromCart: execute,
    isRemovingFromCart: isPending,
    ...rest,
  };
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const cartKey = queryKeys.cart(user);

  const { execute, isPending, ...rest } = useMutationData(
    cartKey,
    async () => {
      if (!user) {
        clearLocalCart();
        return Promise.resolve();
      }
      return clearCart();
    },
    {
      onMutate: async () => {
        // Cancelar cualquier refetch en curso
        await queryClient.cancelQueries({ queryKey: cartKey });

        // Guardar el estado previo por si algo sale mal
        const previous = queryClient.getQueryData(cartKey);

        // Vaciar el carrito instantáneamente en la UI
        queryClient.setQueryData(cartKey, []);

        return { previous };
      },
      onError: (err, variables, context) => {
        // Si falla el servidor, devolvemos los productos que estaban
        if (context?.previous) {
          queryClient.setQueryData(cartKey, context.previous);
        }
      },
    },
  );

  return {
    clearCartMethod: execute,
    isClearing: isPending,
    ...rest,
  };
};
