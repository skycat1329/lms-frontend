import { Outlet } from "react-router-dom";
import { useState } from "react";
import StudentSidebar from "./Studentsidebar";
import "./student.css";
const Studentlayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="lms">

      <StudentSidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
      />

      <div className={`main-wrap ${collapsed ? "collapsed" : ""}`}>

        <header className="topnav">
          <h2>
            🕉 GURUKRUPA PLACEMENT & EDUCATION SOLUTIONS PVT LTD
          </h2>
        </header>

        <div className="content">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Studentlayout;