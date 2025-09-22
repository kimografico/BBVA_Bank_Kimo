import { fixture, expect, html } from '@open-wc/testing';

import '../src/components/AccountsList.js';
import Sinon from 'sinon';
import { AccountService } from '../src/services/AccountService.js';

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
    AccountService._accounts = [...mockAccounts];
  });

  it('shows a message when there are no accounts', async () => {
    expect(element.shadowRoot.textContent).to.include('No hay cuentas');
  });

  it('adds the currency information', async () => {
    const component = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const span = component.shadowRoot.querySelector('span.amount');
    expect(span.classList.contains('EUR')).to.be.true;
  });

  it('renders two accounts', async () => {
    const component = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const rows = component.shadowRoot.querySelectorAll('tr');
    expect(rows.length).to.equal(2);
  });

  it('renders the correct information for the first account', async () => {
    const component = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const rows = component.shadowRoot.querySelectorAll('tr');

    const firstRow = rows[0];
    expect(firstRow.textContent).to.include('CUENTA');
    expect(firstRow.textContent).to.include('ES0000000000000000000000');
    expect(firstRow.textContent).to.include('1500');
  });

  it('renders the correct currency class', async () => {
    const component = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const rows = component.shadowRoot.querySelectorAll('tr');

    const firstRow = rows[0];

    const span = firstRow.querySelector('span.amount');
    expect(span.classList.contains('EUR')).to.be.true;
  });

  it('shows a message when accounts is undefined', async () => {
    const component = await fixture(
      html`<bk-accounts-list></bk-accounts-list>`,
    );
    expect(component.shadowRoot.textContent).to.include('No hay cuentas');
  });

  it('renders an "EDITAR ALIAS" button for each account', async () => {
    const component = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const buttons = component.shadowRoot.querySelectorAll('button');
    expect(buttons.length).to.equal(mockAccounts.length);
    buttons.forEach(button => {
      expect(button.textContent).to.include('EDITAR');
    });
  });

  it('calls openEditModal when "EDITAR ALIAS" is clicked', async () => {
    const component = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const openEditModalSpy = Sinon.spy(component, 'openEditModal');
    const button = component.shadowRoot.querySelectorAll('button');
    button[0].click();

    expect(openEditModalSpy.calledOnce).to.be.true;
    expect(
      openEditModalSpy.calledWith(mockAccounts[0].id, mockAccounts[0].alias),
    ).to.be.true;
  });

  it('updates accounts when _handleSaveAlias is called', async () => {
    const component = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const newAlias = 'Nueva Cuenta';
    component._handleSaveAlias({ detail: { id: '1', alias: newAlias } });

    const updatedAccount = component.accounts.find(
      account => account.id === '1',
    );
    expect(updatedAccount.alias).to.equal(newAlias);
  });

  it('displays a success message when alias is updated successfully', async () => {
    const component = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    component._handleSaveAlias({ detail: { id: '1', alias: 'CuentaTest' } });

    const errorContainer = component.shadowRoot.getElementById('error');
    expect(errorContainer.textContent).to.include('éxito');
    expect(errorContainer.style.color).to.equal('var(--primary-color)');
  });

  it('displays an error message when alias update fails', async () => {
    const component = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    component._handleSaveAlias({ detail: { id: '1', alias: 'CUENTA 2' } });

    const errorContainer = component.shadowRoot.getElementById('error');
    expect(errorContainer.textContent).to.include(
      'No se pudo cambiar el alias',
    );
    expect(errorContainer.style.color).to.equal('red');
  });

  it('renders the correct data for each account', async () => {
    const component = await fixture(html`
      <bk-accounts-list .accounts=${mockAccounts}></bk-accounts-list>
    `);

    const rows = component.shadowRoot.querySelectorAll('tr');
    rows.forEach((row, index) => {
      const account = mockAccounts[index];
      expect(row.textContent).to.include(account.alias.toUpperCase());
      expect(row.textContent).to.include(account.number.iban);
      expect(row.textContent).to.include(account.amount.amount.toString());
    });
  });
});
