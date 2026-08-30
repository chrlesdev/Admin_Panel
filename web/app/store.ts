import { create } from "zustand";

export const useUserStore = create((set) => ({
  userData: null,

  user: async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
    } catch (error) {}
  },
}));
  