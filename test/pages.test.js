import { fixture, html, expect } from '@open-wc/testing';
import '../src/pages/404.js';
import '../src/pages/accounts.js';
import '../src/components/AccountsList.js';

describe('test pages', () => {
  it('should show a 404 page when the route is not found', async () => {
    const component = await fixture(html`<page-not-found></page-not-found>`);

    const h2 = component.shadowRoot.querySelector('h2');
    const p = component.shadowRoot.querySelector('p');

    expect(h2).to.exist;
    expect(h2.textContent).to.equal('Página no encontrada');

    expect(p).to.exist;
    expect(p.textContent).to.equal(
      'Lo sentimos, la página que buscas no existe.',
    );
  });

  it('should show the accounts page', async () => {
    const component = await fixture(html`<accounts-page></accounts-page>`);

    const accountsList = component.shadowRoot.querySelector('bk-accounts-list');
    expect(accountsList).to.exist;
  });
});
