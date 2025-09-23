import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/AccountDetail.js';
import '../src/pages/account-detail.js';
import { Router } from '@vaadin/router';
import Sinon from 'sinon';
import { AccountService } from '../src/services/AccountService.js';

describe('AccountDetail.js', () => {
  it('should render the component', async () => {
    const component = await fixture(
      html`<bk-account-detail></bk-account-detail>`,
    );
    expect(component).to.exist;
  });

  it('should get the account information', async () => {
    const component = await fixture(
      html`<bk-account-detail accountId="2"></bk-account-detail>`,
    );

    expect(component).to.have.property('accountId', 2);
    expect(component.account).to.exist;

    expect(component.account).to.include.keys(
      'id',
      'alias',
      'number',
      'amount',
      'level',
    );
    expect(component.account.amount).to.include.keys('amount', 'currency');
    expect(component.account.level).to.include.keys('level', 'description');
  });

  it('should show an error message when accountId is invalid', async () => {
    Sinon.stub(AccountService, 'getAccount').resolves(null);

    const component = await fixture(
      html`<bk-account-detail accountId="999"></bk-account-detail>`,
    );

    await component.updateComplete;

    const container = component.shadowRoot.querySelector('.container');
    expect(container.textContent).to.include(
      'No se pudo encontrar la cuenta solicitada',
    );

    AccountService.getAccount.restore();
  });

  it('should show an error message when an exception occurs', async () => {
    Sinon.stub(AccountService, 'getAccount').throws(new Error('Network error'));

    const component = await fixture(
      html`<bk-account-detail accountId="2"></bk-account-detail>`,
    );

    await component.updateComplete;

    const container = component.shadowRoot.querySelector('.container');
    expect(container.textContent).to.include(
      'Ocurrió un error al cargar la cuenta.',
    );

    AccountService.getAccount.restore();
  });

  it('should render the account details when account is valid', async () => {
    Sinon.stub(AccountService, 'getAccount').resolves({
      id: 2,
      alias: 'Cuenta de ejemplo',
      number: { iban: 'ES9121000418450200051332' },
      amount: { amount: 1000, currency: 'EUR' },
      level: { level: 1, description: 'Nivel básico' },
    });

    const component = await fixture(
      html`<bk-account-detail accountId="2"></bk-account-detail>`,
    );

    await component.updateComplete;

    const container = component.shadowRoot.querySelector('.container');
    expect(container.textContent).to.include('Cuenta de ejemplo');
    expect(container.textContent).to.include('ES91 2100 0418 4502 0005 1332'); // IBAN formateado
    expect(container.textContent).to.include('1000 EUR');
    expect(container.textContent).to.include('Nivel básico');

    AccountService.getAccount.restore();
  });

  it('should go back to account list when back button is clicked', async () => {
    const routerStub = Sinon.stub(Router, 'go').callsFake(() => {});

    const component = await fixture(
      html`<account-detail-page></account-detail-page>`,
    );

    const backButton = component.shadowRoot.querySelector('#back-button');
    expect(backButton).to.exist;

    backButton.click();

    expect(routerStub.calledOnce).to.be.true;
    expect(routerStub.calledWith('/accounts')).to.be.true;

    routerStub.restore();
  });
});
