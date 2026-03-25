import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
  limit,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const BOOKS_COLLECTION = 'books';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Simple in-memory cache para reduzir leituras
const cache = {
  books: null,
  userId: null,
  timestamp: null,
};

const isCacheValid = (userId) => {
  return (
    cache.userId === userId &&
    cache.books !== null &&
    Date.now() - cache.timestamp < CACHE_DURATION
  );
};

/**
 * Add a new book to Firestore
 */
export const addBook = async (userId, bookData) => {
  try {
    const docRef = await addDoc(collection(db, BOOKS_COLLECTION), {
      ...bookData,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    
    // Invalida cache após adicionar
    cache.books = null;
    
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all books for a user (com cache local)
 * Otimizado para plano gratuito do Firebase
 */
export const getUserBooks = async (userId) => {
  try {
    // Usa cache local se disponível (reduz leituras Firestore)
    if (isCacheValid(userId)) {
      return cache.books;
    }

    const q = query(
      collection(db, BOOKS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const books = [];
    
    querySnapshot.forEach((doc) => {
      books.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      });
    });
    
    // Armazena em cache
    cache.books = books;
    cache.userId = userId;
    cache.timestamp = Date.now();
    
    return books;
  } catch (error) {
    throw error;
  }
};

/**
 * Update a book
 */
export const updateBook = async (bookId, updates) => {
  try {
    const bookRef = doc(db, BOOKS_COLLECTION, bookId);
    await updateDoc(bookRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    
    // Invalida cache após atualizar
    cache.books = null;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a book
 */
export const deleteBook = async (bookId) => {
  try {
    await deleteDoc(doc(db, BOOKS_COLLECTION, bookId));
    
    // Invalida cache após deletar
    cache.books = null;
  } catch (error) {
    throw error;
  }
};

/**
 * Limpar cache manualmente (usado para refresh forçado)
 */
export const clearBooksCache = () => {
  cache.books = null;
  cache.userId = null;
  cache.timestamp = null;
};

/**
 * Search books by category
 */
export const getBooksByCategory = async (userId, category) => {
  try {
    const q = query(
      collection(db, BOOKS_COLLECTION),
      where('userId', '==', userId),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const books = [];
    
    querySnapshot.forEach((doc) => {
      books.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      });
    });
    
    return books;
  } catch (error) {
    throw error;
  }
};
