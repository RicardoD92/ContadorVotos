import React from 'react';
import { Table } from 'react-bootstrap';

const TableVotos = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Votos</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nombre}</td>
            <td>{item.votos}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableVotos;
