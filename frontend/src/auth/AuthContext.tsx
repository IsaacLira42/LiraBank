import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useProfileQuery, type UserProfile } from "../hooks/useAuthQueries";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isChecking: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshMe: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [hasToken, setHasToken] = useState<boolean>(() => !!localStorage.getItem("token"));
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError, refetch } = useProfileQuery(hasToken);

  const status: AuthStatus = useMemo(() => {
    if (!hasToken) return "unauthenticated";
    if (isLoading) return "checking";
    if (isError || !user) return "unauthenticated";
    return "authenticated";
  }, [hasToken, isLoading, isError, user]);

  const login = useCallback(
    async (token: string) => {
      localStorage.setItem("token", token);
      setHasToken(true);
      await refetch();
    },
    [refetch]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setHasToken(false);
    queryClient.removeQueries({ queryKey: ["auth"] });
  }, [queryClient]);

  const refreshMe = useCallback(() => {
    refetch();
  }, [refetch]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user: user || null,
      isAuthenticated: status === "authenticated",
      isChecking: status === "checking",
      login,
      logout,
      refreshMe,
    }),
    [status, user, login, logout, refreshMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

