import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/AccountDetail.js';

describe('bk-account-detail (presentational)', () => {
  it('should render the component', async () => {
    const component = await fixture(
      html`<bk-account-detail></bk-account-detail>`,
    );
    expect(component).to.exist;
  });

  it('should show loading when account is null', async () => {
    const component = await fixture(
      html`<bk-account-detail .account=${null}></bk-account-detail>`,
    );
    const container = component.shadowRoot.querySelector('.container');
    expect(container).to.exist;
    expect(container.textContent).to.include('Cargando detalles de la cuenta');
  });

  it('should show an error message when error prop is set', async () => {
    const component = await fixture(
      html`<bk-account-detail
        .error=${'No se pudo cargar'}
      ></bk-account-detail>`,
    );
    const container = component.shadowRoot.querySelector('.container');
    expect(container.textContent).to.include('No se pudo cargar');
  });

  it('should render the account details when account prop is provided', async () => {
    const mockAccount = {
      id: '2',
      alias: 'Cuenta de ejemplo',
      number: { iban: 'ES9121000418450200051332' },
      amount: { amount: 1000, currency: 'EUR' },
      level: { level: 1, description: 'Nivel básico' },
    };

    const component = await fixture(
      html`<bk-account-detail .account=${mockAccount}></bk-account-detail>`,
    );
    await component.updateComplete;

    const container = component.shadowRoot.querySelector('.container');
    expect(container.textContent).to.include('Cuenta de ejemplo');
    expect(container.textContent).to.include('ES91'); // comprobación parcial formateo IBAN
    // Normalize whitespace because render may insert newlines between amount and currency
    const text = container.textContent.replace(/\s+/g, ' ').trim();
    expect(text).to.include('1000 EUR');
    expect(container.textContent).to.include('Nivel básico');
  });
});
