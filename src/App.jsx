// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import CustomerHome from "./pages/CustomerHome";
import PaymentSuccess from "./pages/PaymentSuccess";

// utils
import ProtectedRoute from "./utils/ProtectedRoute";

// ui & styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/coffee.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ======================
            PUBLIC
        ====================== */}
        <Route path="/" element={<Login />} />

        {/* ======================
            CUSTOMER (LOGIN ONLY)
        ====================== */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <CustomerHome />
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

        {/* ======================
            ADMIN / KASIR
        ====================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute role="admin">
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />

        {/* ======================
            FALLBACK
        ====================== */}
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

      {/* ======================
          GLOBAL TOAST
      ====================== */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}
