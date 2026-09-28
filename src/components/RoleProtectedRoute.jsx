import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { canAccess } from "../utils/permissions";

export default function RoleProtectedRoute({ feature, children }) {
  const { user } = useAuth();
  if (!canAccess(user?.role, feature)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}