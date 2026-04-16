import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuthCliente } from '../../contexts/AuthClienteContext';
import './FinalizarPedido.css';

const WHATSAPP_CANTINA = '558781158285'; // troque pelo número real

export function FinalizarPedido({ onClose }) {
  const { itens, total, limpar } = useCart();
  const { cliente } = useAuthCliente();
  const [tipoEntrega, setTipoEntrega] = useState('');
  const [localEntrega, setLocalEntrega] = useState('');
  const [observacao, setObservacao] = useState('');
  const [step, setStep] = useState(1);

  const handleContinuar = () => {
    if (!tipoEntrega) {
      alert('Escolha uma opção de entrega!');
      return;
    }
    if (tipoEntrega === 'entrega' && !localEntrega.trim()) {
      alert('Informe onde você está para a entrega!');
      return;
    }
    setStep(2);
  };

  const montarMensagem = () => {
    const linhas = itens.map(i =>
      `• ${i.nome} x${i.quantidade} — R$ ${(i.preco * i.quantidade).toFixed(2)}`
    ).join('\n');

    const entregaTexto = tipoEntrega === 'retirada'
      ? '🕒 Retirada no intervalo — 15h15'
      : `🛵 Entrega — Local: ${localEntrega}`;

    const obs = observacao ? `\n📝 Observação: ${observacao}` : '';

    return encodeURIComponent(
      `🛒 *Novo Pedido — Cantina Escolar*\n\n` +
      `👤 *Cliente:* ${cliente?.nome} (${cliente?.turma})\n\n` +
      `*Itens:*\n${linhas}\n\n` +
      `💰 *Total: R$ ${total.toFixed(2)}*\n\n` +
      `${entregaTexto}${obs}`
    );
  };

  const enviarParaCantina = () => {
    const msg = montarMensagem();
    window.open(`https://wa.me/${WHATSAPP_CANTINA}?text=${msg}`, '_blank');
    limpar();
    onClose();
  };

  return (
    <div className="fp-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fp-modal">
        <div className="fp-header">
          <div className="fp-header-title">Finalizar Pedido</div>
          <button className="fp-close" onClick={onClose}>✕</button>
        </div>

        {step === 1 && (
          <div className="fp-body">
            <div className="fp-section-label">Como você quer receber?</div>

            <div className="fp-opcoes">
              <button
                className={`fp-opcao ${tipoEntrega === 'retirada' ? 'active' : ''}`}
                onClick={() => setTipoEntrega('retirada')}
              >
                <span className="fp-opcao-ico">🕒</span>
                <div>
                  <div className="fp-opcao-t">Pegar no intervalo</div>
                  <div className="fp-opcao-s">Retire na cantina às 15h15</div>
                </div>
                <span className="fp-check">{tipoEntrega === 'retirada' ? '✓' : ''}</span>
              </button>

              <button
                className={`fp-opcao ${tipoEntrega === 'entrega' ? 'active' : ''}`}
                onClick={() => setTipoEntrega('entrega')}
              >
                <span className="fp-opcao-ico">🛵</span>
                <div>
                  <div className="fp-opcao-t">Receber entrega</div>
                  <div className="fp-opcao-s">A cantina leva até você</div>
                </div>
                <span className="fp-check">{tipoEntrega === 'entrega' ? '✓' : ''}</span>
              </button>
            </div>

            {tipoEntrega === 'entrega' && (
              <div className="fp-field">
                <label className="fp-label">Onde você está? (sala/turma)</label>
                <input
                  className="fp-input"
                  type="text"
                  placeholder="Ex: Sala 7A, Quadra, Biblioteca..."
                  value={localEntrega}
                  onChange={(e) => setLocalEntrega(e.target.value)}
                />
              </div>
            )}

            <div className="fp-field">
              <label className="fp-label">Observação (opcional)</label>
              <textarea
                className="fp-textarea"
                placeholder="Ex: sem cebola, capricha no recheio..."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                rows={2}
              />
            </div>

            <button className="fp-btn-continuar" onClick={handleContinuar}>
              Continuar →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="fp-body">
            <div className="fp-section-label">Resumo do pedido</div>

            <div className="fp-resumo">
              {itens.map(item => (
                <div key={item.id} className="fp-resumo-item">
                  <span className="fp-resumo-nome">{item.nome} x{item.quantidade}</span>
                  <span className="fp-resumo-preco">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
              <div className="fp-resumo-total">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="fp-entrega-badge">
              {tipoEntrega === 'retirada'
                ? '🕒 Retirada no intervalo — 15h15'
                : `🛵 Entrega em: ${localEntrega}`
              }
            </div>

            <div className="fp-envio-btns">
              <button className="fp-btn-whats cantina" onClick={enviarParaCantina}>
                <span>📲</span> Enviar pedido pra cantina
              </button>
            </div>

            <button className="fp-btn-voltar" onClick={() => setStep(1)}>
              ← Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}