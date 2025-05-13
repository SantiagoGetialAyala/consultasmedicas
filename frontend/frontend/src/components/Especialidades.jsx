import { useEffect, useState } from 'react';
import API from '../api';

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState('');
  const [error, setError] = useState('');
  const [editando, setEditando] = useState(false);
  const [especialidadAEditar, setEspecialidadAEditar] = useState(null);

  const handleInputChange = (e) => {
    setNuevaEspecialidad(e.target.value);
    setError(''); // Limpiar error cuando el usuario escribe
  };

  const validarEspecialidad = (nombre) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;
    return regex.test(nombre);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nuevaEspecialidad.trim()) {
      setError('El nombre de la especialidad es obligatorio.');
      return;
    }

    if (!validarEspecialidad(nuevaEspecialidad.trim())) {
      setError('El nombre debe tener al menos 3 letras y solo puede contener letras y espacios.');
      return;
    }

    if (editando) {
      API.put(`especialidades/${especialidadAEditar.id}`, { nombre: nuevaEspecialidad.trim() })
        .then((res) => {
          setEspecialidades(
            especialidades.map((especialidad) =>
              especialidad.id === especialidadAEditar.id ? res.data : especialidad
            )
          );
          setNuevaEspecialidad('');
          setError('');
          setEditando(false);
          setEspecialidadAEditar(null);
        })
        .catch((err) => {
          console.error(err);
          setError('Ocurrió un error al actualizar la especialidad.');
        });
    } else {
      API.post('especialidades/', { nombre: nuevaEspecialidad.trim() })
        .then((res) => {
          setEspecialidades([...especialidades, res.data]);
          setNuevaEspecialidad('');
          setError('');
        })
        .catch((err) => {
          console.error(err);
          setError('Ocurrió un error al guardar la especialidad.');
        });
    }
  };

  const handleDelete = (id) => {
    API.delete(`especialidades/${id}`)
      .then(() => {
        setEspecialidades(especialidades.filter((especialidad) => especialidad.id !== id));
      })
      .catch((err) => {
        console.error('Error al eliminar la especialidad:', err);
        alert('Hubo un problema al eliminar la especialidad. Intenta nuevamente.');
      });
  };

  const handleEdit = (especialidad) => {
    setNuevaEspecialidad(especialidad.nombre);
    setEditando(true);
    setEspecialidadAEditar(especialidad);
  };

  useEffect(() => {
    API.get('especialidades/')
      .then((res) => setEspecialidades(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Especialidades</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">{editando ? 'Editar Especialidad' : 'Agregar Nueva Especialidad'}</h2>

        <input
          type="text"
          value={nuevaEspecialidad}
          onChange={handleInputChange}
          placeholder="Nombre de la especialidad"
          className={`w-full p-3 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
          required
        />

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600"
        >
          {editando ? 'Actualizar Especialidad' : 'Agregar Especialidad'}
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Lista de Especialidades</h2>
        <ul className="space-y-4">
          {especialidades.length === 0 ? (
            <p className="text-center text-gray-500">No hay especialidades registradas.</p>
          ) : (
            especialidades.map((especialidad) => (
              <li key={especialidad.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <strong className="text-lg">{especialidad.nombre}</strong>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(especialidad)}
                    className="text-yellow-500 hover:text-yellow-700 border-2 border-yellow-500 p-2 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(especialidad.id)}
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
