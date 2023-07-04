import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PieChart from '../components/charts/PieChart.jsx'

function Stats() {

    
    const data = [
        {
          id: 1,
          nombre: 'Frente para la victoria',
          votos: 240,
        },
        {
          id: 2,
          nombre: 'Frente para el cambio',
          votos: 290,
        },
      ];

  return (
    <Container>
        <Row>
            <Col lg={12}>
                <h1>Estadisticas</h1>
            </Col>
        </Row>
        <Row>
            <Col lg={4}>
                <PieChart data={data} />
            </Col>
        </Row>
    </Container>
  )
}

export default Stats