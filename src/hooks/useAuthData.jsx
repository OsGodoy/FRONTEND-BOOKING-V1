import { getMe, login, logout, register } from "../api/authApi";
import { queryKeys } from "../constants/queryKeys";
import { useMutationData, useGetData, useGetDataById } from "./useQueryBase";

export const useLogin = () => {
  const { execute, isPending, ...rest } = useMutationData(
    queryKeys.auth,
    login,
    {
      onSuccess: async (data, variables, queryClient) => {
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    },
  );

  return {
    loginMethod: execute,
    isLoggingIn: isPending,
    ...rest,
  };
};

export const useRegister = () => {
  const { execute, isPending, ...rest } = useMutationData(
    queryKeys.auth,
    register,
    {
      onSuccess: async (data, variables, queryClient) => {
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    },
  );

  return {
    registerMethod: execute,
    isRegistering: isPending,
    ...rest,
  };
};

export const useLogout = () => {
  const { execute, isPending, ...rest } = useMutationData(
    queryKeys.auth,
    logout,
    {
      onSuccess: async (data, variables, queryClient) => {
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    },
  );

  return {
    logoutMethod: execute,
    isLoggingOut: isPending,
    ...rest,
  };
};

export const useAuth = () => {
  const { data, isLoading, isError, error } = useGetDataById(
    queryKeys.auth,
    getMe,
    "current", // ID ficticio para que useGetDataById funcione
    {
      retry: false, // Sin reintentos infinitos
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: Infinity, // Para que el usuario no desaparezca de caché
    },
  );

  return {
    user: data,
    isAuthLoading: isLoading,
    isAuthenticated: !!data,
    isAuthError: isError,
    authError: error,
  };
};
