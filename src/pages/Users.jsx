// src/pages/Users.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";
import "../styles/users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔄 Ambil data user
  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      // API kamu bisa return res.data atau array langsung
      setUsers(res.data || res);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat daftar pengguna!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 💾 Tambah / Update user
  const handleSave = async () => {
    if (!username) {
      toast.warning("Username tidak boleh kosong!");
      return;
    }

    try {
      if (editingId) {
        await updateUser(editingId, { username });
        toast.success("User berhasil diperbarui!");
      } else {
        await createUser({ username });
        toast.success("User berhasil ditambahkan!");
      }
      setUsername("");
      setEditingId(null);
      setModalVisible(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal menyimpan user!");
    }
  };

  // ✏️ Edit user
  const handleEdit = (user) => {
    setEditingId(user.id);
    setUsername(user.username);
    setModalVisible(true);
  };

  // 🗑️ Hapus user
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      try {
        await deleteUser(id);
        toast.success("User berhasil dihapus!");
        fetchUsers();
      } catch (err) {
        console.error(err);
        toast.error("Gagal menghapus user!");
      }
    }
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h3>👤 Kelola Pengguna</h3>
        <button className="btn-coffee" onClick={() => setModalVisible(true)}>
          + Tambah User
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(user)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  Tidak ada data pengguna.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ===== */}
      {modalVisible && (
        <div className="modal-overlay" onClick={() => setModalVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>{editingId ? "✏️ Edit User" : "➕ Tambah User Baru"}</h4>
            <input
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn-coffee" onClick={handleSave}>
                {editingId ? "Perbarui" : "Simpan"}
              </button>
              <button
                className="btn-back"
                onClick={() => setModalVisible(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
