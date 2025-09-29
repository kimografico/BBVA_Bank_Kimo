import { fixture, expect } from '@open-wc/testing';

import '../src/components/AccountsList.js';
import Sinon from 'sinon';

describe('AccountsList', () => {
  const mockAccounts = [
    {
      id: '1',
      alias: 'COMPARTIDA ',
      number: { iban: 'ES4401824723176778414475' },
      amount: { amount: 2433.15, currency: 'EUR' },
      level: { level: 1, description: 'National Account' },
      transactions: [
        {
          id: '1-t1',
          description: 'Ingreso nómina',
          amount: { amount: 1500.0, currency: 'EUR' },
          date: '2024/08/01',
        },
        {
          id: '1-t2',
          description: 'Pago supermercado',
          amount: { amount: -120.45, currency: 'EUR' },
          date: '2024/08/03',
        },
      ],
    },
    {
      id: '3',
      alias: 'USA',
      number: { iban: 'AE950213642574896367215' },
      amount: { amount: 1156.1, currency: 'USD' },
      level: { level: 2, description: 'International Account' },
      transactions: [],
    },
  ];
  let element;
  beforeEach(async () => {
    element = await fixture('<bk-accounts-list></bk-accounts-list>');
    element.accounts = mockAccounts;
    await element.updateComplete;
  });

  it('shows a message when there are no accounts', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = [];
    await component.updateComplete;

    expect(component.shadowRoot.textContent).to.include(
      'accounts-list.messages.no-accounts',
    );
  });

  it('adds the currency information', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;

    component._updateFilteredAccounts();
    await component.updateComplete;

    const span = component.shadowRoot.querySelector('span.amount');
    expect(span.classList.contains('EUR')).to.be.true;
  });

  it('renders two accounts', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;
    const rows = component.shadowRoot.querySelectorAll('tr');
    expect(rows.length).to.equal(2);
  });

  it('renders the correct information for the first account', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const rows = component.shadowRoot.querySelectorAll('tr');

    const firstRow = rows[0];
    expect(firstRow.textContent).to.include('COMPARTIDA');
    expect(firstRow.textContent).to.include('ES4401824723176778414475');
    expect(firstRow.textContent).to.include('2433.15');
  });

  it('renders the correct currency class', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const rows = component.shadowRoot.querySelectorAll('tr');

    const firstRow = rows[0];

    const span = firstRow.querySelector('span.amount');
    expect(span.classList.contains('EUR')).to.be.true;
  });

  it('shows a message when accounts is undefined', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');

    component.accounts = [];
    component.filteredAccounts = [];
    await component.updateComplete;

    expect(component.shadowRoot.textContent).to.include(
      'accounts-list.messages.no-accounts',
    );
  });

  it('renders an "EDITAR ALIAS" button for each account', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const buttons = component.shadowRoot.querySelectorAll('button');
    expect(buttons.length).to.equal(mockAccounts.length);
    buttons.forEach(button => {
      expect(button.textContent).to.include('accounts-list.table.edit-alias');
    });
  });

  it('calls openEditModal when "EDITAR ALIAS" is clicked', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const openEditModalSpy = Sinon.spy(component, 'openEditModal');
    const button = component.shadowRoot.querySelectorAll('button');
    button[0].click();

    expect(openEditModalSpy.calledOnce).to.be.true;
    expect(
      openEditModalSpy.calledWith(mockAccounts[0].id, mockAccounts[0].alias),
    ).to.be.true;
  });

  it('updates accounts when _handleSaveAlias is called', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const newAlias = 'Nueva Cuenta';
    component._handleSaveAlias({ detail: { id: '1', alias: newAlias } });

    const updatedAccount = component.accounts.find(
      account => account.id === '1',
    );
    expect(updatedAccount.alias).to.equal(newAlias);
  });

  it('displays a success message when alias is updated successfully', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const toast = component.shadowRoot.querySelector('bk-toast');
    const showSuccessSpy = Sinon.spy(toast, 'showSuccess');

    component._handleSaveAlias({ detail: { id: '1', alias: 'NuevoAlias' } });

    expect(showSuccessSpy.calledOnce).to.be.true;

    showSuccessSpy.restore();
  });

  it('calls toast showError when alias update fails', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const toast = component.shadowRoot.querySelector('bk-toast');
    const showErrorSpy = Sinon.spy(toast, 'showError');

    component._handleSaveAlias({ detail: { id: '1', alias: 'USA' } });

    expect(showErrorSpy.called).to.be.true;
  });

  it('renders the correct data for each account', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const rows = component.shadowRoot.querySelectorAll('tr');
    rows.forEach((row, index) => {
      const account = mockAccounts[index];
      expect(row.textContent).to.include(account.alias.toUpperCase());
      expect(row.textContent).to.include(account.number.iban);
      expect(row.textContent).to.include(account.amount.amount.toString());
    });
  });

  it('should filter accounts when _onAccountTypeChange is called', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const updateFilteredAccountsSpy = Sinon.spy(
      component,
      '_updateFilteredAccounts',
    );

    const mockEvent = {
      target: {
        value: 'national',
      },
    };

    component._onAccountTypeChange(mockEvent);

    expect(component.listedAccountsType).to.equal('national');
    expect(updateFilteredAccountsSpy.calledOnce).to.be.true;

    updateFilteredAccountsSpy.restore();
  });

  it('should update listedAccountsType to international', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const mockEvent = {
      target: {
        value: 'international',
      },
    };

    component._onAccountTypeChange(mockEvent);

    expect(component.listedAccountsType).to.equal('international');
  });

  it('should update listedAccountsType to all accounts', async () => {
    const component = await fixture('<bk-accounts-list></bk-accounts-list>');
    component.accounts = mockAccounts;
    await component.updateComplete;

    const mockEvent = {
      target: {
        value: 'all',
      },
    };

    component._onAccountTypeChange(mockEvent);

    expect(component.listedAccountsType).to.equal('all');
  });
});
