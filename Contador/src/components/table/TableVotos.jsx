import React from 'react';
import { Table } from 'react-bootstrap';

const TableVotos = ({ data, int }) => {
  if (!data) {
    return null;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Votos</th>
          <th>Porcentaje total</th>
          {int && <th>Porcentaje de interna</th>}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.nombre}</td>
            <td>{item.votos}</td>
            <td>{item.porcentaje==="Infinity" ? "" : item.porcentaje+"%"}</td>
            {int && <td>{item.porcentaje_interno}%</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableVotos;
