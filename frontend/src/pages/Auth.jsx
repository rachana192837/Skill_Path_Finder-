import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LANGUAGES = [
  { code: 'hi', native: 'हिंदी', eng: 'Hindi' },
  { code: 'en', native: 'English', eng: 'English' },
  { code: 'mr', native: 'मराठी', eng: 'Marathi' },
  { code: 'ta', native: 'தமிழ்', eng: 'Tamil' },
  { code: 'te', native: 'తెలుగు', eng: 'Telugu' },
  { code: 'bn', native: 'বাংলা', eng: 'Bengali' },
  { code: 'gu', native: 'ગુજરાતી', eng: 'Gujarati' },
  { code: 'kn', native: 'ಕನ್ನಡ', eng: 'Kannada' },
  { code: 'ml', native: 'മലയാളം', eng: 'Malayalam' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', eng: 'Punjabi' },
]

const UI_TEXT = {
  hi: { welcome: 'नमस्ते! 👋', sub: 'अपना करियर बदलें, आज से शुरू करें', login: 'लॉग इन करें', register: 'नया अकाउंट बनाएं', name: 'पूरा नाम', email: 'ईमेल', password: 'पासवर्ड', district: 'जिला', langLabel: 'अपनी भाषा चुनें', loginBtn: 'लॉग इन', registerBtn: 'अकाउंट बनाएं', switchLogin: 'पहले से अकाउंट है?', switchReg: 'नया अकाउंट बनाएं' },
  en: { welcome: 'Welcome! 👋', sub: 'Transform your career, start today', login: 'Login', register: 'Create Account', name: 'Full Name', email: 'Email', password: 'Password', district: 'District', langLabel: 'Choose your language', loginBtn: 'Login', registerBtn: 'Create Account', switchLogin: 'Already have an account?', switchReg: 'Create new account' },
}

const getT = (lang) => UI_TEXT[lang] || UI_TEXT.en

export default function Auth() {
  const [mode, setMode] = useState('register')
  const [lang, setLang] = useState('hi')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', district: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const t = getT(lang)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Please fill all fields'); return }
    if (mode === 'register' && !form.name) { setError('Please enter your name'); return }
    setLoading(true)

    await new Promise(r => setTimeout(r, 1000))

    const userId = crypto.randomUUID()
    const sessionId = crypto.randomUUID()
    const userData = {
      userId,
      sessionId,
      name: form.name || form.email.split('@')[0],
      email: form.email,
      district: form.district || 'Maharashtra',
      language: lang,
      createdAt: new Date().toISOString()
    }

    localStorage.setItem('spf_user', JSON.stringify(userData))
    localStorage.setItem('userId', userId)
    localStorage.setItem('sessionId', sessionId)
    localStorage.setItem('language', lang)
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="auth-page" style={{ fontFamily: 'DM Sans, Noto Sans Devanagari, sans-serif' }}>

      {/* LEFT PANEL */}
      <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 64 }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #F0A500, #FF6B35)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎯</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#E6EDF3' }}>Skill Path <span style={{ color: '#F0A500' }}>Finder</span></div>
              <div style={{ fontSize: 11, color: '#484F58' }}>AI for Bharat • AWS Hackathon</div>
            </div>
          </div>

          {/* Hero text */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, color: '#F0A500', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>AI-Powered Career Platform</div>
            <h1 style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.2, color: '#E6EDF3', letterSpacing: -1, marginBottom: 16 }}>
              Your career,<br />
              <span style={{ color: '#F0A500' }}>reimagined.</span>
            </h1>
            <p style={{ fontSize: 16, color: '#8B949E', lineHeight: 1.7, maxWidth: 400 }}>
              AI-powered skill assessment, personalized learning roadmaps, and local job matching — all in your language.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
            {[
              { n: '60%', l: 'Employment Rate' },
              { n: '₹5K+', l: 'Avg Income Boost' },
              { n: '10+', l: 'Indian Languages' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 14px' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#F0A500' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: '#8B949E', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '🤖', text: 'Conversational AI skill assessment in your language' },
              { icon: '📚', text: 'Free SWAYAM & PMGDISHA learning roadmaps' },
              { icon: '💼', text: 'District-level job matching within 50km' },
              { icon: '🪪', text: 'Employer-verified digital skill passport' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#8B949E', fontSize: 13 }}>
                <span style={{ fontSize: 16 }}>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>

          {/* AWS badge */}
          <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00D9A3', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, color: '#484F58' }}>Powered by Amazon Bedrock + AWS Lambda</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-form">

          {/* Mode toggle */}
          <div style={{ display: 'flex', background: '#0D1117', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 4, marginBottom: 32 }}>
            {['register', 'login'].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={mode === m ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{ flex: 1, border: 'none', borderRadius: 9 }}>
                {m === 'register' ? '✨ Register' : '→ Login'}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6, color: '#E6EDF3' }}>{t.welcome}</h2>
          <p style={{ fontSize: 14, color: '#8B949E', marginBottom: 28 }}>{t.sub}</p>

          {/* Language Selection */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: '#8B949E', fontWeight: 500, marginBottom: 10 }}>{t.langLabel}</div>
            <div className="lang-grid">
              {LANGUAGES.map(l => (
                <button key={l.code} className={`lang-btn ${lang === l.code ? 'selected' : ''}`} onClick={() => setLang(l.code)}>
                  <span className="lang-native">{l.native}</span>
                  <span className="lang-eng">{l.eng}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'register' && (
              <div className="input-wrap">
                <label className="input-label">{t.name}</label>
                <input className="input" type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Priya Sharma" />
              </div>
            )}

            <div className="input-wrap">
              <label className="input-label">{t.email}</label>
              <input className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="priya@example.com" />
            </div>

            <div className="input-wrap">
              <label className="input-label">{t.password}</label>
              <input className="input" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            </div>

            {mode === 'register' && (
              <div className="input-wrap">
                <label className="input-label">{t.district} & State</label>
                <input className="input" type="text" value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} placeholder="Nagpur, Maharashtra" />
              </div>
            )}

            {error && (
              <div style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.2)', borderRadius: 10, padding: '10px 14px', color: '#F85149', fontSize: 13 }}>
                ⚠️ {error}
              </div>
            )}

            <button type="submit" className={`btn btn-primary btn-lg btn-full hover-lift ${loading ? 'btn-loading' : ''}`} disabled={loading} style={{ marginTop: 8 }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="spinner" /> Please wait...
                </span>
              ) : (mode === 'register' ? `🚀 ${t.registerBtn}` : `→ ${t.loginBtn}`)}
            </button>
          </form>

          <div className="divider">or</div>

          <button className="btn btn-ghost btn-full" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? t.switchReg : t.switchLogin}
          </button>

          <p style={{ textAlign: 'center', fontSize: 11, color: '#484F58', marginTop: 24 }}>
            By continuing, you agree to our Terms of Service.<br />
            Your data is encrypted and never shared.
          </p>
        </div>
      </div>
    </div>
  )
}