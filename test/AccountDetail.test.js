import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/AccountDetail.js';
import Sinon from 'sinon';
import { i18n } from '../src/services/LanguageService.js';

describe('bk-account-detail', () => {
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
    expect(container.textContent).to.include('account.loading-details');
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
    expect(container.textContent).to.include('ES91');
    expect(container.textContent).to.include('1000');
    expect(container.textContent).to.include('Nivel básico');
  });

  describe('Pagination methods', () => {
    let component;
    const mockAccount = {
      id: '2',
      alias: 'Cuenta de ejemplo',
      number: { iban: 'ES9121000418450200051332' },
      amount: { amount: 1000, currency: 'EUR' },
      level: { level: 1, description: 'Nivel básico' },
    };

    const mockTransactions = Array.from({ length: 12 }, (_, i) => ({
      id: `t${i + 1}`,
      description: `Transaction ${i + 1}`,
      amount: { amount: 100, currency: 'EUR' },
      date: '2024-01-01',
    }));

    beforeEach(async () => {
      component = await fixture(html`<bk-account-detail></bk-account-detail>`);
      component.account = mockAccount;
      component.transactions = mockTransactions;
      await component.updateComplete;
    });

    describe('_prevPage', () => {
      it('should decrease currentPage when currentPage > 1', () => {
        component.currentPage = 3;
        component._prevPage();
        expect(component.currentPage).to.equal(2);
      });

      it('should not change currentPage when currentPage is 1', () => {
        component.currentPage = 1;
        component._prevPage();
        expect(component.currentPage).to.equal(1);
      });
    });

    describe('_nextPage', () => {
      it('should increase currentPage when not on last page', () => {
        component.currentPage = 1;
        component.pageSize = 5;
        component._nextPage();
        expect(component.currentPage).to.equal(2);
      });

      it('should not change currentPage when on last page', () => {
        component.currentPage = 3;
        component.pageSize = 5;
        component._nextPage();
        expect(component.currentPage).to.equal(3);
      });

      it('should handle empty transactions array', () => {
        component.transactions = [];
        component.currentPage = 1;
        component._nextPage();
        expect(component.currentPage).to.equal(1);
      });

      it('should handle null transactions', () => {
        component.transactions = null;
        component.currentPage = 1;
        component._nextPage();
        expect(component.currentPage).to.equal(1);
      });
    });

    describe('_onPageSizeChange', () => {
      it('should update pageSize and reset currentPage to 1', () => {
        component.currentPage = 3;
        component.pageSize = 5;

        const mockEvent = {
          target: { value: '10' },
        };

        component._onPageSizeChange(mockEvent);

        expect(component.pageSize).to.equal(10);
        expect(component.currentPage).to.equal(1);
      });

      it('should handle string numbers correctly', () => {
        const mockEvent = {
          target: { value: '25' },
        };

        component._onPageSizeChange(mockEvent);

        expect(component.pageSize).to.equal(25);
        expect(component.currentPage).to.equal(1);
      });

      it('should not update pageSize with invalid values', () => {
        const originalPageSize = component.pageSize;
        const originalCurrentPage = component.currentPage;

        const mockEvent = {
          target: { value: 'invalid' },
        };

        component._onPageSizeChange(mockEvent);

        expect(component.pageSize).to.equal(originalPageSize);
        expect(component.currentPage).to.equal(originalCurrentPage);
      });

      it('should not update pageSize with zero or negative values', () => {
        const originalPageSize = component.pageSize;

        const mockEvent = {
          target: { value: '0' },
        };

        component._onPageSizeChange(mockEvent);
        expect(component.pageSize).to.equal(originalPageSize);

        mockEvent.target.value = '-5';
        component._onPageSizeChange(mockEvent);
        expect(component.pageSize).to.equal(originalPageSize);
      });
    });

    it('should execute _handleLanguageChange arrow function', async () => {
      Sinon.stub(i18n, 'translate').callsFake(key => `TRANSLATED_${key}`);

      const spy = Sinon.spy(component, 'requestUpdate');

      component._handleLanguageChange();

      expect(spy.calledOnce).to.be.true;

      spy.restore();
      Sinon.restore();
    });
  });
});
