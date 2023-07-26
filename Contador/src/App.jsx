
import './App.css'
import Header from './components/header/Header'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Stats from './pages/Stats'
import Auth from './pages/Auth'
import Stats_scholl from './pages/Stats_scholl'
import PrivateRoute from './utils/PrivateRoute'
function App() {
  
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/estadisticas" element={<PrivateRoute><Stats /></PrivateRoute>} />
      <Route path="/estadisticas-escuela" element={<PrivateRoute><Stats_scholl /></PrivateRoute>} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </>

  )
}

export default App
