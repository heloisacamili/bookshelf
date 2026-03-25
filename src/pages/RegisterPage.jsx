import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';
import { Container } from '../components/Container';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-8">
      <Container className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">BookShelf</h1>
            <p className="text-gray-600">Crie sua conta para começar</p>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Já tem conta?{' '}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Entrar aqui
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
