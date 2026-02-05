import { useAuth } from "@/auth/AuthContext";
import { Navigate } from "react-router";

export function PublicOnlyRoute({
  children,
  redirectTo,
}: {
  children: React.ReactNode;
  redirectTo: string;
}) {
  const { isAuthenticated, isChecking } = useAuth();

  if (isChecking) return null;
  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  return children;
}
