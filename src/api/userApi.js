import axios from "axios";

// ======================================================
// 🔗 KONFIG API URL (ambil dari .env atau fallback localhost)
// ======================================================
const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3001"; // fallback untuk lokal development

// ======================================================
// 🔗 KONFIG AXIOS
// ======================================================
const api = axios.create({
  baseURL: API_URL,
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
  return (await api.post("/auth/register", payload)).data;
}

export async function login(payload) {
  return (await api.post("/auth/login", payload)).data;
}

export async function logout() {
  return (await api.post("/auth/logout")).data;
}

// ======================================================
// 👥 USERS CRUD
// ======================================================
export async function getUsers() {
  return (await api.get("/users")).data;
}

export async function createUser(payload) {
  return (await api.post("/users", payload)).data;
}

export async function updateUser(id, payload) {
  return (await api.put(`/users/${id}`, payload)).data;
}

export async function deleteUser(id) {
  return (await api.delete(`/users/${id}`)).data;
}

// ======================================================
// 🗂️ CATEGORIES CRUD
// ======================================================
export async function getCategories(params = {}) {
  return (await api.get("/categories", { params })).data;
}

export async function getCategory(id) {
  return (await api.get(`/categories/${id}`)).data;
}

export async function createCategory(payload) {
  return (await api.post("/categories", payload)).data;
}

export async function updateCategory(id, payload) {
  return (await api.put(`/categories/${id}`, payload)).data;
}

export async function deleteCategory(id) {
  return (await api.delete(`/categories/${id}`)).data;
}

// ======================================================
// ☕ PRODUCTS CRUD
// ======================================================
export async function getProducts(params = {}) {
  return (await api.get("/products", { params })).data;
}

export async function getProduct(id) {
  return (await api.get(`/products/${id}`)).data;
}

export async function createProduct(payload) {
  return (await api.post("/products", payload)).data;
}

export async function updateProduct(id, payload) {
  return (await api.put(`/products/${id}`, payload)).data;
}

export async function deleteProduct(id) {
  return (await api.delete(`/products/${id}`)).data;
}

// ======================================================
// 🖼️ PRODUCTS CRUD (GAMBAR)
// ======================================================
export async function createProductWithImage(formData) {
  return (
    await api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
}

export async function updateProductWithImage(id, formData) {
  return (
    await api.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
}

// ======================================================
// 🧾 ORDERS & PAYMENTS
// ======================================================
export async function createOrder(payload) {
  return (await api.post("/orders", payload)).data;
}

export async function createPayment(payload) {
  return (await api.post("/payments", payload)).data;
}

// ======================================================
// EXPORT DEFAULT
// ======================================================
export default api;
