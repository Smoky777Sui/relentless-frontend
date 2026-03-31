import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPodcasts, getBlogs, getGuests } from '../../services/api'

const StatCard = ({ label, value, icon, color='#E31B23', link }) => (
  <Link to={link} style={{ textDecoration:'none' }}>
    <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'24px 28px', transition:'all 0.3s', cursor:'pointer' }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(227,27,35,0.3)'; e.currentTarget.style.transform='translateY(-3px)' }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.transform='none' }}
    >
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <p style={{ color:'#666', fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.78rem', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8 }}>{label}</p>
          <p style={{ fontFamily:'Bebas Neue', fontSize:'3rem', lineHeight:1, color: color }}>{value}</p>
        </div>
        <div style={{ fontSize:'2rem', opacity:0.6 }}>{icon}</div>
      </div>
    </div>
  </Link>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState({ podcasts:0, blogs:0, guests:0, pendingGuests:0 })
  const [recentGuests, setRecentGuests] = useState([])
  const [recentPodcasts, setRecentPodcasts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getPodcasts(), getBlogs(), getGuests()]).then(([p, b, g]) => {
      setStats({ podcasts: p.length, blogs: b.length, guests: g.length, pendingGuests: g.filter(x=>x.status==='pending').length })
      setRecentGuests(g.slice(0, 5))
      setRecentPodcasts(p.slice(0, 4))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ padding:'32px 36px', minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ marginBottom:40 }}>
        <h1 style={{ fontFamily:'Bebas Neue', fontSize:'2.5rem', letterSpacing:'0.04em', marginBottom:6 }}>
          DASHBOARD
        </h1>
        <p style={{ color:'#666', fontFamily:'Barlow', fontSize:'0.95rem' }}>
          Overview of your podcast content and submissions
        </p>
        <div style={{ width:50, height:3, background:'#E31B23', marginTop:12 }} />
      </div>

      {loading ? (
        <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
          <div style={{ width:40, height:40, border:'3px solid #E31B23', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
        </div>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:20, marginBottom:40 }}>
            <StatCard label="Total Episodes" value={stats.podcasts} icon="🎙️" link="/admin/podcasts" />
            <StatCard label="Blog Posts" value={stats.blogs} icon="📝" link="/admin/blogs" />
            <StatCard label="Guest Applications" value={stats.guests} icon="👥" link="/admin/guests" />
            <StatCard label="Pending Review" value={stats.pendingGuests} icon="⏳" color="#EAB308" link="/admin/guests" />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28 }}>
            {/* Recent Podcasts */}
            <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'24px 28px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
                <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.1rem', letterSpacing:'0.04em' }}>Recent Episodes</h2>
                <Link to="/admin/podcasts" style={{ color:'#E31B23', textDecoration:'none', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Manage →</Link>
              </div>
              {recentPodcasts.length === 0 ? (
                <p style={{ color:'#555', textAlign:'center', padding:'20px 0', fontFamily:'Barlow', fontSize:'0.875rem' }}>No episodes yet</p>
              ) : recentPodcasts.map(ep => (
                <div key={ep.id} style={{ display:'flex', gap:14, padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', alignItems:'center' }}>
                  <img src={ep.thumbnail} alt="" style={{ width:60, height:40, objectFit:'cover', borderRadius:4, flexShrink:0, background:'#222' }} onError={e=>e.target.style.display='none'} />
                  <div style={{ minWidth:0 }}>
                    <p style={{ fontFamily:'Barlow', fontWeight:600, fontSize:'0.875rem', color:'#ddd', marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{ep.title}</p>
                    <p style={{ color:'#555', fontSize:'0.78rem', fontFamily:'Barlow' }}>{ep.guest || 'No guest'} · {new Date(ep.publishedAt).toLocaleDateString()}</p>
                  </div>
                  {ep.featured && <span className="tag" style={{ marginLeft:'auto', flexShrink:0 }}>Featured</span>}
                </div>
              ))}
            </div>

            {/* Recent Applications */}
            <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'24px 28px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
                <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.1rem', letterSpacing:'0.04em' }}>Recent Applications</h2>
                <Link to="/admin/guests" style={{ color:'#E31B23', textDecoration:'none', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Manage →</Link>
              </div>
              {recentGuests.length === 0 ? (
                <p style={{ color:'#555', textAlign:'center', padding:'20px 0', fontFamily:'Barlow', fontSize:'0.875rem' }}>No applications yet</p>
              ) : recentGuests.map(g => (
                <div key={g.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg, #333, #444)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1rem', flexShrink:0, color:'#aaa' }}>
                    {g.contact?.fullName?.[0] || '?'}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontFamily:'Barlow', fontWeight:600, fontSize:'0.875rem', color:'#ddd', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{g.contact?.fullName}</p>
                    <p style={{ color:'#555', fontSize:'0.78rem', fontFamily:'Barlow' }}>{g.business?.businessName || 'N/A'} · {new Date(g.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`status-badge status-${g.status}`}>{g.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ marginTop:28, background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'24px 28px' }}>
            <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.1rem', letterSpacing:'0.04em', marginBottom:20 }}>Quick Actions</h2>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <Link to="/admin/podcasts" style={{ padding:'10px 20px', background:'rgba(227,27,35,0.1)', border:'1px solid rgba(227,27,35,0.2)', color:'#E31B23', textDecoration:'none', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.3s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(227,27,35,0.2)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(227,27,35,0.1)'}}
              >+ Add Episode</Link>
              <Link to="/admin/blogs" style={{ padding:'10px 20px', background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.2)', color:'#3B82F6', textDecoration:'none', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.3s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(59,130,246,0.2)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(59,130,246,0.1)'}}
              >+ New Blog Post</Link>
              <Link to="/admin/guests" style={{ padding:'10px 20px', background:'rgba(234,179,8,0.1)', border:'1px solid rgba(234,179,8,0.2)', color:'#EAB308', textDecoration:'none', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.3s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(234,179,8,0.2)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(234,179,8,0.1)'}}
              >Review Applications</Link>
              <a href="/" target="_blank" rel="noreferrer" style={{ padding:'10px 20px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#888', textDecoration:'none', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.3s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.color='#ddd'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='#888'}}
              >↗ View Website</a>
            </div>
          </div>
        </>
      )}
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
