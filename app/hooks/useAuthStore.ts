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
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      // pending: true,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      // Keep pending: false here; we will rely on _hasHydrated for the initial load
      pending: false,

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
        state?.setHasHydrated(true);
        // 1. If no state was found in storage at all
        if (!state) {
          useAuthStore.setState({ pending: false });
          return;
        }

        // 2. If no token exists, they aren't logged in
        if (!state?.token) {
          useAuthStore.setState({ pending: false });
          return;
        }

        try {
          const { exp } = jwtDecode<DecodedToken>(state.token);

          const isExpired = Date.now() >= exp * 1000;

          if (isExpired) {
            state.logout();
          } else {
            axios.defaults.headers.common["Authorization"] =
              `Bearer ${state.token}`;
            useAuthStore.setState({ pending: false });
          }
        } catch {
          state.logout();
          useAuthStore.setState({ pending: false });
        }
      },
    }
  )
);
