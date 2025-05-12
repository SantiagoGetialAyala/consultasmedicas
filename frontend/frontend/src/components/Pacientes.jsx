import { useEffect, useState } from 'react';
import API from '../api';

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    API.get('pacientes/')
      .then(res => setPacientes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pacientes</h1>
      <ul className="space-y-2">
        {pacientes.map(p => (
          <li key={p.id} className="border p-2 rounded shadow">
            <strong>{p.nombre}</strong> - {p.cedula} - {p.correo}
          </li>
        ))}
      </ul>
    </div>
  );
}
