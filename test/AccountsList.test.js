import { fixture, expect, html } from '@open-wc/testing';

import '../src/components/AccountsList.js';

describe('AccountsList', () => {
  let element;
  const mockAccounts = [
    {
      id: '1',
      number: { iban: 'ES0000000000000000000000' },
      alias: 'CUENTA 1 ',
      amount: { amount: 1500, currency: 'EUR' },
      level: { level: 1, description: 'Una cuenta' },
    },
    {
      id: '2',
      number: { iban: 'ES0000000000000000000000' },
      alias: 'CUENTA 2',
      amount: { amount: 1499.95, currency: 'USD' },
      level: { level: 2, description: 'An account' },
    },
  ];
  beforeEach(async () => {
    element = await fixture(html`<bk-accounts-list></bk-accounts-list>`);
  });

  it('shows a message when there are no accounts', async () => {
    expect(element.shadowRoot.textContent).to.include('No hay cuentas');
  });

  it('adds the currency information', async () => {
    const el = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const span = el.shadowRoot.querySelector('span.amount');
    expect(span.classList.contains('EUR')).to.be.true;
  });

  it('renders two accounts', async () => {
    const el = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const rows = el.shadowRoot.querySelectorAll('tr');
    expect(rows.length).to.equal(2);
  });

  it('renders the correct information for the first account', async () => {
    const el = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const rows = el.shadowRoot.querySelectorAll('tr');

    const firstRow = rows[0];
    expect(firstRow.textContent).to.include('CUENTA');
    expect(firstRow.textContent).to.include('ES0000000000000000000000');
    expect(firstRow.textContent).to.include('1500');
  });

  it('renders the correct currency class', async () => {
    const el = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const rows = el.shadowRoot.querySelectorAll('tr');

    const firstRow = rows[0];

    const span = firstRow.querySelector('span.amount');
    expect(span.classList.contains('EUR')).to.be.true;
  });
});
