import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loading } from './Loading';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Se ainda está carregando, mostra um skeleton leve (não fullScreen)
  if (loading) {
    return (
      <div className="p-8">
        <Loading fullScreen={false} message="Verificando acesso..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
