import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, login, logout, register } from "../api/authApi";
import { useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["authUser"] });

      await queryClient.refetchQueries({ queryKey: ["authUser"] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
    },
  });
};

export const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const data = await getMe();
      return data?.data?.user ?? null;
    },
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
