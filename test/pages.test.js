import { fixture, html, expect } from '@open-wc/testing';
import { Router } from '@vaadin/router';
import '../src/pages/404.js';
import '../src/pages/accounts.js';
import '../src/components/AccountsList.js';
import '../src/components/AccountDetail.js';
import '../src/pages/account-detail.js';
import '../src/pages/user-profile.js';
import '../src/components/Header.js';
import Sinon from 'sinon';
import { AccountService } from '../src/services/AccountService.js';

describe('test pages', () => {
  it('should show a 404 page when the route is not found', async () => {
    const component = await fixture(html`<page-not-found></page-not-found>`);

    const h2 = component.shadowRoot.querySelector('h2');
    const p = component.shadowRoot.querySelector('p');

    expect(h2).to.exist;
    expect(h2.textContent).to.equal('page-not-found.title');

    expect(p).to.exist;
    expect(p.textContent).to.equal('page-not-found.message');
  });

  it('should show the accounts page', async () => {
    const component = await fixture(html`<accounts-page></accounts-page>`);

    const accountsList = component.shadowRoot.querySelector('bk-accounts-list');
    expect(accountsList).to.exist;
  });

  it('should show the user profile', async () => {
    const component = await fixture(
      html`<user-profile-page></user-profile-page>`,
    );

    const accountsList = component.shadowRoot.querySelector('bk-user-profile');
    expect(accountsList).to.exist;
  });
});

describe('account-detail-page', () => {
  afterEach(() => {
    if (AccountService.getAccount.restore) AccountService.getAccount.restore();
    if (
      AccountService.getAccountTransactions &&
      AccountService.getAccountTransactions.restore
    ) {
      AccountService.getAccountTransactions.restore();
    }
  });

  it('should load account and pass it to child', async () => {
    const mockAccount = {
      id: '2',
      alias: 'Cuenta de ejemplo',
      number: { iban: 'ES9121000418450200051332' },
      amount: { amount: 1000, currency: 'EUR' },
      level: { level: 1, description: 'Nivel básico' },
    };
    Sinon.stub(AccountService, 'getAccount').resolves(mockAccount);

    const page = await fixture(
      html`<account-detail-page></account-detail-page>`,
    );

    await page.onBeforeEnter({ params: { id: '2' } });

    await page.updateComplete;
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    const child = page.shadowRoot.querySelector('bk-account-detail');
    expect(child).to.exist;
    expect(child.account).to.deep.equal(mockAccount);

    AccountService.getAccount.restore();
  });

  it('should show error when account not found', async () => {
    Sinon.stub(AccountService, 'getAccount').resolves(null);

    const page = await fixture(
      html`<account-detail-page></account-detail-page>`,
    );
    await page.onBeforeEnter({ params: { id: '999' } });
    await page.updateComplete;
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    const child = page.shadowRoot.querySelector('bk-account-detail');
    expect(child).to.exist;
    const container = child.shadowRoot.querySelector('.container');
    expect(container.textContent).to.include('account.error.not-found');

    AccountService.getAccount.restore();
  });

  it('should call Router.go when back button is clicked', async () => {
    const routerStub = Sinon.stub(Router, 'go').callsFake(() => {});
    const page = await fixture(
      html`<account-detail-page></account-detail-page>`,
    );
    const backButton = page.shadowRoot.querySelector('#back-button');
    expect(backButton).to.exist;
    backButton.click();
    expect(routerStub.calledOnce).to.be.true;
    expect(routerStub.calledWith('/accounts')).to.be.true;
    routerStub.restore();
  });

  it('should show error when AccountService throws', async () => {
    Sinon.stub(AccountService, 'getAccount').rejects(new Error('network'));

    const page = await fixture(
      html`<account-detail-page></account-detail-page>`,
    );

    await page.onBeforeEnter({ params: { id: '5' } });

    await page.updateComplete;
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    const child = page.shadowRoot.querySelector('bk-account-detail');
    expect(child).to.exist;

    const container = child.shadowRoot.querySelector('.container');
    expect(container.textContent).to.include('account.error.generic');

    AccountService.getAccount.restore();
  });

  it('should show error when transaction loading fails', async () => {
    const mockAccount = {
      id: '2',
      alias: 'Cuenta de ejemplo',
      number: { iban: 'ES9121000418450200051332' },
      amount: { amount: 1000, currency: 'EUR' },
      level: { level: 1, description: 'Nivel básico' },
    };

    Sinon.stub(AccountService, 'getAccount').resolves(mockAccount);
    Sinon.stub(AccountService, 'getAccountTransactions').rejects(
      new Error('Transaction error'),
    );

    const page = await fixture(
      html`<account-detail-page></account-detail-page>`,
    );

    await page.onBeforeEnter({ params: { id: '2' } });
    await page.updateComplete;
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    const child = page.shadowRoot.querySelector('bk-account-detail');
    expect(child).to.exist;
    expect(child.transactions).to.deep.equal([]);
    expect(child.error).to.equal('account.transactions.error.loaded');

    AccountService.getAccount.restore();
    AccountService.getAccountTransactions.restore();
  });
});

describe('header and footer', () => {
  it('should show the header', async () => {
    const component = await fixture(html`<app-header></app-header>`);
    expect(component).to.exist;
  });

  it('should show the footer', async () => {
    const component = await fixture(html`<app-footer></app-footer>`);
    expect(component).to.exist;
  });

  it('should toggle menu state when toggleMenu is called', async () => {
    const component = await fixture(html`<bk-header></bk-header>`);

    expect(component.isMenuOpen).to.be.false;

    component.toggleMenu();
    expect(component.isMenuOpen).to.be.true;

    component.toggleMenu();
    expect(component.isMenuOpen).to.be.false;
  });

  it('should close menu when closeMenu is called', async () => {
    const component = await fixture(html`<bk-header></bk-header>`);

    component.isMenuOpen = true;
    expect(component.isMenuOpen).to.be.true;

    component.closeMenu();
    expect(component.isMenuOpen).to.be.false;
  });
});
