import React,{useEffect, useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import configJson from '../utils/config.json'
import { useNavigate } from 'react-router-dom'
import { useJwt } from 'react-jwt'
import { useHeaderContext } from '../utils/headerContext';

function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        passwordWrong: false
    });
    const navigate = useNavigate();
    const { setHeaderState } = useHeaderContext();

    const token = localStorage.getItem("token");
       if(token){
           const { decodedToken, isExpired } = useJwt(token);
           if(isExpired){
               localStorage.removeItem('token');
               localStorage.removeItem('type');
           } else {
                navigate('/')
           }
       } 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const form = {
            username: username,
            password: password 
        }
    try{
        const result = await axios.post(configJson.backend_url + 'auth/login', form);
        if(result.data.code===200){
            localStorage.setItem("token", result.data.data.token);
            const currentDate = Date.now();
            const expirationDate = currentDate + 43200 * 1000;
            localStorage.setItem("expire_token_in", expirationDate / 1000);
            localStorage.setItem("type", result.data.data.type);
            setErrors({
                passwordWrong: false
            })
            setHeaderState(true);
            if(username === 'ingresante'){
                navigate('/')
            } else if(username === 'resultado'){
                navigate('/estadisticas')
            } else if(username === 'admin'){
                navigate('/estadisticas')
            }
        }
    }catch(e){
        setErrors({
            passwordWrong: true
        })
      }
    }
    
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="mt-5">
          <Form>
            <Form.Group controlId="formUsername" style={{marginBottom: "20px"}}>
              <Form.Label style={{fontFamily:'PoppinsRegular'}}>Usuario</Form.Label>
              <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Ingresa tu usuario" />
            </Form.Group>

            <Form.Group controlId="formPassword" style={{marginBottom: "20px"}}>
              <Form.Label style={{fontFamily:'PoppinsRegular'}}>Contraseña</Form.Label>
              <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Ingresa tu contraseña" />
            </Form.Group>
            <div className="message-error" style={{marginLeft: "20px", marginBottom: "10px"}}>{errors.passwordWrong && '* Contraseña o usuario invalido. Intente nuevamente'}</div>
            <Button variant="primary" type="submit" onClick={handleSubmit} style={{width: "100%", fontFamily:'PoppinsRegular', backgroundColor:"#37bbed", borderColor:"#37bbed"}}>
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Auth