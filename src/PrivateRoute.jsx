import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // belum login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role guard (admin only)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
