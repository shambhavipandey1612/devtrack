import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from "./context/toastcontext.tsx";
import { NotificationProvider } from './context/notificationcontext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <NotificationProvider>
    <App />
    </NotificationProvider>
    </ToastProvider>
  </StrictMode>,
)
