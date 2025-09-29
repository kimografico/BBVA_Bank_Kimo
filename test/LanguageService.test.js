import { expect } from '@open-wc/testing';
import Sinon from 'sinon';

import { ValidationService } from '../src/services/ValidationService.js';
import { i18n } from '../src/services/LanguageService.js';

describe('translation keys', () => {
  beforeEach(() => {
    Sinon.stub(i18n, 'translate').callsFake(key => `TRANSLATED_${key}`);
  });

  afterEach(() => {
    Sinon.restore();
  });

  it('should call correct translation key for each validation error', () => {
    ValidationService.validateName('');
    ValidationService.validateSurname('');
    ValidationService.validateEmail('invalid');
    ValidationService.validateAddress('');
    ValidationService.validatePhone('invalid');

    expect(i18n.translate.calledWith('services.validation.errors.name')).to.be
      .true;
    expect(i18n.translate.calledWith('services.validation.errors.surname')).to
      .be.true;
    expect(i18n.translate.calledWith('services.validation.errors.email')).to.be
      .true;
    expect(i18n.translate.calledWith('services.validation.errors.address')).to
      .be.true;
    expect(i18n.translate.calledWith('services.validation.errors.phone')).to.be
      .true;
  });
});
