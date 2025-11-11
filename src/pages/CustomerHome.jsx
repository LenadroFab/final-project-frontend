// src/pages/CustomerHome.jsx
import { useNavigate } from "react-router-dom";
import "../styles/coffee.css";

export default function CustomerHome() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="main-content text-center">
      <h1 className="mb-3">☕ Selamat Datang di KopiKuKopi</h1>
      <p>Hai, {user?.username}! Silakan pesan kopi favoritmu 🍵</p>
      <button
        className="btn btn-coffee mt-3"
        onClick={() => navigate("/order")}
      >
        Pesan Sekarang
      </button>
      <br />
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
