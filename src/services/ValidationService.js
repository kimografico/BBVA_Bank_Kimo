import { CONFIG } from '../config.js';
import { i18n } from './LanguageService.js';

export const ValidationService = {
  validateName(name) {
    if (!name || name.trim().length < CONFIG.VALIDATION.NAME_MIN_LENGTH) {
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
    if (!CONFIG.VALIDATION.EMAIL_REGEX.test(email)) {
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
    if (!CONFIG.VALIDATION.PHONE_REGEX.test(phone)) {
      return i18n.translate('services.validation.errors.phone');
    }
    return '';
  },
};
