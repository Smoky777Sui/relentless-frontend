import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { getGuests, updateGuestStatus, deleteGuest } from '../../services/api'

const STATUS_OPTS = ['pending', 'reviewed', 'approved', 'rejected']

export default function AdminGuests() {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewGuest, setViewGuest] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [filter, setFilter] = useState('all')

  const load = () => {
    setLoading(true)
    getGuests().then(d => { setGuests(d); setLoading(false) }).catch(() => setLoading(false))
  }
  useEffect(load, [])

  const handleStatus = async (id, status) => {
    try {
      await updateGuestStatus(id, status)
      toast.success(`Status updated to ${status}`)
      load()
      if (viewGuest?.id === id) setViewGuest(g => ({ ...g, status }))
    } catch { toast.error('Failed to update status') }
  }

  const handleDelete = async (id) => {
    try {
      await deleteGuest(id)
      toast.success('Application deleted')
      setDeleteId(null); setViewGuest(null); load()
    } catch { toast.error('Delete failed') }
  }

  const filtered = filter === 'all' ? guests : guests.filter(g => g.status === filter)
  const counts = STATUS_OPTS.reduce((acc, s) => ({ ...acc, [s]: guests.filter(g => g.status === s).length }), {})

  return (
    <div style={{ padding:'32px 36px', minHeight:'100vh' }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontFamily:'Bebas Neue', fontSize:'2.5rem', letterSpacing:'0.04em' }}>GUEST <span style={{ color:'#E31B23' }}>APPLICATIONS</span></h1>
        <div style={{ width:50, height:3, background:'#E31B23', marginTop:8 }} />
      </div>

      {/* Filter tabs */}
      <div style={{ display:'flex', gap:10, marginBottom:28, flexWrap:'wrap' }}>
        {['all', ...STATUS_OPTS].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding:'8px 18px', borderRadius:4, cursor:'pointer', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.3s',
            background: filter===s ? '#E31B23' : 'rgba(255,255,255,0.04)',
            border: filter===s ? 'none' : '1px solid rgba(255,255,255,0.08)',
            color: filter===s ? 'white' : '#888',
          }}>
            {s === 'all' ? `All (${guests.length})` : `${s} (${counts[s] || 0})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
          <div style={{ width:40, height:40, border:'3px solid #E31B23', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'80px 0', color:'#555' }}>
          <div style={{ fontSize:'3rem', marginBottom:16 }}>👥</div>
          <p>No applications {filter !== 'all' ? `with status "${filter}"` : 'yet'}.</p>
        </div>
      ) : (
        <div style={{ display:'grid', gap:14 }}>
          {filtered.map(g => (
            <div key={g.id} style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'18px 24px', display:'flex', gap:16, alignItems:'center', transition:'border-color 0.3s', cursor:'pointer' }}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(227,27,35,0.2)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'}
              onClick={() => setViewGuest(g)}
            >
              <div style={{ width:44, height:44, borderRadius:'50%', background:'linear-gradient(135deg, #2A2A2A, #333)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.1rem', color:'#aaa', flexShrink:0 }}>
                {g.contact?.fullName?.[0] || '?'}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
                  <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'1.05rem', color:'#eee', letterSpacing:'0.02em' }}>{g.contact?.fullName}</h3>
                  <span className={`status-badge status-${g.status}`}>{g.status}</span>
                </div>
                <p style={{ color:'#555', fontSize:'0.82rem', fontFamily:'Barlow', marginTop:2 }}>
                  {g.business?.businessName || 'N/A'} · {g.business?.industry || 'N/A'} · {g.contact?.cityState || 'N/A'}
                </p>
                <p style={{ color:'#444', fontSize:'0.75rem', fontFamily:'Barlow', marginTop:2 }}>
                  {g.contact?.email} · Submitted {new Date(g.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <div style={{ display:'flex', gap:8, flexShrink:0 }} onClick={e=>e.stopPropagation()}>
                <select value={g.status} onChange={e=>handleStatus(g.id, e.target.value)} style={{ background:'#1A1A1A', border:'1px solid rgba(255,255,255,0.1)', color:'#aaa', padding:'7px 12px', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.8rem', cursor:'pointer', textTransform:'uppercase', letterSpacing:'0.04em' }}>
                  {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => setDeleteId(g.id)} style={{ padding:'8px 12px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#EF4444', cursor:'pointer', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', transition:'all 0.3s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,0.2)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(239,68,68,0.1)'}
                >🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Details Modal */}
      {viewGuest && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:1000, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:24, overflowY:'auto' }} onClick={e => { if(e.target===e.currentTarget) setViewGuest(null) }}>
          <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'36px 32px', width:'100%', maxWidth:700, marginTop:40, marginBottom:40 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28, flexWrap:'wrap', gap:12 }}>
              <div>
                <h2 style={{ fontFamily:'Bebas Neue', fontSize:'1.8rem', letterSpacing:'0.04em' }}>{viewGuest.contact?.fullName}</h2>
                <span className={`status-badge status-${viewGuest.status}`}>{viewGuest.status}</span>
              </div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                {STATUS_OPTS.filter(s => s !== viewGuest.status).map(s => (
                  <button key={s} onClick={() => handleStatus(viewGuest.id, s)} style={{ padding:'7px 14px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#aaa', cursor:'pointer', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.78rem', letterSpacing:'0.06em', textTransform:'uppercase', transition:'all 0.3s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)'; e.currentTarget.style.color='#fff'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='#aaa'}}
                  >→ {s}</button>
                ))}
                <button onClick={() => setViewGuest(null)} style={{ padding:'7px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#666', cursor:'pointer', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'0.78rem', textTransform:'uppercase', transition:'all 0.3s' }}>✕ Close</button>
              </div>
            </div>

            {/* Contact */}
            <Section title="Contact Information">
              <Row label="Email" value={viewGuest.contact?.email} />
              <Row label="Phone" value={viewGuest.contact?.phone} />
              <Row label="Location" value={viewGuest.contact?.cityState} />
              <Row label="Applying For" value={viewGuest.contact?.applyingFor === 'other' ? `On behalf of someone else (${viewGuest.contact?.submitterName})` : 'Themselves'} />
            </Section>

            {/* Business */}
            <Section title="Business Information">
              <Row label="Business" value={viewGuest.business?.businessName} />
              <Row label="Industry" value={viewGuest.business?.industry} />
              <Row label="Years in Business" value={viewGuest.business?.yearsInBusiness} />
              <Row label="Website" value={viewGuest.business?.website} link={viewGuest.business?.website} />
              <Row label="Instagram" value={viewGuest.business?.instagram} />
              <Row label="LinkedIn" value={viewGuest.business?.linkedin} />
            </Section>

            {/* Story */}
            <Section title="Their Story">
              <LongRow label="What did they build?" value={viewGuest.story?.whatDidYouBuild} />
              <LongRow label="Major challenge/failure" value={viewGuest.story?.majorChallenge} />
              <LongRow label="Why valuable to listeners?" value={viewGuest.story?.whyValuable} />
              <LongRow label="Confident topics" value={viewGuest.story?.topicsConfident} />
              {viewGuest.story?.otherPodcasts === 'yes' && <LongRow label="Previous podcast links" value={viewGuest.story?.otherPodcastLinks} />}
            </Section>

            {/* Logistics */}
            <Section title="Logistics">
              <Row label="In-Person (NJ)" value={viewGuest.logistics?.availableInPerson === 'yes' ? '✓ Yes' : '✗ No'} />
              <Row label="Remote Recording" value={viewGuest.logistics?.openToRemote === 'yes' ? '✓ Yes' : '✗ No'} />
              <Row label="Will Promote" value={viewGuest.logistics?.agreeToPromote === 'yes' ? '✓ Yes' : '✗ No'} />
            </Section>

            {viewGuest.additionalInfo && <LongRow label="Additional Info" value={viewGuest.additionalInfo} />}
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:1001, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
          <div style={{ background:'#111', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'36px 32px', maxWidth:400, textAlign:'center' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:16 }}>⚠️</div>
            <h3 style={{ fontFamily:'Bebas Neue', fontSize:'1.5rem', marginBottom:12 }}>DELETE APPLICATION?</h3>
            <p style={{ color:'#888', marginBottom:28, fontFamily:'Barlow', fontSize:'0.9rem' }}>This cannot be undone.</p>
            <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
              <button onClick={() => handleDelete(deleteId)} style={{ padding:'10px 24px', background:'#EF4444', border:'none', color:'white', cursor:'pointer', borderRadius:4, fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.9rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Delete</button>
              <button onClick={() => setDeleteId(null)} className="btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

const Section = ({ title, children }) => (
  <div style={{ marginBottom:24 }}>
    <h3 style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#E31B23', marginBottom:12, paddingBottom:8, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>{title}</h3>
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
  </div>
)

const Row = ({ label, value, link }) => value ? (
  <div>
    <p style={{ color:'#555', fontSize:'0.72rem', fontFamily:'Barlow Condensed', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:2 }}>{label}</p>
    {link ? <a href={link} target="_blank" rel="noreferrer" style={{ color:'#ddd', fontSize:'0.875rem', fontFamily:'Barlow', textDecoration:'underline', textDecorationColor:'rgba(255,255,255,0.2)' }}>{value}</a>
    : <p style={{ color:'#ddd', fontSize:'0.875rem', fontFamily:'Barlow' }}>{value}</p>}
  </div>
) : null

const LongRow = ({ label, value }) => value ? (
  <div style={{ gridColumn:'1 / -1', marginBottom:12 }}>
    <p style={{ color:'#555', fontSize:'0.72rem', fontFamily:'Barlow Condensed', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>{label}</p>
    <p style={{ color:'#ccc', fontSize:'0.875rem', fontFamily:'Barlow', lineHeight:1.7, background:'rgba(255,255,255,0.03)', borderRadius:4, padding:'12px 14px', borderLeft:'3px solid rgba(227,27,35,0.3)' }}>{value}</p>
  </div>
) : null
