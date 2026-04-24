import { useEffect, useState, useCallback } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://www.gurukrupaeducation.com/api/get-users.php");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Stats
  const totalUsers = users.length;
  const students = users.filter((u) => u.role === "student").length;
  const teachers = users.filter((u) => u.role === "teacher").length;
  const staff = users.filter((u) => u.role === "staff").length;

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Role badge styling
  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "student": return "badge-student";
      case "teacher": return "badge-teacher";
      case "staff": return "badge-staff";
      default: return "badge-admin";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "student": return "🎓";
      case "teacher": return "👩‍🏫";
      case "staff": return "💼";
      default: return "🛡️";
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .admin-page {
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #f5f7fc 0%, #eef2f8 100%);
          min-height: 100vh;
         
        }

        .main {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Hero Section */
        .hero {
          text-align: center;
          margin-bottom: 3rem;
        }

        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(79, 70, 229, 0.1);
          backdrop-filter: blur(4px);
          padding: 0.5rem 1.25rem;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4f46e5;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(79, 70, 229, 0.2);
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1e293b, #334155);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .hero-sub {
          font-size: 1.125rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background: white;
          border-radius: 24px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid rgba(226, 232, 240, 0.6);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.15);
          border-color: #cbd5e1;
        }

        .stat-icon {
          font-size: 2.5rem;
          background: #f1f5f9;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
        }

        .stat-info {
          flex: 1;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
        }

        .stat-label {
          color: #64748b;
          font-weight: 500;
          font-size: 0.875rem;
        }

        /* User Management Header */
        .management-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .management-title h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
        }

        .management-title p {
          color: #64748b;
          font-size: 0.875rem;
        }

        /* Filters */
        .filters-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 60px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f8fafc;
          padding: 0.5rem 1rem;
          border-radius: 40px;
          border: 1px solid #e2e8f0;
        }

        .search-box input {
          border: none;
          background: transparent;
          padding: 0.5rem;
          font-size: 0.875rem;
          width: 100%;
          outline: none;
        }

        .role-filter select {
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          padding: 0.5rem 1rem;
          border-radius: 40px;
          font-size: 0.875rem;
          outline: none;
          cursor: pointer;
        }

        /* Table */
        .table-container {
          background: white;
          border-radius: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow-x: auto;
          border: 1px solid #eef2f8;
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .user-table th {
          text-align: left;
          padding: 1rem 1.5rem;
          background: #f8fafc;
          font-weight: 600;
          color: #1e293b;
          border-bottom: 1px solid #e2e8f0;
          font-size: 0.875rem;
        }

        .user-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
        }

        .user-table tr:hover {
          background: #fefce8;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.75rem;
          border-radius: 40px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .badge-student {
          background: #dbeafe;
          color: #1e40af;
        }
        .badge-teacher {
          background: #fef3c7;
          color: #92400e;
        }
        .badge-staff {
          background: #dcfce7;
          color: #166534;
        }
        .badge-admin {
          background: #f1f5f9;
          color: #475569;
        }

        .loading-spinner {
          text-align: center;
          padding: 3rem;
          color: #4f46e5;
        }
      `}</style>

      <div className="admin-page">
        <main className="main">
          <section className="hero">
            <div className="hero-pill">
              <span>🛡️ Admin Dashboard</span>
            </div>
            <h1 className="hero-title">Manage Users & Platform Access</h1>
            <p className="hero-sub">
              View and organize students, teachers, staff and admins from one control panel.
            </p>
          </section>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <div className="stat-value">{totalUsers}</div>
                <div className="stat-label">Total Users</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <div className="stat-info">
                <div className="stat-value">{students}</div>
                <div className="stat-label">Students</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👩‍🏫</div>
              <div className="stat-info">
                <div className="stat-value">{teachers}</div>
                <div className="stat-label">Teachers</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💼</div>
              <div className="stat-info">
                <div className="stat-value">{staff}</div>
                <div className="stat-label">Staff</div>
              </div>
            </div>
          </div>

          {/* User Management Section (Read-only) */}
          <div className="management-header">
            <div className="management-title">
              <h2>All Users</h2>
              <p>Browse and filter registered users</p>
            </div>
          </div>

          <div className="filters-bar">
            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="role-filter">
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="teacher">Teachers</option>
                <option value="staff">Staff</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            {loading ? (
              <div className="loading-spinner">
                <div>⏳ Loading users...</div>
              </div>
            ) : error ? (
              <div className="loading-spinner" style={{ color: "#dc2626" }}>
                ❌ Error: {error}
              </div>
            ) : (
              <table className="user-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center", padding: "3rem" }}>
                        👀 No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td style={{ fontWeight: 500 }}>{user.name || "—"}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                            {getRoleIcon(user.role)} {user.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;