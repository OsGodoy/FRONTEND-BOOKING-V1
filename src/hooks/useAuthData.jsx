import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, login, logout, register } from "../api/authApi";
import { useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
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
