// ===== JOBS PAGE =====
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Sidebar } from './Dashboard'

const API_BASE = 'https://lxtlrfodx7.execute-api.ap-south-1.amazonaws.com/prod'

function demoJobs() {
  return [
    { jobId: 'j1', title: 'Data Entry Operator', employer: 'Nagpur Data Services Pvt Ltd', district: 'Nagpur', state: 'Maharashtra', salary_min: 8000, salary_max: 12000, skills_required: ['MS Excel', 'Typing', 'Computer'], distance_km: 15, match_percentage: 94, type: 'Private', posted_days_ago: 2, openings: 3 },
    { jobId: 'j2', title: 'Computer Operator', employer: 'District Government Office', district: 'Nagpur', state: 'Maharashtra', salary_min: 12000, salary_max: 18000, skills_required: ['MS Office', 'Typing', 'Data Entry'], distance_km: 5, match_percentage: 91, type: 'Government', posted_days_ago: 1, openings: 1 },
    { jobId: 'j3', title: 'Tally Accountant', employer: 'Sharma & Sons Trading Co.', district: 'Pune', state: 'Maharashtra', salary_min: 10000, salary_max: 15000, skills_required: ['Tally', 'MS Excel', 'Accounting'], distance_km: 8, match_percentage: 87, type: 'Private', posted_days_ago: 3, openings: 2 },
    { jobId: 'j4', title: 'Digital Marketing Executive', employer: 'LocalBiz Solutions', district: 'Nashik', state: 'Maharashtra', salary_min: 9000, salary_max: 14000, skills_required: ['Social Media', 'Computer', 'Communication'], distance_km: 22, match_percentage: 79, type: 'Private', posted_days_ago: 4, openings: 1 },
    { jobId: 'j5', title: 'Customer Support Executive', employer: 'TechHelp India', district: 'Aurangabad', state: 'Maharashtra', salary_min: 8500, salary_max: 11000, skills_required: ['Communication', 'Computer', 'Hindi/English'], distance_km: 35, match_percentage: 72, type: 'Private', posted_days_ago: 5, openings: 4 },
  ]
}

export function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('skillProfile') || '{}')

  useEffect(() => { fetchJobs() }, [])

  const fetchJobs = async () => {
    try {
      const res = await axios.post(`${API_BASE}/jobs`, { userId: localStorage.getItem('userId'), skills: profile.current_skills || [], district: profile.location || 'Maharashtra' }, { timeout: 8000 })
      setJobs(res.data.jobs?.length ? res.data.jobs : demoJobs())
    } catch { setJobs(demoJobs()) }
    setLoading(false)
  }

  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.type === filter)

  if (loading) return (
    <div className="app-shell">
      <Sidebar active="jobs" />
      <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontWeight: 700 }}>Finding Jobs Near You...</h3>
          <p style={{ color: '#8B949E', fontSize: 14, marginTop: 6 }}>Matching your skills to local opportunities</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="app-shell">
      <Sidebar active="jobs" />
      <div className="main-content">

        <div style={{ padding: '32px 36px 0', marginBottom: 24 }}>
          <span className="badge badge-blue" style={{ marginBottom: 8, display: 'inline-block' }}>💼 Job Board</span>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginBottom: 4 }}>Matched Opportunities</h1>
          <p style={{ color: '#8B949E', fontSize: 14 }}>Jobs within 50km matching your skills • Updated daily</p>

          {/* Filters + stats */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['all', 'All Jobs'], ['Government', '🏛️ Government'], ['Private', '🏢 Private']].map(([val, label]) => (
                <button key={val} onClick={() => setFilter(val)}
                  style={{ padding: '7px 16px', borderRadius: 10, border: `1px solid ${filter === val ? '#F0A500' : 'rgba(255,255,255,0.06)'}`, background: filter === val ? 'rgba(240,165,0,0.1)' : '#0D1117', color: filter === val ? '#F0A500' : '#8B949E', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 12, transition: 'all 0.2s' }}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-green">✅ {jobs.length} Matches Found</span>
              <span className="badge badge-teal">📍 Within 50km</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 36px 36px' }}>
          {/* Skill profile banner */}
          {profile.recommended_path && (
            <div style={{ background: 'rgba(108,142,245,0.06)', border: '1px solid rgba(108,142,245,0.15)', borderRadius: 14, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>🎯</span>
              <div>
                <span style={{ fontSize: 13, color: '#8B949E' }}>Matching for: </span>
                <span style={{ fontWeight: 600, color: '#6C8EF5', fontSize: 13 }}>{profile.recommended_path}</span>
                <span style={{ fontSize: 13, color: '#8B949E' }}> &nbsp;•&nbsp; {profile.location}</span>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => navigate('/assessment')}>Retake Assessment →</button>
            </div>
          )}

          {filtered.map((job, i) => (
            <div key={job.jobId} className={`job-card ${selected === i ? 'expanded' : ''}`} style={{ marginBottom: 12 }}
              onClick={() => setSelected(selected === i ? null : i)}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

                {/* Match % */}
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: job.match_percentage >= 90 ? 'rgba(0,217,163,0.1)' : job.match_percentage >= 80 ? 'rgba(240,165,0,0.1)' : 'rgba(108,142,245,0.1)', border: `2px solid ${job.match_percentage >= 90 ? '#00D9A3' : job.match_percentage >= 80 ? '#F0A500' : '#6C8EF5'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: job.match_percentage >= 90 ? '#00D9A3' : job.match_percentage >= 80 ? '#F0A500' : '#6C8EF5', flexShrink: 0 }}>
                  {job.match_percentage}%
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{job.title}</h3>
                      <p style={{ color: '#8B949E', fontSize: 13 }}>{job.employer}</p>
                    </div>
                    <span className={`badge ${job.type === 'Government' ? 'badge-blue' : 'badge-teal'}`}>
                      {job.type === 'Government' ? '🏛️ Govt' : '🏢 Private'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                    <span className="badge badge-gold">📍 {job.district}, {job.state}</span>
                    <span className="badge badge-green">💰 ₹{job.salary_min?.toLocaleString()}–{job.salary_max?.toLocaleString()}/mo</span>
                    <span className="badge badge-blue">🚗 {job.distance_km}km</span>
                    <span className="badge badge-teal">👥 {job.openings} opening{job.openings > 1 ? 's' : ''}</span>
                    <span style={{ fontSize: 11, color: '#484F58' }}>Posted {job.posted_days_ago}d ago</span>
                  </div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {(job.skills_required || []).map((s, j) => (
                      <span key={j} style={{ background: '#161B22', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '2px 10px', fontSize: 11, color: '#8B949E' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {selected === i && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ color: '#8B949E', fontSize: 13, marginBottom: 14 }}>
                    💡 Complete your Skill Passport to increase your chances by 3x. Employers trust verified digital credentials.
                  </p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-primary btn-sm">✋ Express Interest</button>
                    <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); navigate('/passport') }}>🪪 View My Passport</button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button className="btn btn-primary" onClick={() => navigate('/passport')} style={{ flex: 1, padding: 14 }}>🪪 Build Skill Passport</button>
            <button className="btn btn-ghost" onClick={() => navigate('/roadmap')} style={{ flex: 1, padding: 14 }}>📚 Back to Roadmap</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs