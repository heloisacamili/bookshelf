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
 * Subscribe to auth state changes
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
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
