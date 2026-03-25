import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

export const HomePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <Container className="py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-6xl">📚</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Bem-vindo ao BookShelf
          </h1>

          <p className="text-2xl text-gray-700 mb-8">
            Organize e gerencie sua biblioteca pessoal com facilidade
          </p>

          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            BookShelf é uma aplicação moderna e intuitiva que permite você criar, editar e
            gerenciar sua coleção de livros de forma simples e eficiente. Tenha controle total
            sobre seus livros favoritos em qualquer lugar.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="primary" size="lg">
                    Ir para Biblioteca
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="primary" size="lg">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg">
                    Criar Conta
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Simples e Intuitivo</h3>
              <p className="text-gray-600">
                Interface limpa e fácil de usar, perfeita para qualquer tipo de usuário.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Seguro</h3>
              <p className="text-gray-600">
                Seus dados são protegidos com autenticação fireboard e criptografia.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Responsivo</h3>
              <p className="text-gray-600">
                Acesse sua biblioteca em qualquer dispositivo, a qualquer hora.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
