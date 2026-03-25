/**
 * Validate book form data
 */
export const validateBookForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Nome do livro é obrigatório';
  } else if (formData.name.length < 3) {
    errors.name = 'Nome deve ter no mínimo 3 caracteres';
  }

  if (!formData.quantity || formData.quantity <= 0) {
    errors.quantity = 'Quantidade deve ser maior que 0';
  } else if (!Number.isInteger(Number(formData.quantity))) {
    errors.quantity = 'Quantidade deve ser um número inteiro';
  }

  if (!formData.category || formData.category.trim() === '') {
    errors.category = 'Categoria é obrigatória';
  }

  if (formData.description && formData.description.length > 500) {
    errors.description = 'Descrição não pode ter mais de 500 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate auth form data
 */
export const validateAuthForm = (formData, isLogin = false) => {
  const errors = {};

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email é obrigatório';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Email inválido';
  }

  // Password validation
  if (!formData.password || formData.password === '') {
    errors.password = 'Senha é obrigatória';
  } else if (formData.password.length < 6) {
    errors.password = 'Senha deve ter no mínimo 6 caracteres';
  }

  // Name validation (only on register)
  if (!isLogin) {
    if (!formData.name || formData.name.trim() === '') {
      errors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 3) {
      errors.name = 'Nome deve ter no mínimo 3 caracteres';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Format date for display
 */
export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Format time for display
 */
export const formatDateTime = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
