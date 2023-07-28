import React,{useEffect, useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PieChart from '../components/charts/PieChart.jsx'
import axios from 'axios'
import configJson from '../utils/config.json'
import TableVotos
 from '../components/table/TableVotos.jsx'
import TableComplete from '../components/table/TableComplete.jsx'
function Stats() {
  const [votos, setVotos] = useState([]);
  const [votosPresidentes, setVotosPresidentes] = useState([]);
  const [votosIntendente, setVotosIntendente] = useState([]);
  const [votosGobernador, setVotosGobernador] = useState([]);
    
    useEffect(()=>{
      var uri = configJson.backend_url + 'votos/votos-por-agrupacion';
        axios.get(uri)
        .then(response=>{
          const data = response.data.data.resultadoFinalAgrupacion;
          const blanco = response.data.data.voto_blanco;
          const anulado = response.data.data.voto_anulado;
          data.push({id:'',nombre:"Total votantes", votos: blanco});
          data.push({id:'0', nombre:"Total de sobres", votos: anulado});
          setVotos(data);
      var uri2 = configJson.backend_url + 'votos/votos-total-presidente';
        axios.get(uri2)
        .then(response=>{
            setVotosPresidentes(response.data.data.votos);
        })
    })
    },[])

    useEffect(()=>{
      var uri = configJson.backend_url + 'votos/votos-por-gobernador';
        axios.get(uri)
        .then(response=>{
            setVotosGobernador(response.data.data.votos);
        })
    },[])

    
    useEffect(()=>{
      var uri = configJson.backend_url + 'votos/votos-por-intendente';
        axios.get(uri)
        .then(response=>{
            setVotosIntendente(response.data.data.votos);
        })
    },[])
  return (
    <Container>
        <Row>
            <Col lg={12}>
                <h1>Estadisticas</h1>
            </Col>
        </Row>
        <Row>
            <Col lg={6}>
              <Row>
                <h2>Votos totales </h2>
              </Row>
              <Row>
                <Col lg={6}  className="mb-3">
                <PieChart data={votos} />
                </Col>
                <Col lg={10}>
                <TableVotos data={votos} /> 
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Row>
                <h2>Votos Presidente</h2>
              </Row>
              <Row>
                <Col lg={6} className="mb-3">
                  <PieChart data={votosPresidentes} />
                </Col>
                <Col lg={10}>
                  <TableVotos data={votosPresidentes} int={true}/> 
                </Col>
              </Row>    
            </Col>
            <Col lg={6}>
              <Row>
                <h2>Votos Gobernador</h2>
              </Row>
              <Row>
                <Col lg={6} className="mb-3">
                  <PieChart data={votosGobernador} />
                </Col>
                <Col lg={10}>
                  <TableVotos data={votosGobernador} int={true} /> 
                </Col>
              </Row>    
            </Col>
            <Col lg={6}>
              <Row>
                <h2>Votos Intendente</h2>
              </Row>
              <Row>
                <Col lg={6} className="mb-3">
                  <PieChart data={votosIntendente} />
                </Col>
                <Col lg={10}>
                  <TableVotos data={votosIntendente} int={true} /> 
                </Col>
              </Row>    
            </Col>
        </Row>
    </Container>
  )
}

export default Stats