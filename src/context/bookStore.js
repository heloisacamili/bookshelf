import { create } from 'zustand';
import { getUserBooks, addBook, updateBook, deleteBook, getBooksByCategory } from '../services/bookService';

export const useBookStore = create((set, get) => ({
  books: [],
  loading: false,
  error: null,

  // Fetch all books for user
  fetchBooks: async (userId) => {
    set({ loading: true, error: null });
    try {
      const books = await getUserBooks(userId);
      set({ books, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Add a new book
  addBook: async (userId, bookData) => {
    set({ loading: true, error: null });
    try {
      const bookId = await addBook(userId, bookData);
      const newBook = {
        id: bookId,
        ...bookData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      set((state) => ({
        books: [newBook, ...state.books],
        loading: false,
      }));
      return newBook;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update a book
  updateBook: async (bookId, updates) => {
    set({ loading: true, error: null });
    try {
      await updateBook(bookId, updates);
      set((state) => ({
        books: state.books.map((book) =>
          book.id === bookId
            ? { ...book, ...updates, updatedAt: new Date() }
            : book
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete a book
  deleteBook: async (bookId) => {
    set({ loading: true, error: null });
    try {
      await deleteBook(bookId);
      set((state) => ({
        books: state.books.filter((book) => book.id !== bookId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Get books by category
  fetchBooksByCategory: async (userId, category) => {
    set({ loading: true, error: null });
    try {
      const books = await getBooksByCategory(userId, category);
      set({ books, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
