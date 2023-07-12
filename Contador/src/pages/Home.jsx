import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import  VoteFormList  from '../components/voteFormList/VoteFormList.jsx'

function Home() {
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