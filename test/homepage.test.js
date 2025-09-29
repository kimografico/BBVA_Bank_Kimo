import { fixture, html, expect } from '@open-wc/testing';
import Sinon from 'sinon';
import { i18n } from '../src/services/LanguageService.js';
import '../src/pages/homepage.js';

describe('Homepage', () => {
  it('should render the component', async () => {
    const component = await fixture(html`<home-page></home-page>`);
    expect(component).to.exist;
  });

  it('should execute _handleLanguageChange arrow function', async () => {
    Sinon.stub(i18n, 'translate').callsFake(key => `TRANSLATED_${key}`);

    const component = await fixture(html`<home-page></home-page>`);
    const spy = Sinon.spy(component, 'requestUpdate');

    component._handleLanguageChange();

    expect(spy.calledOnce).to.be.true;

    spy.restore();
    Sinon.restore();
  });
});
