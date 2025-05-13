import { useEffect, useState } from 'react';
import API from '../api';

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  const [nuevoMedico, setNuevoMedico] = useState({
    nombre: '',
    cedula_profesional: '',
    especialidad: '',
    horario: ''
  });

  const [errores, setErrores] = useState({
    nombre: '',
    cedula_profesional: '',
    especialidad: '',
    horario: ''
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = () => {
    API.get('medicos/')
      .then(res => setMedicos(res.data))
      .catch(err => console.error(err));

    API.get('especialidades/')
      .then(res => setEspecialidades(res.data))
      .catch(err => console.error(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoMedico({
      ...nuevoMedico,
      [name]: value
    });

    setErrores({
      ...errores,
      [name]: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      nombre: '',
      cedula_profesional: '',
      especialidad: '',
      horario: ''
    };

    let hasError = false;
    const regexSoloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nuevoMedico.nombre.trim().length < 3 || !regexSoloLetras.test(nuevoMedico.nombre.trim())) {
      newErrors.nombre = 'El nombre debe tener al menos 3 letras y no debe contener números.';
      hasError = true;
    }

    if (nuevoMedico.cedula_profesional.trim().length < 5) {
      newErrors.cedula_profesional = 'La cédula profesional debe tener al menos 5 caracteres.';
      hasError = true;
    }

    if (nuevoMedico.especialidad === '') {
      newErrors.especialidad = 'Debe seleccionar una especialidad.';
      hasError = true;
    }

    if (nuevoMedico.horario.trim().length < 5) {
      newErrors.horario = 'El horario debe tener al menos 5 caracteres.';
      hasError = true;
    }

    setErrores(newErrors);
    if (hasError) return;

    if (modoEdicion) {
      // Editar
      API.put(`medicos/${idEditando}/`, nuevoMedico)
        .then(() => {
          obtenerDatos();
          resetFormulario();
        })
        .catch(err => console.error(err));
    } else {
      // Crear nuevo
      API.post('medicos/', nuevoMedico)
        .then(res => {
          setMedicos([...medicos, res.data]);
          resetFormulario();
        })
        .catch(err => console.error(err));
    }
  };

  const resetFormulario = () => {
    setNuevoMedico({
      nombre: '',
      cedula_profesional: '',
      especialidad: '',
      horario: ''
    });
    setErrores({});
    setModoEdicion(false);
    setIdEditando(null);
  };

  const getEspecialidadNombre = (id) => {
    const esp = especialidades.find(e => e.id === parseInt(id));
    return esp ? esp.nombre : 'Desconocida';
  };

  const handleEditar = (medico) => {
    setNuevoMedico({
      nombre: medico.nombre,
      cedula_profesional: medico.cedula_profesional,
      especialidad: medico.especialidad,
      horario: medico.horario
    });
    setModoEdicion(true);
    setIdEditando(medico.id);
  };

  const handleEliminar = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este médico?')) {
      API.delete(`medicos/${id}/`)
        .then(() => obtenerDatos())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Médicos</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">
          {modoEdicion ? 'Editar Médico' : 'Agregar Nuevo Médico'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="nombre"
              value={nuevoMedico.nombre}
              onChange={handleInputChange}
              placeholder="Nombre completo"
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
          </div>
          <div>
            <input
              type="text"
              name="cedula_profesional"
              value={nuevoMedico.cedula_profesional}
              onChange={handleInputChange}
              placeholder="Cédula Profesional"
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errores.cedula_profesional && (
              <p className="text-red-500 text-sm mt-1">{errores.cedula_profesional}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <select
              name="especialidad"
              value={nuevoMedico.especialidad}
              onChange={handleInputChange}
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione una especialidad</option>
              {especialidades.map(esp => (
                <option key={esp.id} value={esp.id}>
                  {esp.nombre}
                </option>
              ))}
            </select>
            {errores.especialidad && (
              <p className="text-red-500 text-sm mt-1">{errores.especialidad}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="horario"
              value={nuevoMedico.horario}
              onChange={handleInputChange}
              placeholder="Horario"
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errores.horario && (
              <p className="text-red-500 text-sm mt-1">{errores.horario}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600"
        >
          {modoEdicion ? 'Actualizar Médico' : 'Agregar Médico'}
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Lista de Médicos</h2>
        <ul className="space-y-4">
          {medicos.length === 0 ? (
            <p className="text-center text-gray-500">No hay médicos registrados.</p>
          ) : (
            medicos.map(medico => (
              <li
                key={medico.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
              >
                <div>
                  <strong className="text-lg">{medico.nombre}</strong><br />
                  <span className="text-sm text-gray-600">
                    Cédula Profesional: {medico.cedula_profesional}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Especialidad: {getEspecialidadNombre(medico.especialidad)}</div>
                  <div>Horario: {medico.horario}</div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEditar(medico)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(medico.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
