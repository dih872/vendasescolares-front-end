import { useNavigate } from 'react-router-dom';
import './Login.css';

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-escolha-container">
      <div className="login-left">
        <div className="left-top">
          <div className="left-brand">
            <span className="left-brand-ico">🍔</span>
            <span className="left-brand-name">Sabor Conquista</span>
          </div>
          <div className="left-headline">Comida boa,<br />todo <em>dia.</em></div>
          <p className="left-desc">Cardápio fresco, avaliações reais e gestão simples pra quem cuida da cantina.</p>
        </div>
        <div className="left-bottom">
          <div className="left-badge">
            <span className="left-badge-dot"></span>
            <span className="left-badge-txt">Sistema online agora</span>
          </div>
        </div>
      </div>

      <div className="login-escolha-card">
        <div className="login-header">
          <span className="login-eyebrow">Bem-vindo</span>
          <h1>Como você quer entrar?</h1>
          <p>Escolha seu perfil de acesso</p>
        </div>

        <div className="login-dias">
          <div className="login-dias-title">Funcionamento</div>
          <div className="login-dias-grid">
            <div className="login-dia ativo">
              <span className="login-dia-nome">Seg</span>
              <span className="login-dia-dot"></span>
            </div>
            <div className="login-dia inativo">
              <span className="login-dia-nome">Ter</span>
            </div>
            <div className="login-dia ativo">
              <span className="login-dia-nome">Qua</span>
              <span className="login-dia-dot"></span>
            </div>
            <div className="login-dia inativo">
              <span className="login-dia-nome">Qui</span>
            </div>
            <div className="login-dia ativo">
              <span className="login-dia-nome">Sex</span>
              <span className="login-dia-dot"></span>
            </div>
            <div className="login-dia inativo">
              <span className="login-dia-nome">Sáb</span>
            </div>
            <div className="login-dia inativo">
              <span className="login-dia-nome">Dom</span>
            </div>
          </div>
          <div className="login-dias-horario">⏰ Intervalo às 15h15</div>
        </div>

        <div className="opcoes-login">
          <button onClick={() => navigate('/login/cliente')} className="opcao-btn cliente">
            <span className="opcao-icone">👤</span>
            <div className="opcao-texto">
              <h3>Sou aluno</h3>
              <p>Ver cardápio e avaliar</p>
            </div>
            <span className="seta">→</span>
          </button>
          <button onClick={() => navigate('/login/admin')} className="opcao-btn admin">
            <span className="opcao-icone">👑</span>
            <div className="opcao-texto">
              <h3>Sou administrador</h3>
              <p>Painel de gestão</p>
            </div>
            <span className="seta">→</span>
          </button>
        </div>

       
      </div>
    </div>
  );
}