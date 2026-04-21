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

    try {
      // 🔸 Sending request to backend (PHP API)
      const response = await fetch(
        "https://www.gurukrupaeducation.com/api/student-login.php",
        {
          method: "POST", // We are sending data → POST request

          headers: {
            // Telling server: "I am sending JSON data"
            "Content-Type": "application/json"
          },

          // 🔸 Converting JS object → JSON string
          body: JSON.stringify({
            email: email,       // sending email
            password: password  // sending password
          })
        }
      );

      // 🔸 Converting response (JSON) → JavaScript object
      const data = await response.json();

      // 🔸 Checking response from backend
      if (data.success) {
        // If login successful
        alert("Login successful ✅");

        // Printing full response in console (for debugging)
        console.log(data);

      } else {
        // If login failed (wrong email/password)
        alert(data.message);
      }

    } catch (error) {
      // 🔸 If API fails (network/server error)
      console.error("Error:", error);
      alert("Something went wrong");
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