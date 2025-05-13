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

  const [errores, setErrores] = useState({
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

  const validarFormulario = () => {
    const nuevosErrores = {};
    // Validación del nombre
    if (!nuevoPaciente.nombre) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }
    // Validación de la cédula (debe ser solo números)
    if (!nuevoPaciente.cedula) {
      nuevosErrores.cedula = 'La cédula es obligatoria.';
    } else if (!/^\d+$/.test(nuevoPaciente.cedula)) {
      nuevosErrores.cedula = 'La cédula debe ser solo números.';
    }
    // Validación del correo (formato de correo electrónico válido)
    if (!nuevoPaciente.correo) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(nuevoPaciente.correo)) {
      nuevosErrores.correo = 'Correo electrónico inválido.';
    }
    // Validación del teléfono (si está presente, debe tener 10 dígitos)
    if (nuevoPaciente.telefono && !/^\d{10}$/.test(nuevoPaciente.telefono)) {
      nuevosErrores.telefono = 'El teléfono debe tener 10 dígitos.';
    }
    // Validación de la dirección
    if (!nuevoPaciente.direccion) {
      nuevosErrores.direccion = 'La dirección es obligatoria.';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0; // Si no hay errores, el formulario es válido
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

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
        setErrores({});
      })
      .catch(err => {
        // Verificar si el error es debido a un campo ya existente, por ejemplo el correo
        if (err.response && err.response.data && err.response.data.error === 'correo_existente') {
          setErrores({ correo: 'Este correo ya está registrado.' });
        } else {
          console.error(err);
        }
      });
  };

  const handleDelete = (id) => {
    API.delete(`pacientes/${id}`)
      .then(() => {
        setPacientes(pacientes.filter(paciente => paciente.id !== id));
      })
      .catch(err => {
        console.error('Error al eliminar el paciente: ', err);
        alert('Hubo un problema al eliminar al paciente. Intenta nuevamente.');
      });
  };

  const handleEdit = (paciente) => {
    setNuevoPaciente(paciente);
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
        <h2 className="text-2xl font-semibold mb-4">Agregar o Editar Paciente</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="nombre"
              value={nuevoPaciente.nombre}
              onChange={handleInputChange}
              placeholder="Nombre completo"
              className={`p-3 border ${errores.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
          </div>
          <div>
            <input
              type="text"
              name="cedula"
              value={nuevoPaciente.cedula}
              onChange={handleInputChange}
              placeholder="Cédula"
              className={`p-3 border ${errores.cedula ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errores.cedula && <p className="text-red-500 text-sm">{errores.cedula}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="email"
              name="correo"
              value={nuevoPaciente.correo}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              className={`p-3 border ${errores.correo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errores.correo && <p className="text-red-500 text-sm">{errores.correo}</p>}
          </div>
          <div>
            <input
              type="text"
              name="telefono"
              value={nuevoPaciente.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono"
              className={`p-3 border ${errores.telefono ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errores.telefono && <p className="text-red-500 text-sm">{errores.telefono}</p>}
          </div>
        </div>
        <div>
          <input
            type="text"
            name="direccion"
            value={nuevoPaciente.direccion}
            onChange={handleInputChange}
            placeholder="Dirección"
            className={`w-full p-3 border ${errores.direccion ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errores.direccion && <p className="text-red-500 text-sm">{errores.direccion}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600"
        >
          {nuevoPaciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
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
                <div className="flex space-x-4 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEdit(paciente)}
                    className="text-yellow-500 hover:text-yellow-700 border-2 border-yellow-500 p-2 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(paciente.id)}
                    className="text-red-500 hover:text-red-700 border-2 border-red-500 p-2 rounded-md"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
