import { LitElement, html, css } from 'lit';
import '../components/AccountDetail.js';
import { Router } from '@vaadin/router';
import { AccountService } from '../services/AccountService.js';

export class AccountDetail extends LitElement {
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
        content: '🡨 ';
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
      const transactions = await AccountService.getAccountTransactions(
        this.accountId,
      );
      if (acc) {
        this.account = acc;
        this.transactions = transactions;
      } else {
        this.error =
          'No se pudo encontrar la cuenta solicitada. Por favor, inténtelo de nuevo.';
      }
    } catch (e) {
      this.error = 'Ocurrió un error al cargar la cuenta.';
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
        Volver a la lista
      </button>
    `;
  }
}

customElements.define('account-detail-page', AccountDetail);
