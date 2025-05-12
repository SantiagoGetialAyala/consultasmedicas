import { useEffect, useState } from 'react';
import API from '../api';

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState('');

  // Manejo del formulario para agregar una nueva especialidad
  const handleInputChange = (e) => {
    setNuevaEspecialidad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevaEspecialidad.trim()) {
      // Enviar la solicitud para agregar la nueva especialidad
      API.post('especialidades/', { nombre: nuevaEspecialidad })
        .then(res => {
          // Actualizar la lista de especialidades
          setEspecialidades([...especialidades, res.data]);
          // Limpiar el formulario
          setNuevaEspecialidad('');
        })
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    // Obtener la lista de especialidades al cargar el componente
    API.get('especialidades/')
      .then(res => setEspecialidades(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Especialidades</h1>

      {/* Formulario para agregar especialidades */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Agregar Nueva Especialidad</h2>
        <input
          type="text"
          value={nuevaEspecialidad}
          onChange={handleInputChange}
          placeholder="Nombre de la especialidad"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600"
        >
          Agregar Especialidad
        </button>
      </form>

      {/* Lista de especialidades */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Lista de Especialidades</h2>
        <ul className="space-y-4">
          {especialidades.length === 0 ? (
            <p className="text-center text-gray-500">No hay especialidades registradas.</p>
          ) : (
            especialidades.map(especialidad => (
              <li key={especialidad.id} className="bg-white p-4 rounded-lg shadow-md">
                <strong className="text-lg">{especialidad.nombre}</strong>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
