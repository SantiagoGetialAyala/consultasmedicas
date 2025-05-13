import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalPorEspecialidad: [],
    pacientesFaltaron: [],
    medicosOcupados: [],
    consultasPorRango: [],
  });

  const fetchMetrics = async () => {
    try {
      const totalPorEspecialidad = await axios.get('/api/consultas/total_por_especialidad_y_medico/');
      const pacientesFaltaron = await axios.get('/api/consultas/pacientes_faltaron_mas_de_dos_veces/');
      const medicosOcupados = await axios.get('/api/consultas/medicos_mayor_ocupacion_semanal/');
      const consultasPorRango = await axios.get('/api/consultas/consultas_por_rango_y_diagnostico/', {
        params: {
          fecha_inicio: '2025-01-01',
          fecha_fin: '2025-01-31',
        },
      });

      setMetrics({
        totalPorEspecialidad: totalPorEspecialidad.data,
        pacientesFaltaron: pacientesFaltaron.data,
        medicosOcupados: medicosOcupados.data,
        consultasPorRango: consultasPorRango.data,
      });
    } catch (error) {
      console.error("Error al cargar las métricas:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div>
      <h1>Dashboard de Métricas</h1>

      <div>
        <h2>Total de Consultas por Especialidad y Médico</h2>
        <ul>
          {metrics.totalPorEspecialidad.map((item, index) => (
            <li key={index}>
              {item.medico__especialidad__nombre} - {item.medico__nombre}: {item.total_consultas} consultas
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Pacientes que han faltado más de 2 veces en el mes</h2>
        <ul>
          {metrics.pacientesFaltaron.map((item, index) => (
            <li key={index}>
              Paciente {item.paciente_id}: {item.total_faltas} faltas
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Médicos con mayor ocupación semanal</h2>
        <ul>
          {metrics.medicosOcupados.map((item, index) => (
            <li key={index}>
              Médico ID {item.medico}: {item.total_consultas} consultas
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Consultas por Rango de Fechas y Diagnóstico Frecuente</h2>
        <ul>
          {metrics.consultasPorRango.map((item, index) => (
            <li key={index}>
              Diagnóstico {item.diagnostico}: {item.total_consultas} consultas
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardMetrics;
