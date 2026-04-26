import { useState } from 'react';
import { feedbackService } from '../../services/feedbackService';
import { useAuthCliente } from '../../contexts/AuthClienteContext';
import { useCart } from '../../contexts/CartContext';
import './ProdutoCard.css';

export function ProdutoCard({ produto, onFeedbackAdicionado }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const [toast, setToast] = useState(null);
  const { cliente } = useAuthCliente();
  const { adicionar } = useCart();

  const mostrarToast = (tipo, mensagem) => {
    setToast({ tipo, mensagem });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdicionar = () => {
    adicionar(produto);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1500);
  };

  const handleAvaliar = async () => {
    if (!cliente) {
      mostrarToast('erro', 'Você precisa fazer login para avaliar');
      return;
    }
    setEnviando(true);
    try {
      await feedbackService.criar({
        produto: { id: produto.id },
        nota,
        comentario: `${comentario} - ${cliente.nome} (${cliente.turma})`
      });
      setShowFeedbackForm(false);
      setComentario('');
      setNota(5);
      if (onFeedbackAdicionado) onFeedbackAdicionado();
      mostrarToast('sucesso', `Obrigado pela avaliação, ${cliente.nome}! 🌟`);
    } catch (error) {
      mostrarToast('erro', 'Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const mediaArredondada = Math.round(produto.mediaAvaliacoes || 0);

  return (
    <div className="produto-card">

      {toast && (
        <div className={`produto-toast ${toast.tipo}`}>
          <span className="produto-toast-ico">
            {toast.tipo === 'sucesso' ? '✓' : '!'}
          </span>
          <span className="produto-toast-txt">{toast.mensagem}</span>
        </div>
      )}

      <img
        className="produto-img"
        src={produto.imagem || 'https://via.placeholder.com/400x200?text=Sem+imagem'}
        alt={produto.nome}
      />

      <div className="produto-info">
        <span className="categoria">{produto.categoria}</span>
        <h3>{produto.nome}</h3>
        <p className="descricao">{produto.descricao}</p>

        <div className="avaliacoes">
          <span className="estrelas">
            {'★'.repeat(mediaArredondada)}{'☆'.repeat(5 - mediaArredondada)}
          </span>
          <span className="media">{produto.mediaAvaliacoes?.toFixed(1) || '0.0'}</span>
          <span className="total">· {produto.totalFeedbacks || 0} avaliações</span>
        </div>

        <div className="produto-footer">
          <span className="preco">R$ {produto.preco.toFixed(2)}</span>
          <div className="produto-acoes">
            <button
              className="btn-avaliar"
              onClick={() => setShowFeedbackForm(!showFeedbackForm)}
            >
              ⭐
            </button>
            <button
              className={`btn-adicionar-cart ${adicionado ? 'adicionado' : ''}`}
              onClick={handleAdicionar}
            >
              {adicionado ? '✓ Adicionado' : '+ Carrinho'}
            </button>
          </div>
        </div>
      </div>

      {showFeedbackForm && (
        <div className="feedback-form">
          <h4>Avaliar {produto.nome}</h4>
          <div className="nota-input">
            <label>Sua nota</label>
            <div className="estrelas-input">
              {[1, 2, 3, 4, 5].map(n => (
                <span
                  key={n}
                  className={`estrela ${n <= nota ? 'ativa' : ''}`}
                  onClick={() => setNota(n)}
                >★</span>
              ))}
            </div>
          </div>
          <div className="comentario-input">
            <label>Comentário</label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Conta o que achou..."
              rows={3}
            />
          </div>
          <div className="form-actions">
            <button className="btn-cancelar" onClick={() => setShowFeedbackForm(false)}>
              Cancelar
            </button>
            <button className="btn-enviar" onClick={handleAvaliar} disabled={enviando}>
              {enviando ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}