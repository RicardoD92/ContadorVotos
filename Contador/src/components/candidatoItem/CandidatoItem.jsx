import React, { useState } from "react";

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
      <p>Candidato: {candidato.name_pres ? candidato.name_pres : candidato.name_gob ? candidato.name_gob : candidato.name_int}</p>
      <input type="number" value={inputValue} onChange={handleInputChange} />
    </div>
  );
};

export default CandidatoItem;
