import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/coffee.css";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Produk", path: "/products", icon: "☕" },
    { name: "Pesanan", path: "/orders", icon: "🧾" },
    { name: "Pengguna", path: "/users", icon: "👤" },
    { name: "Pembayaran", path: "/payment", icon: "💳" },
  ];

  return (
    <aside className={`sidebar-coffee ${isCollapsed ? "collapsed" : ""}`}>
      {/* Header / Brand */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <span className="logo">☕</span>
          {!isCollapsed && " KopiKuKopi"}
        </h2>

        {/* Tombol toggle */}
        <button
          className="btn-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
        >
          {isCollapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Menu List */}
      <ul className="sidebar-menu">
        {menus.map((menu, index) => (
          <li key={index}>
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              title={isCollapsed ? menu.name : ""}
            >
              <span className="sidebar-icon">{menu.icon}</span>
              {!isCollapsed && (
                <span className="sidebar-text">{menu.name}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
