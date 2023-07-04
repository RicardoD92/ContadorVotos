import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import  VoteFormList  from '../components/voteFormList/VoteFormList.jsx'

function Home() {
  return (
    <Container>
        <Row>
            <Col lg={12}>
                <h1>Home</h1>
            </Col>
        </Row>
        <Row>
            <Col lg={12}>
                <VoteFormList/>
            </Col>
        </Row>
    </Container>
  )
}

export default Home