import { useEffect, useState } from 'react';
import API from '../api';

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [nuevoMedico, setNuevoMedico] = useState({
    nombre: '',
    cedula_profesional: '',
    especialidad: '',
    horario: ''
  });

  // Manejo del formulario para agregar un nuevo médico
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoMedico({
      ...nuevoMedico,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud para agregar un nuevo médico
    API.post('medicos/', nuevoMedico)
      .then(res => {
        // Actualizar la lista de médicos
        setMedicos([...medicos, res.data]);
        // Limpiar el formulario
        setNuevoMedico({
          nombre: '',
          cedula_profesional: '',
          especialidad: '',
          horario: ''
        });
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    // Obtener la lista de médicos al cargar el componente
    API.get('medicos/')
      .then(res => setMedicos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Médicos</h1>

      {/* Formulario para agregar médicos */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Agregar Nuevo Médico</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            value={nuevoMedico.nombre}
            onChange={handleInputChange}
            placeholder="Nombre completo"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="cedula_profesional"
            value={nuevoMedico.cedula_profesional}
            onChange={handleInputChange}
            placeholder="Cédula Profesional"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="especialidad"
            value={nuevoMedico.especialidad}
            onChange={handleInputChange}
            placeholder="Especialidad"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="horario"
            value={nuevoMedico.horario}
            onChange={handleInputChange}
            placeholder="Horario"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600"
        >
          Agregar Médico
        </button>
      </form>

      {/* Lista de médicos */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Lista de Médicos</h2>
        <ul className="space-y-4">
          {medicos.length === 0 ? (
            <p className="text-center text-gray-500">No hay médicos registrados.</p>
          ) : (
            medicos.map(medico => (
              <li key={medico.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div>
                  <strong className="text-lg">{medico.nombre}</strong><br />
                  <span className="text-sm text-gray-600">Cédula Profesional: {medico.cedula_profesional}</span>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Especialidad: {medico.especialidad}</div>
                  <div>Horario: {medico.horario}</div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
