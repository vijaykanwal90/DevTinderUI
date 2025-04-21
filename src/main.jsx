import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { Toaster } from './components/ui/toaster'
import axios from 'axios';
import { BASE_URL } from './constants';
// 1) Set the base URL
axios.defaults.baseURL = BASE_URL; 
// e.g. "http://localhost:3000"

// 2) If you ever switch to HttpOnly cookies
axios.defaults.withCredentials = true;

// 3) Attach the token on every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
import { Toaster , toast } from 'sonner'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster richColors position="top-right" expand={false}  duration={3000} />
    
  </StrictMode>,
)
