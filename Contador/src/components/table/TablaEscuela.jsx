import React, { useEffect, useState } from 'react'
import configJson from '../../utils/config.json';
import axios from 'axios';
import {Tabs, Tab, Table} from 'react-bootstrap'
function TablaEscuela(props) {
    const [votos, setVotos] = useState([]);

    const getVotosPorEscuela = () => {
        var uri = configJson.backend_url + 'votos/voto-por-escuela/' + props.escuela.id;
        axios.get(uri)
            .then(response => {
                setVotos(response.data.data);                
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getVotosPorEscuela();
    },[]);
  return (
    <>
        <Tabs
            defaultActiveKey="presidente"
            transition={false}
            id="noanim-tab-example"
            className="mb-3">
            <Tab eventKey="presidente" title="Votos presidente">
                <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Candidato</th>
                            <th>Votos totales</th>
                            <th>Agrupación</th>
                          </tr>
                        </thead>
                        <tbody>
                {
 

                    //SOLO LO MUESTRO SI HAY RESULTADO
                    votos.resultado_presidente && votos.resultado_presidente.length > 0 ? (
                    votos.resultado_presidente.map( pres => (
                        <tr>
                            <td>{pres.nombre}</td>
                            <td>{pres.votos}</td>
                            <td>{pres.agrupacion}</td>
                        </tr>
                    ))) : 
                        <tr>
                            <td>Aún no hay información agregada</td>
                            <td></td>
                            <td></td>
                        </tr>
                }
                                          
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="gobernador" title="Votos gobernador">
            <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Candidato</th>
                            <th>Votos totales</th>
                            <th>Agrupación</th>
                          </tr>
                        </thead>
                        <tbody>
                {
                    //SOLO LO MUESTRO SI HAY RESULTADO
                    votos.resultado_gobernador && votos.resultado_gobernador.length > 0 ? (
                    votos.resultado_gobernador.map( pres => (
                        <tr>
                        <td>{pres.nombre}</td>
                        <td>{pres.votos}</td>
                        <td>{pres.agrupacion}</td>
                    </tr>
                    ))): 
                    <tr>
                        <td>Aún no hay información agregada</td>
                        <td></td>
                        <td></td>
                    </tr>
                }
                    </tbody>
                </Table>                
            </Tab>
            <Tab eventKey="intendente" title="Votos intendente">
            <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Candidato</th>
                            <th>Votos totales</th>
                            <th>Agrupación</th>
                          </tr>
                        </thead>
                        <tbody>
                {
                    //SOLO LO MUESTRO SI HAY RESULTADO
                    votos.resultado_intendente && votos.resultado_intendente.length > 0 ? (
                    votos.resultado_intendente.map( pres => (
                        <tr>
                            <td>{pres.nombre}</td>
                            <td>{pres.votos}</td>
                            <td>{pres.agrupacion}</td>
                        </tr>                    ))): 
                        <tr>
                            <td>Aún no hay información agregada</td>
                            <td></td>
                            <td></td>
                        </tr>
                }
                    </tbody>
                </Table>                
            </Tab>
            <Tab eventKey="blanco" title="Votos en Blanco / Anulados">
            <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Candidato</th>
                            <th>Votos totales</th>
                            <th>Agrupación</th>
                          </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Voto en Blanco</td>
                            <td>{votos.resultado_blanco}</td>
                            <td></td>
                        </tr>     
                        <tr>
                            <td>Votos Anulados</td>
                            <td>{votos.resultado_anulado}</td>
                            <td></td>
                        </tr>           
                    </tbody>
                </Table>                
            </Tab>
        </Tabs>
    </>
  )
}

export default TablaEscuela