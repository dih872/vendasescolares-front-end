import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../contexts/AuthContext';
import { AuthClienteProvider } from '../contexts/AuthClienteContext';
import { CartProvider } from '../contexts/CartContext';
import { ProtectedRouteAdmin } from '../components/common/ProtectedRouteAdmin';
import { ProtectedRouteCliente } from '../components/common/ProtectedRouteCliente';

import { Login } from '../pages/public/Login';
import { LoginAdmin } from '../pages/public/LoginAdmin';
import { LoginCliente } from '../pages/public/LoginCliente';
import { CardapioCliente } from '../pages/cliente/CardapioCliente';
import { DashboardAdmin } from '../pages/admin/DashboardAdmin';
import { GerenciarProdutos } from '../pages/admin/GerenciarProdutos';
import { GerenciarFeedbacks } from '../pages/admin/GerenciarFeedbacks';

const queryClient = new QueryClient();

export function AppRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AuthClienteProvider>
            <CartProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/login/admin" element={<LoginAdmin />} />
                <Route path="/login/cliente" element={<LoginCliente />} />

                <Route path="/cardapio" element={
                  <ProtectedRouteCliente>
                    <CardapioCliente />
                  </ProtectedRouteCliente>
                } />

                <Route path="/admin" element={
                  <ProtectedRouteAdmin>
                    <DashboardAdmin />
                  </ProtectedRouteAdmin>
                } />
                <Route path="/admin/produtos" element={
                  <ProtectedRouteAdmin>
                    <GerenciarProdutos />
                  </ProtectedRouteAdmin>
                } />
                <Route path="/admin/feedbacks" element={
                  <ProtectedRouteAdmin>
                    <GerenciarFeedbacks />
                  </ProtectedRouteAdmin>
                } />

                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </CartProvider>
          </AuthClienteProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}