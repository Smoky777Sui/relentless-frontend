import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getBlog, getBlogs } from '../services/api'

export default function BlogPostPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getBlog(id).then(data => {
      setBlog(data)
      setLoading(false)
      getBlogs().then(all => setRelated(all.filter(b => b.id !== data.id).slice(0, 3)))
    }).catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <>
      <Navbar />
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'80vh', background:'#0A0A0A' }}>
        <div style={{ width:48, height:48, border:'3px solid #E31B23', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </>
  )

  if (!blog) return (
    <>
      <Navbar />
      <div style={{ textAlign:'center', padding:'140px 24px', background:'#0A0A0A', minHeight:'80vh' }}>
        <h1 style={{ fontFamily:'Bebas Neue', fontSize:'3rem', marginBottom:16 }}>POST NOT FOUND</h1>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Helmet>
        <title>{blog.title} | The Relentless Podcast</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        {blog.image && <meta property="og:image" content={blog.image} />}
        <meta property="og:type" content="article" />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section style={{ background:'#0A0A0A', padding:'120px 24px 60px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(227,27,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(227,27,35,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />
        <div style={{ maxWidth:860, margin:'0 auto', position:'relative', zIndex:1 }}>
          <Link to="/blog" style={{ display:'inline-flex', alignItems:'center', gap:8, color:'#666', textDecoration:'none', fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.85rem', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:32, transition:'color 0.3s' }}
            onMouseEnter={e=>e.currentTarget.style.color='#E31B23'}
            onMouseLeave={e=>e.currentTarget.style.color='#666'}
          >
            ← Back to Blog
          </Link>
          <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
            {blog.tags?.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <h1 style={{ fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'clamp(1.8rem, 4vw, 3rem)', lineHeight:1.15, letterSpacing:'0.02em', marginBottom:20 }}>
            {blog.title}
          </h1>
          <div style={{ display:'flex', alignItems:'center', gap:20, color:'#666', fontSize:'0.875rem', fontFamily:'Barlow', flexWrap:'wrap' }}>
            <span>By <strong style={{ color:'#AAAAAA' }}>{blog.author}</strong></span>
            <span>·</span>
            <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.image && (
        <div style={{ maxWidth:860, margin:'0 auto', padding:'0 24px' }}>
          <img src={blog.image.startsWith('/') ? blog.image : blog.image} alt={blog.title}
            style={{ width:'100%', maxHeight:480, objectFit:'cover', borderRadius:8, border:'1px solid rgba(255,255,255,0.06)', display:'block' }}
            onError={e=>e.target.style.display='none'}
          />
        </div>
      )}

      {/* Content */}
      <article style={{ maxWidth:860, margin:'0 auto', padding:'48px 24px 80px' }}>
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

        {/* Share */}
        <div style={{ marginTop:48, paddingTop:32, borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
          <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#777' }}>Share:</span>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank" rel="noopener noreferrer" style={{ padding:'7px 16px', background:'rgba(29,161,242,0.1)', border:'1px solid rgba(29,161,242,0.2)', color:'#1DA1F2', textDecoration:'none', borderRadius:3, fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.8rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>
            Twitter
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank" rel="noopener noreferrer" style={{ padding:'7px 16px', background:'rgba(24,119,242,0.1)', border:'1px solid rgba(24,119,242,0.2)', color:'#1877F2', textDecoration:'none', borderRadius:3, fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.8rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>
            Facebook
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`}
            target="_blank" rel="noopener noreferrer" style={{ padding:'7px 16px', background:'rgba(0,119,181,0.1)', border:'1px solid rgba(0,119,181,0.2)', color:'#0077B5', textDecoration:'none', borderRadius:3, fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.8rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>
            LinkedIn
          </a>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section style={{ background:'#0F0F0F', padding:'64px 24px' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <h2 style={{ fontFamily:'Bebas Neue', fontSize:'2rem', letterSpacing:'0.04em', marginBottom:32 }}>MORE FROM THE <span style={{ color:'#E31B23' }}>BLOG</span></h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:24 }}>
              {related.map(post => (
                <Link key={post.id} to={`/blog/${post.slug || post.id}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ overflow:'hidden' }}>
                    {post.image && (
                      <div style={{ height:160, overflow:'hidden' }}>
                        <img src={post.image.startsWith('/') ? post.image : post.image} alt={post.title}
                          style={{ width:'100%', height:'100%', objectFit:'cover' }}
                          onError={e=>e.target.style.display='none'}
                        />
                      </div>
                    )}
                    <div style={{ padding:16 }}>
                      <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1rem', lineHeight:1.3, marginBottom:8, color:'white' }}>{post.title}</h3>
                      <span style={{ color:'#E31B23', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </>
  )
}
