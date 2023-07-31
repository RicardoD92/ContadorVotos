import React,{Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { HeaderContextProvider } from './utils/headerContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback="loading">
    <HeaderContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </HeaderContextProvider>
    </Suspense>
  </React.StrictMode>,
)
