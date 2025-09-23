import { html, LitElement } from 'lit';
import styles from '../styles/AccountDetail-styles.js';

export class AccountDetail extends LitElement {
  static styles = styles;

  static properties = {
    account: { type: Object },
    error: { type: String },
  };

  constructor() {
    super();
    this.account = null;
    this.error = null;
  }

  // Presentational: no side effects, recibe datos desde el padre
  static _formatIBAN(iban) {
    return iban.replace(/(.{4})/g, '$1\u00A0').trim();
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
              <strong>Saldo:</strong> ${this.account.amount.amount}
              ${this.account.amount.currency}
            </p>
            <p><strong>Nivel:</strong> ${this.account.level.description}</p>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('bk-account-detail', AccountDetail);
