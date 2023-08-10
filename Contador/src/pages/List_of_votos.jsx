import React, { useState, useEffect } from 'react'
import configJson from '../utils/config.json'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Table, Row, Col, Container, Modal, Button } from 'react-bootstrap';

function List_of_votos() {
    const [votos, setVotos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleDelete = (id) => {
        let uri = configJson.backend_url + 'votos/del-voto-by-id/' + id;
        axios.get(uri).then(response => {
            const updatedVotos = votos.filter(voto => voto.id !== id);
            setVotos(updatedVotos);
        })
    }
    const openModal = () => {
        setShowModal(true);
      };

    useEffect(() => {
        let uri = configJson.backend_url + 'votos/list-all-votos';
        let type = localStorage.getItem('type');
        if(type !== 'admin'){
            navigate('/auth');
        }
        axios.get(uri)
            .then(response => {

                setVotos(response.data.data.votos);
            });

    }, []);

    const handleDeleteAll = () => {
        let uri = configJson.backend_url + 'votos/del-all-votos';
        axios.get(uri)
            .then(response => {
                setVotos([]);
                setShowModal(false);
            })
    }

    return (
        <>
            {
                votos.length > 0 ? (
                    <Container>
                        <Row style={{ paddingTop: '20px' }}>
                            <Col lg={12}>
                                <div style={{ padding: '10px' }}>
                                    <button
                                        className="btn btn-danger"
                                        onClick={openModal}
                                    >
                                        Borrar todo
                                    </button>
                                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Confirmación</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>¿Estás seguro de que deseas borrar todo?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                                Cancelar
                                            </Button>
                                            <Button variant="danger" onClick={handleDeleteAll}>
                                                Confirmar
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <div className="table-responsive">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Nro Mesa</th>
                                                <th>Votos válidos</th>
                                                <th>Total de sobres</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {votos.map((voto) => (
                                                <tr key={voto.id}>
                                                    <td>{voto.nro_mesa}</td>
                                                    <td>{voto.voto_blanco}</td>
                                                    <td>{voto.voto_anulado}</td>
                                                    <td><button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(voto.id)}
                                                    >
                                                        Borrar
                                                    </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                ) : (
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <h3>No hay votos</h3>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </>
    )
}

export default List_of_votos