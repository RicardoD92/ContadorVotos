import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configJson from '../../utils/config.json';
import {Tabs, Tab} from 'react-bootstrap'
import  TablaEscuela from './TablaEscuela.jsx';

function TableComplete() {
  const [localidades, setLocalidades] = useState([]);
  const [escuelas, setEscuela] = useState([]);
  const [selectedLocalidad, setSelectedLocalidad] = useState('');

  useEffect(() => {
    var uri = configJson.backend_url + 'localidades/';
    axios.get(uri).then((response) => {
      setLocalidades(response.data.data.localidades);
    });
  }, []);

  const handleLocalidadChange = (event) => {
    const selectedId = event.target.value;
    const selectedLoc = localidades.find((item) => Number(item.id) === Number(selectedId));
    console.log("sele", selectedLoc)
    setSelectedLocalidad(selectedLoc);

    var uri = configJson.backend_url + 'escuelas/' + selectedLoc.id;
    axios.get(uri).then((response) => {
      setEscuela(response.data.data.localidades);
    })
  };

  return (
    <div>
      <select value={selectedLocalidad} onChange={handleLocalidadChange}>
        <option value="">Seleccione una localidad</option>
        {localidades.map((localidad) => (
          <option key={localidad.id} value={localidad.id}>
            {localidad.nombre}
          </option>
        ))}
      </select>

      {selectedLocalidad && (
        <div style={{paddingBottom:"150px"}}>
          <h2>Escuelas en Localidad: {selectedLocalidad.nombre}</h2>
            <Tabs
                    defaultActiveKey="home"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                {escuelas.map(escuela => (
                    <Tab eventKey={escuela.id} title={escuela.nombre}>
                        <TablaEscuela escuela={escuela}/>
                    </Tab>
                ))}
            </Tabs>
        </div>
      )}
    </div>
  );
}

export default TableComplete;