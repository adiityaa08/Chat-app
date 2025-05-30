import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { FontSizeProvider } from './components/fontsize.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FontSizeProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </FontSizeProvider>
  </StrictMode>,
)
