import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loading } from './Loading';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen message="Verificando autenticação..." />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
