import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { FinalizarPedido } from './FinalizarPedido';
import './Carrinho.css';

export function Carrinho() {
  const { itens, remover, alterarQuantidade, total, totalItens } = useCart();
  const [aberto, setAberto] = useState(false);
  const [finalizando, setFinalizando] = useState(false);

  if (totalItens === 0) return null;

  return (
    <>
      <button className="cart-fab" onClick={() => setAberto(true)}>
        <span className="cart-fab-ico">🛒</span>
        <span className="cart-fab-count">{totalItens}</span>
        <span className="cart-fab-total">R$ {total.toFixed(2)}</span>
      </button>

      {aberto && (
        <div className="cart-overlay" onClick={(e) => e.target === e.currentTarget && setAberto(false)}>
          <div className="cart-drawer">
            <div className="cart-header">
              <div className="cart-title">Seu carrinho</div>
              <button className="cart-close" onClick={() => setAberto(false)}>✕</button>
            </div>

            <div className="cart-itens">
              {itens.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-nome">{item.nome}</div>
                    <div className="cart-item-preco">R$ {(item.preco * item.quantidade).toFixed(2)}</div>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}>−</button>
                    <span>{item.quantidade}</span>
                    <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>+</button>
                  </div>
                  <button className="cart-item-del" onClick={() => remover(item.id)}>🗑</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <button
                className="cart-btn-finalizar"
                onClick={() => { setAberto(false); setFinalizando(true); }}
              >
                Finalizar pedido →
              </button>
            </div>
          </div>
        </div>
      )}

      {finalizando && (
        <FinalizarPedido onClose={() => setFinalizando(false)} />
      )}
    </>
  );
}