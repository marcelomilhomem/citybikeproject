import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

// eslint-disable-next-line react/prop-types
const Protected = ({ children }) => {
  const { currentUser } = UserAuth();
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;
