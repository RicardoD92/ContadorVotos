
import './App.css'
import Header from './components/header/Header'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Stats from './pages/Stats'
import Auth from './pages/Auth'
import Stats_scholl from './pages/Stats_scholl'
import PrivateRoute from './utils/PrivateRoute'
import Stats_section from './pages/Stats_section'
import Stats_mesa from './pages/Stats_mesa'
import List_of_votos from './pages/List_of_votos'
function App() {
  
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/estadisticas" element={<PrivateRoute><Stats /></PrivateRoute>} />
      <Route path="/estadisticas-establecimiento" element={<PrivateRoute><Stats_scholl /></PrivateRoute>} />
      <Route path="/estadisticas-seccion" element={<PrivateRoute><Stats_section /></PrivateRoute>} />
      <Route path="/estadisticas-mesa" element={<PrivateRoute><Stats_mesa /></PrivateRoute>} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/votos" element={<PrivateRoute><List_of_votos /></PrivateRoute>} />
    </Routes>
  </>

  )
}

export default App
