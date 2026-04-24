import Login from "./student/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./student/Dashboard";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLayout from "./admin/AdminLayout";
import UsersPage from "./admin/UsersPage";
import AdminLogin from "./admin/AdminLogin";
import Message from "./admin/Message";
import StudentLayout from "./student/Studentlayout";
import StudentMessages from "./student/StudentMessages";
function App() {
  return (
    <Router>
      <Routes>

         {/* STUDENT */}
        <Route path="/student" element={<StudentLayout />}>
  <Route index element={<Dashboard />} />   {/* 👈 ADD THIS */}
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="messages" element={<StudentMessages />} />
</Route>

        
      

<Route path="/student/messages" element={<StudentMessages />} />
<Route path="/admin/chat" element={<Message />} />


        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 🔥 ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>

          {/* DEFAULT */}
          <Route index element={<AdminDashboard />} />

          {/* 🔥 ADD THIS */}
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="users" element={<UsersPage />} />
          <Route path="messages" element={<Message />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;