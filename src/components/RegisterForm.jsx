import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, getErrorMessage } from '../services/authService';
import { validateAuthForm } from '../utils/validators';
import { Input } from './Input';
import { Button } from './Button';
import { Alert } from './Alert';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    // Validate
    const validation = validateAuthForm(formData, false);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      await registerUser(formData.email, formData.password, formData.name);
      navigate('/dashboard');
    } catch (error) {
      setGeneralError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {generalError && (
        <Alert
          type="error"
          message={generalError}
          onClose={() => setGeneralError('')}
        />
      )}

      <Input
        label="Nome Completo"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Seu nome"
        disabled={loading}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="seu@email.com"
        disabled={loading}
        required
      />

      <Input
        label="Senha"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••••"
        disabled={loading}
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full"
      >
        Criar Conta
      </Button>
    </form>
  );
};
