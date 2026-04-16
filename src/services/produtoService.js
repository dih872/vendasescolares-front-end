import api from './api';

export const produtoService = {
  // Público - listar cardápio
  listarCardapio: async () => {
    const response = await api.get('/cardapio');
    return response.data;
  },
  
  listarPorCategoria: async (categoria) => {
    const response = await api.get(`/cardapio/categoria/${categoria}`);
    return response.data;
  },
  
  // Admin - gerenciar produtos
  listarTodos: async () => {
    const response = await api.get('/admin/produtos');
    return response.data;
  },
  
  criar: async (produto) => {
    const response = await api.post('/admin/produtos', produto);
    return response.data;
  },
  
  atualizar: async (id, produto) => {
    const response = await api.put(`/admin/produtos/${id}`, produto);
    return response.data;
  },
  
  deletar: async (id) => {
    await api.delete(`/admin/produtos/${id}`);
  }
};