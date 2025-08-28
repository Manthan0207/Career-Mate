import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import { authStore } from './store/authStore'
import { useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

function App() {

  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = authStore();

    if (!isAuthenticated) {
      return <Navigate to='/signup' replace />
    }
    return children
  }

  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = authStore();

    if (isAuthenticated) {
      return <Navigate to='/landing-page' replace />
    }
    return children
  }

  const { isCheckingAuth, checkingAuth } = authStore();

  useEffect(() => {
    checkingAuth()
  }, [checkingAuth])

  if (isCheckingAuth) return <LoadingSpinner />

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        } />
      </Routes>
    </Router>
  )
}

export default App
