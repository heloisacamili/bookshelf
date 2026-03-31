import React, { createContext, useState, useEffect } from 'react';
import { subscribeToAuthChanges } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar cache primeiro (resposta imediata)
    const cachedUser = localStorage.getItem('cachedUser');
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch (e) {
        console.warn('Cache inválido');
      }
    }

    // Depois faz a verificação real no Firebase (background)
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      
      // Atualizar cache
      if (currentUser) {
        localStorage.setItem('cachedUser', JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        }));
      } else {
        localStorage.removeItem('cachedUser');
      }
      
      setLoading(false);
    }, (error) => {
      // Se erro ou timeout, marcar como não loading mesmo assim
      setLoading(false);
      console.warn('Auth error:', error);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
