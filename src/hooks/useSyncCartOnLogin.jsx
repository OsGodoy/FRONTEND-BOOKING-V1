import { useEffect } from "react";
import { useAuth } from "./useAuthData";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { getCart } from "../api/cartApi";

export const useSyncCartOnLogin = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cart(user),
      });
    }
  }, [user]);
};
