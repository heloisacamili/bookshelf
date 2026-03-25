import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/Container';
import { Button } from '../components/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-8">
      <Container className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Página não encontrada</p>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          A página que você está procurando não existe. Verifique a URL ou volte para o início.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Voltar para Home
          </Button>
        </Link>
      </Container>
    </div>
  );
};
