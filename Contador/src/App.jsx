
import './App.css'
import Header from './components/header/Header'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Stats from './pages/Stats'
import Footer from './components/footer/Footer'
function App() {
  
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/estadisticas" element={<Stats />} />
    </Routes>
  </>

  )
}

export default App
