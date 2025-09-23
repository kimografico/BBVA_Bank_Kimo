import { html, LitElement } from 'lit';
import styles from '../styles/AccountDetail-styles.js';
import { AccountService } from '../services/AccountService.js';

export class AccountDetail extends LitElement {
  static styles = styles;

  static properties = {
    accountId: { type: Number },
    account: { type: Object },
    error: { type: String },
  };

  constructor() {
    super();
    this.accountId = 0;
    this.account = null;
    this.error = null;
  }

  async willUpdate(changedProperties) {
    if (changedProperties.has('accountId')) {
      await this._getAccountDetails();
    }
  }

  async _getAccountDetails() {
    try {
      const account = await AccountService.getAccount(this.accountId);
      if (account) {
        if (JSON.stringify(this.account) !== JSON.stringify(account)) {
          this.account = account; // Solo actualiza si los datos son diferentes
        }
        this.error = null;
      } else {
        this.account = null;
        this.error =
          'No se pudo encontrar la cuenta solicitada. Por favor, inténtelo de nuevo.';
      }
    } catch (e) {
      this.account = null;
      this.error = 'Ocurrió un error al cargar la cuenta.';
    }
  }

  static _formatIBAN(iban) {
    return iban.replace(/(.{4})/g, '$1\u00A0').trim(); // Usamos non-breaking space para evitar saltos de línea
  }

  render() {
    const containerClass = this.error ? 'container error' : 'container';

    if (this.error) {
      return html`<div class="${containerClass}">${this.error}</div>`;
    }

    if (!this.account) {
      return html`<div class="${containerClass}">
        Cargando detalles de la cuenta...
      </div>`;
    }

    return html`
      <div class="${containerClass}">
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
            <p>
              <strong>Nivel:</strong>
              ${this.account.level.description}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('bk-account-detail', AccountDetail);
