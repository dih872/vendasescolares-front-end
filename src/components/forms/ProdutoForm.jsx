import { useState, useEffect } from 'react';
import './ProdutoForm.css';

const CATEGORIAS = ['Salgados', 'Bebidas', 'Doces', 'Lanches', 'Massas', 'Saladas', 'Petiscos'];

export function ProdutoForm({ produto, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: 0,
    imagem: '',
    disponivel: true,
    categoria: 'Salgados'
  });

  useEffect(() => {
    if (produto) {
      setFormData(produto);
    }
  }, [produto]);

 const handleSubmit = (e) => {
    e.preventDefault();
    const produtoLimpo = {
      nome: formData.nome,
      descricao: formData.descricao,
      preco: formData.preco,
      imagem: formData.imagem,
      disponivel: formData.disponivel,
      categoria: formData.categoria
    };
    onSave(produtoLimpo);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{produto ? '✏️ Editar Produto' : '➕ Novo Produto'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Produto:*</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              placeholder="Ex: Coxinha"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Descrição:*</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              placeholder="Descreva o produto..."
              rows={3}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Preço (R$):*</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.preco}
                onChange={(e) => setFormData({...formData, preco: Number(e.target.value)})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Categoria:*</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                required
              >
                {CATEGORIAS.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>URL da Imagem:</label>
            <input
              type="text"
              value={formData.imagem}
              onChange={(e) => setFormData({...formData, imagem: e.target.value})}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={formData.disponivel}
                onChange={(e) => setFormData({...formData, disponivel: e.target.checked})}
              />
              Produto disponível no cardápio
            </label>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              {produto ? 'Salvar Alterações' : 'Cadastrar Produto'}
            </button>
          </div>
        </form>
        
        <p className="campos-obrigatorios">* Campos obrigatórios</p>
      </div>
    </div>
  );
}