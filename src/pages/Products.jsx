// ===============================================
// ☕ KopiKuKopi — Admin Products (FINAL)
// ===============================================
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getProducts,
  createProductWithImage,
  updateProductWithImage,
  deleteProduct,
} from "../api/userApi";
import "../styles/products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Backend URL (auto: local / production)
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://final-project-backend-production-6f07.up.railway.app";

  // =========================
  // LOAD PRODUCTS
  // =========================
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();

      // 🔥 image_url dari backend (Cloudinary / URL full)
      const formatted = res.map((p) => ({
        ...p,
        image: p.image_url,
      }));

      setProducts(formatted);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat produk!");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE / UPDATE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      toast.warning("Nama dan harga wajib diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      if (selectedProduct) {
        await updateProductWithImage(selectedProduct.id, formData);
        toast.success("Produk berhasil diperbarui!");
      } else {
        await createProductWithImage(formData);
        toast.success("Produk berhasil ditambahkan!");
      }

      resetForm();
      loadProducts();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan produk!");
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImage(null);
    setModalOpen(true);
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      await deleteProduct(id);
      toast.success("Produk berhasil dihapus!");
      loadProducts();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus produk!");
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    setName("");
    setPrice("");
    setImage(null);
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="products-container">
      {/* HEADER */}
      <div className="products-header">
        <h3>☕ Kelola Produk</h3>
        <button
          className="btn-coffee"
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
        >
          + Tambah Produk
        </button>
      </div>

      {/* GRID */}
      <div className="products-grid">
        {loading ? (
          <p className="text-muted">Memuat produk...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card-admin">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="product-image"
              />

              <h5>{product.name}</h5>
              <p>Rp {Number(product.price).toLocaleString()}</p>

              <div className="product-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(product)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(product.id)}
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-product">Belum ada produk tersedia.</p>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={resetForm}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>
              {selectedProduct ? "✏️ Edit Produk" : "➕ Tambah Produk Baru"}
            </h4>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nama produk"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="number"
                placeholder="Harga produk"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />

              {/* Preview image baru */}
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="preview-image"
                />
              )}

              <div className="modal-actions">
                <button type="submit" className="btn-coffee">
                  Simpan
                </button>
                <button
                  type="button"
                  className="btn-back"
                  onClick={resetForm}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
