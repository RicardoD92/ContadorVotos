import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configJson from '../../utils/config.json';
import {Tabs, Tab, Form, Row, Col} from 'react-bootstrap'
import  TablaEscuela from './TablaEscuela.jsx';
import PieChart from '../charts/PieChart';
import TableVotos from './TableVotos';

function TableComplete() {
  const [localidades, setLocalidades] = useState([]);
  const [escuelas, setEscuela] = useState([]);
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const [selectedEscuela, setSelectedEscuela] = useState('');
  const [votos, setVotos] = useState([]);
  const [votosEscuela, setVotosEscuela] = useState([]);

  useEffect(() => {
    var uri = configJson.backend_url + 'localidades/';
    axios.get(uri).then((response) => {
      setLocalidades(response.data.data.localidades);
    });
  }, []);

  const requestVotosForLocalidad = (id) => {
    var uri = configJson.backend_url + 'votos/voto-por-localidad/' + id;
    axios.get(uri).then((response) => {
      var info = response.data.data.resultado_intendente;
      setVotos(info);
    });
  }
  const handleLocalidadChange = (event) => {
    const selectedId = event.target.value;
    const selectedLoc = localidades.find((item) => Number(item.id) === Number(selectedId));
    setSelectedLocalidad(selectedLoc);

    var uri = configJson.backend_url + 'escuelas/' + selectedLoc.id;
    axios.get(uri).then((response) => {
      setEscuela(response.data.data.localidades);
    })
    requestVotosForLocalidad(selectedId);
  };
  const handleSelectedEscuela = (event) => {
    const selectedId = event.target.value;
    const selectedEsc = escuelas.find((item) => Number(item.id) === Number(selectedId));
    setSelectedEscuela(selectedEsc);
    getVotosPorEscuela(selectedId);
  }
  const getVotosPorEscuela = (id) => {
    var uri = configJson.backend_url + 'votos/voto-por-escuela/' + id;
    axios.get(uri)
        .then(response => {
          setVotosEscuela(response.data.data);                
        })
        .catch(error => {
            console.log(error);
        });
}

  return (
    <div>
      <Form.Select size='lg' aria-label="Default select example" className="mb-3" value={selectedLocalidad} onChange={handleLocalidadChange}>
        <option value="">Seleccione una localidad</option>
        {localidades.map((localidad) => (
          <option key={localidad.id} value={localidad.id}>
            {localidad.nombre}
          </option>
        ))}
      </Form.Select>

      {selectedLocalidad && (
        <div style={{paddingBottom:"150px"}}>
          <Row>
          <h2 className="mb-3">Votos Localidad: {selectedLocalidad.nombre}</h2>
          </Row>
          <Row style={{marginBottom:"50px"}}>
            <Col lg={4}>
              <PieChart data={votos}/>
            </Col>
            <Col lg={8}>
              <TableVotos data={votos} int={true} />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <h2>Votos por establecimiento en la localidad</h2>
            </Col>
            <Col lg={12}>
            <Form.Select size='lg' aria-label="Default select example" className="mb-3" value={selectedEscuela} onChange={handleSelectedEscuela}>
              <option value="">Seleccione un establecimiento</option>
              {escuelas.map((escuela) => (
                <option key={escuela.id} value={escuela.id}>
                  {escuela.nombre}
                </option>
              ))}
            </Form.Select>
            </Col>
            <Col lg={12}>
              {selectedEscuela && (
                <TablaEscuela escuela={selectedEscuela} votos={votosEscuela} />
              )}
            </Col>
            </Row>
        </div>
      )}
    </div>
  );
}

export default TableComplete;