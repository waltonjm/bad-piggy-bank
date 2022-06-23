import { Navigate } from "react-router-dom";
import { useUser } from "./UserProvider";

export const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { me } = useUser();
  if (!me || !me.email) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
