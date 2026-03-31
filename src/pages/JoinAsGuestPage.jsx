import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { submitGuestApp } from '../services/api'

const Input = ({ label, required, type='text', ...props }) => (
  <div style={{ marginBottom:20 }}>
    <label className="form-label">{label}{required && <span className="required">*</span>}</label>
    {type === 'textarea' ? (
      <textarea className="form-input" rows={4} style={{ resize:'vertical', minHeight:100 }} {...props} />
    ) : type === 'select' ? (
      <select className="form-input" style={{ cursor:'pointer' }} {...props}>
        {props.children}
      </select>
    ) : (
      <input type={type} className="form-input" {...props} />
    )}
  </div>
)

const RadioGroup = ({ label, name, options, value, onChange, required }) => (
  <div style={{ marginBottom:20 }}>
    <label className="form-label">{label}{required && <span className="required">*</span>}</label>
    <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginTop:8 }}>
      {options.map(opt => (
        <label key={opt.value} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', padding:'10px 16px', background: value===opt.value ? 'rgba(227,27,35,0.12)' : 'rgba(255,255,255,0.03)', border:`1px solid ${value===opt.value ? 'rgba(227,27,35,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius:4, transition:'all 0.3s' }}>
          <input type="radio" name={name} value={opt.value} checked={value===opt.value} onChange={onChange} style={{ accentColor:'#E31B23' }} />
          <span style={{ fontFamily:'Barlow', fontSize:'0.9rem', color: value===opt.value ? '#fff' : '#aaa' }}>{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
)

export default function JoinAsGuestPage() {
  const [form, setForm] = useState({
    fullName:'', email:'', phone:'', cityState:'',
    applyingFor:'myself', submitterName:'', submitterRole:'', submitterRelationship:'',
    businessName:'', industry:'', yearsInBusiness:'', website:'', instagram:'', linkedin:'', otherSocial:'',
    whatDidYouBuild:'', majorChallenge:'', whyValuable:'', topicsConfident:'',
    otherPodcasts:'no', otherPodcastLinks:'',
    availableInPerson:'yes', openToRemote:'yes', agreeToPromote:'yes',
    additionalInfo:'',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.fullName || !form.email) { toast.error('Full name and email are required'); return }
    setSubmitting(true)
    try {
      await submitGuestApp(form)
      setSubmitted(true)
      toast.success('Application submitted! We\'ll be in touch.')
    } catch (err) {
      toast.error('Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return (
    <>
      <Navbar />
      <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0A0A0A', padding:'120px 24px' }}>
        <div style={{ textAlign:'center', maxWidth:560 }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg, #E31B23, #A00D15)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', fontSize:'2rem' }}>✓</div>
          <h1 style={{ fontFamily:'Bebas Neue', fontSize:'3rem', letterSpacing:'0.04em', marginBottom:16 }}>APPLICATION <span style={{ color:'#E31B23' }}>RECEIVED!</span></h1>
          <p style={{ color:'#AAAAAA', lineHeight:1.8, marginBottom:32, fontSize:'1.05rem' }}>
            Thank you for applying to be a guest on The Relentless Podcast. Our team will review your story and reach out if you're a great fit.
          </p>
          <a href="/" className="btn-primary">Back to Home</a>
        </div>
      </div>
      <Footer />
    </>
  )

  const SectionHeader = ({ num, title, desc }) => (
    <div style={{ marginBottom:28, paddingBottom:20, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:8 }}>
        <div style={{ width:36, height:36, borderRadius:4, background:'linear-gradient(135deg, #E31B23, #A00D15)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bebas Neue', fontSize:'1.1rem', flexShrink:0 }}>{num}</div>
        <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'1.3rem', letterSpacing:'0.04em' }}>{title}</h2>
      </div>
      {desc && <p style={{ color:'#777', fontSize:'0.875rem', lineHeight:1.65, paddingLeft:50 }}>{desc}</p>}
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Be a Guest | The Relentless Podcast</title>
        <meta name="description" content="Apply to be a guest on The Relentless Podcast. We highlight founders who build with discipline, lead with integrity, and scale with intention." />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section style={{ background:'#0A0A0A', padding:'140px 24px 60px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 60% 40%, rgba(227,27,35,0.08) 0%, transparent 60%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:860, margin:'0 auto', position:'relative', zIndex:1 }}>
          <span style={{ fontFamily:'Barlow Condensed', fontWeight:700, fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#E31B23', display:'block', marginBottom:12 }}>Apply Now</span>
          <h1 style={{ fontFamily:'Bebas Neue', fontSize:'clamp(3rem, 7vw, 5.5rem)', letterSpacing:'0.02em', lineHeight:0.9, marginBottom:16 }}>
            BE OUR <span style={{ color:'#E31B23' }}>GUEST</span>
          </h1>
          <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:600, fontSize:'1.3rem', color:'#AAAAAA', marginBottom:16, letterSpacing:'0.02em' }}>Want to Be Featured on Relentless?</h2>
          <div style={{ width:60, height:3, background:'#E31B23', marginBottom:20 }} />
          <p style={{ color:'#999', fontSize:'1rem', lineHeight:1.8, maxWidth:640 }}>
            We highlight founders who build with discipline, lead with integrity, and scale with intention. If your journey includes growth, setbacks, leadership lessons, and sustainable success — you may be a great fit.
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ background:'#0A0A0A', padding:'0 24px 96px' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth:860, margin:'0 auto' }}>

          {/* Section 1: Contact */}
          <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'32px 36px', marginBottom:24 }}>
            <SectionHeader num="1" title="Contact Information" />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              <Input label="Full Name" required placeholder="John Smith" value={form.fullName} onChange={update('fullName')} />
              <Input label="Email Address" required type="email" placeholder="john@company.com" value={form.email} onChange={update('email')} />
              <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={update('phone')} />
              <Input label="City & State" required placeholder="Newark, NJ" value={form.cityState} onChange={update('cityState')} />
            </div>
            <RadioGroup
              label="Are you applying for yourself or someone else?"
              name="applyingFor" required
              options={[{ value:'myself', label:"I'm applying for myself" }, { value:'other', label:"I'm submitting on behalf of someone else" }]}
              value={form.applyingFor} onChange={update('applyingFor')}
            />
            {form.applyingFor === 'other' && (
              <div style={{ background:'rgba(227,27,35,0.05)', border:'1px solid rgba(227,27,35,0.15)', borderRadius:6, padding:20, marginTop:8 }}>
                <p style={{ color:'#888', fontSize:'0.82rem', marginBottom:16, fontFamily:'Barlow Condensed', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>Submitter Details</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
                  <Input label="Your Name" placeholder="Your full name" value={form.submitterName} onChange={update('submitterName')} />
                  <Input label="Your Role" placeholder="Manager, Agent, etc." value={form.submitterRole} onChange={update('submitterRole')} />
                  <Input label="Relationship to Guest" placeholder="Business partner, etc." value={form.submitterRelationship} onChange={update('submitterRelationship')} />
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Business */}
          <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'32px 36px', marginBottom:24 }}>
            <SectionHeader num="2" title="Business Information" />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              <Input label="Business Name" required placeholder="Acme Corp" value={form.businessName} onChange={update('businessName')} />
              <Input label="Industry" required placeholder="Construction, Tech, Real Estate..." value={form.industry} onChange={update('industry')} />
              <Input label="Years in Business" required placeholder="5 years" value={form.yearsInBusiness} onChange={update('yearsInBusiness')} />
              <Input label="Website" type="url" placeholder="https://yoursite.com" value={form.website} onChange={update('website')} />
              <Input label="Instagram" placeholder="@yourhandle" value={form.instagram} onChange={update('instagram')} />
              <Input label="LinkedIn" placeholder="linkedin.com/in/yourname" value={form.linkedin} onChange={update('linkedin')} />
            </div>
            <Input label="Other Social Link" placeholder="TikTok, YouTube, etc." value={form.otherSocial} onChange={update('otherSocial')} />
          </div>

          {/* Section 3: Story */}
          <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'32px 36px', marginBottom:24 }}>
            <SectionHeader num="3" title="Your Story" desc="Help us understand your entrepreneurial journey and what makes your story worth sharing." />
            <Input label="What did you build, and how did it start?" required type="textarea" placeholder="Tell us about your business and how you got started..." value={form.whatDidYouBuild} onChange={update('whatDidYouBuild')} />
            <Input label="What major challenge or failure shaped your journey?" required type="textarea" placeholder="Share a pivotal moment that defined who you are as an entrepreneur..." value={form.majorChallenge} onChange={update('majorChallenge')} />
            <Input label="What makes your story valuable to ambitious entrepreneurs?" required type="textarea" placeholder="Why should our listeners hear your story? What will they take away?" value={form.whyValuable} onChange={update('whyValuable')} />
            <Input label="What topics are you most confident speaking about?" required type="textarea" placeholder="Scaling, leadership, systems, sales, hiring, branding, mindset, investing..." value={form.topicsConfident} onChange={update('topicsConfident')} />
            <RadioGroup
              label="Have you been featured on other podcasts or media?"
              name="otherPodcasts" required
              options={[{ value:'yes', label:'Yes' }, { value:'no', label:'No' }]}
              value={form.otherPodcasts} onChange={update('otherPodcasts')}
            />
            {form.otherPodcasts === 'yes' && (
              <Input label="Please provide links" type="textarea" rows={3} placeholder="Links to previous podcast appearances or media features..." value={form.otherPodcastLinks} onChange={update('otherPodcastLinks')} />
            )}
          </div>

          {/* Section 4: Logistics */}
          <div style={{ background:'#111', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:'32px 36px', marginBottom:24 }}>
            <SectionHeader num="4" title="Logistics" />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24 }}>
              <RadioGroup label="Available for in-person recording in New Jersey?" name="availableInPerson"
                options={[{ value:'yes', label:'Yes' }, { value:'no', label:'No' }]}
                value={form.availableInPerson} onChange={update('availableInPerson')}
              />
              <RadioGroup label="Open to remote recording?" name="openToRemote"
                options={[{ value:'yes', label:'Yes' }, { value:'no', label:'No' }]}
                value={form.openToRemote} onChange={update('openToRemote')}
              />
              <RadioGroup label="Agree to promote the episode on your social platforms?" name="agreeToPromote"
                options={[{ value:'yes', label:'Yes' }, { value:'no', label:'No' }]}
                value={form.agreeToPromote} onChange={update('agreeToPromote')}
              />
            </div>
            <Input label="Anything else you'd like us to know?" type="textarea" placeholder="Any additional context, questions, or information you'd like to share..." value={form.additionalInfo} onChange={update('additionalInfo')} />
          </div>

          {/* Submit */}
          <div style={{ textAlign:'center', padding:'16px 0' }}>
            <button type="submit" className="btn-primary" disabled={submitting} style={{ fontSize:'1.05rem', padding:'16px 48px', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
              {submitting ? '⏳ Submitting...' : '🎙️ Submit My Application →'}
            </button>
            <p style={{ color:'#555', fontSize:'0.8rem', marginTop:16, fontFamily:'Barlow' }}>
              We review all applications and reach out to those who are a great fit within 2–3 weeks.
            </p>
          </div>
        </form>
      </section>

      <Footer />
      <style>{`
        @media(max-width:768px) {
          form > div div[style*="grid-template-columns: 1fr 1fr"],
          form > div div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          form > div { padding: 24px 20px !important; }
        }
      `}</style>
    </>
  )
}
