import { useLocation, useNavigate } from "react-router-dom";
import "../styles/coffee.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, total } = location.state || {};

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">✅ Pembayaran Berhasil!</h2>
      <p>
        Terima kasih, <strong>{name}</strong>!<br />
        Total pembayaran: <strong>Rp {Number(total).toLocaleString()}</strong>
      </p>

      <div className="mt-4">
        <button className="btn-coffee px-4" onClick={() => navigate("/orders")}>
          ☕ Pesan Lagi
        </button>

        <button
          className="btn btn-secondary ms-2 px-4"
          onClick={() => navigate("/home")}
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
