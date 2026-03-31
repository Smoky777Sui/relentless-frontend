import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPodcasts, getBlogs } from '../services/api'
import hostImg from '../assets/host.jpg'
import logoImg from '../assets/logo.png'
import teamImg from '../assets/team.png'

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function AnimatedSection({ children, delay = 0, direction = 'up' }) {
  const [ref, visible] = useInView()
  const transforms = { up:'translateY(40px)', left:'translateX(-40px)', right:'translateX(40px)', scale:'scale(0.92)' }
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}

export default function HomePage() {
  const [podcasts, setPodcasts] = useState([])
  const [blogs, setBlogs] = useState([])
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [playingId, setPlayingId] = useState(null)

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100)
    getPodcasts().then(data => setPodcasts(data.slice(0, 3))).catch(() => {})
    getBlogs().then(data => setBlogs(data.slice(0, 3))).catch(() => {})
  }, [])

  const featured = podcasts[0]

  return (
    <>
      <Helmet>
        <title>The Relentless Podcast | Sam DeMaio — Entrepreneurship & Business Growth</title>
        <meta name="description" content="The Relentless Podcast hosted by Sam DeMaio. Raw conversations on entrepreneurship, business growth, contractor coaching, and building something that lasts." />
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section style={{
        minHeight:'100vh', position:'relative', display:'flex', alignItems:'center',
        background:'linear-gradient(135deg, #0A0A0A 0%, #0F0505 50%, #0A0A0A 100%)',
        overflow:'hidden',
      }}>
        {/* Background elements */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
          {/* Grid pattern */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:'linear-gradient(rgba(227,27,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(227,27,35,0.04) 1px, transparent 1px)',
            backgroundSize:'60px 60px',
          }} />
          {/* Red glow orbs */}
          <div style={{ position:'absolute', top:'20%', right:'15%', width:400, height:400, background:'radial-gradient(circle, rgba(227,27,35,0.12) 0%, transparent 70%)', borderRadius:'50%', filter:'blur(40px)' }} />
          <div style={{ position:'absolute', bottom:'10%', left:'5%', width:300, height:300, background:'radial-gradient(circle, rgba(227,27,35,0.08) 0%, transparent 70%)', borderRadius:'50%', filter:'blur(30px)' }} />
          {/* Diagonal accent */}
          <div style={{ position:'absolute', top:0, right:0, width:'50%', height:'100%', background:'linear-gradient(135deg, transparent 0%, rgba(227,27,35,0.03) 100%)' }} />
        </div>

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'120px 24px 80px', width:'100%', position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
            {/* Left content */}
            <div>
              <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(30px)', transition:'all 0.8s ease 0.1s' }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(227,27,35,0.1)', border:'1px solid rgba(227,27,35,0.3)', padding:'6px 16px', borderRadius:2, marginBottom:24 }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:'#E31B23', display:'inline-block', animation:'pulse 2s ease-in-out infinite' }} />
                  <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#E31B23' }}>Now Streaming</span>
                </div>
              </div>

              <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(40px)', transition:'all 0.8s ease 0.2s' }}>
                <h1 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(4rem, 8vw, 7rem)', lineHeight:0.9, letterSpacing:'0.02em', marginBottom:16 }}>
                  <span style={{ display:'block', color:'white' }}>STAY</span>
                  <span style={{ display:'block', color:'#E31B23', textShadow:'0 0 60px rgba(227,27,35,0.4)' }}>RELENTLESS</span>
                </h1>
              </div>

              <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(30px)', transition:'all 0.8s ease 0.35s' }}>
                <p style={{ fontSize:'1.15rem', color:'#AAAAAA', lineHeight:1.8, maxWidth:480, marginBottom:32 }}>
                  Raw conversations on entrepreneurship, building discipline, and achieving financial freedom. No fluff. No ego. Just lessons from the trenches.
                </p>
              </div>

              <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(20px)', transition:'all 0.8s ease 0.5s', display:'flex', gap:16, flexWrap:'wrap' }}>
                <Link to="/episodes" className="btn-primary">
                  ▶ Listen Now
                </Link>
                <Link to="/join" className="btn-outline">
                  Be a Guest →
                </Link>
              </div>

              {/* Stats */}
              <div style={{ opacity: heroLoaded ? 1 : 0, transition:'opacity 0.8s ease 0.7s', display:'flex', gap:32, marginTop:48, paddingTop:32, borderTop:'1px solid rgba(255,255,255,0.06)', flexWrap:'wrap' }}>
                {[['New Episodes', 'Weekly'], ['Entrepreneurs', 'Featured'], ['No Fluff', 'Guarantee']].map(([n, l]) => (
                  <div key={n}>
                    <div style={{ fontFamily:'Bebas Neue', fontSize:'1.8rem', color:'#E31B23', lineHeight:1 }}>{n}</div>
                    <div style={{ fontFamily:'Barlow', fontSize:'0.8rem', color:'#666', textTransform:'uppercase', letterSpacing:'0.08em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Host image */}
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative' }}>
              <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'scale(0.9)', transition:'all 1s ease 0.3s', position:'relative' }}>
                {/* Glow ring */}
                <div style={{ position:'absolute', inset:-3, borderRadius:8, background:'linear-gradient(135deg, #E31B23, transparent, #E31B23)', animation:'borderPulse 3s ease-in-out infinite', opacity:0.6 }} />
                <div style={{ position:'absolute', inset:0, borderRadius:8, background:'radial-gradient(ellipse at center, rgba(227,27,35,0.2) 0%, transparent 70%)', filter:'blur(20px)', transform:'scale(1.2)' }} />
                <img src={hostImg} alt="Sam DeMaio — Host of The Relentless Podcast"
                  style={{ width:'100%', maxWidth:420, borderRadius:8, display:'block', position:'relative', zIndex:1, filter:'brightness(1.05) contrast(1.05)' }}
                />
                {/* Host card overlay */}
                <div style={{
                  position:'absolute', bottom:20, left:20, right:20,
                  background:'rgba(10,10,10,0.9)', backdropFilter:'blur(10px)',
                  border:'1px solid rgba(227,27,35,0.3)', borderRadius:6,
                  padding:'14px 20px', display:'flex', alignItems:'center', gap:16, zIndex:2
                }}>
                  <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(135deg, #E31B23, #A00D15)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bebas Neue', fontSize:'1.1rem', flexShrink:0 }}>SD</div>
                  <div>
                    <div style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1rem', letterSpacing:'0.04em' }}>Sam DeMaio</div>
                    <div style={{ color:'#888', fontSize:'0.78rem', fontFamily:'Barlow' }}>Host · Founder · Contractor Coach</div>
                  </div>
                  <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
                    <a href="https://www.instagram.com/samdemaio" target="_blank" rel="noopener noreferrer" style={{ color:'#666', fontSize:'0.8rem', textDecoration:'none', transition:'color 0.3s' }} onMouseEnter={e=>e.currentTarget.style.color='#E31B23'} onMouseLeave={e=>e.currentTarget.style.color='#666'}>IG</a>
                    <a href="https://www.linkedin.com/in/sam-demaio" target="_blank" rel="noopener noreferrer" style={{ color:'#666', fontSize:'0.8rem', textDecoration:'none', transition:'color 0.3s' }} onMouseEnter={e=>e.currentTarget.style.color='#E31B23'} onMouseLeave={e=>e.currentTarget.style.color='#666'}>LI</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom fade */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120, background:'linear-gradient(to bottom, transparent, #0A0A0A)' }} />
      </section>

      {/* ABOUT PODCAST */}
      <section style={{ background:'#0F0F0F', padding:'96px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>About The Podcast</span>
              <h2 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(2.5rem, 5vw, 4rem)', letterSpacing:'0.02em' }}>
                WHERE REAL BUILDERS <span style={{ color:'#E31B23' }}>TALK REAL BUSINESS</span>
              </h2>
              <div style={{ width:60, height:3, background:'#E31B23', margin:'20px auto 0' }} />
            </div>
          </AnimatedSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:24 }}>
            {[
              { icon:'🔨', title:'Business Tactics', desc:'Real-world strategies for growth, mindset, and leadership from builders who\'ve lived it.' },
              { icon:'🎯', title:'Marketing & Sales', desc:'Social media consistency, lead generation, and the systems that actually move the needle.' },
              { icon:'💡', title:'Mindset & Growth', desc:'Surrounding yourself with high-energy, driven individuals committed to reaching the next level.' },
              { icon:'🎙️', title:'Raw Conversations', desc:'Unfiltered entrepreneur stories — the wins, the setbacks, and everything in between.' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1} direction="up">
                <div className="card" style={{ padding:28 }}>
                  <div style={{ fontSize:'2rem', marginBottom:16 }}>{item.icon}</div>
                  <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.2rem', letterSpacing:'0.04em', marginBottom:10, color:'white' }}>{item.title}</h3>
                  <p style={{ color:'#888', fontSize:'0.92rem', lineHeight:1.7 }}>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EPISODE */}
      {featured && (
        <section style={{ background:'#0A0A0A', padding:'96px 24px' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <AnimatedSection>
              <div style={{ marginBottom:48 }}>
                <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>Latest Episode</span>
                <h2 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(2rem, 4vw, 3rem)', letterSpacing:'0.02em' }}>FEATURED <span style={{ color:'#E31B23' }}>EPISODE</span></h2>
              </div>
            </AnimatedSection>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center' }}>
              <AnimatedSection direction="left">
                <div style={{ position:'relative', borderRadius:8, overflow:'hidden', background:'#111', border:'1px solid rgba(227,27,35,0.2)' }}>
                  {playingId === featured.id ? (
                    <div className="youtube-container">
                      <iframe
                        src={`https://www.youtube.com/embed/${featured.youtubeId}?autoplay=1&rel=0`}
                        title={featured.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div style={{ position:'relative', cursor:'pointer' }} onClick={() => setPlayingId(featured.id)}>
                      <img src={featured.thumbnail} alt={featured.title}
                        style={{ width:'100%', display:'block', filter:'brightness(0.7)' }}
                        onError={e => { e.target.src = '/assets/jeff-pilla.jpeg' }}
                      />
                      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <div style={{
                          width:72, height:72, borderRadius:'50%',
                          background:'rgba(227,27,35,0.9)', backdropFilter:'blur(8px)',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:'1.5rem', transition:'all 0.3s',
                          boxShadow:'0 0 40px rgba(227,27,35,0.5)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform='scale(1.1)'; e.currentTarget.style.background='rgba(227,27,35,1)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.background='rgba(227,27,35,0.9)' }}
                        >▶</div>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div>
                  <span className="tag" style={{ marginBottom:16, display:'inline-block' }}>Latest</span>
                  <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'clamp(1.5rem, 3vw, 2.2rem)', lineHeight:1.2, marginBottom:16, letterSpacing:'0.02em' }}>
                    {featured.title}
                  </h3>
                  {featured.guest && <p style={{ color:'#E31B23', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.9rem', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:12 }}>Guest: {featured.guest}</p>}
                  <p style={{ color:'#999', lineHeight:1.8, marginBottom:28 }}>{featured.description}</p>
                  <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                    <button onClick={() => setPlayingId(featured.id)} className="btn-primary">▶ Play Episode</button>
                    <Link to="/episodes" className="btn-outline">All Episodes</Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* HOST SECTION */}
      <section style={{ background:'#0F0F0F', padding:'96px 24px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(227,27,35,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(227,27,35,0.03) 1px, transparent 1px)', backgroundSize:'80px 80px', pointerEvents:'none' }} />
        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
            <AnimatedSection direction="left">
              <div style={{ position:'relative' }}>
                <div style={{ position:'absolute', top:-20, left:-20, right:20, bottom:20, border:'2px solid rgba(227,27,35,0.2)', borderRadius:8 }} />
                <img src={teamImg} alt="Sam DeMaio coaching contractors"
                  style={{ width:'100%', borderRadius:8, display:'block', position:'relative', zIndex:1, filter:'brightness(0.9) contrast(1.05)' }}
                />
                <div style={{ position:'absolute', bottom:-20, right:-20, background:'#E31B23', padding:'16px 24px', borderRadius:4, zIndex:2 }}>
                  <div style={{ fontFamily:'Bebas Neue', fontSize:'1.8rem', lineHeight:1 }}>COACH</div>
                  <div style={{ fontFamily:'Barlow', fontSize:'0.75rem', letterSpacing:'0.1em', textTransform:'uppercase', opacity:0.9 }}>For Contractors</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div>
                <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>Your Host</span>
                <h2 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(2.5rem, 5vw, 4rem)', letterSpacing:'0.02em', lineHeight:0.9, marginBottom:24 }}>
                  SAM <span style={{ color:'#E31B23' }}>DEMAIO</span>
                </h2>
                <div style={{ width:60, height:3, background:'#E31B23', marginBottom:24 }} />
                <p style={{ color:'#AAAAAA', lineHeight:1.8, marginBottom:16 }}>
                  Founder of <strong style={{ color:'white' }}>Showcase Remodels</strong> and <strong style={{ color:'white' }}>Signature Reflections</strong>, Sam DeMaio built two companies around helping homeowners achieve high-quality bathroom transformations while giving contractors the products, systems, and support they need to succeed.
                </p>
                <p style={{ color:'#AAAAAA', lineHeight:1.8, marginBottom:28 }}>
                  With years of experience in the remodeling industry, Sam runs <strong style={{ color:'white' }}>coaching classes for contractors</strong> and is the host of the Relentless Podcast — dedicated to entrepreneurial discussion, networking, and real business growth strategies.
                </p>
                <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:28 }}>
                  {['Contractor Coaching', 'Podcast Host', 'Remodeling Expert', 'Business Builder'].map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                  <Link to="/about" className="btn-primary">Learn More</Link>
                  <a href="https://youtube.com/@samdemaio?si=437u0OFEMcyOhCVO" target="_blank" rel="noopener noreferrer" className="btn-outline">YouTube Channel ↗</a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* RECENT EPISODES */}
      {podcasts.length > 0 && (
        <section style={{ background:'#0A0A0A', padding:'96px 24px' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <AnimatedSection>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, flexWrap:'wrap', gap:16 }}>
                <div>
                  <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>All Episodes</span>
                  <h2 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(2rem, 4vw, 3rem)', letterSpacing:'0.02em' }}>RECENT <span style={{ color:'#E31B23' }}>EPISODES</span></h2>
                </div>
                <Link to="/episodes" style={{ color:'#E31B23', textDecoration:'none', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.9rem', letterSpacing:'0.08em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:6, transition:'gap 0.3s' }}
                  onMouseEnter={e=>e.currentTarget.style.gap='12px'}
                  onMouseLeave={e=>e.currentTarget.style.gap='6px'}
                >View All →</Link>
              </div>
            </AnimatedSection>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:24 }}>
              {podcasts.map((ep, i) => (
                <AnimatedSection key={ep.id} delay={i * 0.1}>
                  <div className="card" style={{ overflow:'hidden' }}>
                    <div style={{ position:'relative', paddingBottom:'56.25%', overflow:'hidden', cursor:'pointer' }}
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
                        <>
                          <img src={ep.thumbnail} alt={ep.title}
                            style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.7)', transition:'filter 0.3s' }}
                            onError={e => { e.target.style.display='none' }}
                          />
                          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                            <div style={{ width:48, height:48, borderRadius:'50%', background:'rgba(227,27,35,0.85)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem' }}>▶</div>
                          </div>
                        </>
                      )}
                    </div>
                    <div style={{ padding:20 }}>
                      {ep.featured && <span className="tag" style={{ marginBottom:10, display:'inline-block' }}>Featured</span>}
                      <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.15rem', lineHeight:1.3, marginBottom:8, letterSpacing:'0.02em' }}>{ep.title}</h3>
                      {ep.guest && <p style={{ color:'#E31B23', fontSize:'0.8rem', fontFamily:'Barlow Condensed', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:8 }}>ft. {ep.guest}</p>}
                      <p style={{ color:'#777', fontSize:'0.875rem', lineHeight:1.6 }}>{ep.description?.slice(0, 100)}...</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LATEST BLOGS */}
      {blogs.length > 0 && (
        <section style={{ background:'#0F0F0F', padding:'96px 24px' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <AnimatedSection>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, flexWrap:'wrap', gap:16 }}>
                <div>
                  <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>Insights</span>
                  <h2 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(2rem, 4vw, 3rem)', letterSpacing:'0.02em' }}>FROM THE <span style={{ color:'#E31B23' }}>BLOG</span></h2>
                </div>
                <Link to="/blog" style={{ color:'#E31B23', textDecoration:'none', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.9rem', letterSpacing:'0.08em', textTransform:'uppercase' }}>All Posts →</Link>
              </div>
            </AnimatedSection>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:24 }}>
              {blogs.map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 0.1}>
                  <Link to={`/blog/${post.slug || post.id}`} style={{ textDecoration:'none', display:'block', height:'100%' }}>
                    <div className="card" style={{ overflow:'hidden', height:'100%' }}>
                      {post.image && (
                        <div style={{ height:180, overflow:'hidden' }}>
                          <img src={post.image.startsWith('/') ? post.image : post.image} alt={post.title}
                            style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s ease' }}
                            onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                            onError={e => { e.target.style.display='none' }}
                          />
                        </div>
                      )}
                      <div style={{ padding:20 }}>
                        <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
                          {post.tags?.slice(0,2).map(t => <span key={t} className="tag">{t}</span>)}
                        </div>
                        <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.1rem', lineHeight:1.3, marginBottom:10, color:'white', letterSpacing:'0.02em' }}>{post.title}</h3>
                        <p style={{ color:'#777', fontSize:'0.85rem', lineHeight:1.6, marginBottom:16 }}>{post.excerpt?.slice(0, 120)}...</p>
                        <span style={{ color:'#E31B23', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Read More →</span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section style={{ background:'#0A0A0A', padding:'96px 24px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(227,27,35,0.12) 0%, transparent 70%)' }} />
        <AnimatedSection>
          <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
            <div style={{ width:60, height:60, borderRadius:'50%', border:'2px solid rgba(227,27,35,0.5)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', fontSize:'1.5rem' }}>🎙️</div>
            <h2 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(2.5rem, 5vw, 4rem)', letterSpacing:'0.02em', marginBottom:16 }}>
              THINK YOU HAVE A <span style={{ color:'#E31B23' }}>STORY TO TELL?</span>
            </h2>
            <p style={{ color:'#AAAAAA', lineHeight:1.8, marginBottom:32, fontSize:'1.05rem' }}>
              We highlight founders who build with discipline, lead with integrity, and scale with intention. If your journey includes growth, setbacks, and leadership lessons — you may be a great fit.
            </p>
            <Link to="/join" className="btn-primary" style={{ fontSize:'1rem' }}>Apply to Be a Guest →</Link>
          </div>
        </AnimatedSection>
      </section>

      <Footer />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes borderPulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
        @media(max-width:768px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </>
  )
}
