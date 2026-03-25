import React from 'react';
import { formatDate } from '../utils/validators';
import { Button } from './Button';

export const BookCard = ({ book, onEdit, onDelete, loading = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{book.name}</h3>
          
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <p>
              <span className="font-semibold">Categoria:</span> {book.category}
            </p>
            <p>
              <span className="font-semibold">Quantidade:</span> {book.quantity}
            </p>
            <p>
              <span className="font-semibold">Data:</span> {formatDate(book.createdAt)}
            </p>
          </div>

          {book.description && (
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{book.description}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onEdit(book)}
          disabled={loading}
          className="flex-1"
        >
          Editar
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(book.id)}
          disabled={loading}
          className="flex-1"
        >
          Excluir
        </Button>
      </div>
    </div>
  );
};
