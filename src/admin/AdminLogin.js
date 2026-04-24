import { useState } from "react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("https://www.gurukrupaeducation.com/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (data.role === "student") {
        window.location.href = "/student/dashboard";
      } else if (data.role === "teacher") {
        window.location.href = "/teacher-dashboard";
      } else if (data.role === "staff") {
        window.location.href = "/staff-dashboard";
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Poppins:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :root {
          --red: #c0392b;
          --red-dark: #922b21;
          --red-deep: #7b241c;
          --red-light: #fdecea;
          --red-mid: #e74c3c;
          --red-soft: #fadbd8;
          --white: #ffffff;
          --off-white: #fdf8f8;
          --border: #f5c6c2;
          --text: #2c0a08;
          --muted: #8b4443;
          --bg: #fdf8f8;
        }

        .admin-login-page {
          min-height: 100vh;
          font-family: 'Nunito', sans-serif;
          background:
            radial-gradient(circle at 12% 18%, rgba(192, 57, 43, 0.16), transparent 28rem),
            radial-gradient(circle at 85% 82%, rgba(231, 76, 60, 0.14), transparent 26rem),
            var(--bg);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
          overflow: hidden;
          position: relative;
        }

        .admin-login-page::before {
          content: 'ॐ';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Yatra One', serif;
          font-size: min(42vw, 460px);
          color: rgba(146, 43, 33, 0.035);
          line-height: 1;
          pointer-events: none;
        }

        .admin-login-shell {
          width: min(980px, 100%);
          min-height: 610px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 28px;
          box-shadow: 0 26px 70px rgba(146, 43, 33, 0.16);
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .admin-brand-panel {
          background:
            linear-gradient(135deg, rgba(123, 36, 28, 0.96), rgba(192, 57, 43, 0.96)),
            radial-gradient(circle at 70% 18%, rgba(255,255,255,0.18), transparent 18rem);
          padding: 40px;
          color: #fff;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .admin-brand-panel::before {
          content: 'ॐ';
          position: absolute;
          right: -26px;
          bottom: -42px;
          font-family: 'Yatra One', serif;
          font-size: 230px;
          color: rgba(255,255,255,0.07);
          line-height: 1;
        }

        .brand-logo {
          width: 62px;
          height: 62px;
          border-radius: 18px;
          background: #fff;
          color: var(--red-dark);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 28px rgba(0,0,0,0.18);
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }

        .brand-om {
          font-family: 'Yatra One', serif;
          font-size: 30px;
          line-height: 1;
        }

        .brand-mini {
          font-family: 'Poppins', sans-serif;
          font-size: 6.5px;
          font-weight: 800;
          letter-spacing: 0.4px;
        }

        .brand-name {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.45rem, 3vw, 2.2rem);
          line-height: 1.14;
          font-weight: 800;
          letter-spacing: -0.03em;
          max-width: 410px;
          position: relative;
          z-index: 1;
        }

        .brand-tagline {
          margin-top: 14px;
          color: rgba(255,255,255,0.78);
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 390px;
          position: relative;
          z-index: 1;
        }

        .role-list {
          display: grid;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .role-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 14px;
          border-radius: 15px;
          background: rgba(255,255,255,0.13);
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(12px);
        }

        .role-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: rgba(255,255,255,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .role-title {
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          font-weight: 800;
        }

        .role-text {
          font-size: 11.5px;
          color: rgba(255,255,255,0.72);
          margin-top: 2px;
        }

        .admin-form-panel {
          padding: 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(180deg, #fff 0%, #fff8f8 100%);
        }

        .form-kicker {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          width: fit-content;
          padding: 6px 12px;
          border-radius: 99px;
          background: var(--red-light);
          color: var(--red-dark);
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .form-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.45rem);
          font-weight: 800;
          letter-spacing: -0.05em;
          color: var(--text);
          line-height: 1.08;
          margin-bottom: 8px;
        }

        .form-subtitle {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .admin-form {
          display: grid;
          gap: 16px;
        }

        .field {
          display: grid;
          gap: 7px;
        }

        .field label {
          font-size: 13px;
          font-weight: 800;
          color: var(--text);
        }

        .input-wrap {
          height: 50px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1.5px solid var(--border);
          border-radius: 14px;
          background: #fff;
          padding: 0 14px;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
        }

        .input-wrap:focus-within {
          border-color: var(--red);
          box-shadow: 0 0 0 4px rgba(192, 57, 43, 0.09);
          background: #fff;
        }

        .input-icon {
          color: var(--red);
          font-size: 16px;
          width: 20px;
          text-align: center;
        }

        .input-wrap input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          font-family: 'Nunito', sans-serif;
          color: var(--text);
          font-size: 14.5px;
          font-weight: 700;
        }

        .input-wrap input::placeholder {
          color: #c0908e;
          font-weight: 600;
        }

        .form-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 2px;
          font-size: 12.5px;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--muted);
          font-weight: 700;
        }

        .remember input {
          accent-color: var(--red);
        }

        .forgot-link {
          color: var(--red);
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .login-btn {
          height: 52px;
          border: 0;
          border-radius: 15px;
          margin-top: 10px;
          background: linear-gradient(135deg, var(--red-dark), var(--red-mid));
          color: #fff;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(192, 57, 43, 0.22);
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px rgba(192, 57, 43, 0.28);
        }

        .login-btn:active {
          transform: translateY(0);
          opacity: 0.9;
        }

        .secure-note {
          margin-top: 20px;
          padding: 13px 14px;
          border-radius: 14px;
          background: var(--red-light);
          color: var(--muted);
          font-size: 12.5px;
          line-height: 1.5;
          font-weight: 700;
          border: 1px solid var(--red-soft);
        }

        .secure-note strong {
          color: var(--red-dark);
        }

        @media (max-width: 860px) {
          .admin-login-shell {
            grid-template-columns: 1fr;
          }

          .admin-brand-panel {
            min-height: 330px;
          }
        }

        @media (max-width: 520px) {
          .admin-login-page {
            padding: 14px;
            align-items: flex-start;
          }

          .admin-login-shell {
            border-radius: 22px;
          }

          .admin-brand-panel,
          .admin-form-panel {
            padding: 26px;
          }

          .brand-name {
            font-size: 1.45rem;
          }

          .form-row {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="admin-login-page">
        <div className="admin-login-shell">
          <section className="admin-brand-panel">
            <div>
              <div className="brand-logo">
                <div className="brand-om">ॐ</div>
                <div className="brand-mini">GURUKRUPA</div>
              </div>

              <h1 className="brand-name">
                GURUKRUPA PLACEMENT & EDUCATION SOLUTIONS
              </h1>

              <p className="brand-tagline">
                Unified portal for admins, students, teachers and staff.
              </p>
            </div>

            <div className="role-list">
              <div className="role-card">
                <div className="role-icon">🛡️</div>
                <div>
                  <div className="role-title">Admin Access</div>
                  <div className="role-text">
                    Manage users, courses, reports and platform settings.
                  </div>
                </div>
              </div>

              <div className="role-card">
                <div className="role-icon">🎓</div>
                <div>
                  <div className="role-title">Student Dashboard</div>
                  <div className="role-text">
                    Continue courses, track progress and view certificates.
                  </div>
                </div>
              </div>

              <div className="role-card">
                <div className="role-icon">👩‍🏫</div>
                <div>
                  <div className="role-title">Teacher & Staff Portal</div>
                  <div className="role-text">
                    Access academic tools, batches, learners and operations.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="admin-form-panel">
            <div className="form-kicker">🔐 Multi-Role Login</div>

            <h2 className="form-title">Welcome Back</h2>

            <p className="form-subtitle">
              Sign in with your registered email and password. You will be
              redirected automatically based on your account role.
            </p>

            <div className="admin-form">
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔑</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleLogin();
                    }}
                  />
                </div>
              </div>

              <div className="form-row">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>

                <span className="forgot-link">Forgot password?</span>
              </div>

              <button className="login-btn" onClick={handleLogin}>
                Login to Portal →
              </button>
            </div>

            <div className="secure-note">
              <strong>Secure role-based access.</strong> Admin, student, teacher
              and staff users are redirected to their own dashboard automatically.
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
