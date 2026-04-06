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
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Update user profile with display name
  if (displayName) {
    await updateProfile(userCredential.user, {
      displayName,
    });
  }

  return userCredential.user;
};

/**
 * Login user with email and password
 */
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
  await signOut(auth);
};

/**
 * Subscribe to auth state changes (com timeout)
 */
export const subscribeToAuthChanges = (callback, errorCallback) => {
  let timeoutId;
  let hasResponded = false;

  // Timeout de 5 segundos - depois disso, assume usuario nao autenticado
  timeoutId = setTimeout(() => {
    if (!hasResponded) {
      hasResponded = true;
      console.warn('Firebase auth check timeout apos 5s');
      callback(null); // Considera nao autenticado
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
    'auth/email-already-in-use': 'Este email ja esta cadastrado',
    'auth/invalid-email': 'Email invalido',
    'auth/weak-password': 'Senha muito fraca. Minimo 6 caracteres',
    'auth/user-not-found': 'Usuario nao encontrado',
    'auth/wrong-password': 'Senha incorreta',
    'auth/account-exists-with-different-credential': 'Conta ja existe com outro metodo de login',
    'auth/operation-not-allowed': 'Operacao nao permitida',
    'auth/user-cancelled': 'Operacao cancelada pelo usuario',
  };

  return errorMap[error.code] || error.message || 'Erro ao processar autenticacao';
};
