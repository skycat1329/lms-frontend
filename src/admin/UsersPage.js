import React from 'react'
import { useEffect, useState } from "react";
const UsersPage = () => {
     const [users, setUsers] = useState([]);
  const [page, setPage] = useState("users");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetch("https://www.gurukrupaeducation.com/api/get-users.php")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = async () => {
    const res = await fetch("https://www.gurukrupaeducation.com/api/add-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (data.success) {
      alert("User Added ✅");
      window.location.reload();
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleUpdate = async () => {
    const res = await fetch("https://www.gurukrupaeducation.com/api/update-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    });

    const data = await res.json();

    if (data.success) {
      alert("User Updated ✅");
      window.location.reload();
    }
  };

  return (
    <div className="dashboard-grid">
              <div className="left-stack">
                <section className="panel">
                  <h2 className="panel-title">➕ Add User</h2>

                  <div className="form">
                    <div className="field">
                      <label>Name</label>
                      <input
                        className="input"
                        placeholder="Enter full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="field">
                      <label>Email</label>
                      <input
                        className="input"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="field">
                      <label>Password</label>
                      <input
                        className="input"
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="field">
                      <label>Role</label>
                      <select
                        className="select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <button className="add-btn" onClick={handleAddUser}>
                      Add User →
                    </button>
                  </div>
                </section>

                {editUser && (
                  <section className="panel edit-panel">
                    <h2 className="panel-title">✏️ Edit User</h2>

                    <p className="edit-note">
                      Update this user's name, email or role, then save changes.
                    </p>

                    <div className="form">
                      <div className="field">
                        <label>Name</label>
                        <input
                          className="input"
                          value={editUser.name}
                          onChange={(e) =>
                            setEditUser({ ...editUser, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="field">
                        <label>Email</label>
                        <input
                          className="input"
                          value={editUser.email}
                          onChange={(e) =>
                            setEditUser({ ...editUser, email: e.target.value })
                          }
                        />
                      </div>

                      <div className="field">
                        <label>Role</label>
                        <select
                          className="select"
                          value={editUser.role}
                          onChange={(e) =>
                            setEditUser({ ...editUser, role: e.target.value })
                          }
                        >
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>

                      <div className="edit-actions">
                        <button className="update-btn" onClick={handleUpdate}>
                          Update User →
                        </button>

                        <button
                          className="cancel-btn"
                          onClick={() => setEditUser(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              <section className="panel">
                <h2 className="panel-title">👥 All Users</h2>

                <div className="table-wrap">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <div className="user-name-cell">
                              <div className="table-avatar">
                                {u.name?.charAt(0)?.toUpperCase()}
                              </div>
                              {u.name}
                            </div>
                          </td>

                          <td>{u.email}</td>

                          <td>
                            <span className="role-badge">{u.role}</span>
                          </td>

                          <td>
                            <button
                              className="edit-btn"
                              onClick={() => handleEdit(u)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
  )
}

export default UsersPage