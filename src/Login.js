// 🔹 Importing useState hook from React
// useState is used to store and manage data inside a component
import { useState } from "react";

function Login() {

  // 🔹 STATE VARIABLES
  // email → stores user's email input
  // setEmail → function to update email
  const [email, setEmail] = useState("");

  // password → stores user's password input
  // setPassword → function to update password
  const [password, setPassword] = useState("");


  // 🔹 LOGIN FUNCTION (MAIN LOGIC)
  // async because we are calling an API (fetch)
const handleLogin = async () => {
  const response = await fetch("https://www.gurukrupaeducation.com/api/student-login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (data.success) {
    // ✅ Save user
    localStorage.setItem("user", JSON.stringify(data));

    // ✅ Redirect
    window.location.href = "/dashboard";
  } else {
    alert(data.message);
  }
};

  // 🔹 UI SECTION (WHAT USER SEES)
  return (
    <div>

      {/* Heading */}
      <h2>Student Login</h2>

      {/* 🔸 EMAIL INPUT */}
      <input
        type="email"
        placeholder="Enter Email"

        // value binds input with state
        value={email}

        // onChange runs when user types
        // e.target.value = current input value
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      {/* 🔸 PASSWORD INPUT */}
      <input
        type="password"
        placeholder="Enter Password"

        value={password}

        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      {/* 🔸 LOGIN BUTTON */}
      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

// 🔹 Exporting component so it can be used in App.js
export default Login;