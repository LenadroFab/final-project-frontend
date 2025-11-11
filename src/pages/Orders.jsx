import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts, createOrder } from "../api/userApi";
import "../styles/orders.css"; // ✅ Import CSS khusus halaman Orders

export default function Orders() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // URL backend (untuk gambar)
  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔥 Ambil produk dan pastikan gambar sudah lengkap URL-nya
  const loadProducts = async () => {
    try {
      const res = await getProducts();

      // Pastikan URL gambar lengkap
      const formatted = res.map((p) => ({
        ...p,
        image: p.image?.startsWith("http")
          ? p.image
          : `${BASE_URL}/uploads/${p.image}`,
      }));

      setProducts(formatted);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat produk!");
    }
  };

  // ➕ Tambah ke keranjang
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        // Jika sudah ada, tambah qty
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      toast.success(`${product.name} ditambahkan ke keranjang`);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ➖ Kurangi quantity
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  // ❌ Hapus item
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.info("Produk dihapus dari keranjang");
  };

  // 💰 Hitung total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.warning("Keranjang masih kosong!");
      return;
    }

    try {
      const orderData = {
        userId: user?.id,
        items: cart.map((item) => ({
          productId: item.id,
          qty: item.qty,
          price: item.price,
        })),
        total,
        status: "pending",
      };

      await createOrder(orderData);
      toast.success("Pesanan berhasil dibuat!");
      navigate("/payment", { state: { cart, total } });
    } catch (err) {
      console.error(err);
      toast.error("Gagal membuat pesanan!");
    }
  };

  return (
    <div className="orders-container">
      <h3>☕ Pesan KopiKuKopi</h3>

      <h5 className="mt-4">Pilih Produk:</h5>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="product-card" key={p.id}>
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  onError={(e) => {
                    e.target.src = `${BASE_URL}/uploads/default.jpg`;
                  }}
                />
              ) : (
                <div className="no-image">Tidak ada gambar</div>
              )}
              <h5>{p.name}</h5>
              <p>Rp {Number(p.price).toLocaleString()}</p>
              <button onClick={() => addToCart(p)}>Tambah ke Keranjang</button>
            </div>
          ))
        ) : (
          <p className="no-product">Belum ada produk tersedia.</p>
        )}
      </div>

      {/* 🧺 Keranjang */}
      <div className="cart-section">
        <h4>🧺 Keranjang Pesanan</h4>
        {cart.length === 0 ? (
          <p className="text-muted mt-2">Belum ada produk di keranjang.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item, i) => (
                <li className="cart-item" key={i}>
                  <div className="cart-item-info">
                    <span className="cart-name">{item.name}</span>
                    <span className="cart-price">
                      Rp {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                  <div className="cart-controls">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseQty(item.id)}
                    >
                      ➖
                    </button>
                    <span className="qty-display">{item.qty}</span>
                    <button className="qty-btn" onClick={() => addToCart(item)}>
                      ➕
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-total">Total: Rp {total.toLocaleString()}</div>

            <div className="cart-buttons">
              <button
                className="btn-checkout"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Lanjut ke Pembayaran
              </button>
              <button className="btn-back" onClick={() => navigate("/home")}>
                Kembali
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
