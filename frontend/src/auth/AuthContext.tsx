import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type User = {
  id: number;
  nome: string;
  email: string;
};

type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;
  isChecking: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_ME = "http://localhost:3000/api/auth/me";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const refreshMe = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setStatus("unauthenticated");
      return;
    }

    setStatus("checking");

    try {
      const res = await fetch(API_ME, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      const data: User = await res.json();
      setUser(data);
      setStatus("authenticated");
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  const login = useCallback(
    async (token: string) => {
      localStorage.setItem("token", token);
      await refreshMe();
    },
    [refreshMe]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
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
