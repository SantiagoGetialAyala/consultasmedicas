import { useEffect, useState } from 'react';
import API from '../api';

export default function Consultas() {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    API.get('consultas/')
      .then(res => setConsultas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Consultas</h1>
      <ul className="space-y-2">
        {consultas.length === 0 ? (
          <li>No hay consultas disponibles.</li>
        ) : (
          consultas.map(consulta => (
            <li key={consulta.id} className="border p-2 rounded shadow">
              {/* Aquí asumimos que paciente es un objeto y mostramos sus propiedades */}
              <strong>Paciente:</strong> {consulta.paciente?.nombre || 'N/A'}<br />
              <strong>Médico:</strong> {consulta.medico || 'N/A'}<br />
              <strong>Fecha:</strong> {consulta.fecha ? new Date(consulta.fecha).toLocaleString() : 'N/A'}<br />
              <strong>Estado:</strong> {consulta.estado || 'N/A'}<br />
              <strong>Diagnóstico:</strong> {consulta.diagnostico || 'N/A'}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
