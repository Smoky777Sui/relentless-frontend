import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

// Public pages
import HomePage from './pages/HomePage'
import EpisodesPage from './pages/EpisodesPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import JoinAsGuestPage from './pages/JoinAsGuestPage'

// Admin pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPodcasts from './pages/admin/AdminPodcasts'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminGuests from './pages/admin/AdminGuests'
import AdminLayout from './components/admin/AdminLayout'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0A0A0A' }}>
      <div style={{ width:40, height:40, border:'3px solid #E31B23', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
    </div>
  )
  return user ? children : <Navigate to="/admin/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/episodes" element={<EpisodesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/join" element={<JoinAsGuestPage />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="podcasts" element={<AdminPodcasts />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="guests" element={<AdminGuests />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1A1A1A', color: '#F5F5F5', border: '1px solid rgba(227,27,35,0.3)', fontFamily: 'Barlow, sans-serif' },
            success: { iconTheme: { primary: '#E31B23', secondary: '#F5F5F5' } },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  )
}
