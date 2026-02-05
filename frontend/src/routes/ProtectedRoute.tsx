import { useAuth } from "@/auth/AuthContext";
import { Navigate } from "react-router";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isChecking } = useAuth();

  if (isChecking) return null;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}
