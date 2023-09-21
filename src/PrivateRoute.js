import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  console.log(sessionStorage.getItem("access"));
  const isAuthenticated = sessionStorage.getItem("access") ? true : false;

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};
