// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
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

  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();

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

      setModalOpen(false);
      setSelectedProduct(null);
      setName("");
      setPrice("");
      setImage(null);
      loadProducts();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan produk!");
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setPrice(product.price);
    setModalOpen(true);
  };

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

  return (
    <div className="products-container">
      {/* HEADER */}
      <div className="products-header">
        <h3>☕ Kelola Produk</h3>
        <button
          className="btn-coffee"
          onClick={() => {
            setModalOpen(true);
            setSelectedProduct(null);
            setName("");
            setPrice("");
            setImage(null);
          }}
        >
          + Tambah Produk
        </button>
      </div>

      {/* GRID PRODUK */}
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card-admin">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = `${BASE_URL}/uploads/default.jpg`;
                  }}
                />
              ) : (
                <div className="no-image">Tidak ada gambar</div>
              )}
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

      {/* MODAL FORM */}
      {modalOpen && (
        <div
          className="product-modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="product-modal-content"
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

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="preview-image"
                />
              )}

              <div className="product-modal-actions">
                <button type="submit" className="btn-coffee">
                  Simpan
                </button>
                <button
                  type="button"
                  className="btn-back"
                  onClick={() => setModalOpen(false)}
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
