import { useAuthCliente } from '../../contexts/AuthClienteContext';
import { useNavigate } from 'react-router-dom';
import './HeaderCliente.css';

export function HeaderCliente() {
  const { cliente, logout } = useAuthCliente();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!cliente) return null;

  return (
    <header className="header-cliente">
      <div className="header-content">
        <div className="logo-area">
          <span className="logo-icon">🍔</span>
          <span className="logo-text">Sabor Conquista</span>
        </div>
        
        <div className="user-info">
          <div className="user-details">
            <span className="user-name">{cliente.nome}</span>
            <span className="user-turma">{cliente.turma}</span>
          </div>
          <button onClick={handleLogout} className="btn-sair">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}