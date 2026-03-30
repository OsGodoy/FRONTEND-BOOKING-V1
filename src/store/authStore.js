import { create } from "zustand";
import api from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  getMe: async () => {
    try {
      const { data } = await api.get("/auth/me");
      set({
        user: data.data.user,
        isLoading: false,
      });
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error(error);
      }
      set({ user: null, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(error);
    } finally {
      set({ user: null });
    }
  },
}));
