import { expect, fixture, html } from '@open-wc/testing';
import Sinon from 'sinon';

import { i18n } from '../src/services/LanguageService.js';
import '../src/components/Header.js';
import '../src/components/UserProfile.js';
import '../src/components/AccountsList.js';

describe('Language reactivity across components', () => {
  beforeEach(() => {
    Sinon.stub(i18n, 'translate').callsFake(key => `TRANSLATED_${key}`);
  });

  afterEach(() => {
    Sinon.restore();
  });

  // Array de componentes a testear
  const componentsToTest = [
    {
      name: 'UserProfile',
      tag: 'bk-user-profile',
      html: html`<bk-user-profile></bk-user-profile>`,
    },
    {
      name: 'AccountsList',
      tag: 'bk-accounts-list',
      html: html`<bk-accounts-list></bk-accounts-list>`,
    },
  ];

  componentsToTest.forEach(({ name, html: componentHtml }) => {
    it(`should trigger requestUpdate when language changes in ${name}`, async () => {
      const component = await fixture(componentHtml);
      await component.updateComplete;

      const requestUpdateSpy = Sinon.spy(component, 'requestUpdate');

      document.dispatchEvent(new CustomEvent('language-changed'));

      expect(requestUpdateSpy.calledOnce).to.be.true;
      expect(requestUpdateSpy.calledWith()).to.be.true;

      requestUpdateSpy.restore();
    });
  });
});
