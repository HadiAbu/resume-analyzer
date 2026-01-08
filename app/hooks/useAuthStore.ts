// app/src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { User } from "server/types";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  pending: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      pending: true,

      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true, pending: false });
        // Set the token for all future axios calls automatically
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          pending: false,
        });
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", // Saves to localStorage automatically
      onRehydrateStorage: () => (state) => {
        if (!state?.token) return;

        try {
          const { exp } = jwtDecode<DecodedToken>(state.token);

          const isExpired = Date.now() >= exp * 1000;

          if (isExpired) {
            state.logout();
          } else {
            axios.defaults.headers.common["Authorization"] =
              `Bearer ${state.token}`;
            state.pending = false;
          }
        } catch {
          state.logout();
        }
      },
    }
  )
);
