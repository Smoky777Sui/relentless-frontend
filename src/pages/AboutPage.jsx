import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import hostImg from '../assets/host.jpg'
import teamImg from '../assets/team.png'

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | The Relentless Podcast — Sam DeMaio</title>
        <meta name="description" content="Meet Sam DeMaio, host of The Relentless Podcast. Founder of Showcase Remodels and Signature Reflections. Contractor coach. Builder. Entrepreneur." />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section style={{ background:'#0A0A0A', padding:'140px 24px 80px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(227,27,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(227,27,35,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>Our Story</span>
          <h1 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(3rem, 7vw, 6rem)', letterSpacing:'0.02em', lineHeight:0.9, marginBottom:24 }}>
            ABOUT <span style={{ color:'#E31B23' }}>US</span>
          </h1>
          <p style={{ color:'#999', fontSize:'1.05rem', lineHeight:1.8, maxWidth:600, margin:'0 auto' }}>
            The Relentless Podcast is a platform dedicated to entrepreneurial discussion, networking, and real business growth strategies.
          </p>
        </div>
      </section>

      {/* Host Section */}
      <section style={{ background:'#0F0F0F', padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:80, alignItems:'start' }}>
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', top:-16, left:-16, right:16, bottom:16, border:'2px solid rgba(227,27,35,0.2)', borderRadius:8 }} />
              <img src={hostImg} alt="Sam DeMaio" style={{ width:'100%', borderRadius:8, display:'block', position:'relative', zIndex:1 }} />
              {/* Social links */}
              <div style={{ marginTop:24, display:'flex', gap:10, flexWrap:'wrap' }}>
                {[
                  { label:'Instagram', url:'https://www.instagram.com/samdemaio' },
                  { label:'Facebook', url:'https://www.facebook.com/showcaseremodels' },
                  { label:'LinkedIn', url:'https://www.linkedin.com/in/sam-demaio' },
                  { label:'TikTok', url:'https://www.tiktok.com/@samdemaio' },
                  { label:'YouTube', url:'https://youtube.com/@samdemaio' },
                ].map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                    padding:'7px 14px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
                    color:'#aaa', textDecoration:'none', fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.78rem',
                    letterSpacing:'0.06em', textTransform:'uppercase', borderRadius:3, transition:'all 0.3s',
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(227,27,35,0.15)'; e.currentTarget.style.borderColor='rgba(227,27,35,0.4)'; e.currentTarget.style.color='#E31B23' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#aaa' }}
                  >{s.label}</a>
                ))}
              </div>
            </div>

            <div>
              <div style={{ marginBottom:32 }}>
                <h2 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(2.5rem, 5vw, 4rem)', letterSpacing:'0.02em', lineHeight:0.9, marginBottom:8 }}>
                  SAM <span style={{ color:'#E31B23' }}>DEMAIO</span>
                </h2>
                <p style={{ fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'1rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#777' }}>Founder · Podcast Host · Contractor Coach</p>
                <div style={{ width:60, height:3, background:'#E31B23', marginTop:16 }} />
              </div>

              <p style={{ color:'#AAAAAA', lineHeight:1.8, marginBottom:20 }}>
                Sam DeMaio is the founder of <strong style={{ color:'white' }}>Showcase Remodels</strong> and <strong style={{ color:'white' }}>Signature Reflections</strong>, two companies built around a shared mission: helping homeowners achieve high-quality bathroom transformations while giving contractors the products, systems, and support they need to succeed.
              </p>
              <p style={{ color:'#AAAAAA', lineHeight:1.8, marginBottom:20 }}>
                With years of experience in the remodeling industry, Sam recognized the challenges contractors often face — unreliable products, inefficient processes, and limited operational support. Through Showcase Remodels, he has focused on delivering exceptional bathroom remodeling services and creating spaces homeowners truly value.
              </p>
              <p style={{ color:'#AAAAAA', lineHeight:1.8, marginBottom:20 }}>
                <strong style={{ color:'white' }}>Signature Reflections</strong> was founded to address those same industry challenges at a larger scale, focusing on premium bath systems, durable materials, and contractor-focused solutions designed to improve installation efficiency and long-term product reliability.
              </p>
              <p style={{ color:'#AAAAAA', lineHeight:1.8, marginBottom:32 }}>
                Sam's leadership is driven by a commitment to quality, innovation, and long-term partnerships. He runs <strong style={{ color:'white' }}>coaching classes for contractors</strong> and hosts the Relentless Podcast, sharing unfiltered lessons from the trenches with entrepreneurs across the country.
              </p>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:16, marginBottom:32 }}>
                {[
                  { label:'Showcase Remodels', url:'https://showcaseremodels.com/' },
                  { label:'Signature Reflections', url:'https://signaturereflectionsbath.com/' },
                ].map(c => (
                  <a key={c.label} href={c.url} target="_blank" rel="noopener noreferrer" style={{
                    display:'block', padding:'16px', background:'rgba(227,27,35,0.08)', border:'1px solid rgba(227,27,35,0.2)',
                    borderRadius:6, textAlign:'center', textDecoration:'none', transition:'all 0.3s',
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(227,27,35,0.15)'; e.currentTarget.style.borderColor='rgba(227,27,35,0.5)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(227,27,35,0.08)'; e.currentTarget.style.borderColor='rgba(227,27,35,0.2)' }}
                  >
                    <div style={{ fontFamily:'Barlow Condensed', fontWeight:700, color:'#E31B23', fontSize:'0.9rem', letterSpacing:'0.04em' }}>{c.label}</div>
                    <div style={{ color:'#666', fontSize:'0.75rem', marginTop:4 }}>Visit Website ↗</div>
                  </a>
                ))}
              </div>

              <Link to="/join" className="btn-primary">Apply to Be on the Podcast →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Section */}
      <section style={{ background:'#0A0A0A', padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:80, alignItems:'center' }}>
            <div>
              <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>Contractor Coaching</span>
              <h2 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(2rem, 4vw, 3.5rem)', letterSpacing:'0.02em', lineHeight:0.9, marginBottom:20 }}>
                COACHING FOR <span style={{ color:'#E31B23' }}>CONTRACTORS</span>
              </h2>
              <div style={{ width:60, height:3, background:'#E31B23', marginBottom:24 }} />
              <p style={{ color:'#AAAAAA', lineHeight:1.8, marginBottom:20 }}>
                Sam's vision is to help contractors operate more efficiently, deliver better results for homeowners, and raise the overall standard of bathroom remodeling across the industry.
              </p>
              <p style={{ color:'#AAAAAA', lineHeight:1.8, marginBottom:32 }}>
                His coaching programs focus on practical systems, sales strategies, and operational frameworks that contractors can implement immediately in their businesses.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {['Sales Systems', 'Business Operations', 'Lead Generation', 'Team Building'].map(item => (
                  <div key={item} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:6, height:6, background:'#E31B23', borderRadius:'50%', flexShrink:0 }} />
                    <span style={{ color:'#CCCCCC', fontFamily:'Barlow', fontSize:'0.95rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src={teamImg} alt="Sam DeMaio coaching session" style={{ width:'100%', borderRadius:8, filter:'brightness(0.9)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Podcast About */}
      <section style={{ background:'#0F0F0F', padding:'80px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>The Podcast</span>
          <h2 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(2rem, 4vw, 3.5rem)', letterSpacing:'0.02em', marginBottom:20 }}>
            WHAT WE COVER
          </h2>
          <div style={{ width:60, height:3, background:'#E31B23', margin:'0 auto 40px' }} />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:20, textAlign:'left' }}>
            {[
              { icon:'📱', title:'Marketing Strategies', desc:'Social media consistency, Facebook & Instagram for lead generation, and organic SEO tactics that actually work.' },
              { icon:'📈', title:'Business Growth', desc:'Scaling businesses, building genuine customer relationships, and CRM tools like GoHighLevel to streamline operations.' },
              { icon:'🤝', title:'Networking & Mindset', desc:'Surrounding yourself with high-energy, driven individuals committed to reaching the next level of success.' },
              { icon:'🏗️', title:'Contractor Focus', desc:'Industry-specific insights for contractors on operations, sales, products, and building a sustainable business.' },
            ].map(item => (
              <div key={item.title} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:24 }}>
                <div style={{ fontSize:'2rem', marginBottom:14 }}>{item.icon}</div>
                <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.1rem', letterSpacing:'0.04em', marginBottom:10 }}>{item.title}</h3>
                <p style={{ color:'#888', fontSize:'0.875rem', lineHeight:1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        @media(max-width:768px) {
          div[style*="grid-template-columns: 1fr 1.3fr"],
          div[style*="grid-template-columns: 1.3fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </>
  )
}
