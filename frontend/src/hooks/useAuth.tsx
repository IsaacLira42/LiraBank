import { useEffect, useState } from "react";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type User = {
  id: number;
  nome: string;
  email: string;
};

export function useAuth() {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function validate() {
      const token = localStorage.getItem("token");

      if (!token) {
        setStatus("unauthenticated");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
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
    }

    validate();
  }, []);

  return {
    status,
    user,
    isAuthenticated: status === "authenticated",
    isChecking: status === "checking",
  };
}
