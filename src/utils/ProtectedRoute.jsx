// src/utils/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Silakan login terlebih dahulu");
    return <Navigate to="/" replace />;
  }

  return children;
}

