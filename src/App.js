import Login from "./Login";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
