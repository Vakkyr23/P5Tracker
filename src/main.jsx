import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Ask the browser to exempt this origin's storage from automatic eviction —
// belt-and-braces for a browser that clears site data on close (v3.6.0).
// Fire-and-forget: unsupported browsers just skip it.
navigator.storage?.persist?.().catch(() => {});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
