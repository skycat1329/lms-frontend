import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      window.location.href = "/";
    } else {
      setUser(storedUser);
    }
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const courses = [
    {
      id: 1, title: "React Basics", desc: "Learn fundamentals of React",
      progress: 65, lessons: 24, duration: "8h 30m",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      accentColor: "#667eea", tag: "Frontend", icon: "⚛️", students: "24.3k", rating: 4.8,
    },
    {
      id: 2, title: "JavaScript Mastery", desc: "Deep dive into JS concepts",
      progress: 40, lessons: 36, duration: "12h 15m",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      accentColor: "#f5576c", tag: "Core", icon: "🟡", students: "58.1k", rating: 4.9,
    },
    {
      id: 3, title: "Node.js & Backend", desc: "Build scalable server apps",
      progress: 20, lessons: 28, duration: "10h 00m",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      accentColor: "#4facfe", tag: "Backend", icon: "🟢", students: "19.7k", rating: 4.7,
    },
    {
      id: 4, title: "CSS & Animations", desc: "Master modern styling and motion",
      progress: 80, lessons: 18, duration: "6h 45m",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      accentColor: "#43e97b", tag: "Design", icon: "🎨", students: "31.6k", rating: 4.8,
    },
    {
      id: 5, title: "TypeScript Pro", desc: "Type-safe JavaScript at scale",
      progress: 10, lessons: 32, duration: "11h 20m",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      accentColor: "#fa709a", tag: "Advanced", icon: "🔷", students: "14.2k", rating: 4.6,
    },
    {
      id: 6, title: "Git & DevOps", desc: "Version control and CI/CD pipelines",
      progress: 55, lessons: 20, duration: "7h 00m",
      gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      accentColor: "#a18cd1", tag: "DevOps", icon: "🔧", students: "22.5k", rating: 4.7,
    },
  ];

  const stats = [
    { label: "Courses Active", value: "6", icon: "📚", color: "#667eea", light: "#f0edff" },
    { label: "Hours Learned", value: "37", icon: "⏱", color: "#f5576c", light: "#fff0f3" },
    { label: "Certificates", value: "2", icon: "🏆", color: "#43e97b", light: "#edfff8" },
    { label: "Day Streak", value: "12", icon: "🔥", color: "#fa709a", light: "#fff3f8" },
  ];

  const leaderboard = [
    { name: "Priya S.", xp: 4820, rank: 1, avatar: "PS", grad: "linear-gradient(135deg,#667eea,#764ba2)" },
    { name: "Arjun K.", xp: 4310, rank: 2, avatar: "AK", grad: "linear-gradient(135deg,#f093fb,#f5576c)" },
    { name: user?.name?.split(" ")[0] || "You", xp: 3750, rank: 3, avatar: user?.name?.charAt(0) || "Y", isYou: true, grad: "linear-gradient(135deg,#4facfe,#00f2fe)" },
    { name: "Sneha M.", xp: 3200, rank: 4, avatar: "SM", grad: "linear-gradient(135deg,#43e97b,#38f9d7)" },
    { name: "Rohit P.", xp: 2890, rank: 5, avatar: "RP", grad: "linear-gradient(135deg,#fa709a,#fee140)" },
  ];

  const achievements = [
    { icon: "🏅", title: "First Step", desc: "Completed your first lesson", done: true },
    { icon: "🔥", title: "On Fire", desc: "7-day learning streak", done: true },
    { icon: "⚡", title: "Speed Learner", desc: "Finish a course in one day", done: false },
    { icon: "🎯", title: "Sharpshooter", desc: "Get 100% on a quiz", done: false },
    { icon: "🌟", title: "Star Student", desc: "Top 10% of all learners", done: false },
    { icon: "💎", title: "Diamond Coder", desc: "Complete 10 courses", done: false },
  ];

  const sideItems = [
    { icon: "🏠", label: "Home", active: true },
    { icon: "📚", label: "Courses" },
    { icon: "📊", label: "Progress" },
    { icon: "🏆", label: "Leaderboard" },
    { icon: "💬", label: "Community" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .lms { font-family: 'Manrope', sans-serif; background: #f4f5f7; min-height: 100vh; color: #1a1a2e; display: flex; }

        /* SIDEBAR */
        .sidebar {
          width: 72px; background: #1a1a2e; min-height: 100vh;
          display: flex; flex-direction: column; align-items: center;
          padding: 20px 0; gap: 6px; flex-shrink: 0; position: sticky; top: 0; height: 100vh;
        }
        .sb-logo {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; margin-bottom: 16px; cursor: pointer;
          box-shadow: 0 4px 16px rgba(102,126,234,0.45);
        }
        .sb-item {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; cursor: pointer;
          transition: background 0.18s, transform 0.15s;
          color: #6c7a9c; position: relative;
        }
        .sb-item:hover { background: rgba(255,255,255,0.08); transform: scale(1.08); color: #fff; }
        .sb-item.active { background: rgba(102,126,234,0.22); color: #a5b4fc; }
        .sb-tip {
          position: absolute; left: 58px;
          background: #0f0f1a; color: #fff; padding: 4px 10px;
          border-radius: 7px; font-size: 12px; white-space: nowrap;
          opacity: 0; pointer-events: none; transition: opacity 0.18s;
          border: 1px solid rgba(255,255,255,0.1); font-family: 'Manrope', sans-serif;
          z-index: 999;
        }
        .sb-item:hover .sb-tip { opacity: 1; }
        .sb-bottom { margin-top: auto; }

        /* MAIN */
        .main-wrap { flex: 1; min-width: 0; display: flex; flex-direction: column; }

        /* TOPNAV */
        .topnav {
          background: #fff; border-bottom: 1px solid #e8eaf0;
          padding: 0 28px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 50;
        }
        .tn-left { display: flex; align-items: center; gap: 14px; }
        .tn-brand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; font-weight: 800; color: #1a1a2e; }
        .search-box {
          display: flex; align-items: center;
          background: #f4f5f7; border: 1.5px solid #e8eaf0;
          border-radius: 10px; padding: 7px 14px; gap: 8px; width: 250px;
          transition: border-color 0.2s, background 0.2s;
        }
        .search-box:focus-within { border-color: #667eea; background: #fff; }
        .search-box input { border: none; background: transparent; outline: none; font-family: 'Manrope', sans-serif; font-size: 13.5px; color: #1a1a2e; width: 100%; }
        .search-box input::placeholder { color: #9ca3bf; }
        .tn-right { display: flex; align-items: center; gap: 10px; }
        .notif-btn {
          width: 38px; height: 38px; border-radius: 10px;
          border: 1.5px solid #e8eaf0; background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 16px;
          transition: border-color 0.2s, background 0.2s; position: relative;
        }
        .notif-btn:hover { border-color: #667eea; background: #f0edff; }
        .notif-dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; background: #f5576c; border-radius: 50%; border: 2px solid #fff; }
        .user-chip {
          display: flex; align-items: center; gap: 9px;
          background: #f4f5f7; border: 1.5px solid #e8eaf0;
          border-radius: 12px; padding: 5px 12px 5px 5px;
          cursor: pointer; transition: border-color 0.2s;
        }
        .user-chip:hover { border-color: #667eea; }
        .u-avatar {
          width: 30px; height: 30px; border-radius: 8px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 12px; color: #fff;
        }
        .u-name { font-size: 13px; font-weight: 600; color: #1a1a2e; }
        .logout-btn {
          background: #fff0f3; color: #f5576c;
          border: 1.5px solid #ffc8d0; padding: 7px 14px;
          border-radius: 9px; font-family: 'Manrope', sans-serif;
          font-size: 13px; font-weight: 700; cursor: pointer;
          transition: background 0.2s;
        }
        .logout-btn:hover { background: #ffe0e6; }

        /* CONTENT */
        .content { padding: 26px 28px 40px; overflow-y: auto; }

        /* HERO BANNER */
        .hero {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%);
          border-radius: 20px; padding: 30px 36px;
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 22px; overflow: hidden; position: relative;
          animation: fadeUp 0.55s ease both;
        }
        .hero::before {
          content: ''; position: absolute; top: -80px; right: 160px;
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(102,126,234,0.25) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
        }
        .hero::after {
          content: ''; position: absolute; bottom: -50px; right: -20px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(245,87,108,0.18) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
        }
        .hero-left { position: relative; z-index: 1; }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(102,126,234,0.18); border: 1px solid rgba(102,126,234,0.38);
          color: #a5b4fc; font-size: 11.5px; font-weight: 700;
          padding: 4px 12px; border-radius: 99px; margin-bottom: 12px;
          letter-spacing: 0.3px;
        }
        .hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.55rem, 2.8vw, 2.1rem);
          font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 8px;
        }
        .hero-title .grad {
          background: linear-gradient(135deg, #a5b4fc, #f9a8d4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-sub { font-size: 13.5px; color: #8892b0; margin-bottom: 20px; line-height: 1.55; }
        .hero-sub strong { color: #c7d2fe; }
        .hero-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff; border: none; border-radius: 11px;
          padding: 11px 24px; font-family: 'Manrope', sans-serif;
          font-size: 14px; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 18px rgba(102,126,234,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(102,126,234,0.5); }
        .hero-right { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 10px; min-width: 190px; }
        .hero-badge {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px; padding: 12px 16px;
          display: flex; align-items: center; gap: 12px;
          transition: background 0.2s;
        }
        .hero-badge:hover { background: rgba(255,255,255,0.1); }
        .hb-icon { font-size: 22px; }
        .hb-label { font-size: 11px; color: #8892b0; margin-bottom: 1px; }
        .hb-val { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 800; color: #fff; }

        /* STATS */
        .stats-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 14px; margin-bottom: 22px;
          animation: fadeUp 0.55s ease 0.08s both;
        }
        .stat-card {
          background: #fff; border-radius: 16px; padding: 18px 20px;
          border: 1.5px solid #e8eaf0;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover { transform: translateY(-3px); border-color: var(--sc); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
        .sc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .sc-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--sc-l); display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .sc-badge { font-size: 10.5px; color: #16a34a; font-weight: 700; background: #f0fdf4; padding: 2px 8px; border-radius: 99px; }
        .sc-val { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; color: #1a1a2e; line-height: 1; }
        .sc-lbl { font-size: 12.5px; color: #8892a4; margin-top: 3px; font-weight: 500; }

        /* BOTTOM GRID */
        .bottom-grid {
          display: grid; grid-template-columns: 1fr 310px;
          gap: 20px; animation: fadeUp 0.55s ease 0.16s both;
        }

        /* COURSES */
        .sec-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .sec-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.05rem; font-weight: 700; color: #1a1a2e; }
        .see-all { font-size: 13px; color: #667eea; font-weight: 600; cursor: pointer; text-decoration: none; }
        .see-all:hover { text-decoration: underline; }
        .tabs-row { display: flex; gap: 5px; margin-bottom: 16px; background: #ededf0; border-radius: 10px; padding: 4px; width: fit-content; }
        .tab-btn {
          padding: 7px 16px; border-radius: 7px; border: none;
          background: transparent; color: #8892a4;
          font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.18s;
        }
        .tab-btn.active { background: #fff; color: #1a1a2e; box-shadow: 0 1px 5px rgba(0,0,0,0.09); }
        .tab-btn:not(.active):hover { color: #1a1a2e; }
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px,1fr)); gap: 16px; }
        .c-card {
          background: #fff; border-radius: 18px; border: 1.5px solid #e8eaf0; overflow: hidden;
          transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s; cursor: pointer;
        }
        .c-card:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(0,0,0,0.1); border-color: transparent; }
        .c-thumb {
          height: 136px; padding: 18px 18px 0;
          display: flex; align-items: flex-start; justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .c-thumb-icon { font-size: 38px; z-index: 1; }
        .c-circle1 { position: absolute; bottom: -28px; right: -28px; width: 110px; height: 110px; border-radius: 50%; background: rgba(255,255,255,0.14); }
        .c-circle2 { position: absolute; top: -18px; right: 18px; width: 65px; height: 65px; border-radius: 50%; background: rgba(255,255,255,0.09); }
        .c-tag { background: rgba(255,255,255,0.22); border: 1px solid rgba(255,255,255,0.35); color: #fff; font-size: 10.5px; font-weight: 700; padding: 3px 10px; border-radius: 99px; z-index: 1; height: fit-content; letter-spacing: 0.3px; }
        .c-body { padding: 15px 17px 17px; }
        .c-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; }
        .c-desc { font-size: 12.5px; color: #8892a4; margin-bottom: 12px; line-height: 1.5; }
        .c-meta { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
        .c-meta-i { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #8892a4; }
        .c-stars { color: #fbbf24; font-size: 12px; }
        .prog-hdr { display: flex; justify-content: space-between; font-size: 11.5px; color: #8892a4; font-weight: 500; margin-bottom: 5px; }
        .prog-hdr span:last-child { color: #1a1a2e; font-weight: 700; }
        .prog-bar { height: 5px; background: #f0f1f4; border-radius: 99px; overflow: hidden; margin-bottom: 13px; }
        .prog-fill { height: 100%; border-radius: 99px; transition: width 0.9s ease; }
        .c-btn { width: 100%; padding: 10px; border-radius: 10px; border: none; font-family: 'Manrope', sans-serif; font-size: 13.5px; font-weight: 700; cursor: pointer; color: #fff; transition: opacity 0.18s, transform 0.15s; }
        .c-btn:hover { opacity: 0.86; transform: scale(0.98); }

        /* RIGHT PANEL */
        .right-panel { display: flex; flex-direction: column; gap: 16px; }
        .panel {
          background: #fff; border-radius: 18px; border: 1.5px solid #e8eaf0; padding: 18px 20px;
        }
        .panel-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .panel-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; color: #1a1a2e; }

        /* Leaderboard */
        .lb-row {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px; border-radius: 10px; margin-bottom: 3px;
          transition: background 0.15s; cursor: default;
        }
        .lb-row:hover { background: #f8f9fc; }
        .lb-row.you { background: #f0edff; border: 1.5px solid #d4caff; }
        .lb-rank { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 800; width: 22px; text-align: center; }
        .lb-av { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: #fff; flex-shrink: 0; }
        .lb-name { font-size: 13px; font-weight: 600; color: #1a1a2e; flex: 1; }
        .lb-xp { font-size: 12px; font-weight: 700; color: #667eea; }

        /* Achievements */
        .ach-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .ach-card {
          border-radius: 11px; padding: 10px 12px; text-align: center;
          border: 1.5px solid #e8eaf0;
          transition: transform 0.18s, border-color 0.18s; cursor: default;
        }
        .ach-card:hover { transform: scale(1.04); }
        .ach-card.done { border-color: #c7d2fe; background: #f5f3ff; }
        .ach-card.locked { opacity: 0.4; filter: grayscale(1); }
        .ach-icon { font-size: 20px; margin-bottom: 4px; }
        .ach-ttl { font-size: 11px; font-weight: 700; color: #1a1a2e; }
        .ach-dsc { font-size: 10px; color: #8892a4; margin-top: 2px; line-height: 1.3; }

        /* Daily goal */
        .goal-bar-wrap { margin-top: 10px; }
        .goal-meta { display: flex; justify-content: space-between; font-size: 12px; color: #8892a4; margin-top: 7px; }

        /* ANIMATIONS */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="lms">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sb-logo">⚡</div>
          {sideItems.map((s, i) => (
            <div key={i} className={`sb-item${s.active ? ' active' : ''}`}>
              {s.icon}<span className="sb-tip">{s.label}</span>
            </div>
          ))}
          <div className="sb-bottom">
            <div className="sb-item">⚙️<span className="sb-tip">Settings</span></div>
          </div>
        </aside>

        {/* Main wrapper */}
        <div className="main-wrap">
          {/* Topnav */}
          <header className="topnav">
            <div className="tn-left">
              <div className="tn-brand">LearnFlow</div>
              <div className="search-box">
                <span style={{ fontSize: 14, color: '#9ca3bf' }}>🔍</span>
                <input placeholder="Search courses, topics..." />
              </div>
            </div>
            <div className="tn-right">
              <div className="notif-btn">🔔<div className="notif-dot" /></div>
              {user && (
                <div className="user-chip">
                  <div className="u-avatar">{user.name?.charAt(0)?.toUpperCase()}</div>
                  <span className="u-name">{user.name?.split(" ")[0]}</span>
                </div>
              )}
              <button className="logout-btn" onClick={() => { localStorage.removeItem("user"); window.location.href = "/"; }}>
                Logout
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="content">

            {/* Hero */}
            <div className="hero">
              <div className="hero-left">
                <div className="hero-pill">🔥&nbsp; 12-day streak — keep it up!</div>
                <h1 className="hero-title">{greeting},<br /><span className="grad">{user?.name?.split(" ")[0] || "Learner"} 👋</span></h1>
                <p className="hero-sub">You're on a roll! <strong>37 hours</strong> learned this month.<br />You're in the top 20% of all learners.</p>
                <button className="hero-cta">▶&nbsp; Continue Learning</button>
              </div>
              <div className="hero-right">
                <div className="hero-badge">
                  <div className="hb-icon">📈</div>
                  <div><div className="hb-label">Weekly XP</div><div className="hb-val">1,240</div></div>
                </div>
                <div className="hero-badge">
                  <div className="hb-icon">🎯</div>
                  <div><div className="hb-label">Next Goal</div><div className="hb-val">Cert #3</div></div>
                </div>
                <div className="hero-badge">
                  <div className="hb-icon">🏅</div>
                  <div><div className="hb-label">Rank</div><div className="hb-val">#3 / 520</div></div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-row">
              {stats.map((s, i) => (
                <div className="stat-card" key={i} style={{ '--sc': s.color, '--sc-l': s.light }}>
                  <div className="sc-top">
                    <div className="sc-icon">{s.icon}</div>
                    <div className="sc-badge">↑ This week</div>
                  </div>
                  <div className="sc-val">{s.value}</div>
                  <div className="sc-lbl">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Bottom Grid */}
            <div className="bottom-grid">

              {/* Courses */}
              <div>
                <div className="sec-hdr">
                  <div className="sec-title">My Courses</div>
                  <a className="see-all">Browse all →</a>
                </div>
                <div className="tabs-row">
                  {['All', 'In Progress', 'Completed', 'Saved'].map(t => (
                    <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
                  ))}
                </div>
                <div className="courses-grid">
                  {courses.map(c => (
                    <div className="c-card" key={c.id}>
                      <div className="c-thumb" style={{ background: c.gradient }}>
                        <div className="c-thumb-icon">{c.icon}</div>
                        <div className="c-tag">{c.tag}</div>
                        <div className="c-circle1" /><div className="c-circle2" />
                      </div>
                      <div className="c-body">
                        <div className="c-title">{c.title}</div>
                        <div className="c-desc">{c.desc}</div>
                        <div className="c-meta">
                          <div className="c-meta-i"><span className="c-stars">★</span><span style={{ color: '#1a1a2e', fontWeight: 700 }}>{c.rating}</span></div>
                          <div className="c-meta-i">📖 {c.lessons} lessons</div>
                          <div className="c-meta-i">⏱ {c.duration}</div>
                        </div>
                        <div className="prog-hdr"><span>Progress</span><span>{c.progress}%</span></div>
                        <div className="prog-bar"><div className="prog-fill" style={{ width: `${c.progress}%`, background: c.gradient }} /></div>
                        <button className="c-btn" style={{ background: c.gradient }}>
                          {c.progress > 0 ? '▶  Continue' : '🚀  Start Course'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel */}
              <div className="right-panel">

                {/* Leaderboard */}
                <div className="panel">
                  <div className="panel-hdr">
                    <div className="panel-title">🏆 Weekly Leaderboard</div>
                    <a className="see-all">Full →</a>
                  </div>
                  {leaderboard.map((p, i) => (
                    <div key={i} className={`lb-row${p.isYou ? ' you' : ''}`}>
                      <div className="lb-rank" style={{ color: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7c2f' : '#8892a4' }}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${p.rank}`}
                      </div>
                      <div className="lb-av" style={{ background: p.grad }}>{p.avatar}</div>
                      <div className="lb-name">{p.isYou ? `${p.name} (You)` : p.name}</div>
                      <div className="lb-xp">{p.xp.toLocaleString()} XP</div>
                    </div>
                  ))}
                </div>

                {/* Achievements */}
                <div className="panel">
                  <div className="panel-hdr">
                    <div className="panel-title">🎖 Achievements</div>
                    <a className="see-all">All →</a>
                  </div>
                  <div className="ach-grid">
                    {achievements.map((a, i) => (
                      <div key={i} className={`ach-card ${a.done ? 'done' : 'locked'}`}>
                        <div className="ach-icon">{a.icon}</div>
                        <div className="ach-ttl">{a.title}</div>
                        <div className="ach-dsc">{a.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Goal */}
                <div className="panel">
                  <div className="panel-hdr">
                    <div className="panel-title">🎯 Daily Goal</div>
                    <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 700, background: '#f0fdf4', padding: '2px 8px', borderRadius: 99 }}>72% done</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#8892a4', lineHeight: 1.5 }}>Complete <strong style={{ color: '#1a1a2e' }}>30 min</strong> of learning today</div>
                  <div className="goal-bar-wrap">
                    <div className="prog-bar" style={{ height: 8 }}>
                      <div className="prog-fill" style={{ width: '72%', background: 'linear-gradient(90deg, #43e97b, #38f9d7)' }} />
                    </div>
                    <div className="goal-meta"><span>22 min done</span><span>30 min goal</span></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;