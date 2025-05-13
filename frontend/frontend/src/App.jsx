import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pacientes from './components/Pacientes';
import Medicos from './components/Medicos';
import Consultas from './components/Consultas';
import Inasistencias from './components/Inasistencias';
import Especialidades from './components/Especialidades';
import DashboardMetrics from './components/DashboardMetrics';  // Importar el nuevo componente

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/medicos" element={<Medicos />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/dashboard" element={<DashboardMetrics />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
