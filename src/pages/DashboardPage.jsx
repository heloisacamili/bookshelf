import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBookStore } from '../context/bookStore';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { BookForm } from '../components/BookForm';
import { BookCard } from '../components/BookCard';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Loading } from '../components/Loading';
import { Alert } from '../components/Alert';
import { getUniqueCategories, filterBooksBySearch, sortBooks, getBookStats } from '../utils/helpers';

export const DashboardPage = () => {
  const { user } = useAuth();
  const {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
    clearError,
  } = useBookStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch books on mount or when user changes
  useEffect(() => {
    if (user?.uid) {
      fetchBooks(user.uid);
    }
  }, [user?.uid, fetchBooks]);

  // Filter and sort books
  const filteredBooks = filterBooksBySearch(books, searchTerm);
  const categorizedBooks = selectedCategory
    ? filteredBooks.filter((book) => book.category === selectedCategory)
    : filteredBooks;
  const displayedBooks = sortBooks(categorizedBooks, sortBy);

  // Get stats
  const stats = getBookStats(books);
  const categories = getUniqueCategories(books);

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (bookId) => {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await deleteBook(bookId);
        setSuccessMessage('Livro excluído com sucesso!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Erro ao excluir livro:', error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedBook) {
        await updateBook(selectedBook.id, formData);
        setSuccessMessage('Livro atualizado com sucesso!');
      } else {
        await addBook(user.uid, formData);
        setSuccessMessage('Livro adicionado com sucesso!');
      }
      setIsModalOpen(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
    }
  };

  if (loading && books.length === 0) {
    return <Loading fullScreen message="Carregando sua biblioteca..." />;
  }

  const categoryOptions = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const sortOptions = [
    { value: 'createdAt', label: 'Data de Criação' },
    { value: 'name', label: 'Nome' },
    { value: 'category', label: 'Categoria' },
    { value: 'quantity', label: 'Quantidade' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        {/* Page Title & Stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Minha Biblioteca</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Total de Livros</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalBooks}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Exemplares</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalQuantity}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm font-medium">Categorias</p>
              <p className="text-3xl font-bold text-purple-600">{stats.categories}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={clearError}
            className="mb-4"
          />
        )}
        {successMessage && (
          <Alert type="success" message={successMessage} className="mb-4" />
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Buscar livro ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
            />

            {categories.length > 0 && (
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={loading}
              />
            )}

            <Select
              label="Ordenar por"
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              disabled={loading}
            />

            <Button
              variant="primary"
              onClick={handleAddBook}
              disabled={loading}
              className="h-fit"
            >
              ➕ Adicionar Livro
            </Button>
          </div>
        </div>

        {/* Books Grid */}
        {displayedBooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              {books.length === 0 ? 'Sua biblioteca está vazia' : 'Nenhum livro encontrado'}
            </p>
            <p className="text-gray-600 mb-6">
              {books.length === 0
                ? 'Comece adicionando alguns livros à sua biblioteca'
                : 'Altere os filtros para encontrar seus livros'}
            </p>
            {books.length === 0 && (
              <Button variant="primary" onClick={handleAddBook}>
                ➕ Adicionar Primeiro Livro
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
                loading={loading}
              />
            ))}
          </div>
        )}

        {/* Book Form Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedBook ? 'Editar Livro' : 'Adicionar Novo Livro'}
          size="md"
        >
          <BookForm
            book={selectedBook}
            onSubmit={handleFormSubmit}
            loading={loading}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </Container>
    </div>
  );
};
