import React from 'react';
import { useHeaderContext } from '../../utils/headerContext';
import './header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useJwt } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [token, setToken] = useState('');
  const { decodedToken, isExpired } = useJwt(token);
  const [user, setUser] = useState(false);
  const { headerState, setHeaderState } = useHeaderContext();
  const navigate = useNavigate();
 
  const handleDownload = async () => {
    try {
      const response = await axios.get('http://45.229.251.93:3002/votos/descargar-votos', {
        responseType: 'blob', // Importante: indicar que la respuesta es un archivo blob
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      // Simular el clic en el enlace para iniciar la descarga
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Elecciones2023.xlsx'; // Cambiar el nombre del archivo según sea necesario
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el archivo', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  },[]);

  useEffect(() => {
    if(token){
      setHeaderState(true);
      const currentDate = Date.now() / 1000;
      if(currentDate > localStorage.getItem('expire_token_in')){
        setHeaderState(false);
        localStorage.removeItem('token');
        localStorage.removeItem('type');
      }
    }
  },[token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setHeaderState(false);
    navigate('/auth');
  };
  const setNavByUser = () => {
    if (headerState) {
      const type = localStorage.getItem('type');
      if (type === "admin") {
        return (
          <>
            <Nav className="me-auto">
              <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Link to="/" className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px" }}>Ingreso de datos</Link>
              </div>
              <NavDropdown title={<span style={{ color: "white", fontFamily: "PoppinsRegular" }}>Resultados</span>}
                className="text-header" style={{ fontFamily: "PoppinsRegular" }}>
                <Link className="navOption" to="/estadisticas">Totales</Link><br/>
                <Link className="navOption" to="/estadisticas-establecimiento">
                  Por establecimientos
                </Link><br/>
                <Link className="navOption" to="/estadisticas-seccion">
                  Por Secciones
                </Link><br/>
                <Link className="navOption" to="/estadisticas-mesa">
                  Por Mesa
                </Link><br/>
                <Link className="navOption" to="/" onClick={handleDownload}>Descargar resultados</Link><br/>
                <Link className="navOption" to="/votos">Ver votos</Link><br/>
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
              <span onClick={handleLogout} className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px", cursor: "pointer" }}>
                Salir
              </span>
            </Nav>
          </>
        );
      } else if (type === "carga") {
        return (
          <>
            <Nav className="me-auto">
              <Link to="/" className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px" }}>Ingreso de datos</Link>
            </Nav>
            <Nav className="ml-auto">
              <span onClick={handleLogout} className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px", cursor: "pointer" }}>
                Salir
              </span>
            </Nav>
          </>
        );
      } else if (type === "resultado") {
        return (
          <>
            <Nav className="me-auto">
              <NavDropdown title={<span style={{ color: "white", fontFamily: "PoppinsRegular" }}>Resultados</span>}
                className="text-header" style={{ fontFamily: "PoppinsRegular" }}>
                <Link className="navOption" to="/estadisticas">Totales</Link><br/>
                <Link className="navOption" to="/estadisticas-establecimiento">
                  Por Establecimientos
                </Link><br/>
                <Link className="navOption" to="/estadisticas-seccion">
                  Por Secciones
                </Link><br/>
                <Link className="navOption" to="/estadisticas-mesa">
                  Por Mesas
                </Link><br/>
                <Link className="navOption" to="/" onClick={handleDownload}>Descargar resultados</Link>
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
              <span onClick={handleLogout} className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px", cursor: "pointer" }}>
                Salir
              </span>
            </Nav>
          </>
        );
      }
    } else {
      return (
        <>
          <Nav className="me-auto">
            <Link to="/auth" className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px" }}>Iniciar Sesión</Link>
          </Nav>
        </>
      )
    }
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" style={{backgroundColor:"#37bbed"}}>
      <Container>
        <Navbar.Brand href="/" style={{fontFamily:'PoppinsBold', fontSize: "24px"}}>VotAPP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          { setNavByUser() }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )}

export default Header