import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPayment } from "../api/userApi";
import { toast } from "react-toastify";
import "../styles/coffee.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart = [], total = 0 } = location.state || {};
  const [name, setName] = useState("");
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ state tambahan untuk menandai sukses bayar

  const handleConfirm = async () => {
    if (!name || !method) {
      toast.warning("Lengkapi nama dan metode pembayaran!");
      return;
    }

    setLoading(true);
    try {
      const paymentData = {
        customerName: name,
        totalAmount: total,
        method,
        items: cart.map((i) => ({
          productId: i.id,
          name: i.name,
          price: i.price,
        })),
      };

      await createPayment(paymentData);
      toast.success("✅ Pembayaran berhasil disimpan!");
      setSuccess(true); // ✅ ubah tampilan ke mode sukses
    } catch (err) {
      console.error(err);
      toast.error("❌ Gagal memproses pembayaran!");
    } finally {
      setLoading(false);
    }
  };

  // Jika keranjang kosong
  if (cart.length === 0) {
    return (
      <div className="text-center mt-5">
        <h4>Keranjang kosong!</h4>
        <button className="btn-coffee mt-3" onClick={() => navigate("/orders")}>
          Kembali ke Menu
        </button>
      </div>
    );
  }

  // ✅ Tampilan setelah pembayaran sukses
  if (success) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-success mb-3">🎉 Pembayaran Berhasil!</h3>
        <p>Terima kasih, pesanan kamu sedang diproses oleh barista ☕</p>
        <div className="mt-4">
          <button
            className="btn-coffee px-4"
            onClick={() => navigate("/orders")}
          >
            ➕ Tambah Pesanan Baru
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/home")}
          >
            🏠 Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  // 🧾 Form Pembayaran normal
  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">💳 Pembayaran Pesanan</h3>

      <div className="row">
        {/* Ringkasan Pesanan */}
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5>🧾 Ringkasan Pesanan</h5>
            <ul className="list-group mt-2">
              {cart.map((item, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between"
                >
                  {item.name}
                  <span>Rp {item.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <h5 className="text-end mt-3">
              Total: Rp {total.toLocaleString()}
            </h5>
          </div>
        </div>

        {/* Form Pembayaran */}
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5>👤 Data Pembayaran</h5>
            <div className="mb-3">
              <label>Nama Pemesan</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan nama kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Metode Pembayaran</label>
              <select
                className="form-control"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="">-- Pilih --</option>
                <option value="cash">Tunai</option>
                <option value="qris">QRIS</option>
                <option value="transfer">Transfer Bank</option>
              </select>
            </div>

            <div className="text-end mt-3">
              <button
                className="btn-coffee px-4"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "Memproses..." : "Konfirmasi Pembayaran"}
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => navigate("/orders")}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
