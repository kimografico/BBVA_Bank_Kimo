import { expect } from '@open-wc/testing';
import Sinon from 'sinon';

import { ValidationService } from '../src/services/ValidationService.js';
import { i18n } from '../src/services/LanguageService.js';

describe('ValidationService', () => {
  beforeEach(() => {
    Sinon.stub(i18n, 'translate').callsFake(key => `TRANSLATED_${key}`);
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('validateName', () => {
    it('should return empty string for valid name', () => {
      const result = ValidationService.validateName('John');
      expect(result).to.equal('');
    });

    it('should return error message for empty name', () => {
      const result = ValidationService.validateName('');
      expect(result).to.equal('TRANSLATED_services.validation.errors.name');
      expect(i18n.translate.calledWith('services.validation.errors.name')).to.be
        .true;
    });

    it('should return error message for name with only spaces', () => {
      const result = ValidationService.validateName('   ');
      expect(result).to.equal('TRANSLATED_services.validation.errors.name');
    });

    it('should return error message for name shorter than 2 characters', () => {
      const result = ValidationService.validateName('K');
      expect(result).to.equal('TRANSLATED_services.validation.errors.name');
    });
  });

  describe('validateEmail', () => {
    it('should return empty string for valid email', () => {
      const result = ValidationService.validateEmail('test@ejemplo.com');
      expect(result).to.equal('');
    });

    it('should return error message for invalid email format', () => {
      const result = ValidationService.validateEmail('email-regulero');
      expect(result).to.equal('TRANSLATED_services.validation.errors.email');
    });

    it('should return error message for email without @', () => {
      const result = ValidationService.validateEmail('testeando.com');
      expect(result).to.equal('TRANSLATED_services.validation.errors.email');
    });

    it('should return error message for email without domain', () => {
      const result = ValidationService.validateEmail('test@');
      expect(result).to.equal('TRANSLATED_services.validation.errors.email');
    });
  });

  describe('validatePhone', () => {
    it('should return empty string for valid 9-digit phone', () => {
      const result = ValidationService.validatePhone('123456789');
      expect(result).to.equal('');
    });

    it('should return error message for phone with letters', () => {
      const result = ValidationService.validatePhone('12345678a');
      expect(result).to.equal('TRANSLATED_services.validation.errors.phone');
    });

    it('should return error message for phone shorter than 9 digits', () => {
      const result = ValidationService.validatePhone('12345678');
      expect(result).to.equal('TRANSLATED_services.validation.errors.phone');
    });

    it('should return error message for phone longer than 9 digits', () => {
      const result = ValidationService.validatePhone('+341234567890');
      expect(result).to.equal('TRANSLATED_services.validation.errors.phone');
    });
  });

  describe('validateSurname', () => {
    it('should return empty string for valid surname', () => {
      const result = ValidationService.validateSurname('García');
      expect(result).to.equal('');
    });

    it('should return empty string for two surnames', () => {
      const result = ValidationService.validateSurname('García López');
      expect(result).to.equal('');
    });

    it('should return error message for empty surname', () => {
      const result = ValidationService.validateSurname('');
      expect(result).to.equal('TRANSLATED_services.validation.errors.surname');
      expect(i18n.translate.calledWith('services.validation.errors.surname')).to
        .be.true;
    });

    it('should return error message for surname with only spaces', () => {
      const result = ValidationService.validateSurname('   ');
      expect(result).to.equal('TRANSLATED_services.validation.errors.surname');
    });

    it('should return empty string for surname with special characters like ñ and accents', () => {
      const result = ValidationService.validateSurname('García-Peña');
      expect(result).to.equal('');
    });
  });

  describe('validateAddress', () => {
    it('should return empty string for valid complex address', () => {
      const result = ValidationService.validateAddress(
        'Av. de la Constitución, 45, 2º B',
      );
      expect(result).to.equal('');
    });

    it('should return error message for empty address', () => {
      const result = ValidationService.validateAddress('');
      expect(result).to.equal('TRANSLATED_services.validation.errors.address');
      expect(i18n.translate.calledWith('services.validation.errors.address')).to
        .be.true;
    });

    it('should return error message for address with only spaces', () => {
      const result = ValidationService.validateAddress('   ');
      expect(result).to.equal('TRANSLATED_services.validation.errors.address');
    });

    it('should return empty string for address with special characters', () => {
      const result = ValidationService.validateAddress(
        'C/ José María, 23 - 1º A, Urbanización Los Pinos (Sector 3)',
      );
      expect(result).to.equal('');
    });
  });
});
