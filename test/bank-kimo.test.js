import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import '../src/bank-kimo.js';

// TODO: ¿Por qué no sale la lista de test en terminal?

describe('BankKimo', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<bank-kimo></bank-kimo>`);
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

  it('should fetch and render the accounts list', () => {
    const accountsList = element.shadowRoot.querySelector('bk-accounts-list');
    const { accounts } = element; // accounts = element.accounts

    expect(accounts).to.be.an('array');
    expect(accounts.length).to.be.greaterThan(0);
    expect(accountsList).to.exist;
  });
});
