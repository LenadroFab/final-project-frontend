// src/utils/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ❌ belum login
  if (!token) {
    alert("Silakan login terlebih dahulu");
    return <Navigate to="/" replace />;
  }

  // ❌ role tidak sesuai (admin only)
  if (role && user?.role !== role) {
    alert("Akses ditolak: khusus admin");
    return <Navigate to="/home" replace />;
  }

  return children;
}
