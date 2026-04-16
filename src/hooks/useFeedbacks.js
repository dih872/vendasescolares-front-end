import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { feedbackService } from '../services/feedbackService';

export function useFeedbacks(produtoId) {
  const queryClient = useQueryClient();
  
  // Feedbacks de um produto específico
  const feedbacksPorProduto = useQuery({
    queryKey: ['feedbacks', produtoId],
    queryFn: () => feedbackService.listarPorProduto(produtoId),
    enabled: !!produtoId,
  });
  
  // Admin - todos os feedbacks
  const todosFeedbacks = useQuery({
    queryKey: ['feedbacks-admin'],
    queryFn: feedbackService.listarTodos,
  });
  
  // Criar feedback
  const criar = useMutation({
    mutationFn: (feedback) => feedbackService.criar(feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
      queryClient.invalidateQueries({ queryKey: ['cardapio'] });
    }
  });
  
  // Deletar feedback (admin)
  const deletar = useMutation({
    mutationFn: (id) => feedbackService.deletar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks-admin'] });
      queryClient.invalidateQueries({ queryKey: ['cardapio'] });
    }
  });
  
  return {
    feedbacksPorProduto,
    todosFeedbacks,
    criarFeedback: criar.mutate,
    deletarFeedback: deletar.mutate,
    listarFeedbacks: feedbacksPorProduto.refetch
  };
}