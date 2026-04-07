import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getMe, login, logout, register } from "../api/authApi";
import { queryKeys } from "../constants/queryKeys";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      // 🔥 refresca auth
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth });

      // 🔥 refresca cart
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth });

      // 🔥 también aquí
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: async () => {
      // ❌ antes: queryClient.clear() (muy agresivo)

      // 🔥 mejor:
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth });
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useAuth = () => {
  const query = useQuery({
    queryKey: queryKeys.auth,
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
    isError: query.isError,
  };
};
