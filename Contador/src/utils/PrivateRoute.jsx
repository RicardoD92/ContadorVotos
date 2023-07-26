import { Route, Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token;
};

const PrivateRoute = ({ user, children }) => {
    const token = isAuthenticated();
    
    if (!token) {
      return <Navigate to="/auth" replace />;
    }
  
    return children;
  };

export default PrivateRoute;