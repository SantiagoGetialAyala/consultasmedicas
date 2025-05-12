import { useEffect, useState } from 'react';
import API from '../api';

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    direccion: ''
  });

  // Manejo del formulario para agregar un nuevo paciente
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPaciente({
      ...nuevoPaciente,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud para agregar un nuevo paciente
    API.post('pacientes/', nuevoPaciente)
      .then(res => {
        // Actualizar la lista de pacientes
        setPacientes([...pacientes, res.data]);
        // Limpiar el formulario
        setNuevoPaciente({
          nombre: '',
          cedula: '',
          correo: '',
          telefono: '',
          direccion: ''
        });
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    // Obtener la lista de pacientes al cargar el componente
    API.get('pacientes/')
      .then(res => setPacientes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Pacientes</h1>

      {/* Formulario para agregar pacientes */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Agregar Nuevo Paciente</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            value={nuevoPaciente.nombre}
            onChange={handleInputChange}
            placeholder="Nombre completo"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="cedula"
            value={nuevoPaciente.cedula}
            onChange={handleInputChange}
            placeholder="Cédula"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="email"
            name="correo"
            value={nuevoPaciente.correo}
            onChange={handleInputChange}
            placeholder="Correo electrónico"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="telefono"
            value={nuevoPaciente.telefono}
            onChange={handleInputChange}
            placeholder="Teléfono"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="text"
          name="direccion"
          value={nuevoPaciente.direccion}
          onChange={handleInputChange}
          placeholder="Dirección"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600"
        >
          Agregar Paciente
        </button>
      </form>

      {/* Lista de pacientes */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Lista de Pacientes</h2>
        <ul className="space-y-4">
          {pacientes.length === 0 ? (
            <p className="text-center text-gray-500">No hay pacientes registrados.</p>
          ) : (
            pacientes.map(paciente => (
              <li key={paciente.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div>
                  <strong className="text-lg">{paciente.nombre}</strong><br />
                  <span className="text-sm text-gray-600">{paciente.cedula} - {paciente.correo}</span>
                </div>
                <div className="text-sm text-gray-500">
                  <div>{paciente.telefono}</div>
                  <div>{paciente.direccion}</div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
