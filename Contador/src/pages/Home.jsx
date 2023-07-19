import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import  VoteFormList  from '../components/voteFormList/VoteFormList.jsx'
import { useNavigate } from 'react-router-dom'
import { isExpired, useJwt } from 'react-jwt'

function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { decodedToken, isExpired } = useJwt(token);
       

       useEffect(()=>{
        if(token){
          if(isExpired){
              localStorage.removeItem('token');
              navigate('/auth');
          }
        } else {
            navigate('/auth');
        }
       },[])

  return (
    <Container style={{minHeight: "600px"}}>
        <Row style={{marginBottom: "20px", marginTop: "20px"}}>
            <Col lg={12}>
                <div style={{fontFamily:'PoppinsBold', fontSize: "32px"}}>Ingresar votos</div>
            </Col>
        </Row>
        <Row>
            <Col lg={12} >
                <VoteFormList/>
            </Col>
        </Row>
    </Container>
  )
}

export default Home