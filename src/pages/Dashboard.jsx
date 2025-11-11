// src/pages/Dashboard.jsx
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import "../styles/coffee.css";
import "../styles/dashboard.css"; // ✅ Import CSS dashboard

export default function Dashboard() {
  const navigate = useNavigate();

  // Menu utama dashboard
  const menuItems = [
    { name: "Kelola Produk", path: "/products", icon: "☕" },
    { name: "Pesanan", path: "/orders", icon: "🧾" },
    { name: "Pengguna", path: "/users", icon: "👤" },
    { name: "Pembayaran", path: "/payment", icon: "💳" },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  localStorage.setItem(
    "user",
    JSON.stringify({ username: "admin", role: "admin" })
  );

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="dashboard-main">
        <Navbar />

        <div className="dashboard-content fadeIn">
          {/* ===== HERO / WELCOME SECTION ===== */}
          <div className="welcome-card fancy-shadow">
            <h2 className="fw-bold text-coffee">
              ☕ Selamat Datang di KopiKuKopi!
            </h2>
            <p className="text-muted mb-2">
              Halo <strong>{user.username || "Admin"}</strong> 👋, semoga harimu
              menyenangkan!
            </p>
            <p>
              Kelola produk, pesanan, dan pengguna dengan mudah melalui panel
              admin ini.
            </p>
          </div>

          {/* ===== STATISTIC CARDS ===== */}
          <div className="stats-grid mt-4">
            <div className="stat-card">
              <div className="stat-icon">☕</div>
              <div>
                <h4 className="stat-title">Produk</h4>
                <p className="stat-value">15 jenis kopi</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🧾</div>
              <div>
                <h4 className="stat-title">Pesanan</h4>
                <p className="stat-value">120 pesanan bulan ini</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">👤</div>
              <div>
                <h4 className="stat-title">Pengguna</h4>
                <p className="stat-value">8 akun aktif</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💳</div>
              <div>
                <h4 className="stat-title">Pembayaran</h4>
                <p className="stat-value">Rp 12.500.000</p>
              </div>
            </div>
          </div>

          {/* ===== MENU GRID ===== */}
          <div className="dashboard-grid mt-5">
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="dashboard-card fancy-shadow"
                onClick={() => navigate(item.path)}
              >
                <div className="dashboard-icon">{item.icon}</div>
                <div className="dashboard-text">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
