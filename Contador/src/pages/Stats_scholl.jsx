import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import TableComplete
 from '../components/table/TableComplete'
function Stats_scholl() {
  return (
    <Container className="mt-5">
        <Row>
            <Col lg={12}>
              <TableComplete/>
            </Col>
        </Row>
    </Container>
  )
}

export default Stats_scholl