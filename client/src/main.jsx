import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import './index.css'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim()
const hasValidGoogleClientId = Boolean(
  GOOGLE_CLIENT_ID &&
  !GOOGLE_CLIENT_ID.includes('YOUR_') &&
  !GOOGLE_CLIENT_ID.includes('your-') &&
  !GOOGLE_CLIENT_ID.includes('example')
)

if (!hasValidGoogleClientId) {
  console.warn('Google OAuth is not configured yet. Set VITE_GOOGLE_CLIENT_ID to enable Google login.')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {hasValidGoogleClientId ? (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>,
)
