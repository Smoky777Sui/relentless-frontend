import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'

const socials = [
  { name: 'YouTube', url: 'https://youtube.com/@samdemaio?si=437u0OFEMcyOhCVO', icon: '▶' },
  { name: 'Instagram', url: 'https://www.instagram.com/samdemaio', icon: '◉' },
  { name: 'Facebook', url: 'https://www.facebook.com/showcaseremodels', icon: 'f' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sam-demaio', icon: 'in' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@samdemaio', icon: '♪' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0D0D0D', borderTop: '1px solid rgba(227,27,35,0.15)', paddingTop: 64 }}>
      {/* Marquee ticker */}
      <div style={{ background: '#E31B23', padding: '10px 0', overflow: 'hidden', marginBottom: 48 }}>
        <div className="animate-marquee" style={{ display:'flex', gap:48, whiteSpace:'nowrap', width:'max-content' }}>
          {Array(8).fill('STAY RELENTLESS · BUILD WITH DISCIPLINE · NO FLUFF. NO EGO. · REAL BUSINESS. REAL RESULTS.').map((t, i) => (
            <span key={i} style={{ fontFamily:'Bebas Neue', fontSize:'1.1rem', letterSpacing:'0.1em', color:'rgba(255,255,255,0.9)' }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px 48px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:48 }}>
          {/* Brand */}
          <div>
            <img src={logoImg} alt="Stay Relentless" style={{ height:60, marginBottom:20, filter:'drop-shadow(0 0 12px rgba(227,27,35,0.3))' }} />
            <p style={{ color:'#888', fontSize:'0.9rem', lineHeight:1.7, marginBottom:20, maxWidth:260 }}>
              Raw conversations on entrepreneurship, business growth, and building something that lasts.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                  style={{
                    width:36, height:36, borderRadius:4,
                    background:'rgba(255,255,255,0.05)',
                    border:'1px solid rgba(255,255,255,0.1)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'#aaa', textDecoration:'none', fontSize:'0.8rem', fontWeight:700,
                    transition:'all 0.3s',
                    fontFamily:'Barlow Condensed, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(227,27,35,0.2)'; e.currentTarget.style.borderColor='rgba(227,27,35,0.5)'; e.currentTarget.style.color='#E31B23' }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#aaa' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#E31B23', marginBottom:20 }}>Navigate</h4>
            {[
              { to:'/', label:'Home' },
              { to:'/episodes', label:'Episodes' },
              { to:'/about', label:'About' },
              { to:'/blog', label:'Blog' },
              { to:'/join', label:'Be a Guest' },
            ].map(link => (
              <div key={link.to} style={{ marginBottom:10 }}>
                <Link to={link.to} style={{ color:'#888', textDecoration:'none', fontFamily:'Barlow', fontSize:'0.95rem', transition:'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#fff'}
                  onMouseLeave={e => e.currentTarget.style.color='#888'}
                >
                  → {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Sam's Companies */}
          <div>
            <h4 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#E31B23', marginBottom:20 }}>Sam's Companies</h4>
            {[
              { name:'Showcase Remodels', url:'https://showcaseremodels.com/' },
              { name:'Signature Reflections', url:'https://signaturereflectionsbath.com/' },
            ].map(c => (
              <div key={c.name} style={{ marginBottom:10 }}>
                <a href={c.url} target="_blank" rel="noopener noreferrer"
                  style={{ color:'#888', textDecoration:'none', fontFamily:'Barlow', fontSize:'0.95rem', transition:'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#fff'}
                  onMouseLeave={e => e.currentTarget.style.color='#888'}
                >
                  ↗ {c.name}
                </a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#E31B23', marginBottom:20 }}>Contact</h4>
            <a href="mailto:Firstcall2011@gmail.com" style={{ color:'#888', textDecoration:'none', fontSize:'0.9rem', display:'block', marginBottom:16, transition:'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color='#fff'}
              onMouseLeave={e => e.currentTarget.style.color='#888'}
            >
              ✉ Firstcall2011@gmail.com
            </a>
            <Link to="/join" style={{
              display:'inline-block',
              background:'transparent',
              border:'1px solid rgba(227,27,35,0.5)',
              color:'#E31B23',
              padding:'10px 20px',
              textDecoration:'none',
              fontFamily:'Barlow Condensed',
              fontWeight:700,
              fontSize:'0.85rem',
              letterSpacing:'0.1em',
              textTransform:'uppercase',
              transition:'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(227,27,35,0.15)'; e.currentTarget.style.boxShadow='0 0 20px rgba(227,27,35,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.boxShadow='none' }}
            >
              Apply as Guest →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', marginTop:48, paddingTop:24, display:'flex', flexWrap:'wrap', gap:16, alignItems:'center', justifyContent:'space-between' }}>
          <p style={{ color:'#555', fontSize:'0.82rem', fontFamily:'Barlow' }}>
            © {new Date().getFullYear()} The Relentless Podcast · Sam DeMaio. All rights reserved.
          </p>
          <Link to="/admin" style={{ color:'#333', textDecoration:'none', fontSize:'0.75rem', fontFamily:'Barlow', letterSpacing:'0.05em', transition:'color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color='#666'}
            onMouseLeave={e => e.currentTarget.style.color='#333'}
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
