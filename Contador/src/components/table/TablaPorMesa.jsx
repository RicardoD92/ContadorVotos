import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configJson from '../../utils/config.json';
import {Tabs, Tab, Form, Row, Col} from 'react-bootstrap'
import  TablaEscuela from './TablaEscuela.jsx';
import PieChart from '../charts/PieChart';
import TableVotos from './TableVotos';

function TablaPorMesa() {
  const [localidades, setLocalidades] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [mesa, setMesa] = useState([]);
  const [votos, setVotos] = useState([]);
  const [votosSection, setVotosSection] = useState([]);
  const [votosGob, setVotosGob] = useState([]);
  const [votosInt, setVotosInt] = useState([]);
  const [totales, setTotales] = useState([]);

  useEffect(() => {
    var uri = configJson.backend_url + 'localidades/';
    axios.get(uri).then((response) => {
      setLocalidades(response.data.data.localidades);
    });
  }, []);

  const requestVotosForLocalidad = (id) => {
    var uri = configJson.backend_url + 'votos/voto-por-localidad/' + id;
    axios.get(uri).then((response) => {
      var info = response.data.data.resultado_presidente;
      setVotos(info);
    });
  }
  const handleLocalidadChange = (event) => {
    const selectedId = event.target.value;
    const selectedLoc = localidades.find((item) => Number(item.id) === Number(selectedId));
    setSelectedLocalidad(selectedLoc);
    const uri = configJson.backend_url + 'escuelas/' + selectedLoc.id;
    const res = axios.get(uri).then((response) => {
        setSections(response.data.data.localidades);
    });
    requestVotosForLocalidad(selectedId);
  };

  const handleSectionChange = (event) => {
      const selectedId = event.target.value;
      const selectedSection = sections.find((item) => Number(item.id) === Number(selectedId));
      setSelectedSection(selectedSection);
      const mesasArray = [];
        for(var i=selectedSection.mesas_desde; i<=selectedSection.mesas_hasta; i++){
            mesasArray.push(i);
        }
        setMesa(mesasArray);
  };

  const handleSelectMesa = (event) => {
    var selectedMesa = event.target.value;
    const uri = configJson.backend_url + 'votos/voto-por-mesa/' + selectedMesa;
    const res = axios.get(uri).then((response) => {
      setTotales(response.data.data);
        setVotosSection(response.data.data.resultado_presidente);
        setVotosGob(response.data.data.resultado_gobernador);
        setVotosInt(response.data.data.resultado_intendente);
    })
  }

  return (
    <div>
        <Row>
            <Col lg={4}>
                <Form.Group controlId="selector2">
                    <Form.Label style={{fontFamily: 'PoppinsBold'}}>Localidad</Form.Label>
                    <Form.Control as="select" onChange={handleLocalidadChange} defaultValue="">
                    <option value="">Seleccione una localidad</option>
                    {localidades.map((localidad) => (
                    <option key={localidad.id} value={localidad.id}>
                        {localidad.nombre}
                    </option>
                    ))}
                </Form.Control>
                </Form.Group>
                {selectedLocalidad && (
                <h2>Localidad: {selectedLocalidad.nombre}</h2>
            )}
            </Col>
            <Col lg={4}>
                <Form.Group controlId="selector2">
                    <Form.Label style={{fontFamily: 'PoppinsBold'}}>Establecimiento</Form.Label>
                    <Form.Control as="select" onChange={handleSectionChange} defaultValue="">
                    <option value="">Seleccione un establecimiento</option>
                    {sections.map((circuito) => (
                    <option key={circuito.id} value={circuito.id}>
                        {circuito.nombre}
                    </option>
                    ))}
                    </Form.Control>
                </Form.Group>
                <div>
                    {selectedSection && (
                        <h2>Sección: {selectedSection.nombre}</h2>
                    )}
                </div>
            </Col>
            <Col lg={4}>
                <Form.Group controlId="selector3">
                    <Form.Label style={{fontFamily: 'PoppinsBold'}}>Mesa</Form.Label>
                    <Form.Control as="select" onChange={handleSelectMesa} defaultValue="">
                        <option disabled  value="">
                            Seleccionar mesa
                        </option>
                        {mesa.map(mesa => (
                        <option key={mesa}>{mesa}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Col>
      </Row>
      <Row style={{marginTop:"50px"}}>
        <Col lg={12}>
            
        </Col>
          <Col lg={12}>
            {votosSection.length>0 ? (
                <div>
                  <span style={{fontSize:"20px"}}><b>Total de votantes: </b>{totales.resultado_blanco} </span><br></br>
                  <span style={{fontSize:"20px"}}><b>Total de sobres: </b>{totales.resultado_anulado} </span>
                    <h2>Presidente</h2>
                    <TableVotos data={votosSection} int={true} />
                    <h2>Gobernador</h2>
                    <TableVotos data={votosGob} int={true}/>
                    <h2>Intendente</h2>
                    <TableVotos data={votosInt} int={true}/>
                </div>  
            ) : (
              <div style={{marginTop:"50px"}}>
                <p>Aún no hay información para dicha sección</p>
              </div>
            )}              
          </Col>
      </Row>
    </div>
  );
}

export default TablaPorMesa;