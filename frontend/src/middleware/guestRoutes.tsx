import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuth } from "../context/AuthProvider";


interface GuestRouteProps {
  children: ReactNode;
}

function GuestRoute({ children }: GuestRouteProps) {
  const { user, mainLoading } = useAuth();

  if (mainLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default GuestRoute;