import React, {useState, useEffect} from 'react'
import {Form, Button,Col, Row , InputGroup} from 'react-bootstrap'
import configJson from '../../utils/config.json'
import axios from 'axios'
import CandidatoItem from '../candidatoItem/CandidatoItem';


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
        } catch(err){
            console.log(err)
        }
    }

    const getPresidentes = async () => {
      var uri= configJson.backend_url + 'politicos/todos/presidentes';
      try {
        const response = await axios.get(uri);
        setPresidente(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    
    const getGobernadores = async () => {
      var uri= configJson.backend_url + 'politicos/todos/gobernadores';
      try {
        const response = await axios.get(uri);
        setGobernador(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    const getIntendentes = async () => {
      var uri= configJson.backend_url + 'politicos/todos/intendentes';
      try {
        const response = await axios.get(uri);
        setIntendente(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    
    const handleInputChange = (presidenteId, newValue, type) => {
      // Actualizar el valor en el array de presidentes
      console.log(type);
      if(type === 'presidente'){
        const updatedPresidentes = presidente.map((presidente) => {
          if (presidente.id === presidenteId) {
            return { ...presidente, votos: newValue };
          }
          return presidente;
        });
        setPresidente(updatedPresidentes);
      } else if(type === 'gobernador'){
        const updatedGobernador = gobernador.map((gobernador) => {
          if (gobernador.id === presidenteId) {
            return { ...gobernador, votos: newValue };
          }
          return gobernador;
        });
        setGobernador(updatedGobernador);
      } else {
        const updatedIntendente = intendente.map((intendente) => {
          if (intendente.id === presidenteId) {
            return { ...intendente, votos: newValue };
          }
          return intendente;
        });
        setIntendente(updatedIntendente);
      }
    };
  

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
    const handleSubmit = async (e) => {
        e.preventDefault(); 
      const totalVotosPresidente = [];
      const totalVotosGobernador = [];
      const totalVotosIntendente = [];

      presidente.map(presidente => {
        const votos = presidente.votos ? Number(presidente.votos) : 0;
        totalVotosPresidente.push({id_presidente: presidente.id,  cantidad_votos: votos});
      })
      gobernador.map(gobernador => {
        const votos = gobernador.votos ? Number(gobernador.votos) : 0;
        totalVotosGobernador.push({id_gobernador: gobernador.id,  cantidad_votos: votos});
      })
      intendente.map(intendente => {
        const votos = intendente.votos ? Number(intendente.votos) : 0;
        totalVotosIntendente.push({id_intendente: intendente.id,  cantidad_votos: votos});
      })

        const form = {
            id_localidad: localidadSeleccionada,
            id_escuela: escuelaSeleccionada,
            nro_mesa: mesaSeleccionada,
            voto_presidente: totalVotosPresidente,
            voto_gobernador: totalVotosGobernador,
            voto_intendente: totalVotosIntendente

        }

        // preparar formulario según documentación para realizar llamado a POST /votos/
        const uri = configJson.backend_url + 'votos/';
        try{
        const response = await axios.post(uri,form);
        console.log(response);
        } catch(err){
          console.log(err);
        }
    }

    useEffect(() => {
        getLocalidades();
        getPresidentes();
        getGobernadores();
        getIntendentes();
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
    {/* ACA COmienzAN LOS INPUT de CANDIDATOS*/}
    <Row>
      <Col lg={12} xs={12}>
          <h2>Presidentes</h2>
      </Col>
    {presidente.map((presidente) => (
      <Col lg={3} xs={12}>
          <CandidatoItem
            key={presidente.id}
            candidato={presidente}
            onInputChange={handleInputChange}
          />
        </Col>
      ))}
    </Row>
    <Row>
    <Col lg={12} xs={12}>
          <h2>Gobernadores</h2>
    </Col>
    {gobernador.map((gobernador) => (
      <Col lg={3} xs={12}>
          <CandidatoItem
            key={gobernador.id}
            candidato={gobernador}
            onInputChange={handleInputChange}
          />
        </Col>
      ))}
    </Row>
    <Row>
    <Col lg={12} xs={12}>
          <h2>Intendentes</h2>
    </Col>
    {intendente.map((intendente) => (
      <Col lg={3} xs={12}>
          <CandidatoItem
            key={intendente.id}
            candidato={intendente}
            onInputChange={handleInputChange}
          />
        </Col>
      ))}
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