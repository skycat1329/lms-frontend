import { useEffect, useState } from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Student", email: "", role: "student" };

  // Mock data – replace with real API calls later
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching student data
    setTimeout(() => {
      setEnrolledCourses([
        { id: 1, title: "React Complete Guide", instructor: "Sarah Johnson", progress: 65, nextLesson: "Hooks deep dive" },
        { id: 2, title: "UI/UX Design Fundamentals", instructor: "Michael Chen", progress: 30, nextLesson: "Wireframing" },
        { id: 3, title: "Data Science Bootcamp", instructor: "Emily Rodriguez", progress: 80, nextLesson: "Model evaluation" },
      ]);
      setAssignments([
        { id: 1, course: "React Complete Guide", title: "Build a todo app", due: "2025-05-01", status: "pending" },
        { id: 2, course: "UI/UX Design Fundamentals", title: "Create a user flow", due: "2025-04-28", status: "submitted" },
        { id: 3, course: "Data Science Bootcamp", title: "Linear regression project", due: "2025-05-05", status: "pending" },
      ]);
      setAnnouncements([
        { id: 1, title: "New course added: Advanced Node.js", date: "2025-04-20", content: "Enroll now and get 20% off!" },
        { id: 2, title: "Office hours this Friday", date: "2025-04-19", content: "Join Zoom link in your email." },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const totalCourses = enrolledCourses.length;
  const completedAssignments = assignments.filter(a => a.status === "submitted").length;
  const avgProgress = Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / totalCourses) || 0;

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .student-dashboard {
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #f5f7fc 0%, #eef2f8 100%);
          min-height: 100vh;
          padding: 2rem;
        }

        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .welcome-header {
          margin-bottom: 2rem;
        }

        .welcome-title {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1e293b, #334155);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .welcome-sub {
          color: #64748b;
          margin-top: 0.25rem;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background: white;
          border-radius: 28px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          border: 1px solid #eef2f8;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 20px -12px rgba(0,0,0,0.15);
        }

        .stat-icon {
          font-size: 2rem;
          background: #f1f5f9;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
        }

        .stat-info h3 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
        }

        .stat-info p {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Two-column layout */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Cards */
        .card {
          background: white;
          border-radius: 28px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #eef2f8;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Course item */
        .course-item {
          border-bottom: 1px solid #f1f5f9;
          padding: 1rem 0;
        }

        .course-item:last-child {
          border-bottom: none;
        }

        .course-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .course-title {
          font-weight: 700;
          color: #1e293b;
        }

        .progress-bar {
          background: #e2e8f0;
          border-radius: 20px;
          height: 8px;
          width: 100%;
          margin: 0.75rem 0;
          overflow: hidden;
        }

        .progress-fill {
          background: #4f46e5;
          height: 100%;
          border-radius: 20px;
          transition: width 0.3s;
        }

        .next-lesson {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 0.5rem;
        }

        /* Assignment item */
        .assignment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .assignment-info h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #0f172a;
        }

        .assignment-info p {
          font-size: 0.7rem;
          color: #64748b;
        }

        .status-badge {
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-weight: 600;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-submitted {
          background: #dcfce7;
          color: #166534;
        }

        .announcement-item {
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .announcement-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: #0f172a;
        }

        .announcement-date {
          font-size: 0.7rem;
          color: #94a3b8;
          margin-top: 0.25rem;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          color: #4f46e5;
        }
      `}</style>

      <div className="student-dashboard">
        <div className="dashboard-container">
          {/* Header */}
          <div className="welcome-header">
            <h1 className="welcome-title">Welcome back, {user.name || "Student"} 👋</h1>
            <p className="welcome-sub">Continue your learning journey. Here's what's new today.</p>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-info">
                <h3>{totalCourses}</h3>
                <p>Enrolled Courses</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{completedAssignments}</h3>
                <p>Completed Tasks</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <h3>{avgProgress}%</h3>
                <p>Avg. Progress</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <h3>{assignments.filter(a => a.status === "pending").length}</h3>
                <p>Pending Assignments</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading">⏳ Loading your dashboard...</div>
          ) : (
            <div className="dashboard-grid">
              {/* Left column: Courses & Progress */}
              <div>
                <div className="card">
                  <div className="card-title">
                    <span>📖</span> My Courses
                  </div>
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="course-item">
                      <div className="course-header">
                        <span className="course-title">{course.title}</span>
                        <span style={{ fontSize: "0.75rem", color: "#4f46e5" }}>{course.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <div className="next-lesson">
                        ▶ Next: {course.nextLesson}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card">
                  <div className="card-title">
                    <span>📅</span> Upcoming Assignments
                  </div>
                  {assignments.filter(a => a.status === "pending").length === 0 ? (
                    <p style={{ color: "#64748b", textAlign: "center", padding: "1rem" }}>All caught up! 🎉</p>
                  ) : (
                    assignments.filter(a => a.status === "pending").map((task) => (
                      <div key={task.id} className="assignment-item">
                        <div className="assignment-info">
                          <h4>{task.title}</h4>
                          <p>{task.course} • Due {task.due}</p>
                        </div>
                        <span className="status-badge status-pending">Pending</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right column: Announcements & Recent Activity */}
              <div>
                <div className="card">
                  <div className="card-title">
                    <span>📢</span> Announcements
                  </div>
                  {announcements.map((ann) => (
                    <div key={ann.id} className="announcement-item">
                      <div className="announcement-title">{ann.title}</div>
                      <div className="announcement-date">{ann.date}</div>
                      <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "#334155" }}>{ann.content}</p>
                    </div>
                  ))}
                </div>

                <div className="card">
                  <div className="card-title">
                    <span>🏆</span> Quick Actions
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <button style={{ background: "#4f46e5", color: "white", border: "none", padding: "0.75rem", borderRadius: "40px", fontWeight: "600", cursor: "pointer" }}>
                      📚 Browse All Courses
                    </button>
                    <button style={{ background: "#f1f5f9", color: "#1e293b", border: "none", padding: "0.75rem", borderRadius: "40px", fontWeight: "600", cursor: "pointer" }}>
                      💬 Ask a Question
                    </button>
                    <button style={{ background: "#f1f5f9", color: "#1e293b", border: "none", padding: "0.75rem", borderRadius: "40px", fontWeight: "600", cursor: "pointer" }}>
                      📞 Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;