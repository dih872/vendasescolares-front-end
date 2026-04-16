import { useState } from 'react';
import { useFeedbacks } from '../../hooks/useFeedbacks';
import { HeaderAdmin } from '../../components/common/HeaderAdmin';
import './GerenciarFeedbacks.css';

export function GerenciarFeedbacks() {
  const [filtro, setFiltro] = useState('todos');
  const { todosFeedbacks, deletarFeedback } = useFeedbacks();

  const handleDeletar = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este feedback?')) {
      deletarFeedback(id);
    }
  };

  if (todosFeedbacks.isLoading) {
    return (
      <>
        <HeaderAdmin />
        <div className="loading">Carregando feedbacks...</div>
      </>
    );
  }

  const feedbacks = todosFeedbacks.data || [];
  
  const feedbacksPorProduto = feedbacks.reduce((acc, feedback) => {
    const produtoNome = feedback.produtoNome || 'Produto';
    if (!acc[produtoNome]) {
      acc[produtoNome] = [];
    }
    acc[produtoNome].push(feedback);
    return acc;
  }, {});

  return (
    <>
      <HeaderAdmin />
      <div className="gerenciar-feedbacks">
        <h1>⭐ Gerenciar Feedbacks</h1>
        
        <div className="filtros">
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="todos">Todos os produtos</option>
            {Object.keys(feedbacksPorProduto).map(produto => (
              <option key={produto} value={produto}>{produto}</option>
            ))}
          </select>
        </div>
        
        <div className="feedbacks-container">
          {Object.entries(feedbacksPorProduto)
            .filter(([produto]) => filtro === 'todos' || produto === filtro)
            .map(([produtoNome, feedbacksList]) => (
              <div key={produtoNome} className="produto-feedbacks">
                <h2>{produtoNome}</h2>
                
                <div className="feedbacks-lista">
                  {feedbacksList.map(feedback => (
                    <div key={feedback.id} className="feedback-card">
                      <div className="feedback-header">
                        <div className="usuario-info">
                          <strong>{feedback.usuarioNome || 'Anônimo'}</strong>
                          <span className="data">{feedback.data}</span>
                        </div>
                        <div className="nota">
                          {'★'.repeat(feedback.nota)}
                          {'☆'.repeat(5 - feedback.nota)}
                        </div>
                      </div>
                      <p className="comentario">{feedback.comentario}</p>
                      <button 
                        className="btn-excluir"
                        onClick={() => handleDeletar(feedback.id)}
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="resumo">
                  <span>Média: {
                    (feedbacksList.reduce((acc, f) => acc + f.nota, 0) / feedbacksList.length).toFixed(1)
                  } ⭐</span>
                  <span>Total: {feedbacksList.length} avaliações</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}