import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPodcasts } from '../services/api'

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [playingId, setPlayingId] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getPodcasts().then(data => { setEpisodes(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = episodes.filter(ep =>
    ep.title?.toLowerCase().includes(search.toLowerCase()) ||
    ep.guest?.toLowerCase().includes(search.toLowerCase()) ||
    ep.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Helmet>
        <title>Episodes | The Relentless Podcast</title>
        <meta name="description" content="All episodes of The Relentless Podcast. Raw conversations with entrepreneurs on business growth, mindset, and building something that lasts." />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section style={{
        background:'linear-gradient(180deg, #0A0A0A 0%, #0F0505 50%, #0A0A0A 100%)',
        padding:'140px 24px 80px',
        position:'relative', overflow:'hidden'
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(227,27,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(227,27,35,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>All Episodes</span>
          <h1 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(3rem, 7vw, 6rem)', letterSpacing:'0.02em', lineHeight:0.9, marginBottom:24 }}>
            THE <span style={{ color:'#E31B23' }}>EPISODES</span>
          </h1>
          <p style={{ color:'#999', fontSize:'1.05rem', lineHeight:1.8, maxWidth:560, margin:'0 auto 36px' }}>
            Every episode is a masterclass in entrepreneurship. No theory — just real conversations with real builders.
          </p>
          {/* Search */}
          <div style={{ position:'relative', maxWidth:480, margin:'0 auto' }}>
            <span style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'#555', fontSize:'1rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Search episodes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft:44, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)' }}
            />
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section style={{ background:'#0A0A0A', padding:'64px 24px 96px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          {loading ? (
            <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
              <div style={{ width:48, height:48, border:'3px solid #E31B23', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 0' }}>
              <div style={{ fontSize:'3rem', marginBottom:16 }}>🎙️</div>
              <p style={{ color:'#666', fontSize:'1.1rem' }}>{search ? 'No episodes match your search.' : 'No episodes yet. Check back soon!'}</p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))', gap:28 }}>
              {filtered.map((ep, i) => (
                <div key={ep.id} className="card" style={{ overflow:'hidden', animation:`fadeInUp 0.6s ease ${i * 0.08}s both` }}>
                  {/* Video/Thumbnail */}
                  <div style={{ position:'relative', paddingBottom:'56.25%', overflow:'hidden', cursor:'pointer', background:'#111' }}
                    onClick={() => setPlayingId(playingId === ep.id ? null : ep.id)}
                  >
                    {playingId === ep.id ? (
                      <iframe
                        style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
                        src={`https://www.youtube.com/embed/${ep.youtubeId}?autoplay=1&rel=0`}
                        title={ep.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div style={{ position:'absolute', inset:0 }}>
                        <img
                          src={ep.thumbnail || `https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`}
                          alt={ep.title}
                          style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.65)', transition:'filter 0.4s' }}
                          onError={e => { e.target.style.display='none' }}
                        />
                        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12 }}>
                          <div style={{ width:60, height:60, borderRadius:'50%', background:'rgba(227,27,35,0.9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', boxShadow:'0 0 30px rgba(227,27,35,0.5)', transition:'all 0.3s', flexShrink:0 }}
                            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.15)'}
                            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                          >▶</div>
                          <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.75rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.8)' }}>Click to Play</span>
                        </div>
                        {ep.featured && (
                          <div style={{ position:'absolute', top:12, left:12 }}>
                            <span className="tag">Featured</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding:'20px 22px' }}>
                    <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'1.15rem', lineHeight:1.25, letterSpacing:'0.02em', marginBottom:8, color:'white' }}>{ep.title}</h3>
                    {ep.guest && (
                      <p style={{ color:'#E31B23', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>
                        Featuring {ep.guest}
                      </p>
                    )}
                    <p style={{ color:'#777', fontSize:'0.875rem', lineHeight:1.65, marginBottom:16 }}>{ep.description?.slice(0, 130)}{ep.description?.length > 130 ? '...' : ''}</p>
                    <div style={{ display:'flex', gap:12, alignItems:'center', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:14 }}>
                      <button onClick={() => setPlayingId(playingId === ep.id ? null : ep.id)} style={{
                        background: playingId === ep.id ? 'rgba(227,27,35,0.2)' : '#E31B23',
                        color:'white', border: playingId === ep.id ? '1px solid rgba(227,27,35,0.5)' : 'none',
                        padding:'8px 18px', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.82rem',
                        letterSpacing:'0.08em', textTransform:'uppercase', cursor:'pointer', borderRadius:3, transition:'all 0.3s',
                        clipPath:'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
                      }}>
                        {playingId === ep.id ? '⏹ Stop' : '▶ Play'}
                      </button>
                      <a href={ep.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{
                        color:'#666', textDecoration:'none', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.78rem',
                        letterSpacing:'0.06em', textTransform:'uppercase', transition:'color 0.3s',
                      }}
                      onMouseEnter={e=>e.currentTarget.style.color='#E31B23'}
                      onMouseLeave={e=>e.currentTarget.style.color='#666'}
                      >YouTube ↗</a>
                      <span style={{ marginLeft:'auto', color:'#444', fontSize:'0.75rem', fontFamily:'Barlow' }}>
                        {new Date(ep.publishedAt).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @media(max-width:600px) {
          div[style*="grid-template-columns: repeat(auto-fill, minmax(340px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
