export const ValidationService = {
  validateName(name) {
    if (!name || name.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres.';
    }
    return '';
  },

  validateSurname(surname) {
    if (!surname || surname.trim().length === 0) {
      return 'Los apellidos no pueden estar vacíos.';
    }
    return '';
  },

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'El correo electrónico no es válido.';
    }
    return '';
  },

  validateAddress(address) {
    if (!address || address.trim().length === 0) {
      return 'La dirección no puede estar vacía.';
    }
    return '';
  },

  validatePhone(phone) {
    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return 'El número de teléfono debe tener 9 dígitos.';
    }
    return '';
  },
};
