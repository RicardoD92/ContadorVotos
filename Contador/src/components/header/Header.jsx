import React from 'react';
import axios from 'axios';

import './header.css';

import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useJwt } from 'react-jwt';
const Header = () => {
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  const [user, setUser] = useState(false);
  
  useEffect(()=>{
    if(token){
      if(isExpired){
        setUser(false);
      } else {
        setUser(true);
      }
    }
  },[token, isExpired])

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" style={{backgroundColor:"var(--light-blue)"}}>
      <Container>
        <Navbar.Brand href="/" style={{fontFamily:'PoppinsBold', fontSize: "24px"}}>VotAPP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <Nav.Link href="/" className="text-header" style={{fontFamily:'PoppinsRegular', fontSize: "18px"}}>Ingreso de datos</Nav.Link>
            )}
            {user && (
            <NavDropdown title=
               {<span style={{color:"white", fontFamily:"PoppinsRegular"}}>Resultados</span>} 
            className="text-header" style={{fontFamily:"PoppinsRegular"}}>
              <NavDropdown.Item href="/estadisticas">Totales</NavDropdown.Item>
              <NavDropdown.Item href="/estadisticas-seccion">
                Por Secciones
              </NavDropdown.Item>
            </NavDropdown>
            )}
          </Nav>
          <Nav className="ml-auto">
            {user ? (
              <Nav.Link onClick={() => {localStorage.removeItem('token'); window.location.reload()}} className="text-header" style={{fontFamily:'PoppinsRegular', fontSize: "18px"}}>Salir</Nav.Link>
            ) : <Nav.Link href="/auth" className="text-header" style={{fontFamily:'PoppinsRegular', fontSize: "18px"}}>Iniciar Sesión</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )}

export default Header