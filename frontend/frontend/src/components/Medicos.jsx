import { useEffect, useState } from 'react';
import API from '../api';

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    API.get('medicos/')
      .then(res => setMedicos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Médicos</h1>
      <ul className="space-y-2">
        {medicos.map(medico => (
          <li key={medico.id} className="border p-2 rounded shadow">
            <strong>{medico.nombre}</strong><br />
            Cédula Profesional: {medico.cedula_profesional}<br />
            Especialidad: {medico.especialidad}<br />
            Horario: {medico.horario}
          </li>
        ))}
      </ul>
    </div>
  );
}
