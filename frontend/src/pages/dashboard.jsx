import { useNavigate, useLocation } from 'react-router-dom'

const API_BASE = 'https://lxtlrfodx7.execute-api.ap-south-1.amazonaws.com/prod'

export function Sidebar({ active }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('spf_user') || '{}')

  const navItems = [
    { id: 'dashboard', icon: '⊞', label: 'Dashboard', path: '/' },
    { id: 'assessment', icon: '🤖', label: 'AI Assessment', path: '/assessment' },
    { id: 'roadmap', icon: '📚', label: 'My Roadmap', path: '/roadmap' },
    { id: 'jobs', icon: '💼', label: 'Job Board', path: '/jobs' },
    { id: 'passport', icon: '🪪', label: 'Skill Passport', path: '/passport' },
    { id: 'evaluate', icon: '📤', label: 'Submit Project', path: '/evaluate' },
  ]

  const logout = () => {
    localStorage.removeItem('spf_user')
    navigate('/auth')
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">🎯</div>
        <div className="logo-text">Skill<span>Path</span></div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Navigation</div>
        {navItems.map(item => (
          <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.path)}>
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ padding: '12px', marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: '#484F58', marginBottom: 8, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Powered by</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Amazon Bedrock', 'AWS Lambda', 'DynamoDB'].map(s => (
              <span key={s} style={{ background: 'rgba(240,165,0,0.08)', border: '1px solid rgba(240,165,0,0.15)', borderRadius: 6, padding: '2px 8px', fontSize: 10, color: '#F0A500', fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{user.name?.[0]?.toUpperCase() || 'U'}</div>
            <div className="user-info">
              <div className="user-name">{user.name || 'Student'}</div>
              <div className="user-role">{user.district || 'India'}</div>
            </div>
            <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#484F58', fontSize: 16, padding: 4 }} title="Logout">⎋</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('spf_user') || '{}')
  const skillProfile = JSON.parse(localStorage.getItem('skillProfile') || 'null')
  const lang = localStorage.getItem('language') || 'en'

  const greeting = lang === 'hi' ? `नमस्ते, ${user.name?.split(' ')[0] || 'Student'}! 👋` : `Hello, ${user.name?.split(' ')[0] || 'Student'}! 👋`
  const subtext = lang === 'hi' ? 'आज आप क्या सीखना चाहते हैं?' : "What would you like to work on today?"

  const features = [
    { id: 'assessment', icon: '🤖', label: 'AI Assessment', path: '/assessment', desc: lang === 'hi' ? 'Priya से बात करें, अपनी skills पहचानें' : 'Chat with Priya, discover your skills', color: '#F0A500', bg: 'rgba(240,165,0,0.08)' },
    { id: 'roadmap', icon: '📚', label: 'Learning Roadmap', path: '/roadmap', desc: lang === 'hi' ? 'Free govt courses से 3-month plan' : 'Personalized 3-month plan with free courses', color: '#00D9A3', bg: 'rgba(0,217,163,0.08)' },
    { id: 'jobs', icon: '💼', label: 'Job Board', path: '/jobs', desc: lang === 'hi' ? 'अपने जिले में नौकरियां खोजें' : 'Find jobs within 50km of your district', color: '#6C8EF5', bg: 'rgba(108,142,245,0.08)' },
    { id: 'passport', icon: '🪪', label: 'Skill Passport', path: '/passport', desc: lang === 'hi' ? 'Verified digital credential बनाएं' : 'Build your verified digital credential', color: '#F0A500', bg: 'rgba(240,165,0,0.08)' },
    { id: 'evaluate', icon: '📤', label: 'Submit Project', path: '/evaluate', desc: lang === 'hi' ? 'AI से project evaluate करवाएं' : 'Get your project evaluated by AI instantly', color: '#00D9A3', bg: 'rgba(0,217,163,0.08)' },
    { id: 'resources', icon: '🎓', label: 'Free Resources', path: '/roadmap', desc: lang === 'hi' ? 'SWAYAM, YouTube, PMGDISHA courses' : 'SWAYAM, YouTube & government resources', color: '#6C8EF5', bg: 'rgba(108,142,245,0.08)' },
  ]

  const stats = [
    { label: lang === 'hi' ? 'रोजगार दर' : 'Employment Rate', value: '60%', change: '↑ Target', color: '#F0A500' },
    { label: lang === 'hi' ? 'आय वृद्धि' : 'Income Boost', value: '₹5K+', change: '↑ Monthly avg', color: '#00D9A3' },
    { label: lang === 'hi' ? 'सरकारी कोर्स' : 'Free Courses', value: '500+', change: 'SWAYAM + more', color: '#6C8EF5' },
    { label: lang === 'hi' ? 'नौकरियां' : 'Job Listings', value: '2,400+', change: '↑ Updated daily', color: '#F85149' },
  ]

  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />
      <div className="main-content">

        {/* Hero header */}
        <div style={{ padding: '36px 36px 0', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="fade-up">
              <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, marginBottom: 6 }}>{greeting}</h1>
              <p style={{ color: '#8B949E', fontSize: 15 }}>{subtext}</p>
            </div>
            <div className="fade-up-1" style={{ display: 'flex', gap: 8 }}>
              <span style={{ background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.2)', borderRadius: 8, padding: '6px 14px', fontSize: 12, color: '#3FB950', fontWeight: 600 }}>
                ● Live on AWS
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ padding: '0 36px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 32 }}>
          {stats.map((s, i) => (
            <div key={i} className={`stat-card fade-up-${i % 3}`}>
              <div style={{ fontSize: 26, fontWeight: 700, color: s.color, letterSpacing: -1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#8B949E', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: s.color, marginTop: 8, opacity: 0.8 }}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Assessment status */}
        {!skillProfile ? (
          <div style={{ padding: '0 36px', marginBottom: 28 }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(240,165,0,0.08), rgba(240,165,0,0.03))', border: '1px solid rgba(240,165,0,0.2)', borderRadius: 20, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(240,165,0,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🤖</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                    {lang === 'hi' ? 'Skill Assessment शुरू करें' : 'Start your Skill Assessment'}
                  </div>
                  <div style={{ color: '#8B949E', fontSize: 13 }}>
                    {lang === 'hi' ? 'Priya आपकी skills समझकर personalized roadmap बनाएगी' : 'Priya will understand your skills and create a personalized roadmap'}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => navigate('/assessment')} style={{ whiteSpace: 'nowrap' }}>
                Start Now →
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '0 36px', marginBottom: 28 }}>
            <div style={{ background: 'rgba(63,185,80,0.05)', border: '1px solid rgba(63,185,80,0.15)', borderRadius: 20, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 32 }}>✅</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#3FB950' }}>Assessment Complete!</div>
                <div style={{ color: '#8B949E', fontSize: 13 }}>Path: {skillProfile.recommended_path} • {skillProfile.location}</div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => navigate('/roadmap')}>View Roadmap →</button>
            </div>
          </div>
        )}

        {/* Feature cards */}
        <div className="dashboard-grid">
          {features.map((f, i) => (
            <div key={f.id} className={`feature-card fade-up-${i % 3}`} onClick={() => navigate(f.path)}>
              <div className="feature-icon" style={{ background: f.bg }}>
                <span>{f.icon}</span>
              </div>
              <div className="feature-title">{f.label}</div>
              <div className="feature-desc">{f.desc}</div>
              <div style={{ marginTop: 16, fontSize: 12, color: f.color, fontWeight: 600 }}>Open →</div>
            </div>
          ))}
        </div>

        {/* Success stories */}
        <div style={{ padding: '0 36px 36px' }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
              {lang === 'hi' ? '🌟 Success Stories' : '🌟 Success Stories'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {[
                { name: 'Priya Sharma', loc: 'Nagpur, MH', income: '₹12,000/mo', skill: 'Data Entry', time: '3 months' },
                { name: 'Ravi Kumar', loc: 'Patna, Bihar', income: '₹9,500/mo', skill: 'Tally', time: '4 months' },
                { name: 'Anita Devi', loc: 'Jaipur, RJ', income: '₹8,000/mo', skill: 'Digital Marketing', time: '3 months' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${['#F0A500','#00D9A3','#6C8EF5'][i]}, #333)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{s.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: '#484F58' }}>📍 {s.loc}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#3FB950', marginBottom: 4 }}>{s.income}</div>
                  <div style={{ fontSize: 12, color: '#8B949E' }}>{s.skill} • {s.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}