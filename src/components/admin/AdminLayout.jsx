import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logoImg from '../../assets/logo.png'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/podcasts', label: 'Podcasts', icon: '🎙️' },
  { to: '/admin/blogs', label: 'Blog Posts', icon: '📝' },
  { to: '/admin/guests', label: 'Guest Applications', icon: '👥' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0A0A0A' }}>
      {/* Sidebar */}
      <aside style={{
        width:260, background:'#0D0D0D', borderRight:'1px solid rgba(255,255,255,0.06)',
        display:'flex', flexDirection:'column', position:'fixed', top:0, left:0, bottom:0, zIndex:100,
        overflowY:'auto',
      }}>
        {/* Logo */}
        <div style={{ padding:'24px 20px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <img src={logoImg} alt="Relentless" style={{ height:44, display:'block', filter:'drop-shadow(0 0 8px rgba(227,27,35,0.3))' }} />
          <p style={{ color:'#555', fontSize:'0.72rem', fontFamily:'Barlow Condensed', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:6 }}>Admin Panel</p>
        </div>

        {/* Nav */}
        <nav style={{ padding:'16px 12px', flex:1 }}>
          {navItems.map(item => (
            <NavLink
              key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `admin-sidebar-item ${isActive ? 'active' : ''}`}
            >
              <span style={{ fontSize:'1rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User info & logout */}
        <div style={{ padding:'16px 20px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg, #E31B23, #A00D15)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bebas Neue', fontSize:'1rem', flexShrink:0 }}>
              {user?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <div style={{ fontFamily:'Barlow', fontWeight:600, fontSize:'0.875rem', color:'#ddd' }}>{user?.username}</div>
              <div style={{ fontFamily:'Barlow', fontSize:'0.72rem', color:'#555', textTransform:'uppercase', letterSpacing:'0.06em' }}>Admin</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
            color:'#888', padding:'9px 16px', fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.82rem',
            letterSpacing:'0.06em', textTransform:'uppercase', cursor:'pointer', borderRadius:4, transition:'all 0.3s',
            display:'flex', alignItems:'center', gap:8,
          }}
          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(227,27,35,0.1)'; e.currentTarget.style.color='#E31B23'; e.currentTarget.style.borderColor='rgba(227,27,35,0.3)' }}
          onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='#888'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)' }}
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, marginLeft:260, minWidth:0 }}>
        <Outlet />
      </main>

      <style>{`
        @media(max-width:900px) {
          aside { transform: translateX(-100%); }
          main { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  )
}
