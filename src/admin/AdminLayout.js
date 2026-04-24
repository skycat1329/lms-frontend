import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./style.css";
function AdminLayout() {
  return (
    <div className="admin-page">

      {/* 🔥 Sidebar reuse */}
      <Sidebar />

      <main className="main">

        {/* 🔥 Topbar */}
        <header className="topbar">
           
            <div className="brand">
              <div className="brand-om">ॐ</div>
              <div>
                <div className="brand-name">
                  GURUKRUPA PLACEMENT & EDUCATION SOLUTIONS PVT LTD
                </div>
                <div className="brand-sub">
                  Admin Control Center · Users & Access Management
                </div>
              </div>
            </div>

            <div className="admin-chip">
              <div className="admin-avatar">A</div>
              Admin
            </div>
          
        </header>

        {/* 🔥 Page load here */}
        <section className="content">
          <Outlet />
        </section>

      </main>
    </div>
  );
}

export default AdminLayout;