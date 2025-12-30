// app/src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { User } from "server/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true });
        // Set the token for all future axios calls automatically
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", // Saves to localStorage automatically
    }
  )
);
