import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = localStorage.getItem("username");
  return user ? children : <Navigate to="/" />;
}
