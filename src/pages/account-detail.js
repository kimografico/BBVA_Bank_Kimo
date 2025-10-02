import { LitElement, html, css } from 'lit';
import '../components/AccountDetail.js';
import { Router } from '@vaadin/router';
import { AccountService } from '../services/AccountService.js';
import { i18n } from '../services/LanguageService.js';
import { LanguageChangeMixin } from '../mixins/LanguageChangeMixin.js';

export class AccountDetail extends LanguageChangeMixin(LitElement) {
  static properties = {
    accountId: { type: Number },
    account: { type: Object },
    transactions: { type: Object },
    error: { type: String },
  };

  static styles = css`
    #back-button {
      font-family: 'Sansation', sans-serif;
      border-radius: 20px;
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      padding: 5px 15px 8px 15px;
      transition: 0.5s;

      &::before {
        content: '◀ ';
        font-weight: bold;
      }

      &:hover {
        cursor: pointer;
        background: var(--primary-color);
        color: white;
      }
    }
  `;

  onBeforeEnter(location) {
    this.accountId = Number(location.params.id);
    this._loadAccount();
  }

  async _loadAccount() {
    this.account = null;
    this.transactions = null;
    this.error = null;
    try {
      const acc = await AccountService.getAccount(this.accountId);
      if (acc) {
        this.account = acc;

        try {
          const transactions = await AccountService.getAccountTransactions(
            this.accountId,
          );
          this.transactions = transactions;
        } catch (err) {
          this.transactions = [];
          this.error = i18n.translate('account.error.loaded');
        }
      } else {
        this.error = i18n.translate('account.error.not-found');
      }
    } catch (e) {
      this.error = i18n.translate('account.error.generic');
    }
  }

  static goBack() {
    Router.go('/accounts');
  }

  render() {
    return html`
      <bk-account-detail
        .account=${this.account}
        .transactions=${this.transactions}
        .error=${this.error}
      ></bk-account-detail>
      <button id="back-button" @click=${AccountDetail.goBack}>
        ${i18n.translate('ui.back-to-list-button')}
      </button>
    `;
  }
}

customElements.define('account-detail-page', AccountDetail);
