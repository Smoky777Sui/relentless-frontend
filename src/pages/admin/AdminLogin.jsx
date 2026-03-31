import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import logoImg from '../../assets/logo.png'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(username, password)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch {
      toast.error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Admin Login | Relentless Podcast</title></Helmet>
      <div style={{
        minHeight:'100vh', background:'#0A0A0A', display:'flex', alignItems:'center', justifyContent:'center',
        padding:24, position:'relative', overflow:'hidden',
      }}>
        {/* Background */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(227,27,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(227,27,35,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translateX(-50%)', width:600, height:600, background:'radial-gradient(circle, rgba(227,27,35,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ width:'100%', maxWidth:420, position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <img src={logoImg} alt="Relentless" style={{ height:60, marginBottom:20, filter:'drop-shadow(0 0 12px rgba(227,27,35,0.4))' }} />
            <h1 style={{ fontFamily:'Bebas Neue', fontSize:'2.2rem', letterSpacing:'0.04em', marginBottom:6 }}>ADMIN <span style={{ color:'#E31B23' }}>PORTAL</span></h1>
            <p style={{ color:'#555', fontSize:'0.875rem', fontFamily:'Barlow' }}>Sign in to manage your podcast</p>
          </div>

          <form onSubmit={handleSubmit} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'36px 32px' }}>
            <div style={{ marginBottom:20 }}>
              <label className="form-label">Username or Email</label>
              <input type="text" className="form-input" placeholder="admin" value={username} onChange={e=>setUsername(e.target.value)} required autoComplete="username" />
            </div>
            <div style={{ marginBottom:28 }}>
              <label className="form-label">Password</label>
              <div style={{ position:'relative' }}>
                <input type={showPw ? 'text' : 'password'} className="form-input" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" style={{ paddingRight:48 }} />
                <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'#555', cursor:'pointer', fontSize:'1rem', padding:4 }}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} style={{
              width:'100%', background: loading ? '#555' : '#E31B23', color:'white', border:'none',
              padding:'14px 24px', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1rem',
              letterSpacing:'0.1em', textTransform:'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
              borderRadius:4, transition:'all 0.3s',
            }}>
              {loading ? 'Signing In...' : 'Sign In →'}
            </button>
          </form>

          <p style={{ textAlign:'center', color:'#333', fontSize:'0.78rem', marginTop:20, fontFamily:'Barlow' }}>
            Default: admin / Admin@Relentless2024!
          </p>
        </div>
      </div>
    </>
  )
}
