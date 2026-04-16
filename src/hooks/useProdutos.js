import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { produtoService } from '../services/produtoService';

export function useProdutos() {
  const queryClient = useQueryClient();
  
  // Cardápio público
  const cardapio = useQuery({
    queryKey: ['cardapio'],
    queryFn: produtoService.listarCardapio,
  });
  
  // Admin - todos os produtos
  const todosProdutos = useQuery({
    queryKey: ['produtos-admin'],
    queryFn: produtoService.listarTodos,
  });
  
  // Mutations
  const criar = useMutation({
    mutationFn: (produto) => produtoService.criar(produto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos-admin'] });
      queryClient.invalidateQueries({ queryKey: ['cardapio'] });
    }
  });
  
  const atualizar = useMutation({
    mutationFn: ({ id, produto }) => produtoService.atualizar(id, produto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos-admin'] });
      queryClient.invalidateQueries({ queryKey: ['cardapio'] });
    }
  });
  
  const deletar = useMutation({
    mutationFn: (id) => produtoService.deletar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos-admin'] });
      queryClient.invalidateQueries({ queryKey: ['cardapio'] });
    }
  });
  
  return {
    cardapio,
    todosProdutos,
    criar: criar.mutate,
    atualizar: atualizar.mutate,
    deletar: deletar.mutate,
    refetch: cardapio.refetch
  };
}