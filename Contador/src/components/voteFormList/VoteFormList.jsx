import React, {useState, useEffect} from 'react'
import {Form, Button,Col, Row , InputGroup} from 'react-bootstrap'
import configJson from '../../utils/config.json'
import axios from 'axios'


function VoteFormList() {
    const [localidad, setLocalidad] = useState([]);
    const [escuela, setEscuela] = useState([]);
    const [mesa, setMesa] = useState([]);
    const [presidente, setPresidente] = useState([]);
    const [gobernador, setGobernador] = useState([]);
    const [intendente, setIntendente] = useState([]);
    // Valores seleccionados para el voto
    const [localidadSeleccionada, setLocalidadSeleccionada] = useState(0);
    const [escuelaSeleccionada, setEscuelaSeleccionada] = useState(0);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(0);

    const getLocalidades = async () => {
        var url = configJson.backend_url + 'localidades/';
        try{
        const response = await axios.get(url);
        setLocalidad(response.data.data.localidades);
        console.log(response);
        } catch(err){
            console.log(err)
        }
    }
    const handleVotosPresidente=(e) => {
      setPresidente(e.target.value) 

    }
    const handleVotosGobernador=(e) => {
      setGobernador(e.target.value) 

    }
    const handleVotosIntendentee=(e) => {
      setIntendente(e.target.value) 

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
            nro_mesa: mesaSeleccionada,
            votosPresidente: presidente,
            votosGobernador: gobernador,
            votosIntendente: intendente

        }

        // preparar formulario según documentación para realizar llamado a POST /votos/
        console.log(form);
    }

    useEffect(() => {
        getLocalidades();
    }, []);

  return (
    <Form onSubmit={handleSubmit}>
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
            <option disabled  value="">
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
    <br></br>
    <Row>
      <Col lg={4} xs={12}>          {/*una opcion para colocar los nombres de cada candidato */}
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">nombre del candidato</InputGroup.Text>
        <Form.Control
          placeholder="nombre del candidato"
          aria-label="nombre del candidato"
          aria-describedby="basic-addon1"
        />
      </InputGroup>


      </Col>
      
    </Row>

      <Row>
        <h1>Unión por la Patria</h1>
        <h2>Lista Celeste y Blanca: Sergio Massa - Agustín Rossi</h2>

      </Row>
              {/* Inputs de candidatos */}
      
    <Row>
    <Col lg={4} xs={12}>
        <Form.Group >
          <Form.Label>presidente nombre</Form.Label>
          <Form.Control  onChange={handleVotosPresidente} as="input" value={presidente} placeholder='Candidato1' type='number' min={0}/>
        </Form.Group>
      </Col>

      <Col lg={4} xs={12}>
        <Form.Group >
          <Form.Label>Gobernador nombre</Form.Label>
          <Form.Control  onChange={handleVotosGobernador} as="input" value={gobernador} placeholder='gobernador' type='number' min={0}/>
        </Form.Group>
      </Col>

      <Col lg={4} xs={12}>
        <Form.Group >
          <Form.Label>Intendente nombre</Form.Label>
          <Form.Control  onChange={handleVotosIntendentee} as="input" value={intendente} placeholder='intendente' type='number' min={0}/>
        </Form.Group>
      </Col>
      

    </Row>
    <Row>
        <h1>Juntos por el Cambio</h1>
        <h2>Lista El Cambio de Nuestras Vidas: Horacio Rodríguez Larreta - Gerardo Morales</h2>

      </Row>
    <Row>
    <Col lg={4} xs={12}>
        <Form.Group >
          <Form.Label>presidente nombre</Form.Label>
          <Form.Control  onChange={handleVotosPresidente} as="input" value={presidente} placeholder='Candidato1' type='number' min={0}/>
        </Form.Group>
      </Col>

      <Col lg={4} xs={12}>
        <Form.Group >
          <Form.Label>Gobernador nombre</Form.Label>
          <Form.Control  onChange={handleVotosGobernador} as="input" value={gobernador} placeholder='gobernador' type='number' min={0}/>
        </Form.Group>
      </Col>

      <Col lg={4} xs={12}>
        <Form.Group >
          <Form.Label>Intendente nombre</Form.Label>
          <Form.Control  onChange={handleVotosIntendentee} as="input" value={intendente} placeholder='intendente' type='number' min={0}/>
        </Form.Group>
      </Col>
      

    </Row>
    <Row>
      <h2>Lista La Fuerza del Cambio: Patricia Bullrich - Luis Petri </h2>
    </Row>
    <Row>
    <Col lg={4} xs={12}>
        <Form.Group >
          <Form.Label>presidente nombre</Form.Label>
          <Form.Control  onChange={handleVotosPresidente} as="input" value={presidente} placeholder='Candidato1' type='number' min={0}/>
        </Form.Group>
      </Col>

      <Col lg={4} xs={12}>
        <Form.Group >
          <Form.Label>Gobernador nombre</Form.Label>
          <Form.Control  onChange={handleVotosGobernador} as="input" value={gobernador} placeholder='gobernador' type='number' min={0}/>
        </Form.Group>
      </Col>

      <Col lg={4} xs={12}>
        <Form.Group >
          <Form.Label>Intendente nombre</Form.Label>
          <Form.Control  onChange={handleVotosIntendentee} as="input" value={intendente} placeholder='intendente' type='number' min={0}/>
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