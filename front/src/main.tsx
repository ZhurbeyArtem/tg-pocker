import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import 'swiper/css';

import App from './App.tsx'

import './index.css'
import './styles/index.css'

import './18n.ts'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loadin...</div>}>
      <App />
      <ToastContainer />
    </Suspense>
  </React.StrictMode>,
)
