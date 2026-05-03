import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Assessment from './pages/Assessment'
import Roadmap from './pages/Roadmap'
import Jobs from './pages/Jobs'
import Passport from './pages/Passport'
import Evaluate from './pages/Evaluate'

function PrivateRoute({ children }) {
  const user = localStorage.getItem('spf_user')
  return user ? children : <Navigate to="/auth" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/assessment" element={<PrivateRoute><Assessment /></PrivateRoute>} />
        <Route path="/roadmap" element={<PrivateRoute><Roadmap /></PrivateRoute>} />
        <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/passport" element={<PrivateRoute><Passport /></PrivateRoute>} />
        <Route path="/evaluate" element={<PrivateRoute><Evaluate /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}