import React, { useState } from "react";
import { Form, Row, Col } from 'react-bootstrap';

const CandidatoItem = ({ candidato, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");
    
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    var type = "";
    if(candidato.name_pres){
        type = "presidente";
    } else if(candidato.name_gob){
        type = "gobernador";
    } else {
        type = "intendente";
    }
    if (/^\d{0,3}$/.test(newValue)) {
      setInputValue(newValue);
    }
    onInputChange(candidato.id, newValue,type);
  };

  return (
    <div>
      <Row style={{marginBottom: "16px"}}>
        <Col lg={7}>
        <div style={{fontFamily: 'PoppinsRegular', marginBottom: "10px"}}><b>{candidato.name_pres ? candidato.name_pres+" - "+candidato.name_vice : candidato.name_gob ? candidato.name_gob : candidato.name_int} </b></div>
        </Col>
        <Col lg={2}>
          <Form style={{width:"100px"}}>
            <Form.Group controlId="numberInput">
              <Form.Control
                type="number"
                value={inputValue}
                placeholder="Votos"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CandidatoItem;
