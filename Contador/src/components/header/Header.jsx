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
  console.log(user);
  useEffect(()=>{
    if(token){
      if(isExpired){
        setUser(false);
      } else {
        setUser(true);
      }
    }
  },[token, isExpired])

  const setNavByUser = () => {
    if(user){
      const type = localStorage.getItem('type');
      if(type === "admin"){
        return (
          <>
            <Nav className="me-auto">
              <Nav.Link href="/" className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px" }}>Ingreso de datos</Nav.Link>
              <NavDropdown title={<span style={{ color: "white", fontFamily: "PoppinsRegular" }}>Resultados</span>}
                className="text-header" style={{ fontFamily: "PoppinsRegular" }}>
                <NavDropdown.Item href="/estadisticas">Totales</NavDropdown.Item>
                <NavDropdown.Item href="/estadisticas-establecimiento">
                  Por establecimientos
                </NavDropdown.Item>
                <NavDropdown.Item href="/estadisticas-seccion">
                  Por Secciones
                </NavDropdown.Item>
              </NavDropdown>
              </Nav><Nav className="ml-auto">
              <Nav.Link onClick={() => { localStorage.removeItem('token'); window.location.reload(); } } className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px" }}>Salir</Nav.Link>
            </Nav></>
        );
        } else if(type === "carga") {
          return (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/" className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px" }}>Ingreso de datos</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link onClick={() => { localStorage.removeItem('token'); window.location.reload(); } } className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px" }}>Salir</Nav.Link>
              </Nav>
            </>
          );
        } else if(type === "resultado"){
          return (
            <>
              <Nav className="me-auto">
                <NavDropdown title={<span style={{ color: "white", fontFamily: "PoppinsRegular" }}>Resultados</span>}
                  className="text-header" style={{ fontFamily: "PoppinsRegular" }}>
                  <NavDropdown.Item href="/estadisticas">Totales</NavDropdown.Item>
                  <NavDropdown.Item href="/estadisticas-establecimiento">
                    Por establecimientos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/estadisticas-seccion">
                    Por Secciones
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link onClick={() => { localStorage.removeItem('token'); window.location.reload(); } } className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px" }}>Salir</Nav.Link>
              </Nav>
            </>
          );
        }
    } else {
      return (
        <>
          <Nav className="me-auto">
              <Nav.Link href="/auth" className="text-header" style={{ fontFamily: 'PoppinsRegular', fontSize: "18px" }}>Iniciar Sesión</Nav.Link>
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