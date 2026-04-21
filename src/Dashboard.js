import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) { window.location.href = "/"; }
    else { setUser(storedUser); }
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening');
  }, []);

  const courses = [
    { id:1, title:"Placement Bootcamp", desc:"Resume, mock interviews & soft skills", progress:72, lessons:30, duration:"10h", tag:"Placement", icon:"🎯", rating:4.9, gradient:"linear-gradient(135deg,#c0392b,#e74c3c)" },
    { id:2, title:"Business English", desc:"Communication for corporate roles", progress:45, lessons:24, duration:"8h", tag:"Language", icon:"💬", rating:4.8, gradient:"linear-gradient(135deg,#c0392b,#ff6b6b)" },
    { id:3, title:"MS Office Mastery", desc:"Excel, Word & PowerPoint pro skills", progress:30, lessons:20, duration:"6h", tag:"Computer", icon:"💻", rating:4.7, gradient:"linear-gradient(135deg,#922b21,#c0392b)" },
    { id:4, title:"Personality Development", desc:"Confidence, grooming & leadership", progress:85, lessons:18, duration:"5h", tag:"Soft Skills", icon:"🌟", rating:4.9, gradient:"linear-gradient(135deg,#e74c3c,#f39c12)" },
    { id:5, title:"Abroad Education Guide", desc:"IELTS, visa & university selection", progress:15, lessons:28, duration:"9h", tag:"International", icon:"✈️", rating:4.8, gradient:"linear-gradient(135deg,#a93226,#e74c3c)" },
    { id:6, title:"Tally & Accounting", desc:"GST, payroll & financial basics", progress:60, lessons:22, duration:"7h", tag:"Finance", icon:"📊", rating:4.7, gradient:"linear-gradient(135deg,#c0392b,#922b21)" },
  ];

  const stats = [
    { label:"Enrolled Courses", value:"6", icon:"📚" },
    { label:"Hours Learned", value:"37", icon:"⏱" },
    { label:"Certificates", value:"2", icon:"🏆" },
    { label:"Day Streak", value:"12", icon:"🔥" },
  ];

  const leaderboard = [
    { name:"Priya S.", xp:4820, rank:1, av:"PS" },
    { name:"Arjun K.", xp:4310, rank:2, av:"AK" },
    { name: user?.name?.split(" ")[0] || "You", xp:3750, rank:3, av: user?.name?.charAt(0)||"Y", isYou:true },
    { name:"Sneha M.", xp:3200, rank:4, av:"SM" },
    { name:"Rohit P.", xp:2890, rank:5, av:"RP" },
  ];

  const achievements = [
    { icon:"🏅", title:"First Step", desc:"Completed first lesson", done:true },
    { icon:"🔥", title:"On Fire", desc:"7-day streak", done:true },
    { icon:"⚡", title:"Speed Learner", desc:"Finish in one day", done:false },
    { icon:"🎯", title:"Sharpshooter", desc:"100% on a quiz", done:false },
    { icon:"🌟", title:"Star Student", desc:"Top 10% learner", done:false },
    { icon:"💎", title:"Diamond", desc:"Complete 10 courses", done:false },
  ];

  const navItems = [
    { icon:"🏠", label:"Home", active:true },
    { icon:"📚", label:"Courses" },
    { icon:"📊", label:"Progress" },
    { icon:"🏆", label:"Rankings" },
    { icon:"💼", label:"Jobs" },
    { icon:"🌐", label:"Abroad" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Poppins:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        :root {
          --red:       #c0392b;
          --red-dark:  #922b21;
          --red-deep:  #7b241c;
          --red-light: #fdecea;
          --red-mid:   #e74c3c;
          --red-soft:  #fadbd8;
          --white:     #ffffff;
          --off-white: #fdf8f8;
          --border:    #f5c6c2;
          --text:      #2c0a08;
          --muted:     #8b4443;
          --bg:        #fdf8f8;
        }

        .lms { font-family:'Nunito',sans-serif; background:var(--bg); min-height:100vh; display:flex; color:var(--text); }

        /* ── SIDEBAR ── */
        .sidebar {
          width:76px; background:var(--red-dark);
          min-height:100vh; display:flex; flex-direction:column;
          align-items:center; padding:20px 0; gap:6px;
          flex-shrink:0; position:sticky; top:0; height:100vh;
          box-shadow:4px 0 20px rgba(146,43,33,0.18);
        }
        .sb-logo-wrap {
          width:48px; height:48px; border-radius:14px;
          background:var(--white);
          display:flex; align-items:center; justify-content:center;
          margin-bottom:18px; cursor:pointer;
          box-shadow:0 3px 14px rgba(0,0,0,0.2);
          flex-direction:column; gap:1px;
        }
        .sb-om {
          font-family:'Yatra One', serif;
          font-size:22px; color:var(--red-dark); line-height:1;
        }
        .sb-logo-txt {
          font-family:'Poppins',sans-serif;
          font-size:5.5px; font-weight:800;
          color:var(--red-dark); letter-spacing:0.3px; text-align:center;
          line-height:1.2;
        }
        .sb-item {
          width:46px; height:46px; border-radius:13px;
          display:flex; align-items:center; justify-content:center;
          font-size:18px; cursor:pointer; position:relative;
          transition:background 0.18s, transform 0.15s; color:rgba(255,255,255,0.55);
        }
        .sb-item:hover { background:rgba(255,255,255,0.13); transform:scale(1.07); color:#fff; }
        .sb-item.active { background:rgba(255,255,255,0.18); color:#fff; }
        .sb-item::after {
          content:attr(data-tip);
          position:absolute; left:60px;
          background:var(--red-deep); color:#fff;
          padding:4px 10px; border-radius:7px; font-size:11.5px;
          white-space:nowrap; opacity:0; pointer-events:none;
          transition:opacity 0.18s; font-family:'Nunito',sans-serif;
          border:1px solid rgba(255,255,255,0.12); z-index:999;
        }
        .sb-item:hover::after { opacity:1; }
        .sb-divider { width:36px; height:1px; background:rgba(255,255,255,0.12); margin:8px 0; }
        .sb-bottom { margin-top:auto; }

        /* ── MAIN ── */
        .main-wrap { flex:1; min-width:0; display:flex; flex-direction:column; }

        /* ── TOPNAV ── */
        .topnav {
          background:var(--white); border-bottom:2px solid var(--border);
          padding:0 28px; height:66px;
          display:flex; align-items:center; justify-content:space-between;
          position:sticky; top:0; z-index:50;
        }
        .tn-brand {
          display:flex; align-items:center; gap:10px;
        }
        .tn-om {
          font-family:'Yatra One', serif;
          font-size:26px; color:var(--red);
          filter:drop-shadow(0 1px 2px rgba(192,57,43,0.25));
        }
        .tn-texts {}
        .tn-name {
          font-family:'Poppins',sans-serif;
          font-size:13.5px; font-weight:800;
          color:var(--red-dark); line-height:1.2;
          letter-spacing:0.1px;
        }
        .tn-tagline {
          font-size:10px; color:var(--muted); font-weight:600;
          font-style:italic; letter-spacing:0.2px;
        }
        .search-box {
          display:flex; align-items:center; gap:8px;
          background:var(--off-white); border:1.5px solid var(--border);
          border-radius:10px; padding:7px 14px; width:240px;
          transition:border-color 0.2s, background 0.2s;
        }
        .search-box:focus-within { border-color:var(--red); background:#fff; }
        .search-box input { border:none; background:transparent; outline:none; font-family:'Nunito',sans-serif; font-size:13.5px; color:var(--text); width:100%; }
        .search-box input::placeholder { color:#c0908e; }
        .tn-right { display:flex; align-items:center; gap:10px; }
        .notif-btn {
          width:38px; height:38px; border-radius:10px;
          border:1.5px solid var(--border); background:#fff;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; font-size:16px; position:relative;
          transition:border-color 0.2s, background 0.2s;
        }
        .notif-btn:hover { border-color:var(--red); background:var(--red-light); }
        .notif-dot { position:absolute; top:6px; right:6px; width:8px; height:8px; background:var(--red); border-radius:50%; border:2px solid #fff; }
        .user-chip {
          display:flex; align-items:center; gap:9px;
          background:var(--off-white); border:1.5px solid var(--border);
          border-radius:12px; padding:5px 12px 5px 5px; cursor:pointer;
          transition:border-color 0.2s;
        }
        .user-chip:hover { border-color:var(--red); }
        .u-av {
          width:30px; height:30px; border-radius:8px;
          background:linear-gradient(135deg,var(--red-dark),var(--red-mid));
          display:flex; align-items:center; justify-content:center;
          font-weight:800; font-size:12px; color:#fff;
        }
        .u-name { font-size:13px; font-weight:700; color:var(--text); }
        .logout-btn {
          background:var(--red-light); color:var(--red);
          border:1.5px solid var(--red-soft); padding:7px 14px;
          border-radius:9px; font-family:'Nunito',sans-serif;
          font-size:13px; font-weight:700; cursor:pointer;
          transition:background 0.2s;
        }
        .logout-btn:hover { background:var(--red-soft); }

        /* ── CONTENT ── */
        .content { padding:26px 28px 50px; }

        /* ── HERO BANNER ── */
        .hero {
          background:linear-gradient(135deg, var(--red-dark) 0%, var(--red) 60%, #e74c3c 100%);
          border-radius:22px; padding:30px 36px;
          display:flex; align-items:center; justify-content:space-between;
          margin-bottom:22px; overflow:hidden; position:relative;
          animation:fadeUp 0.55s ease both;
          box-shadow:0 12px 40px rgba(192,57,43,0.28);
        }
        /* decorative OM watermark */
        .hero::before {
          content:'ॐ';
          position:absolute; right:280px; top:50%; transform:translateY(-50%);
          font-family:'Yatra One',serif;
          font-size:160px; color:rgba(255,255,255,0.06);
          pointer-events:none; line-height:1;
        }
        .hero::after {
          content:'';
          position:absolute; bottom:-50px; right:-20px;
          width:200px; height:200px;
          background:radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          border-radius:50%; pointer-events:none;
        }
        .hero-left { position:relative; z-index:1; }
        .hero-pill {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3);
          color:#fff; font-size:11.5px; font-weight:700;
          padding:4px 12px; border-radius:99px; margin-bottom:12px;
          letter-spacing:0.3px;
        }
        .hero-title {
          font-family:'Poppins',sans-serif;
          font-size:clamp(1.5rem,2.6vw,2rem);
          font-weight:800; color:#fff; line-height:1.22; margin-bottom:8px;
        }
        .hero-title .light { font-weight:400; opacity:0.88; }
        .hero-sub { font-size:13px; color:rgba(255,255,255,0.78); margin-bottom:20px; line-height:1.6; }
        .hero-sub strong { color:#fff; }
        .hero-cta {
          display:inline-flex; align-items:center; gap:8px;
          background:#fff; color:var(--red-dark);
          border:none; border-radius:11px;
          padding:11px 24px; font-family:'Poppins',sans-serif;
          font-size:14px; font-weight:800; cursor:pointer;
          box-shadow:0 4px 18px rgba(0,0,0,0.18);
          transition:transform 0.2s, box-shadow 0.2s;
        }
        .hero-cta:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,0,0,0.22); }
        .hero-right { position:relative; z-index:1; display:flex; flex-direction:column; gap:10px; min-width:190px; }
        .hero-badge {
          background:rgba(255,255,255,0.13); border:1px solid rgba(255,255,255,0.22);
          border-radius:14px; padding:12px 16px;
          display:flex; align-items:center; gap:12px;
          transition:background 0.2s;
        }
        .hero-badge:hover { background:rgba(255,255,255,0.2); }
        .hb-icon { font-size:22px; }
        .hb-label { font-size:10.5px; color:rgba(255,255,255,0.65); margin-bottom:1px; }
        .hb-val { font-family:'Poppins',sans-serif; font-size:18px; font-weight:800; color:#fff; }

        /* ── STATS ROW ── */
        .stats-row {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:14px; margin-bottom:22px;
          animation:fadeUp 0.55s ease 0.08s both;
        }
        .stat-card {
          background:#fff; border-radius:16px; padding:18px 20px;
          border:1.5px solid var(--border);
          transition:transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover { transform:translateY(-3px); border-color:var(--red); box-shadow:0 8px 24px rgba(192,57,43,0.1); }
        .sc-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
        .sc-icon { width:40px; height:40px; border-radius:10px; background:var(--red-light); display:flex; align-items:center; justify-content:center; font-size:18px; }
        .sc-badge { font-size:10.5px; color:var(--red); font-weight:700; background:var(--red-light); padding:2px 8px; border-radius:99px; }
        .sc-val { font-family:'Poppins',sans-serif; font-size:2rem; font-weight:800; color:var(--text); line-height:1; }
        .sc-lbl { font-size:12.5px; color:var(--muted); margin-top:3px; font-weight:600; }

        /* ── BOTTOM GRID ── */
        .bottom-grid {
          display:grid; grid-template-columns:1fr 310px;
          gap:20px; animation:fadeUp 0.55s ease 0.16s both;
        }

        /* ── COURSES SECTION ── */
        .sec-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .sec-title { font-family:'Poppins',sans-serif; font-size:1.05rem; font-weight:800; color:var(--text); display:flex; align-items:center; gap:8px; }
        .sec-title .om-accent { font-family:'Yatra One',serif; color:var(--red); font-size:1.1rem; }
        .see-all { font-size:13px; color:var(--red); font-weight:700; cursor:pointer; text-decoration:none; }
        .see-all:hover { text-decoration:underline; }

        .tabs-row { display:flex; gap:5px; margin-bottom:16px; background:#f5e8e8; border-radius:10px; padding:4px; width:fit-content; }
        .tab-btn { padding:7px 16px; border-radius:7px; border:none; background:transparent; color:#a05050; font-family:'Nunito',sans-serif; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.18s; }
        .tab-btn.active { background:#fff; color:var(--red-dark); box-shadow:0 1px 5px rgba(192,57,43,0.15); }
        .tab-btn:not(.active):hover { color:var(--text); }

        .courses-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:16px; }

        /* COURSE CARD */
        .c-card {
          background:#fff; border-radius:18px; border:1.5px solid var(--border);
          overflow:hidden; transition:transform 0.22s, box-shadow 0.22s, border-color 0.22s;
          cursor:pointer;
        }
        .c-card:hover { transform:translateY(-5px); box-shadow:0 18px 44px rgba(192,57,43,0.12); border-color:var(--red-soft); }
        .c-thumb {
          height:134px; padding:18px 18px 0;
          display:flex; align-items:flex-start; justify-content:space-between;
          position:relative; overflow:hidden;
        }
        .c-thumb-icon { font-size:38px; z-index:1; }
        /* watermark OM on card thumb */
        .c-thumb-om {
          position:absolute; bottom:-10px; right:12px;
          font-family:'Yatra One',serif; font-size:64px;
          color:rgba(255,255,255,0.15); z-index:0; line-height:1;
          pointer-events:none;
        }
        .c-circle { position:absolute; bottom:-28px; right:-28px; width:110px; height:110px; border-radius:50%; background:rgba(255,255,255,0.12); }
        .c-tag { background:rgba(255,255,255,0.22); border:1px solid rgba(255,255,255,0.35); color:#fff; font-size:10.5px; font-weight:800; padding:3px 10px; border-radius:99px; z-index:1; height:fit-content; letter-spacing:0.3px; }
        .c-body { padding:15px 17px 17px; }
        .c-title { font-family:'Poppins',sans-serif; font-size:15px; font-weight:700; color:var(--text); margin-bottom:4px; }
        .c-desc { font-size:12.5px; color:var(--muted); margin-bottom:12px; line-height:1.5; }
        .c-meta { display:flex; gap:12px; margin-bottom:12px; flex-wrap:wrap; }
        .c-meta-i { display:flex; align-items:center; gap:4px; font-size:12px; color:var(--muted); }
        .c-stars { color:#f59e0b; font-size:12px; }
        .prog-hdr { display:flex; justify-content:space-between; font-size:11.5px; color:var(--muted); font-weight:600; margin-bottom:5px; }
        .prog-hdr span:last-child { color:var(--red-dark); font-weight:800; }
        .prog-bar { height:5px; background:var(--red-soft); border-radius:99px; overflow:hidden; margin-bottom:13px; }
        .prog-fill { height:100%; border-radius:99px; transition:width 0.9s ease; }
        .c-btn { width:100%; padding:10px; border-radius:10px; border:none; font-family:'Poppins',sans-serif; font-size:13.5px; font-weight:700; cursor:pointer; color:#fff; transition:opacity 0.18s, transform 0.15s; }
        .c-btn:hover { opacity:0.86; transform:scale(0.98); }

        /* ── RIGHT PANEL ── */
        .right-panel { display:flex; flex-direction:column; gap:16px; }
        .panel { background:#fff; border-radius:18px; border:1.5px solid var(--border); padding:18px 20px; }
        .panel-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .panel-title { font-family:'Poppins',sans-serif; font-size:14px; font-weight:800; color:var(--text); display:flex; align-items:center; gap:6px; }

        /* LEADERBOARD */
        .lb-row { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:10px; margin-bottom:3px; transition:background 0.15s; cursor:default; }
        .lb-row:hover { background:var(--off-white); }
        .lb-row.you { background:var(--red-light); border:1.5px solid var(--red-soft); }
        .lb-rank { font-family:'Poppins',sans-serif; font-size:13px; font-weight:800; width:22px; text-align:center; }
        .lb-av { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:800; color:#fff; flex-shrink:0; background:linear-gradient(135deg,var(--red-dark),var(--red-mid)); }
        .lb-name { font-size:13px; font-weight:700; color:var(--text); flex:1; }
        .lb-xp { font-size:12px; font-weight:700; color:var(--red); }

        /* ACHIEVEMENTS */
        .ach-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        .ach-card { border-radius:11px; padding:10px 12px; text-align:center; border:1.5px solid var(--border); transition:transform 0.18s, border-color 0.18s; cursor:default; }
        .ach-card:hover { transform:scale(1.04); }
        .ach-card.done { border-color:var(--red-soft); background:var(--red-light); }
        .ach-card.locked { opacity:0.38; filter:grayscale(1); }
        .ach-icon { font-size:20px; margin-bottom:4px; }
        .ach-ttl { font-size:11px; font-weight:700; color:var(--text); }
        .ach-dsc { font-size:10px; color:var(--muted); margin-top:2px; line-height:1.3; }

        /* DAILY GOAL */
        .goal-meta { display:flex; justify-content:space-between; font-size:12px; color:var(--muted); margin-top:7px; font-weight:600; }

        /* BRAND FOOTER STRIP on panel */
        .brand-strip {
          background:linear-gradient(135deg, var(--red-dark), var(--red));
          border-radius:14px; padding:14px 18px;
          display:flex; align-items:center; gap:12px;
          box-shadow:0 4px 16px rgba(192,57,43,0.2);
        }
        .bs-om { font-family:'Yatra One',serif; font-size:32px; color:rgba(255,255,255,0.9); line-height:1; }
        .bs-name { font-family:'Poppins',sans-serif; font-size:12px; font-weight:800; color:#fff; line-height:1.3; }
        .bs-tag { font-size:10px; color:rgba(255,255,255,0.72); font-style:italic; font-weight:500; margin-top:2px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="lms">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-logo-wrap">
            <div className="sb-om">ॐ</div>
            <div className="sb-logo-txt">GURUKRUPA</div>
          </div>
          {navItems.map((s,i) => (
            <div key={i} className={`sb-item${s.active?' active':''}`} data-tip={s.label}>{s.icon}</div>
          ))}
          <div className="sb-divider" />
          <div className="sb-bottom">
            <div className="sb-item" data-tip="Settings">⚙️</div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main-wrap">

          {/* TOPNAV */}
          <header className="topnav">
            <div className="tn-brand">
              <div className="tn-om">ॐ</div>
              <div className="tn-texts">
                <div className="tn-name">GURUKRUPA PLACEMENT & EDUCATION SOLUTIONS PVT LTD</div>
                <div className="tn-tagline">An International Brand · For Serving The People & By The People</div>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div className="search-box">
                <span style={{ fontSize:14, color:'#c0908e' }}>🔍</span>
                <input placeholder="Search courses..." />
              </div>
              <div className="tn-right">
                <div className="notif-btn">🔔<div className="notif-dot"/></div>
                {user && (
                  <div className="user-chip">
                    <div className="u-av">{user.name?.charAt(0)?.toUpperCase()}</div>
                    <span className="u-name">{user.name?.split(" ")[0]}</span>
                  </div>
                )}
                <button className="logout-btn" onClick={() => { localStorage.removeItem("user"); window.location.href="/"; }}>Logout</button>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="content">

            {/* HERO */}
            <div className="hero">
              <div className="hero-left">
                <div className="hero-pill">🔥&nbsp; 12-day streak — keep it up!</div>
                <h1 className="hero-title">
                  <span className="light">{greeting}, </span><br />
                  {user?.name?.split(" ")[0] || "Learner"} 👋<br />
                  <span className="light" style={{ fontSize:'1.1rem', fontWeight:500 }}>Welcome to Gurukrupa!</span>
                </h1>
                <p className="hero-sub">You've completed <strong>37 hours</strong> this month.<br />You're in the top 20% of all enrolled students!</p>
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

            {/* STATS */}
            <div className="stats-row">
              {stats.map((s,i) => (
                <div className="stat-card" key={i}>
                  <div className="sc-top">
                    <div className="sc-icon">{s.icon}</div>
                    <div className="sc-badge">↑ Active</div>
                  </div>
                  <div className="sc-val">{s.value}</div>
                  <div className="sc-lbl">{s.label}</div>
                </div>
              ))}
            </div>

            {/* BOTTOM GRID */}
            <div className="bottom-grid">

              {/* COURSES */}
              <div>
                <div className="sec-hdr">
                  <div className="sec-title"><span className="om-accent">ॐ</span> My Courses</div>
                  <a className="see-all">Browse all →</a>
                </div>
                <div className="tabs-row">
                  {['All','In Progress','Completed','Saved'].map(t => (
                    <button key={t} className={`tab-btn${activeTab===t?' active':''}`} onClick={() => setActiveTab(t)}>{t}</button>
                  ))}
                </div>
                <div className="courses-grid">
                  {courses.map(c => (
                    <div className="c-card" key={c.id}>
                      <div className="c-thumb" style={{ background:c.gradient }}>
                        <div className="c-thumb-icon">{c.icon}</div>
                        <div className="c-tag">{c.tag}</div>
                        <div className="c-thumb-om">ॐ</div>
                        <div className="c-circle"/>
                      </div>
                      <div className="c-body">
                        <div className="c-title">{c.title}</div>
                        <div className="c-desc">{c.desc}</div>
                        <div className="c-meta">
                          <div className="c-meta-i"><span className="c-stars">★</span><span style={{ color:' var(--text)', fontWeight:700 }}>{c.rating}</span></div>
                          <div className="c-meta-i">📖 {c.lessons} lessons</div>
                          <div className="c-meta-i">⏱ {c.duration}</div>
                        </div>
                        <div className="prog-hdr"><span>Progress</span><span>{c.progress}%</span></div>
                        <div className="prog-bar"><div className="prog-fill" style={{ width:`${c.progress}%`, background:c.gradient }}/></div>
                        <button className="c-btn" style={{ background:c.gradient }}>
                          {c.progress > 0 ? '▶  Continue' : '🚀  Start Course'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="right-panel">

                {/* Brand strip */}
                <div className="brand-strip">
                  <div className="bs-om">ॐ</div>
                  <div>
                    <div className="bs-name">GURUKRUPA PLACEMENT &amp;<br />EDUCATION SOLUTIONS</div>
                    <div className="bs-tag">An International Brand · For The People</div>
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="panel">
                  <div className="panel-hdr">
                    <div className="panel-title">🏆 Weekly Leaderboard</div>
                    <a className="see-all">Full →</a>
                  </div>
                  {leaderboard.map((p,i) => (
                    <div key={i} className={`lb-row${p.isYou?' you':''}`}>
                      <div className="lb-rank" style={{ color: i===0?'#d4a017':i===1?'#94a3b8':i===2?'#cd7c2f':'#c0908e' }}>
                        {i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${p.rank}`}
                      </div>
                      <div className="lb-av">{p.av}</div>
                      <div className="lb-name">{p.isYou?`${p.name} (You)`:p.name}</div>
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
                    {achievements.map((a,i) => (
                      <div key={i} className={`ach-card ${a.done?'done':'locked'}`}>
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
                    <span style={{ fontSize:12, color:'var(--red)', fontWeight:800, background:'var(--red-light)', padding:'2px 8px', borderRadius:99 }}>72% done</span>
                  </div>
                  <div style={{ fontSize:13, color:'var(--muted)', lineHeight:1.55 }}>Complete <strong style={{ color:'var(--text)' }}>30 min</strong> of learning today</div>
                  <div style={{ marginTop:10 }}>
                    <div className="prog-bar" style={{ height:8 }}>
                      <div className="prog-fill" style={{ width:'72%', background:'linear-gradient(90deg, var(--red-dark), var(--red-mid))' }}/>
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