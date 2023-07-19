
import './App.css'
import Header from './components/header/Header'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Stats from './pages/Stats'
import Auth from './pages/Auth'
import Stats_scholl from './pages/Stats_scholl'
function App() {
  
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/estadisticas" element={<Stats />} />
      <Route path="/estadisticas-escuela" element={<Stats_scholl />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </>

  )
}

export default App
