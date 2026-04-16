import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './HeaderAdmin.css';

export function HeaderAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <header className="header-admin">
      <div className="header-content">
        <div className="logo-area">
          <span className="logo-icon">👑</span>
          <span className="logo-text">Sabor Conquista</span>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/produtos">Produtos</Link>
          <Link to="/admin/feedbacks">Feedbacks</Link>
        </nav>
        
        <div className="user-info">
          <span className="user-name">{user.nome}</span>
          <button onClick={handleLogout} className="btn-sair">Sair</button>
        </div>
      </div>
    </header>
  );
}