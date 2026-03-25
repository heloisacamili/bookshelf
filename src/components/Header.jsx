import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logoutUser } from '../services/authService';
import { Button } from './Button';

export const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">📚</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BookShelf</span>
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 text-sm">
                👋 {user.displayName || user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                loading={isLoggingOut}
              >
                Sair
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
