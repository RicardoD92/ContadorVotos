import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css';

import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const App = () => {
  const [localidades, setLocalidades] = useState([]);
  const [escuelas, setEscuelas] = useState([]);

  useEffect(() => {
    // Realizar la llamada a la API 
    fetch('API_JULI')
      .then(response => response.json())
      .then(data => {
        // Actualizar estado API
        setLocalidades(data.localidades);
        setEscuelas(data.escuelas);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Localidad</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Escuelas
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )}
}

export default Header