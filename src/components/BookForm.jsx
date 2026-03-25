import React, { useState, useEffect } from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Button } from './Button';
import { Alert } from './Alert';
import { validateBookForm } from '../utils/validators';

export const BookForm = ({ book = null, onSubmit, loading = false, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    category: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (book) {
      setFormData({
        name: book.name || '',
        quantity: book.quantity || 1,
        category: book.category || '',
        description: book.description || '',
      });
    }
  }, [book]);

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
    const validation = validateBookForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await onSubmit({
        ...formData,
        quantity: parseInt(formData.quantity),
      });
    } catch (error) {
      setGeneralError(error.message || 'Erro ao salvar livro');
    }
  };

  const categories = [
    { value: 'Ficção', label: 'Ficção' },
    { value: 'Não-ficção', label: 'Não-ficção' },
    { value: 'Mistério', label: 'Mistério' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Fantasia', label: 'Fantasia' },
    { value: 'Técnico', label: 'Técnico' },
    { value: 'Infantil', label: 'Infantil' },
    { value: 'Educativo', label: 'Educativo' },
    { value: 'Outro', label: 'Outro' },
  ];

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
        label="Nome do Livro"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Digite o nome do livro"
        disabled={loading}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Quantidade"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          error={errors.quantity}
          min="1"
          disabled={loading}
          required
        />

        <Select
          label="Categoria"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
          options={categories}
          disabled={loading}
          required
        />
      </div>

      <Textarea
        label="Descrição (Opcional)"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        placeholder="Descrição do livro..."
        disabled={loading}
        rows={4}
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          className="flex-1"
        >
          {book ? 'Atualizar' : 'Adicionar'} Livro
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onCancel}
            disabled={loading}
            className="flex-1"
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
