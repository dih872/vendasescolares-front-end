import { useState } from 'react';
import { useProdutos } from '../../hooks/useProdutos';
import { HeaderAdmin } from '../../components/common/HeaderAdmin';
import { ProdutoForm } from '../../components/forms/ProdutoForm';
import './GerenciarProdutos.css';


export function GerenciarProdutos() {
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  
  const { todosProdutos, criar, atualizar, deletar } = useProdutos();

  const handleAbrirModal = (produto) => {
    setProdutoEditando(produto || null);
    setModalAberto(true);
  };

  const handleSalvar = (produto) => {
    if (produtoEditando) {
      atualizar({ id: produtoEditando.id, produto });
    } else {
      criar(produto);
    }
    setModalAberto(false);
    setProdutoEditando(null);
  };

  const handleDeletar = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deletar(id);
    }
  };

  if (todosProdutos.isLoading) {
    return (
      <>
        <HeaderAdmin />
        <div className="loading">Carregando...</div>
      </>
    );
  }

  return (
    <>
      <HeaderAdmin />
      <div className="gerenciar-produtos">
        <div className="header">
          <h1>📦 Gerenciar Produtos</h1>
          <button className="btn-novo" onClick={() => handleAbrirModal()}>
            + Novo Produto
          </button>
        </div>
        
        <div className="produtos-lista">
          {todosProdutos.data?.map(produto => (
            <div key={produto.id} className="produto-admin-card">
              <img src={produto.imagem || 'https://placehold.co/100'} alt={produto.nome} />
              <div className="produto-info">
                <h3>{produto.nome}</h3>
                <p className="categoria">{produto.categoria}</p>
                <p className="descricao">{produto.descricao}</p>
                <p className="preco">R$ {produto.preco.toFixed(2)}</p>
                <p className="status">
                  Status: {produto.disponivel ? 
                    <span className="ativo">✅ Ativo</span> : 
                    <span className="inativo">❌ Inativo</span>
                  }
                </p>
                <div className="avaliacoes">
                  ⭐ {produto.mediaAvaliacoes?.toFixed(1) || '0.0'} 
                  ({produto.totalFeedbacks || 0} avaliações)
                </div>
              </div>
              <div className="acoes">
                <button className="btn-editar" onClick={() => handleAbrirModal(produto)}>
                  ✏️ Editar
                </button>
                <button className="btn-excluir" onClick={() => handleDeletar(produto.id)}>
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {modalAberto && (
          <ProdutoForm
            produto={produtoEditando}
            onClose={() => {
              setModalAberto(false);
              setProdutoEditando(null);
            }}
            onSave={handleSalvar}
          />
        )}
      </div>
    </>
  );
}