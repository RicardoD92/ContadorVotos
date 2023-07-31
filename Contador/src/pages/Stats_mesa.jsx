import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import TablaPorMesa from '../components/table/TablaPorMesa'
function Stats_section() {
  return (
    <Container className="mt-5">
        <Row>
            <Col lg={12}>
              <TablaPorMesa/>
            </Col>
        </Row>
    </Container>
  )
}

export default Stats_section