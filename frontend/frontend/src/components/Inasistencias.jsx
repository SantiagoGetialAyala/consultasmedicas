import { useEffect, useState } from 'react';
import API from '../api';

export default function Inasistencias() {
  const [inasistencias, setInasistencias] = useState([]);

  useEffect(() => {
    API.get('inasistencias/')
      .then(res => setInasistencias(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inasistencias</h1>
      <ul className="space-y-2">
        {inasistencias.map(inasistencia => (
          <li key={inasistencia.id} className="border p-2 rounded shadow">
            <strong>Paciente:</strong> {inasistencia.paciente}<br />
            <strong>Consulta:</strong> {inasistencia.consulta}<br />
            <strong>Fecha:</strong> {inasistencia.fecha}<br />
            <strong>Motivo:</strong> {inasistencia.motivo || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}
