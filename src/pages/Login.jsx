// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Masukkan username & password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const msg = await res.text();
        alert(msg || "Login gagal");
        return;
      }

      const data = await res.json();
      const { token, user } = data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        switch (user.role) {
          case "admin":
          case "kasir":
            navigate("/dashboard");
            break;
          case "customer":
            navigate("/home");
            break;
          default:
            alert("Role tidak dikenali");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card shadow">
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
            alt="coffee icon"
            width="55"
          />
          <h3 className="fw-bold mt-2">KopiKuKopi Admin</h3>
          <p className="text-muted mb-0">
            Masuk sebagai Admin, Kasir, atau Customer
          </p>
        </div>

        <input
          className="form-control mt-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mt-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-coffee w-100 mt-4"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </div>
    </div>
  );
}
