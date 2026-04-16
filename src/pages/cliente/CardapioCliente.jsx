import { useState } from 'react';
import { useProdutos } from '../../hooks/useProdutos';
import { HeaderCliente } from '../../components/common/HeaderCliente';
import { ProdutoCard } from '../../components/cards/ProdutoCard';
import { Carrinho } from '../../components/common/Carrinho';
import './CardapioCliente.css';

const CATEGORIA_ICONS = {
  todos: '🍽️',
  Salgados: '🥐',
  Bebidas: '🥤',
  Doces: '🍩',
  Lanches: '🥪',
};

export function CardapioCliente() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');
  const { cardapio, refetch } = useProdutos();

  const categorias = ['todos', 'Salgados', 'Bebidas', 'Doces', 'Lanches'];

  const produtosFiltrados = cardapio.data?.filter(produto =>
    categoriaSelecionada === 'todos' || produto.categoria === categoriaSelecionada
  );

  const handleFeedbackAdicionado = () => {
    refetch();
  };

  if (cardapio.isLoading) {
    return (
      <>
        <HeaderCliente />
        <div className="loading">Carregando cardápio...</div>
      </>
    );
  }

  return (
    <>
      <HeaderCliente />
      <div className="cardapio-cliente">

        <div className="cardapio-header">
          <span className="cardapio-eyebrow">Sabor Conquista</span>
          <h1>O que vai ser<br /><em>hoje?</em></h1>
          <p className="cardapio-subtitle">Fresquinho e feito com carinho, todo dia.</p>
        </div>

        <div className="cardapio-divider">
          <span>🌿</span>
        </div>

        <div className="categorias">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`categoria-btn ${categoriaSelecionada === cat ? 'active' : ''}`}
              onClick={() => setCategoriaSelecionada(cat)}
            >
              {CATEGORIA_ICONS[cat]} {cat === 'todos' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        <div className="produtos-grid">
          {produtosFiltrados?.map(produto => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onFeedbackAdicionado={handleFeedbackAdicionado}
            />
          ))}

          {produtosFiltrados?.length === 0 && (
            <div className="vazio">
              <span className="vazio-icon">🍽️</span>
              <p>Nenhum produto disponível nesta categoria.</p>
            </div>
          )}
        </div>

      </div>

      <Carrinho />
    </>
  );
}