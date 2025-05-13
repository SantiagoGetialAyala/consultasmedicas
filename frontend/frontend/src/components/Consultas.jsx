import { useEffect, useState } from 'react';
import API from '../api';

export default function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const [nuevaConsulta, setNuevaConsulta] = useState({
    paciente: '',
    medico: '',
    fecha: '',
    estado: '',
    diagnostico: ''
  });

  const [errores, setErrores] = useState({});

  const ESTADO_CHOICES = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'realizada', label: 'Realizada' }
  ];

  useEffect(() => {
    API.get('consultas/')
      .then(res => setConsultas(res.data))
      .catch(err => console.error(err));

    API.get('pacientes/')
      .then(res => setPacientes(res.data))
      .catch(err => console.error(err));

    API.get('medicos/')
      .then(res => setMedicos(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaConsulta({ ...nuevaConsulta, [name]: value });
  };

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!nuevaConsulta.paciente) nuevosErrores.paciente = "Debe seleccionar un paciente.";
    if (!nuevaConsulta.medico) nuevosErrores.medico = "Debe seleccionar un médico.";
    if (!nuevaConsulta.fecha) nuevosErrores.fecha = "Debe ingresar la fecha de la consulta.";
    if (!nuevaConsulta.estado) nuevosErrores.estado = "Debe seleccionar un estado.";
    if (!nuevaConsulta.diagnostico.trim()) nuevosErrores.diagnostico = "Debe ingresar un diagnóstico.";

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidados = validarCampos();
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      return;
    }

    setErrores({});

    API.post('consultas/', nuevaConsulta)
      .then(res => {
        setConsultas([...consultas, res.data]);
        setNuevaConsulta({
          paciente: '',
          medico: '',
          fecha: '',
          estado: '',
          diagnostico: ''
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Consultas</h1>

      {/* Formulario para agregar nueva consulta */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Agregar Consulta</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <select
              name="paciente"
              value={nuevaConsulta.paciente}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
              required
            >
              <option value="">Seleccionar Paciente</option>
              {pacientes.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
            {errores.paciente && <p className="text-red-500 text-sm">{errores.paciente}</p>}
          </div>

          <div>
            <select
              name="medico"
              value={nuevaConsulta.medico}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
              required
            >
              <option value="">Seleccionar Médico</option>
              {medicos.map(m => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))}
            </select>
            {errores.medico && <p className="text-red-500 text-sm">{errores.medico}</p>}
          </div>

          <div>
            <input
              type="datetime-local"
              name="fecha"
              value={nuevaConsulta.fecha}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
            {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
          </div>

          <div>
            <select
              name="estado"
              value={nuevaConsulta.estado}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
              required
            >
              <option value="">Seleccionar Estado</option>
              {ESTADO_CHOICES.map(opcion => (
                <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
              ))}
            </select>
            {errores.estado && <p className="text-red-500 text-sm">{errores.estado}</p>}
          </div>

          <div className="sm:col-span-2">
            <input
              type="text"
              name="diagnostico"
              placeholder="Diagnóstico"
              value={nuevaConsulta.diagnostico}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
            {errores.diagnostico && <p className="text-red-500 text-sm">{errores.diagnostico}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Guardar Consulta
        </button>
      </form>

      {/* Lista de consultas */}
      <h2 className="text-2xl font-semibold mb-4">Historial de Consultas</h2>
      <ul className="space-y-4">
        {consultas.length === 0 ? (
          <li className="text-center text-gray-500">No hay consultas disponibles.</li>
        ) : (
          consultas.map(consulta => (
            <li key={consulta.id} className="bg-white p-4 rounded-lg shadow flex flex-col gap-1">
              <div><strong>Paciente:</strong> {consulta.paciente?.nombre || 'N/A'}</div>
              <div><strong>Médico:</strong> {consulta.medico?.nombre || 'N/A'}</div>
              <div><strong>Fecha:</strong> {consulta.fecha ? new Date(consulta.fecha).toLocaleString() : 'N/A'}</div>
              <div><strong>Estado:</strong> {consulta.estado || 'N/A'}</div>
              <div><strong>Diagnóstico:</strong> {consulta.diagnostico || 'N/A'}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
