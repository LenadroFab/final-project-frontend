// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import ProtectedRoute from "./utils/ProtectedRoute";
import CustomerHome from "./pages/CustomerHome";
import PaymentSuccess from "./pages/PaymentSuccess";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/coffee.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ===== Login ===== */}
        <Route path="/" element={<Login />} />

        {/* ===== ADMIN / KASIR ===== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* ===== CUSTOMER ===== */}
        <Route path="/home" element={<CustomerHome />} />

        {/* ===== Fallback jika halaman tidak ditemukan ===== */}
        <Route
          path="*"
          element={
            <div className="text-center mt-5">
              <h3>404 - Halaman Tidak Ditemukan</h3>
              <p>
                Kembali ke <a href="/">Halaman Utama</a>
              </p>
            </div>
          }
        />
      </Routes>

      {/* ===== Toastify Global Notification ===== */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}
