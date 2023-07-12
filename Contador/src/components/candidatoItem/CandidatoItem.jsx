import React, { useState } from "react";
import { Form } from 'react-bootstrap';

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
    setInputValue(newValue);
    onInputChange(candidato.id, newValue,type);
  };

  return (
    <div>
      <div style={{fontFamily: 'PoppinsRegular'}}><b>Candidato:</b> {candidato.name_pres ? candidato.name_pres : candidato.name_gob ? candidato.name_gob : candidato.name_int}</div>
      <Form style={{width:"100px"}}>
      <Form.Group controlId="numberInput">
        <Form.Control
          type="number"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
    </div>
  );
};

export default CandidatoItem;
