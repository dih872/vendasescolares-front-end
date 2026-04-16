import api from './api';

export const feedbackService = {
  // Público - listar feedbacks de um produto
  listarPorProduto: async (produtoId) => {
    const response = await api.get(`/feedbacks/produto/${produtoId}`);
    return response.data;
  },
  
  // Público - criar feedback (sem login)
  criar: async (feedback) => {
    const response = await api.post('/feedbacks', feedback);
    return response.data;
  },
  
  // Admin - listar todos feedbacks
  listarTodos: async () => {
    const response = await api.get('/admin/feedbacks');
    return response.data;
  },
  
  // Admin - deletar feedback
  deletar: async (id) => {
    await api.delete(`/admin/feedbacks/${id}`);
  }
};