import React, {useState, useEffect} from 'react'
import {Form, Button,Col, Row } from 'react-bootstrap'
import configJson from '../../utils/config.json'
import axios from 'axios'

function VoteFormList() {
    const [localidad, setLocalidad] = useState([]);
    const [escuela, setEscuela] = useState([]);
    const [mesa, setMesa] = useState([]);
    const [agrupaciones,setAgrupaciones] = useState([]);
    // Valores seleccionados para el voto
    const [localidadSeleccionada, setLocalidadSeleccionada] = useState(0);
    const [escuelaSeleccionada, setEscuelaSeleccionada] = useState(0);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(0);

    const getLocalidades = async () => {
        var url = configJson.backend_url + 'localidades/';
        try{
        const response = await axios.get(url);
        setLocalidad(response.data.data.localidades);
        } catch(err){
            console.log(err)
        }
    }
    const getEscuelas = async (id) => {
        var url = configJson.backend_url + 'escuelas/' + id;
        try{
        const response = await axios.get(url);
        setEscuela(response.data.data.localidades);
        
        } catch(err){
            console.log(err)
        }
    }
    const getAgrupaciones = async () => {
        var url = configJson.backend_url + 'politicos/agrupaciones/';
        try{
        const response = await axios.get(url);s
        setAgrupaciones(response.data.data);
        } catch(err){
            console.log(err)
        }
    }
    const handleSelectLocalidad = (e) => {
        setLocalidadSeleccionada(Number(e.target.value));
        getEscuelas(e.target.value);
    }
    const handleSelectEscuela = (e) => {
        var escuela = JSON.parse(event.target.value);
        setEscuelaSeleccionada(escuela.id);
        const mesasArray = [];
        for(var i=escuela.mesas_desde; i<=escuela.mesas_hasta; i++){
            mesasArray.push(i);
        }
        setMesa(mesasArray);
    }
    const handleSelectMesa = (e) => {
        setMesaSeleccionada(Number(e.target.value));
    }
    const handleSubmit = (e) => {
        e.preventDefault(); 

        const form = {
            id_localidad: localidadSeleccionada,
            id_escuela: escuelaSeleccionada,
            nro_mesa: mesaSeleccionada
        }

        // preparar formulario según documentación para realizar llamado a POST /votos/
        console.log(form);
    }

    useEffect(() => {
        getLocalidades();
        getAgrupaciones();
    }, []);

  return (
    <Form>
    <Row>
      <Col lg={4} xs={12}>
        <Form.Group controlId="selector1">
          <Form.Label>Localidad</Form.Label>
          <Form.Control as="select"  onChange={handleSelectLocalidad}>
            {localidad.map(localidad => (
              <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col lg={4} xs={12}>
        <Form.Group controlId="selector2">
          <Form.Label>Escuela</Form.Label>
          <Form.Control as="select" onChange={handleSelectEscuela}>
            <option disabled selected value="">
                Seleccionar escuela
            </option>
            {escuela.map(escuela => (
              <option key={escuela.id} value={JSON.stringify(escuela)}>{escuela.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col lg={4} xs={12}>
        <Form.Group controlId="selector3">
          <Form.Label>Mesa</Form.Label>
          <Form.Control as="select" onChange={handleSelectMesa}>
            <option disabled selected value="">
                Seleccionar mesa
            </option>
            {mesa.map(mesa => (
              <option key={mesa}>{mesa}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col lg={4} xs={12}>
        <Form.Group controlId="selector1">
          <Form.Label>Agrupaciones</Form.Label>
          <Form.Control as="select">
             {agrupaciones.map(agrupacion => (
                  <option key={agrupacion.id} value={agrupacion.id}>{agrupacion.name}</option>
             ))}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
    <Row style={{marginTop: "20px"}}>
        <Col xs={12}>
            <Button variant="primary" type="button" onClick={handleSubmit}>
            Submit
            </Button>
        </Col>
    </Row>
  </Form>
  )
}

export default VoteFormList