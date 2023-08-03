import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configJson from '../../utils/config.json';
import {Tabs, Tab, Form, Row, Col} from 'react-bootstrap'
import  TablaEscuela from './TablaEscuela.jsx';
import PieChart from '../charts/PieChart';
import TableVotos from './TableVotos';

function TablaPorSection() {
  const [localidades, setLocalidades] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

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
    const uri = configJson.backend_url + 'circuitos/' + selectedLoc.id;
    const res = axios.get(uri).then((response) => {
        setSections(response.data.data.circuitos);
    });
    requestVotosForLocalidad(selectedId);
  };

  const handleSectionChange = (event) => {
      const selectedId = event.target.value;
      const selectedSection = sections.find((item) => Number(item.id) === Number(selectedId));
      setSelectedSection(selectedSection);
      const uri = configJson.backend_url + 'votos/voto-por-seccion/' + selectedSection.id;
      const res = axios.get(uri).then((response) => {
          setTotales(response.data.data);
          setVotosSection(response.data.data.resultado_presidente);
          setVotosGob(response.data.data.resultado_gobernador);
          setVotosInt(response.data.data.resultado_intendente);
      })
  };

  return (
    <div>
        <Row>
            <Col lg={4}>
                <Form.Select size='lg' aria-label="Default select example" className="mb-3" value={selectedLocalidad} onChange={handleLocalidadChange}>
                    <option value="">Seleccione una localidad</option>
                    {localidades.map((localidad) => (
                    <option key={localidad.id} value={localidad.id}>
                        {localidad.nombre}
                    </option>
                    ))}
                </Form.Select>
                {selectedLocalidad && (
                <h2>Localidad: {selectedLocalidad.nombre}</h2>
            )}
            </Col>
            <Col lg={4}>
                <Form.Select size='lg' aria-label="Default select example" className="mb-3" value={selectedSection} onChange={handleSectionChange}>
                    <option value="">Seleccione una seccion</option>
                    {sections.map((circuito) => (
                    <option key={circuito.id} value={circuito.id}>
                        {circuito.nombre}
                    </option>
                    ))}
                </Form.Select>
                <div>
                    {selectedSection && (
                        <h2>Sección: {selectedSection.nombre}</h2>
                    )}
                </div>
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

export default TablaPorSection;