// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // Gunakan CSS utama dashboard agar seragam

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar-coffee">
      <div className="navbar-left">
        <h1>☕ KopiKuKopi</h1>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">
              {user.username} ({user.role})
            </span>
            <button className="navbar-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="navbar-btn" onClick={() => navigate("/")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
