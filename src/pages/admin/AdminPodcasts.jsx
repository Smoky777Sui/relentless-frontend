import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { getPodcasts, createPodcast, updatePodcast, deletePodcast } from '../../services/api'

const initForm = { title:'', description:'', youtubeUrl:'', guest:'', featured:false }

export default function AdminPodcasts() {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(initForm)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const load = () => {
    setLoading(true)
    getPodcasts().then(d => { setEpisodes(d); setLoading(false) }).catch(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => { setForm(initForm); setEditId(null); setShowModal(true) }
  const openEdit = (ep) => { setForm({ title:ep.title, description:ep.description||'', youtubeUrl:ep.youtubeUrl, guest:ep.guest||'', featured:ep.featured||false }); setEditId(ep.id); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setForm(initForm); setEditId(null) }

  const handleSave = async () => {
    if (!form.title || !form.youtubeUrl) { toast.error('Title and YouTube URL required'); return }
    setSaving(true)
    try {
      if (editId) {
        await updatePodcast(editId, form)
        toast.success('Episode updated!')
      } else {
        await createPodcast(form)
        toast.success('Episode added!')
      }
      closeModal(); load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    try {
      await deletePodcast(id)
      toast.success('Episode deleted')
      setDeleteId(null); load()
    } catch { toast.error('Delete failed') }
  }

  return (
    <div style={{ padding:'32px 36px', minHeight:'100vh' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32, flexWrap:'wrap', gap:16 }}>
        <div>
          <h1 style={{ fontFamily:'Bebas Neue', fontSize:'2.5rem', letterSpacing:'0.04em' }}>MANAGE <span style={{ color:'#E31B23' }}>EPISODES</span></h1>
          <div style={{ width:50, height:3, background:'#E31B23', marginTop:8 }} />
        </div>
        <button onClick={openAdd} className="btn-primary">+ Add Episode</button>
      </div>

      {loading ? (
        <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
          <div style={{ width:40, height:40, border:'3px solid #E31B23', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
        </div>
      ) : episodes.length === 0 ? (
        <div style={{ textAlign:'center', padding:'80px 0', color:'#555' }}>
          <div style={{ fontSize:'3rem', marginBottom:16 }}>🎙️</div>
          <p>No episodes yet. Add your first episode!</p>
        </div>
      ) : (
        <div style={{ display:'grid', gap:16 }}>
          {episodes.map(ep => (
            <div key={ep.id} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'20px 24px', display:'flex', gap:20, alignItems:'center', transition:'border-color 0.3s' }}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(227,27,35,0.2)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'}
            >
              <img src={ep.thumbnail || `https://img.youtube.com/vi/${ep.youtubeId}/default.jpg`} alt={ep.title}
                style={{ width:100, height:64, objectFit:'cover', borderRadius:4, background:'#222', flexShrink:0 }}
                onError={e=>e.target.style.display='none'}
              />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:4, flexWrap:'wrap' }}>
                  <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.05rem', color:'#eee', letterSpacing:'0.02em' }}>{ep.title}</h3>
                  {ep.featured && <span className="tag">Featured</span>}
                </div>
                {ep.guest && <p style={{ color:'#E31B23', fontSize:'0.8rem', fontFamily:'Barlow Condensed', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>ft. {ep.guest}</p>}
                <p style={{ color:'#555', fontSize:'0.82rem', fontFamily:'Barlow' }}>{new Date(ep.publishedAt).toLocaleDateString()} · <a href={ep.youtubeUrl} target="_blank" rel="noreferrer" style={{ color:'#666', textDecoration:'none' }}>YouTube ↗</a></p>
              </div>
              <div style={{ display:'flex', gap:10, flexShrink:0 }}>
                <button onClick={() => openEdit(ep)} style={{ padding:'8px 16px', background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.2)', color:'#3B82F6', cursor:'pointer', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.3s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.2)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(59,130,246,0.1)'}
                >Edit</button>
                <button onClick={() => setDeleteId(ep.id)} style={{ padding:'8px 16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#EF4444', cursor:'pointer', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.3s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,0.2)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(239,68,68,0.1)'}
                >Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }} onClick={e => { if(e.target===e.currentTarget) closeModal() }}>
          <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'36px 32px', width:'100%', maxWidth:560, maxHeight:'90vh', overflowY:'auto' }}>
            <h2 style={{ fontFamily:'Bebas Neue', fontSize:'1.8rem', letterSpacing:'0.04em', marginBottom:24 }}>{editId ? 'EDIT' : 'ADD'} <span style={{ color:'#E31B23' }}>EPISODE</span></h2>
            <div style={{ marginBottom:16 }}>
              <label className="form-label">Title <span className="required">*</span></label>
              <input className="form-input" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Episode title..." />
            </div>
            <div style={{ marginBottom:16 }}>
              <label className="form-label">YouTube URL <span className="required">*</span></label>
              <input className="form-input" value={form.youtubeUrl} onChange={e=>setForm(f=>({...f,youtubeUrl:e.target.value}))} placeholder="https://youtu.be/..." />
            </div>
            <div style={{ marginBottom:16 }}>
              <label className="form-label">Guest Name</label>
              <input className="form-input" value={form.guest} onChange={e=>setForm(f=>({...f,guest:e.target.value}))} placeholder="Guest full name..." />
            </div>
            <div style={{ marginBottom:20 }}>
              <label className="form-label">Description</label>
              <textarea className="form-input" rows={4} style={{ resize:'vertical' }} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="Episode description..." />
            </div>
            <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', marginBottom:24 }}>
              <input type="checkbox" checked={form.featured} onChange={e=>setForm(f=>({...f,featured:e.target.checked}))} style={{ accentColor:'#E31B23', width:16, height:16 }} />
              <span style={{ fontFamily:'Barlow', color:'#ccc', fontSize:'0.9rem' }}>Mark as Featured Episode</span>
            </label>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex:1, justifyContent:'center', opacity:saving?0.7:1, cursor:saving?'not-allowed':'pointer' }}>
                {saving ? 'Saving...' : (editId ? 'Save Changes' : 'Add Episode')}
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
            <h3 style={{ fontFamily:'Bebas Neue', fontSize:'1.5rem', marginBottom:12 }}>DELETE EPISODE?</h3>
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
