/**
 * Common utility functions
 */

/**
 * Get unique categories from books array
 */
export const getUniqueCategories = (books) => {
  const categories = new Set(books.map((book) => book.category));
  return Array.from(categories).sort();
};

/**
 * Filter books by search term
 */
export const filterBooksBySearch = (books, searchTerm) => {
  if (!searchTerm.trim()) return books;
  
  const term = searchTerm.toLowerCase();
  return books.filter(
    (book) =>
      book.name.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term) ||
      (book.description && book.description.toLowerCase().includes(term))
  );
};

/**
 * Sort books
 */
export const sortBooks = (books, sortBy = 'createdAt') => {
  const sorted = [...books];
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'category':
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    case 'quantity':
      return sorted.sort((a, b) => b.quantity - a.quantity);
    case 'createdAt':
    default:
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

/**
 * Get stats from books
 */
export const getBookStats = (books) => {
  return {
    totalBooks: books.length,
    totalQuantity: books.reduce((sum, book) => sum + parseInt(book.quantity || 0), 0),
    categories: getUniqueCategories(books).length,
  };
};
