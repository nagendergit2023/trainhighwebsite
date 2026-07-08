import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuthenticated =
    sessionStorage.getItem("access") || localStorage.getItem("user")
      ? true
      : false;

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};
