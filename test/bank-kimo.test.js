import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import Sinon from 'sinon';
import '../src/bank-kimo.js';

describe('BankKimo', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<bank-kimo></bank-kimo>`);
  });

  afterEach(() => {
    Sinon.restore();
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should render the header and footer components', () => {
    const header = element.shadowRoot.querySelector('bk-header');
    const footer = element.shadowRoot.querySelector('bk-footer');

    expect(header).to.exist;
    expect(footer).to.exist;
  });
});
