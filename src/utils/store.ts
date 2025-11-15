import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  user: {
    email: string;
	username: string;
  } | null;

  setUser: (user: AuthState["user"]) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user })
		}),
		{
			name: "auth-store",
			skipHydration: true,
		}
	)
);