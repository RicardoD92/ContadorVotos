import React from 'react';
import axios from 'axios';

import './header.css';

import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => {



  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" style={{backgroundColor:"var(--light-blue)"}}>
      <Container>
        <Navbar.Brand href="/" style={{fontFamily:'PoppinsBold', fontSize: "24px"}}>VotAPP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-header" style={{fontFamily:'PoppinsRegular', fontSize: "18px"}}>Ingreso de datos</Nav.Link>
            <Nav.Link href="/estadisticas" className="text-header" style={{fontFamily:'PoppinsRegular', fontSize: "18px"}}>Estadisticas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )}

export default Header