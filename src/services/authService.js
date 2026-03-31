import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebaseConfig';

/**
 * Register a new user
 */
export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
    }
    
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Login user with email and password
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

/**
 * Subscribe to auth state changes (com timeout)
 */
export const subscribeToAuthChanges = (callback, errorCallback) => {
  let timeoutId;
  let hasResponded = false;

  // Timeout de 5 segundos - depois disso, assume usuário não autenticado
  timeoutId = setTimeout(() => {
    if (!hasResponded) {
      hasResponded = true;
      console.warn('Firebase auth check timeout após 5s');
      callback(null); // Considera não autenticado
    }
  }, 5000);

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!hasResponded) {
      hasResponded = true;
      clearTimeout(timeoutId);
      callback(user);
    }
  }, (error) => {
    if (!hasResponded) {
      hasResponded = true;
      clearTimeout(timeoutId);
      if (errorCallback) {
        errorCallback(error);
      } else {
        console.error('Auth error:', error);
      }
    }
  });

  return unsubscribe;
};

/**
 * Get formatted error message
 */
export const getErrorMessage = (error) => {
  const errorMap = {
    'auth/email-already-in-use': 'Este email já está cadastrado',
    'auth/invalid-email': 'Email inválido',
    'auth/weak-password': 'Senha muito fraca. Mínimo 6 caracteres',
    'auth/user-not-found': 'Usuário não encontrado',
    'auth/wrong-password': 'Senha incorreta',
    'auth/account-exists-with-different-credential': 'Conta já existe com outro método de login',
    'auth/operation-not-allowed': 'Operação não permitida',
    'auth/user-cancelled': 'Operação cancelada pelo usuário',
  };
  
  return errorMap[error.code] || error.message || 'Erro ao processar autenticação';
};
