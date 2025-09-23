import { html, LitElement } from 'lit';
import styles from '../styles/AccountDetail-styles.js';
import { AccountService } from '../services/AccountService.js';

export class AccountDetail extends LitElement {
  static styles = styles;

  static properties = {
    accountId: { type: Number },
    account: { type: Object },
  };

  constructor() {
    super();
    this.accountId = 0;
    this.account = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('accountId')) {
      this._getAccountDetails();
    }
  }

  async _getAccountDetails() {
    const account = await AccountService.getAccount(this.accountId);
    if (account) {
      this.account = account;
    }
  }

  static _formatIBAN(iban) {
    return iban.replace(/(.{4})/g, '$1\u00A0').trim(); // Usamos non-breaking space para evitar saltos de línea
  }

  render() {
    if (!this.account) {
      return html`<div class="container">
        Cargando detalles de la cuenta...
      </div>`;
    }

    return html`
      <div class="container">
        <div class="image-container">
          <img src="/assets/account-image.jpg" alt="Fondo" />
        </div>
        <div class="content">
          <div class="header">
            <h2>Cuenta ${this.account.alias}</h2>
          </div>
          <div class="details">
            <p><strong>ID:</strong> ${this.account.id}</p>
            <p><strong>Alias:</strong> ${this.account.alias}</p>
            <p>
              <strong>IBAN:</strong> ${AccountDetail._formatIBAN(
                this.account.number.iban,
              )}
            </p>
            <p>
              <strong>Saldo:</strong>
              ${this.account.amount.amount} ${this.account.amount.currency}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('bk-account-detail', AccountDetail);
