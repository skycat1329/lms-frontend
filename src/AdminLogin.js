import { useState } from "react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("https://www.gurukrupaeducation.com/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {

      // 🔥 save user
      localStorage.setItem("user", JSON.stringify(data));

      // 🔥 redirect
      if (data.role === "admin") {
        window.location.href = "/admin-dashboard";
      }
      else if (data.role === "student") {
        window.location.href = "/student-dashboard";
      }
      else if (data.role === "teacher") {
        window.location.href = "/teacher-dashboard";
      }
      else if (data.role === "staff") {
        window.location.href = "/staff-dashboard";
      }

    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;