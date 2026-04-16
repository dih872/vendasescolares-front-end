import { Navigate } from 'react-router-dom';
import { useAuthCliente } from '../../contexts/AuthClienteContext';

export function ProtectedRouteCliente({ children }) {
  const { isLoggedIn } = useAuthCliente();

  if (!isLoggedIn) {
    return <Navigate to="/login/cliente" replace />;
  }

  return children;
}