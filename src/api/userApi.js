// ======================================================
// ☕ KopiKuKopi API SERVICE
// Semua fungsi komunikasi frontend ↔ backend
// ======================================================

import axios from "axios";

// ======================================================
// 🔗 KONFIG API URL (ambil dari .env atau fallback)
// ======================================================
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://final-project-backend-production-6f07.up.railway.app";

// ======================================================
// 🔗 KONFIG AXIOS
// ======================================================
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambah token otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ======================================================
// AUTH
// ======================================================
export const register = (payload) => api.post("/auth/register", payload).then(r => r.data);
export const login = (payload) => api.post("/auth/login", payload).then(r => r.data);
export const logout = () => api.post("/auth/logout").then(r => r.data);

// ======================================================
// USERS CRUD
// ======================================================
export const getUsers = () => api.get("/users").then(r => r.data);
export const createUser = (p) => api.post("/users", p).then(r => r.data);
export const updateUser = (id, p) => api.put(`/users/${id}`, p).then(r => r.data);
export const deleteUser = (id) => api.delete(`/users/${id}`).then(r => r.data);

// ======================================================
// CATEGORIES CRUD
// ======================================================
export const getCategories = (params={}) => api.get("/categories", { params }).then(r => r.data);
export const getCategory = (id) => api.get(`/categories/${id}`).then(r => r.data);
export const createCategory = (p) => api.post("/categories", p).then(r => r.data);
export const updateCategory = (id, p) => api.put(`/categories/${id}`, p).then(r => r.data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`).then(r => r.data);

// ======================================================
// PRODUCTS CRUD
// ======================================================
export const getProducts = () => api.get("/products").then(r => r.data);
export const getProduct = (id) => api.get(`/products/${id}`).then(r => r.data);
export const createProduct = (p) => api.post("/products", p).then(r => r.data);
export const updateProduct = (id,p) => api.put(`/products/${id}`,p).then(r=>r.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then(r => r.data);

// Upload Gambar
export const createProductWithImage = (f) =>
  api.post("/products", f, { headers: { "Content-Type": "multipart/form-data" } }).then(r => r.data);

export const updateProductWithImage = (id, f) =>
  api.put(`/products/${id}`, f, { headers: { "Content-Type": "multipart/form-data" } }).then(r => r.data);

// ======================================================
// ORDER & PAYMENT
// ======================================================
export const createOrder = (p) => api.post("/orders", p).then(r => r.data);
export const createPayment = (p) => api.post("/payments", p).then(r => r.data);

export default api;
