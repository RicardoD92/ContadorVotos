import React from 'react'
import {Row, Col} from 'react-bootstrap'

function Footer() {
    return (
      <div style={{ backgroundColor: 'var(--light-blue)', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Row>
          <Col lg={12}>
            {/* Contenido del footer */}
          </Col>
        </Row>
      </div>
    );
  }
  
  
export default Footer