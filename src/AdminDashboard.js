import { useEffect, useState } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  useEffect(() => {
    fetch("https://www.gurukrupaeducation.com/api/get-users.php")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = async () => {
    const res = await fetch("https://www.gurukrupaeducation.com/api/add-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();

    if (data.success) {
      alert("User Added");
      window.location.reload();
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Add User</h3>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />
      <br /><br />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>

      <br /><br />

      <button onClick={handleAddUser}>Add User</button>

      <h3>All Users</h3>

      <table border="1">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>

        {users.map(u => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default AdminDashboard;