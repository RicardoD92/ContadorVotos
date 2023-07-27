import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import TablaPorSection from '../components/table/TablaPorSection'
function Stats_section() {
  return (
    <Container className="mt-5">
        <Row>
            <Col lg={12}>
              <TablaPorSection/>
            </Col>
        </Row>
    </Container>
  )
}

export default Stats_section