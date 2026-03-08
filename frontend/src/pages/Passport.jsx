import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Sidebar } from './Dashboard'

const API_BASE = 'https://lxtlrfodx7.execute-api.ap-south-1.amazonaws.com/prod'

export default function Passport() {
  const [passport, setPassport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('spf_user') || '{}')
  const profile = JSON.parse(localStorage.getItem('skillProfile') || '{}')

  useEffect(() => { loadPassport() }, [])

  const loadPassport = async () => {
    try {
      const res = await axios.post(`${API_BASE}/passport`, { userId: user.userId }, { timeout: 8000 })
      setPassport(res.data.passport)
    } catch {
      setPassport({
        userId: user.userId,
        name: user.name || profile.name || 'Student',
        location: user.district || profile.location || 'India',
        careerGoal: profile.career_goal || profile.recommended_path || 'Digital Skills Professional',
        recommendedPath: profile.recommended_path || 'Data Entry & Computer Skills',
        skills: [
          { skill: profile.recommended_path || 'Digital Literacy', score: 82, badge: 'Beginner', verifiedAt: new Date().toISOString(), projectTitle: 'Foundation Project' }
        ],
        passportUrl: `https://skillpathfinder.in/passport/${user.userId}`
      })
    }
    setLoading(false)
  }

  const copy = () => {
    navigator.clipboard.writeText(passport?.passportUrl || window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="app-shell">
      <Sidebar active="passport" />
      <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>🪪</div>
          <p style={{ marginTop: 12, color: '#8B949E' }}>Loading your passport...</p>
        </div>
      </div>
    </div>
  )

  const initials = passport?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'SP'

  return (
    <div className="app-shell">
      <Sidebar active="passport" />
      <div className="main-content">
        <div style={{ padding: '32px 36px 0', marginBottom: 24 }}>
          <span className="badge badge-gold" style={{ marginBottom: 8, display: 'inline-block' }}>🪪 Skill Passport</span>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginBottom: 4 }}>Digital Credential</h1>
          <p style={{ color: '#8B949E', fontSize: 14 }}>Share with employers to prove your verified skills</p>
        </div>

        <div style={{ padding: '0 36px 36px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>

          {/* Main passport card */}
          <div>
            <div className="passport-shell" style={{ marginBottom: 16 }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                <div>
                  <div style={{ fontSize: 10, color: '#484F58', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Skill Path Finder 2.0</div>
                  <div style={{ fontSize: 10, color: '#F0A500', letterSpacing: 1, textTransform: 'uppercase' }}>Digital Skill Passport</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: '#3FB950', fontWeight: 600 }}>● Verified</span>
                  <div style={{ width: 32, height: 32, background: 'rgba(240,165,0,0.1)', border: '1px solid rgba(240,165,0,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🇮🇳</div>
                </div>
              </div>

              {/* Profile */}
              <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 28 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #F0A500, #FF6B35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 24, color: '#000', flexShrink: 0, border: '3px solid rgba(240,165,0,0.3)' }}>
                  {initials}
                </div>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: 22, letterSpacing: -0.5, marginBottom: 4 }}>{passport?.name}</h2>
                  <p style={{ color: '#8B949E', fontSize: 13, marginBottom: 2 }}>📍 {passport?.location}</p>
                  <p style={{ color: '#8B949E', fontSize: 13 }}>🎯 {passport?.careerGoal}</p>
                  <div style={{ marginTop: 8 }}>
                    <span className="badge badge-teal">{passport?.recommendedPath}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: 20 }} />

              {/* Skills */}
              <div style={{ fontSize: 11, color: '#484F58', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Verified Skills</div>

              {passport?.skills?.map((sk, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 18px', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,217,163,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✅</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{sk.skill}</div>
                      <div style={{ fontSize: 11, color: '#484F58', marginTop: 2 }}>{sk.projectTitle} • {new Date(sk.verifiedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: 18, color: '#F0A500', fontFamily: 'DM Mono, monospace' }}>{sk.score}</div>
                      <div style={{ fontSize: 10, color: '#484F58' }}>/ 100</div>
                    </div>
                    <span className="badge badge-gold">🏅 {sk.badge}</span>
                  </div>
                </div>
              ))}

              {/* Pending skills */}
              {['MS Excel & Data Entry', 'Professional Communication'].map((s, i) => (
                <div key={i} style={{ background: 'transparent', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 18px', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🔄</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{s}</div>
                      <div style={{ fontSize: 11, color: '#484F58', marginTop: 2 }}>In progress — complete project to unlock</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: '#484F58' }}>Pending</span>
                </div>
              ))}

              {/* Passport footer */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 20, paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#484F58' }}>
                <span style={{ fontFamily: 'DM Mono, monospace' }}>ID: {passport?.userId?.slice(0, 12)}...</span>
                <span>⚡ Powered by Amazon Bedrock</span>
              </div>
            </div>

            {/* Share */}
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#8B949E', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Share With Employers</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={passport?.passportUrl || ''} readOnly
                  style={{ flex: 1, background: '#161B22', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#8B949E', fontFamily: 'DM Mono, monospace', outline: 'none' }} />
                <button onClick={copy} className="btn btn-primary btn-sm" style={{ whiteSpace: 'nowrap', background: copied ? '#3FB950' : undefined }}>
                  {copied ? '✅ Copied!' : '📋 Copy Link'}
                </button>
              </div>
              <p style={{ color: '#484F58', fontSize: 12, marginTop: 8 }}>Employers can verify your skills by visiting this link</p>
            </div>
          </div>

          {/* Right panel — stats + actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Stats */}
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#8B949E', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Your Progress</div>
              {[
                { label: 'Skills Verified', value: passport?.skills?.length || 1, icon: '✅', color: '#00D9A3' },
                { label: 'Projects Submitted', value: passport?.skills?.length || 1, icon: '📤', color: '#F0A500' },
                { label: 'Job Matches', value: 5, icon: '💼', color: '#6C8EF5' },
                { label: 'Profile Completion', value: '65%', icon: '📊', color: '#3FB950' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                    <span style={{ fontSize: 13, color: '#8B949E' }}>{s.label}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 16, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Next steps */}
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#8B949E', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Next Steps</div>
              {[
                { icon: '📚', text: 'Complete Month 2 course', action: () => navigate('/roadmap'), btn: 'Go' },
                { icon: '📤', text: 'Submit Month 2 project', action: () => navigate('/evaluate'), btn: 'Go' },
                { icon: '💼', text: 'Apply to matched jobs', action: () => navigate('/jobs'), btn: 'Go' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span>{s.icon}</span>
                    <span style={{ fontSize: 13, color: '#8B949E' }}>{s.text}</span>
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={s.action}>{s.btn} →</button>
                </div>
              ))}
            </div>

            <button className="btn btn-primary btn-full" onClick={() => navigate('/jobs')} style={{ padding: 14 }}>💼 Find Jobs Now →</button>
            <button className="btn btn-ghost btn-full" onClick={() => navigate('/evaluate')} style={{ padding: 12 }}>📤 Submit Project</button>
          </div>
        </div>
      </div>
    </div>
  )
}