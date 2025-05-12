import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link to="/pacientes">Pacientes</Link></li>
        <li><Link to="/medicos">Médicos</Link></li>
        <li><Link to="/consultas">Consultas</Link></li>
        <li><Link to="/inasistencias">Inasistencias</Link></li>
        <li><Link to="/especialidades">Especialidades</Link></li>
      </ul>
    </nav>
  );
}
