import { useEffect, useState } from 'react';
import API from '../api';

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    API.get('especialidades/')
      .then(res => setEspecialidades(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Especialidades</h1>
      <ul className="space-y-2">
        {especialidades.map(especialidad => (
          <li key={especialidad.id} className="border p-2 rounded shadow">
            {especialidad.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
