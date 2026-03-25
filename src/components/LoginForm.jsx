import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getErrorMessage } from '../services/authService';
import { validateAuthForm } from '../utils/validators';
import { Input } from './Input';
import { Button } from './Button';
import { Alert } from './Alert';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    const validation = validateAuthForm(formData, true);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      await loginUser(formData.email, formData.password);
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
        Entrar
      </Button>
    </form>
  );
};
