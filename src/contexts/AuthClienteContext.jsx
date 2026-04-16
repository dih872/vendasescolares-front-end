import { createContext, useContext, useState, useEffect } from 'react';

const AuthClienteContext = createContext();

export function AuthClienteProvider({ children }) {
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const clienteSalvo = localStorage.getItem('cliente');
    if (clienteSalvo) {
      setCliente(JSON.parse(clienteSalvo));
    }
  }, []);

  const login = (nome, turma) => {
    const novoCliente = {
      nome,
      turma,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('cliente', JSON.stringify(novoCliente));
    setCliente(novoCliente);
  };

  const logout = () => {
    localStorage.removeItem('cliente');
    setCliente(null);
  };

  return (
    <AuthClienteContext.Provider value={{
      cliente,
      login,
      logout,
      isLoggedIn: !!cliente
    }}>
      {children}
    </AuthClienteContext.Provider>
  );
}

export const useAuthCliente = () => {
  const context = useContext(AuthClienteContext);
  if (!context) throw new Error('useAuthCliente deve ser usado dentro de AuthClienteProvider');
  return context;
};