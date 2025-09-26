import { i18n } from './LanguageService.js';

export const ValidationService = {
  validateName(name) {
    if (!name || name.trim().length < 2) {
      return i18n.translate('services.validation.errors.name');
    }
    return '';
  },

  validateSurname(surname) {
    if (!surname || surname.trim().length === 0) {
      return i18n.translate('services.validation.errors.surname');
    }
    return '';
  },

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return i18n.translate('services.validation.errors.email');
    }
    return '';
  },

  validateAddress(address) {
    if (!address || address.trim().length === 0) {
      return i18n.translate('services.validation.errors.address');
    }
    return '';
  },

  validatePhone(phone) {
    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return i18n.translate('services.validation.errors.phone');
    }
    return '';
  },
};
