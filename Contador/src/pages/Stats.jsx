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
    
    useEffect(()=>{
      var uri = configJson.backend_url + 'votos/votos-por-agrupacion';
        axios.get(uri)
        .then(response=>{
          console.log(response.data.data.resultadoFinalAgrupacion);
            setVotos(response.data.data.resultadoFinalAgrupacion);
      var uri2 = configJson.backend_url + 'votos/votos-total-presidente';
        axios.get(uri2)
        .then(response=>{
          console.log(response.data.data.resultadoFinalPresidente);
            setVotosPresidentes(response.data.data.votos);
        })
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
                  <TableVotos data={votosPresidentes} /> 
                </Col>
              </Row>    
            </Col>
            <Col lg={12}>
              <TableComplete/>
            </Col>
        </Row>
    </Container>
  )
}

export default Stats