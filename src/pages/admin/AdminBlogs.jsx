import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { getBlogs, createBlog, updateBlog, deleteBlog, uploadImage } from '../../services/api'

const initForm = { title:'', excerpt:'', content:'', image:'', author:'Sam DeMaio', tags:'' }

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(initForm)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  const load = () => {
    setLoading(true)
    getBlogs().then(d => { setBlogs(d); setLoading(false) }).catch(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => { setForm(initForm); setEditId(null); setShowModal(true) }
  const openEdit = (b) => {
    setForm({ title:b.title, excerpt:b.excerpt||'', content:b.content||'', image:b.image||'', author:b.author||'Sam DeMaio', tags: Array.isArray(b.tags) ? b.tags.join(', ') : b.tags||'' })
    setEditId(b.id); setShowModal(true)
  }
  const closeModal = () => { setShowModal(false); setForm(initForm); setEditId(null) }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('image', file)
      const data = await uploadImage(fd)
      setForm(f => ({ ...f, image: data.url }))
      toast.success('Image uploaded!')
    } catch { toast.error('Image upload failed') }
    finally { setUploading(false) }
  }

  const handleSave = async () => {
    if (!form.title || !form.content) { toast.error('Title and content required'); return }
    setSaving(true)
    try {
      if (editId) {
        await updateBlog(editId, form)
        toast.success('Post updated!')
      } else {
        await createBlog(form)
        toast.success('Post created!')
      }
      closeModal(); load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id)
      toast.success('Post deleted')
      setDeleteId(null); load()
    } catch { toast.error('Delete failed') }
  }

  return (
    <div style={{ padding:'32px 36px', minHeight:'100vh' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32, flexWrap:'wrap', gap:16 }}>
        <div>
          <h1 style={{ fontFamily:'Bebas Neue', fontSize:'2.5rem', letterSpacing:'0.04em' }}>MANAGE <span style={{ color:'#E31B23' }}>BLOG POSTS</span></h1>
          <div style={{ width:50, height:3, background:'#E31B23', marginTop:8 }} />
        </div>
        <button onClick={openAdd} className="btn-primary">+ New Post</button>
      </div>

      {loading ? (
        <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
          <div style={{ width:40, height:40, border:'3px solid #E31B23', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
        </div>
      ) : blogs.length === 0 ? (
        <div style={{ textAlign:'center', padding:'80px 0', color:'#555' }}>
          <div style={{ fontSize:'3rem', marginBottom:16 }}>📝</div>
          <p>No blog posts yet. Create your first post!</p>
        </div>
      ) : (
        <div style={{ display:'grid', gap:16 }}>
          {blogs.map(b => (
            <div key={b.id} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'20px 24px', display:'flex', gap:20, alignItems:'center', transition:'border-color 0.3s' }}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(227,27,35,0.2)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'}
            >
              {b.image && (
                <img src={b.image.startsWith('/') ? b.image : b.image} alt={b.title}
                  style={{ width:80, height:60, objectFit:'cover', borderRadius:4, background:'#222', flexShrink:0 }}
                  onError={e=>e.target.style.display='none'}
                />
              )}
              <div style={{ flex:1, minWidth:0 }}>
                <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.05rem', color:'#eee', letterSpacing:'0.02em', marginBottom:4 }}>{b.title}</h3>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:4 }}>
                  {b.tags?.slice(0,3).map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <p style={{ color:'#555', fontSize:'0.82rem', fontFamily:'Barlow' }}>By {b.author} · {new Date(b.publishedAt).toLocaleDateString()}</p>
              </div>
              <div style={{ display:'flex', gap:10, flexShrink:0 }}>
                <button onClick={() => openEdit(b)} style={{ padding:'8px 16px', background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.2)', color:'#3B82F6', cursor:'pointer', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.3s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.2)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(59,130,246,0.1)'}
                >Edit</button>
                <button onClick={() => setDeleteId(b.id)} style={{ padding:'8px 16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#EF4444', cursor:'pointer', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.3s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,0.2)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(239,68,68,0.1)'}
                >Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:1000, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:24, overflowY:'auto' }} onClick={e => { if(e.target===e.currentTarget) closeModal() }}>
          <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'36px 32px', width:'100%', maxWidth:760, marginTop:40, marginBottom:40 }}>
            <h2 style={{ fontFamily:'Bebas Neue', fontSize:'1.8rem', letterSpacing:'0.04em', marginBottom:24 }}>{editId ? 'EDIT' : 'CREATE'} <span style={{ color:'#E31B23' }}>BLOG POST</span></h2>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
              <div>
                <label className="form-label">Title <span className="required">*</span></label>
                <input className="form-input" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Post title..." />
              </div>
              <div>
                <label className="form-label">Author</label>
                <input className="form-input" value={form.author} onChange={e=>setForm(f=>({...f,author:e.target.value}))} placeholder="Sam DeMaio" />
              </div>
            </div>

            <div style={{ marginBottom:16 }}>
              <label className="form-label">Tags (comma separated)</label>
              <input className="form-input" value={form.tags} onChange={e=>setForm(f=>({...f,tags:e.target.value}))} placeholder="entrepreneurship, sales, mindset..." />
            </div>

            <div style={{ marginBottom:16 }}>
              <label className="form-label">Excerpt</label>
              <textarea className="form-input" rows={3} style={{ resize:'vertical' }} value={form.excerpt} onChange={e=>setForm(f=>({...f,excerpt:e.target.value}))} placeholder="Short description (auto-generated if empty)..." />
            </div>

            {/* Image upload */}
            <div style={{ marginBottom:16 }}>
              <label className="form-label">Featured Image</label>
              <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
                <input className="form-input" value={form.image} onChange={e=>setForm(f=>({...f,image:e.target.value}))} placeholder="https://... or upload below" style={{ flex:1 }} />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} style={{ padding:'12px 18px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#aaa', cursor:uploading?'not-allowed':'pointer', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.82rem', letterSpacing:'0.06em', textTransform:'uppercase', whiteSpace:'nowrap' }}>
                  {uploading ? 'Uploading...' : '📎 Upload'}
                </button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleImageUpload} />
              </div>
              {form.image && (
                <div style={{ marginTop:10 }}>
                  <img src={form.image.startsWith('/') ? form.image : form.image} alt="preview" style={{ height:80, borderRadius:4, border:'1px solid rgba(255,255,255,0.1)' }} onError={e=>e.target.style.display='none'} />
                </div>
              )}
            </div>

            <div style={{ marginBottom:24 }}>
              <label className="form-label">Content (HTML) <span className="required">*</span></label>
              <textarea className="form-input" rows={14} style={{ resize:'vertical', fontFamily:'JetBrains Mono, monospace', fontSize:'0.82rem', lineHeight:1.6 }} value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} placeholder="<p>Your blog content here...</p>&#10;<h2>Section Heading</h2>&#10;<ul><li>Item</li></ul>" />
              <p style={{ color:'#444', fontSize:'0.75rem', marginTop:6, fontFamily:'Barlow' }}>Supports HTML tags: &lt;p&gt; &lt;h2&gt; &lt;h3&gt; &lt;ul&gt; &lt;li&gt; &lt;strong&gt; &lt;em&gt; &lt;blockquote&gt;</p>
            </div>

            <div style={{ display:'flex', gap:12 }}>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex:1, justifyContent:'center', opacity:saving?0.7:1, cursor:saving?'not-allowed':'pointer' }}>
                {saving ? 'Saving...' : (editId ? '✓ Save Changes' : '✓ Publish Post')}
              </button>
              <button onClick={closeModal} className="btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
          <div style={{ background:'#111', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'36px 32px', maxWidth:400, textAlign:'center' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:16 }}>⚠️</div>
            <h3 style={{ fontFamily:'Bebas Neue', fontSize:'1.5rem', marginBottom:12 }}>DELETE POST?</h3>
            <p style={{ color:'#888', marginBottom:28, fontFamily:'Barlow', fontSize:'0.9rem' }}>This action cannot be undone.</p>
            <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
              <button onClick={() => handleDelete(deleteId)} style={{ padding:'10px 24px', background:'#EF4444', border:'none', color:'white', cursor:'pointer', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.9rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Yes, Delete</button>
              <button onClick={() => setDeleteId(null)} className="btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
