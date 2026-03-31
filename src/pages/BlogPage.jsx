import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getBlogs } from '../services/api'

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getBlogs().then(data => { setBlogs(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
    b.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <>
      <Helmet>
        <title>Blog | The Relentless Podcast</title>
        <meta name="description" content="Blog posts from The Relentless Podcast. In-depth breakdowns, key takeaways, and actionable insights from our entrepreneur conversations." />
      </Helmet>
      <Navbar />

      <section style={{ background:'#0A0A0A', padding:'140px 24px 80px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(227,27,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(227,27,35,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>Insights & Breakdowns</span>
          <h1 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(3rem, 7vw, 6rem)', letterSpacing:'0.02em', lineHeight:0.9, marginBottom:24 }}>
            THE <span style={{ color:'#E31B23' }}>BLOG</span>
          </h1>
          <p style={{ color:'#999', fontSize:'1.05rem', lineHeight:1.8, maxWidth:560, margin:'0 auto 36px' }}>
            Deep dives into every episode. Key takeaways, actionable lessons, and the mindset shifts that can transform your business.
          </p>
          <div style={{ position:'relative', maxWidth:480, margin:'0 auto' }}>
            <span style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'#555' }}>🔍</span>
            <input
              type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)}
              className="form-input" style={{ paddingLeft:44, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)' }}
            />
          </div>
        </div>
      </section>

      <section style={{ background:'#0A0A0A', padding:'48px 24px 96px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          {loading ? (
            <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
              <div style={{ width:48, height:48, border:'3px solid #E31B23', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 0' }}>
              <p style={{ color:'#666', fontSize:'1.1rem' }}>{search ? 'No posts match your search.' : 'No posts yet. Check back soon!'}</p>
            </div>
          ) : (
            <>
              {/* Featured first post */}
              {!search && filtered.length > 0 && (
                <Link to={`/blog/${filtered[0].slug || filtered[0].id}`} style={{ textDecoration:'none', display:'block', marginBottom:40 }}>
                  <div style={{
                    background:'#111', border:'1px solid rgba(227,27,35,0.2)', borderRadius:8, overflow:'hidden',
                    display:'grid', gridTemplateColumns:'1.2fr 1fr', transition:'all 0.3s',
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(227,27,35,0.5)'; e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(227,27,35,0.1)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(227,27,35,0.2)'; e.currentTarget.style.boxShadow='none' }}
                  >
                    {filtered[0].image && (
                      <div style={{ height:'100%', minHeight:280, overflow:'hidden' }}>
                        <img src={filtered[0].image.startsWith('/') ? filtered[0].image : filtered[0].image} alt={filtered[0].title}
                          style={{ width:'100%', height:'100%', objectFit:'cover' }}
                          onError={e => e.target.style.display='none'}
                        />
                      </div>
                    )}
                    <div style={{ padding:40 }}>
                      <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
                        <span className="tag">Featured</span>
                        {filtered[0].tags?.slice(0,2).map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                      <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'clamp(1.4rem, 2.5vw, 2rem)', lineHeight:1.2, marginBottom:14, color:'white', letterSpacing:'0.02em' }}>
                        {filtered[0].title}
                      </h2>
                      <p style={{ color:'#888', lineHeight:1.75, marginBottom:20, fontSize:'0.95rem' }}>{filtered[0].excerpt?.slice(0, 180)}...</p>
                      <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                        <span style={{ color:'#E31B23', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.9rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Read Article →</span>
                        <span style={{ color:'#444', fontSize:'0.8rem', marginLeft:'auto' }}>
                          By {filtered[0].author} · {new Date(filtered[0].publishedAt).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:24 }}>
                {(search ? filtered : filtered.slice(1)).map((post, i) => (
                  <Link key={post.id} to={`/blog/${post.slug || post.id}`} style={{ textDecoration:'none', display:'block' }}>
                    <div className="card" style={{ overflow:'hidden', animation:`fadeInUp 0.6s ease ${i * 0.07}s both` }}>
                      {post.image && (
                        <div style={{ height:200, overflow:'hidden' }}>
                          <img src={post.image.startsWith('/') ? post.image : post.image} alt={post.title}
                            style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s ease' }}
                            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
                            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                            onError={e=>e.target.style.display='none'}
                          />
                        </div>
                      )}
                      <div style={{ padding:'20px 22px' }}>
                        <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
                          {post.tags?.slice(0,2).map(t => <span key={t} className="tag">{t}</span>)}
                        </div>
                        <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.1rem', lineHeight:1.3, marginBottom:10, color:'white', letterSpacing:'0.02em' }}>{post.title}</h3>
                        <p style={{ color:'#777', fontSize:'0.875rem', lineHeight:1.65, marginBottom:16 }}>{post.excerpt?.slice(0, 110)}...</p>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:14, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                          <span style={{ color:'#E31B23', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Read →</span>
                          <span style={{ color:'#444', fontSize:'0.75rem' }}>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @media(max-width:768px) {
          div[style*="grid-template-columns: 1.2fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
