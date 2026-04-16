import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

export function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      await login(email, senha);
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'E-mail ou senha inválidos');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-admin-container">
      <div className="login-left">
        <div className="left-top">
          <div className="left-brand">
            <span className="left-brand-ico">👑</span>
            <span className="left-brand-name">Sabor Conquista</span>
          </div>
          <div className="left-headline">Painel do<br /><em>administrador.</em></div>
          <p className="left-desc">Gerencie produtos, acompanhe feedbacks e visualize os lucros da cantina.</p>
        </div>
        <div className="left-bottom">
          <div className="left-badge">
            <span className="left-badge-dot"></span>
            <span className="left-badge-txt">Acesso restrito</span>
          </div>
        </div>
      </div>

      <div className="login-admin-card">
        <button onClick={() => navigate('/login')} className="btn-voltar">
          ← Voltar
        </button>

        <div className="login-header">
          <span className="login-eyebrow">Administrador</span>
          <h1>Entrar no painel</h1>
          <p>Acesso restrito à equipe</p>
        </div>

        {erro && <div className="erro-mensagem">⚠️ {erro}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-group">
              <span className="input-icon">✉</span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@escola.com"
                required
                disabled={carregando}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                disabled={carregando}
              />
            </div>
          </div>

          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar como admin'}
          </button>
        </form>

        
      </div>
    </div>
  );
}