import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const {mainLoading, user} = useAuth();

  if (mainLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoutes;