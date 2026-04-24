import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaEnvelope, FaChartBar, FaCog } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="admin-sidebar">

      <NavLink to="/admin/dashboard" className="sb-item">
        <FaHome className="icon" />
        <span className="tooltip">Dashboard</span>
      </NavLink>

      <NavLink to="/admin/users" className="sb-item">
        <FaUsers className="icon" />
        <span className="tooltip">Users</span>
      </NavLink>

      <NavLink to="/admin/messages" className="sb-item">
        <FaEnvelope className="icon" />
        <span className="tooltip">Messages</span>
      </NavLink>

      <NavLink to="/admin/reports" className="sb-item">
        <FaChartBar className="icon" />
        <span className="tooltip">Reports</span>
      </NavLink>

      <NavLink to="/admin/settings" className="sb-item">
        <FaCog className="icon" />
        <span className="tooltip">Settings</span>
      </NavLink>

    </aside>
  );
}

export default Sidebar;