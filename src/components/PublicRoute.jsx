import { Navigate } from "react-router-dom";
import { useUser } from "./UserProvider";

export const PublicRoute = ({ redirectPath = "/", children }) => {
  const { me } = useUser();
  if (me && me.email) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
