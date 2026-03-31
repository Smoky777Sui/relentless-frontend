import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImg from '../assets/logo.png'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/episodes', label: 'Episodes' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/join', label: 'Be a Guest' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(227,27,35,0.15)' : 'none',
        padding: scrolled ? '10px 0' : '20px 0',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
            <img src={logoImg} alt="Stay Relentless" style={{ height: scrolled ? 44 : 54, transition: 'height 0.3s ease', filter: 'drop-shadow(0 0 12px rgba(227,27,35,0.4))' }} />
          </Link>

          {/* Desktop Nav */}
          <div style={{ display:'flex', alignItems:'center', gap:4 }} className="desktop-nav">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} style={{
                padding: '8px 16px',
                color: location.pathname === link.to ? '#E31B23' : 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'color 0.3s',
                position: 'relative',
              }}
              onMouseEnter={e => { if(location.pathname !== link.to) e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { if(location.pathname !== link.to) e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
              >
                {location.pathname === link.to && (
                  <span style={{ position:'absolute', bottom:-2, left:'50%', transform:'translateX(-50%)', width:'20px', height:'2px', background:'#E31B23' }} />
                )}
                {link.label}
              </Link>
            ))}
            <Link to="/episodes" style={{
              marginLeft: 12,
              background: '#E31B23',
              color: 'white',
              padding: '9px 22px',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#A00D15'; e.currentTarget.style.boxShadow = '0 0 20px rgba(227,27,35,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#E31B23'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Listen Now ▶
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{ display:'none', background:'none', border:'none', cursor:'pointer', padding:8, color:'white' }}
          >
            <div style={{ width:24, height:2, background: menuOpen ? '#E31B23' : 'white', marginBottom:5, transition:'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ width:24, height:2, background: menuOpen ? '#E31B23' : 'white', marginBottom:5, transition:'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width:24, height:2, background: menuOpen ? '#E31B23' : 'white', transition:'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0,
        background:'rgba(10,10,10,0.98)',
        backdropFilter:'blur(20px)',
        zIndex: 999,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.77,0,0.175,1)',
      }}>
        {navLinks.map((link, i) => (
          <Link key={link.to} to={link.to} style={{
            color: location.pathname === link.to ? '#E31B23' : 'rgba(255,255,255,0.9)',
            textDecoration:'none',
            fontFamily:'Bebas Neue, sans-serif',
            fontSize:'2.5rem',
            letterSpacing:'0.1em',
            transition: 'color 0.3s',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateX(0)' : 'translateX(30px)',
            transitionDelay: menuOpen ? `${i * 0.06}s` : '0s',
          }}>
            {link.label}
          </Link>
        ))}
        <Link to="/join" style={{
          marginTop:24,
          background:'#E31B23',
          color:'white',
          padding:'14px 40px',
          fontFamily:'Barlow Condensed, sans-serif',
          fontWeight:700,
          fontSize:'1.1rem',
          letterSpacing:'0.1em',
          textTransform:'uppercase',
          textDecoration:'none',
          clipPath:'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        }}>
          Be a Guest →
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; flex-direction: column; }
        }
      `}</style>
    </>
  )
}
