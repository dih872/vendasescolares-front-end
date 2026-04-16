import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itens, setItens] = useState([]);

  const adicionar = (produto) => {
    setItens(prev => {
      const existe = prev.find(i => i.id === produto.id);
      if (existe) {
        return prev.map(i => i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i);
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const remover = (id) => {
    setItens(prev => prev.filter(i => i.id !== id));
  };

  const alterarQuantidade = (id, quantidade) => {
    if (quantidade <= 0) {
      remover(id);
      return;
    }
    setItens(prev => prev.map(i => i.id === id ? { ...i, quantidade } : i));
  };

  const limpar = () => setItens([]);

  const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <CartContext.Provider value={{ itens, adicionar, remover, alterarQuantidade, limpar, total, totalItens }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider');
  return context;
};