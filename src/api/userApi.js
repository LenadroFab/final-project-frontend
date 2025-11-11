// ======================================================
// ☕ KopiKuKopi API SERVICE
// File : src/api/userApi.js
// Deskripsi : Semua fungsi komunikasi frontend ke backend
// ======================================================

import axios from "axios";

// ======================================================
// 🔗 KONFIGURASI DASAR AXIOS
// ======================================================
const api = axios.create({
  baseURL: "http://localhost:3001", // URL backend kamu
  headers: {
    "Content-Type": "application/json",
  },
});

// Otomatis tambahkan token Authorization jika ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ======================================================
// 👤 AUTHENTICATION
// ======================================================
export async function register(payload) {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export async function login(payload) {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

// ======================================================
// 👥 USERS CRUD
// ======================================================
export async function getUsers() {
  const res = await api.get("/users");
  return res.data;
}

export async function createUser(payload) {
  const res = await api.post("/users", payload);
  return res.data;
}

export async function updateUser(id, payload) {
  const res = await api.put(`/users/${id}`, payload);
  return res.data;
}

export async function deleteUser(id) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}

// ======================================================
// 🗂️ CATEGORIES CRUD
// ======================================================
export async function getCategories(params = {}) {
  const res = await api.get("/categories", { params });
  return res.data;
}

export async function getCategory(id) {
  const res = await api.get(`/categories/${id}`);
  return res.data;
}

export async function createCategory(payload) {
  const res = await api.post("/categories", payload);
  return res.data;
}

export async function updateCategory(id, payload) {
  const res = await api.put(`/categories/${id}`, payload);
  return res.data;
}

export async function deleteCategory(id) {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
}

// ======================================================
// ☕ PRODUCTS CRUD (TANPA GAMBAR)
// ======================================================
export async function getProducts(params = {}) {
  const res = await api.get("/products", { params });
  return res.data;
}

export async function getProduct(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(payload) {
  const res = await api.post("/products", payload);
  return res.data;
}

export async function updateProduct(id, payload) {
  const res = await api.put(`/products/${id}`, payload);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}

// ======================================================
// 🖼️ PRODUCTS CRUD (DENGAN UPLOAD GAMBAR)
// ======================================================
export async function createProductWithImage(formData) {
  const res = await api.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateProductWithImage(id, formData) {
  const res = await api.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// ================================
// 🧾 ORDERS & PAYMENTS
// ================================
export async function createOrder(payload) {
  const res = await api.post("/orders", payload);
  return res.data;
}

export async function createPayment(payload) {
  const res = await api.post("/payments", payload);
  return res.data;
}

// ======================================================
// ✅ EXPORT DEFAULT
// ======================================================
export default api;
