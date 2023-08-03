import React, {useState, useEffect} from 'react'
import {Form, Button,Col, Row , InputGroup, Modal} from 'react-bootstrap'
import configJson from '../../utils/config.json'
import axios from 'axios'
import CandidatoItem from '../candidatoItem/CandidatoItem';
import './voteFormList.css';
import { useNavigate } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';

function VoteFormList() {
    const [localidad, setLocalidad] = useState([]);
    const [escuela, setEscuela] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [mesa, setMesa] = useState([]);
    const [presidente, setPresidente] = useState([]);
    const [groupedPresidentes, setGroupedPresidentes] = useState([]);
    const [gobernador, setGobernador] = useState([]);
    const [groupedGobernadores, setGroupedGobernadores] = useState([]);
    const [intendente, setIntendente] = useState([]);
    const [groupedIntendentes, setGroupedIntendentes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({})
    // Valores seleccionados para el voto
    const [localidadSeleccionada, setLocalidadSeleccionada] = useState(0);
    const [escuelaSeleccionada, setEscuelaSeleccionada] = useState(0);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(0);
    const [blanco, setBlanco] = useState(0);
    const [anulado, setAnulado] = useState(0);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    // Manejo de errores
    const [error, setError] = useState(
      { 
        localidad: true,
        escuela: true,
        mesa: true,
        formulario: true
      }
      );
      const handleShowModal = () => {
        setShowModal(true);
      };
      const showSuccessToast = () => {
        setShowToast(true);
      };
      const handleBlancoChange = (event) => {
        setBlanco(event.target.value);
      }
      const handleAnuladoChange = (event) => {
        setAnulado(event.target.value);
      }
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
        const groupedPresidentes = response.data.data.reduce((groups, pres) => {
          const groupId = pres.id_agrupacion;
          if (!groups[groupId]) {
            groups[groupId] = [];
          }
          groups[groupId].push(pres);
          return groups;
        }, {});
        setPresidente(response.data.data);
        setGroupedPresidentes(groupedPresidentes);

      } catch (err) {
        console.log(err);
      }
    }
    
    const getGobernadores = async () => {
      var uri= configJson.backend_url + 'politicos/todos/gobernadores';
      try {
        const response = await axios.get(uri);        
        const groupedGobernadores = response.data.data.reduce((groups, pres) => {
          const groupId = pres.id_agrupacion;
          if (!groups[groupId]) {
            groups[groupId] = [];
          }
          groups[groupId].push(pres);
          return groups;
        }, {});
        setGobernador(response.data.data);
        setGroupedGobernadores(groupedGobernadores);
      } catch (err) {
        console.log(err);
      }
    }

    const getIntendentes = async () => {
      var uri= configJson.backend_url + 'politicos/todos/intendentes';
      try {
        const response = await axios.get(uri);
        const groupedIntendentes = response.data.data.reduce((groups, pres) => {
          const groupId = pres.id_agrupacion;
          if (!groups[groupId]) {
            groups[groupId] = [];
          }
          groups[groupId].push(pres);
          return groups;
        }, {});
        setIntendente(response.data.data);
        setGroupedIntendentes(groupedIntendentes);
        set
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
        setEscuelaSeleccionada(0);
        setError((prevError) => ({
          ...prevError,
          localidad: true
        }))
        getEscuelas(e.target.value);
    }
    const handleSelectEscuela = (e) => {
        var escuela = JSON.parse(event.target.value);
        setEscuelaSeleccionada(escuela.id);
        setError((prevError) => ({
          ...prevError,
          escuela: true
        }))
        const mesasArray = [];
        for(var i=escuela.mesas_desde; i<=escuela.mesas_hasta; i++){
            mesasArray.push(i);
        }
        setMesa(mesasArray);
    }
    const handleSelectMesa = (e) => {
        setMesaSeleccionada(Number(e.target.value));
        setError((prevError) => ({
          ...prevError,
          mesa: true
        }))
    }
    
    const checkErrors = () => {
      var err = false;
      if(localidadSeleccionada === 0){
        err = true;
        setError((prevError) => ({
          ...prevError,
          localidad: false
        }))
      }
      if(escuelaSeleccionada === 0){
        err = true;
        setError((prevError) => ({
          ...prevError,
          escuela: false
        }))
      }
      if(mesaSeleccionada === 0){
        err = true;
        setError((prevError) => ({
          ...prevError,
          mesa: false
        }))
      }
      return err;
    }
    
    const postForm = async () => {
      const uri = configJson.backend_url + 'votos/';
        try{
        const response = await axios.post(uri,form);
        setForm({});
        setShowModal(false);
        showSuccessToast();
        setTimeout(() => {
          window.location.reload(); // Refresca la página
        }, 3000); 
              } catch(err){
          setError((prevError) => ({
            ...prevError,
            formulario: true
          }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        var err = checkErrors();

        if(!err){
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
            voto_intendente: totalVotosIntendente,
            voto_blanco: blanco,
            voto_anulado: anulado,
            token: token
        }

        setForm(form);
        handleShowModal();
        // preparar formulario según documentación para realizar llamado a POST /votos/
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
          <Form.Label style={{fontFamily: 'PoppinsBold'}}>Localidad</Form.Label>
          <Form.Control as="select"  onChange={handleSelectLocalidad} defaultValue="">
            <option disabled  value="">
                Seleccionar localidad
            </option>
            {localidad.map(localidad => (
              <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <div className="message-error">{!error.localidad && '* Campo requerido'}</div>
      </Col>
      <Col lg={4} xs={12}>
        <Form.Group controlId="selector2">
          <Form.Label style={{fontFamily: 'PoppinsBold'}}>Escuela</Form.Label>
          <Form.Control as="select" onChange={handleSelectEscuela} defaultValue="">
            <option disabled  value="">
                Seleccionar escuela
            </option>
            {escuela.map(escuela => (
              <option key={escuela.id} value={JSON.stringify(escuela)}>{escuela.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <div className="message-error">{!error.escuela && '* Campo requerido'}</div>
      </Col>
      <Col lg={4} xs={12}>
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
        <div className="message-error">{!error.mesa && '* Campo requerido'}</div>
      </Col>
    </Row>
    <br></br>
    {/* ACA COmienzAN LOS INPUT de CANDIDATOS*/}
    <Row style={{ marginTop: "12px" }}>
      <Col lg={12} xs={12}>
        <div className='titulo2'>Presidentes</div>
      </Col>
      <Col lg={12} style={{marginTop: "12px"}}>
        {Object.entries(groupedPresidentes).map(([groupId, presidentesGroup]) => (
          <Row style={{marginBottom: "20px"}}> 
            <React.Fragment key={groupId}>
              <Col lg={12} xs={12} style={{backgroundColor: "#f5f5f5", padding: "12px", marginBottom: "5px"}}>
                {console.log("group", presidentesGroup)}
                <div className="titulo-agrupacion" style={{fontFamily: 'PoppinsBold', fontSize: "20px"}}>{`${presidentesGroup[0].agrupacion.name}`}</div>
              </Col>
              {presidentesGroup.map((presidente) => (
                <Col lg={6} xs={12} key={presidente.id}>
                  <CandidatoItem
                    candidato={presidente}
                    onInputChange={handleInputChange}
                  />
                </Col>
              ))}
            </React.Fragment>  
          </Row>
        ))}
      </Col>
    </Row>
    <Row style={{ marginTop: "20px" }}>
  <Col lg={12} xs={12}>
    <div className='titulo2'>Gobernadores</div>
  </Col>
  {Object.entries(groupedGobernadores).map(([categoryId, gobernadoresGroup]) => (
    <React.Fragment key={categoryId}>
      <Col lg={12} xs={12} style={{ backgroundColor: "#f5f5f5", padding: "12px", marginBottom: "5px" }}>
        {/* Renderizar el ID de agrupación o título según lo que desees mostrar */}
        <div className="titulo-agrupacion" style={{ fontFamily: 'PoppinsBold', fontSize: "20px" }}>{`${gobernadoresGroup[0].agrupacion.name}`}</div>
      </Col>
      {gobernadoresGroup.map((gobernador) => (
        <Col lg={3} xs={12} key={gobernador.id}>
          <CandidatoItem
            candidato={gobernador}
            onInputChange={handleInputChange}
          />
        </Col>
      ))}
    </React.Fragment>
  ))}
</Row>
<Row style={{ marginTop: "20px" }}>
  <Col lg={12} xs={12}>
    <div className='titulo2'>Intendentes</div>
  </Col>
  {Object.entries(groupedIntendentes).map(([categoryId, intendentesGroup]) => (
    <React.Fragment key={categoryId}>
      <Col lg={12} xs={12} style={{ backgroundColor: "#f5f5f5", padding: "12px", marginBottom: "5px" }}>
        {/* Renderizar el ID de agrupación o título según lo que desees mostrar */}
        <div className="titulo-agrupacion" style={{ fontFamily: 'PoppinsBold', fontSize: "20px" }}>{`${intendentesGroup[0].agrupacion.name}`}</div>
      </Col>
      {intendentesGroup.map((intendente) => (
        <Col lg={3} xs={12} key={intendente.id}>
          <CandidatoItem
            candidato={intendente}
            onInputChange={handleInputChange}
          />
        </Col>
      ))}
    </React.Fragment>
  ))}
</Row>
    <Row className='mt-5'>
      <Col lg={3}>
      <div className='titulo2'>Total de votantes</div>
        <Form.Group controlId="numberInput" style={{width:"75px"}}>
            <Form.Control
              type="number"
              value={blanco}
              onChange={handleBlancoChange}
            />
          </Form.Group>
      </Col>
      <Col lg={3}>
      <div className='titulo2'>Total de sobres</div>
        <Form.Group controlId="numberInput"  style={{width:"75px"}}>
            <Form.Control
              type="number"
              value={anulado}
              onChange={handleAnuladoChange}
            />
          </Form.Group>
      </Col>
    </Row>
    <Row style={{marginTop: "20px"}}>
        <Col xs={12}>
            <Button variant="primary" type="button" className="primary-button" onClick={handleSubmit}>
            Enviar
            </Button>
        </Col>
    </Row>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar envío</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12} className="mb-4">
            ¿Estás seguro de que deseas enviar el formulario?
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Row>
              <Col lg={4}><b>Localidad:</b> {localidadSeleccionada && localidad.find(localidad => localidad.id === localidadSeleccionada).nombre}</Col>
              <Col lg={6}><b>Escuela:</b> {escuelaSeleccionada && escuela.find(escuela => escuela.id === escuelaSeleccionada).nombre} </Col>
              <Col lg={2}><b>Mesa:</b> {mesaSeleccionada && mesaSeleccionada} </Col>
            </Row>
            <Row>
            <Col lg={6}><b>Presidentes:</b> {presidente.map(p => {
                    const numVoto = form.voto_presidente ? form.voto_presidente.find(voto => voto.id_presidente === p.id)?.cantidad_votos : 0;
                    return <p>{p.name_pres} {numVoto} votos</p>;
                  })}
              </Col>
              <Col lg={6}><b>Gobernadores:</b> {gobernador.map(g => {
                const numVoto = form.voto_gobernador ? form.voto_gobernador.find(voto => voto.id_gobernador === g.id)?.cantidad_votos : 0;
                  return <p>{g.name_gob} {numVoto} votos</p>;
                })}
              </Col>
              <Col lg={6}><b>Intendentes:</b> {intendente.map(i => {
                const numVoto = form.voto_intendente ? form.voto_intendente.find(voto => voto.id_intendente === i.id)?.cantidad_votos : 0;
                return <p>{i.name_int} {numVoto} votos</p>;
              })}</Col>
            </Row>
            <Row>
              <Col lg={6}>
                <p><b>Total de votantes: </b>{blanco}</p>
              </Col>
              <Col lg={6}>
                <p><b>Total de sobres: </b>{anulado}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="secondary-button" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" className="primary-button" onClick={postForm}>
          Enviar
        </Button>
      </Modal.Footer>
      <div className="message-error ml-2 pb-2">{!error.formulario && '* Error al enviar formulario. Por favor, revisa los datos o comunicate con el administrador'}</div>
    </Modal>
    <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={5000} // Duración en milisegundos que permanecerá visible el toast
        autohide
        className='bg-success'
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          minWidth: '200px',
          paddingInline: '20px',
        }}
      >
        <Toast.Body style={{color: "white", fontFamily: 'PoppinsRegular'}}>Los votos fueron cargados correctamente!</Toast.Body>
      </Toast>
  </Form>
  )
}

export default VoteFormList