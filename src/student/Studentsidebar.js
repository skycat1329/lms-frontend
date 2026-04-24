import { NavLink } from "react-router-dom";
import { FaHome, FaEnvelope } from "react-icons/fa";

const StudentSidebar = () => {
  return (
    
    <aside className="sidebar">

    <NavLink to="/student/dashboard" className="menu-item">
  <FaHome className="icon" />
  <span className="tooltip">Dashboard</span>
</NavLink>

<NavLink to="/student/messages" className="menu-item">
  <FaEnvelope className="icon" />
  <span className="tooltip">Messages</span>
</NavLink>
    </aside>
  );
};

export default StudentSidebar;