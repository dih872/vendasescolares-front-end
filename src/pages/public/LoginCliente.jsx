import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthCliente } from '../../contexts/AuthClienteContext';
import './Login.css';

export function LoginCliente() {
  const [nome, setNome] = useState('');
  const [turma, setTurma] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthCliente();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!nome.trim()) { setErro('Por favor, digite seu nome'); return; }
    if (!turma.trim()) { setErro('Por favor, digite sua turma'); return; }

    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      login(nome.trim(), turma.trim());
      navigate('/cardapio');
    } catch (error) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-cliente-container">
      <div className="login-left">
        <div className="left-top">
          <div className="left-brand">
            <span className="left-brand-ico">🍔</span>
            <span className="left-brand-name">Sabor Conquista</span>
          </div>
          <div className="left-headline">Ver o cardápio<br />é <em>fácil.</em></div>
          <p className="left-desc">Sem senha, sem cadastro. Só seu nome e turma para ver o que tem hoje.</p>
        </div>
        <div className="left-bottom">
          <div className="left-badge">
            <span className="left-badge-dot"></span>
            <span className="left-badge-txt">Acesso rápido</span>
          </div>
        </div>
      </div>

      <div className="login-cliente-card">
        <button onClick={() => navigate('/login')} className="btn-voltar">
          ← Voltar
        </button>

        <div className="login-header">
          <span className="login-eyebrow">Aluno</span>
          <h1>Qual é o seu nome?</h1>
          <p>Rápido e sem senha</p>
        </div>

        {erro && <div className="erro-mensagem">⚠️ {erro}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nome">Seu nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome completo"
              disabled={carregando}
              className="input-campo"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="turma">Sua turma</label>
            <input
              type="text"
              id="turma"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              placeholder="Ex: 4 ti-t"
              disabled={carregando}
              className="input-campo"
              autoComplete="off"
            />
          </div>

          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Ver cardápio'}
          </button>
        </form>

        <div className="login-info">
          <p>Sem senha necessária — acesso liberado pra todos os alunos.</p>
        </div>
      </div>
    </div>
  );
}