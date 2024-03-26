import { Navigate } from "@tanstack/react-router";
import LoginOrRegister from "../component/LoginOrRegister";
import { useAppContext } from "../context/contextAPI";
const AuthCheck = ({ isRegister = false }) => {
  const { isAuthFunction } = useAppContext();

  if (isAuthFunction) {
    return <Navigate to="/contacts" />;
  }

  return <LoginOrRegister isRegister={isRegister} />;
};

export default AuthCheck;