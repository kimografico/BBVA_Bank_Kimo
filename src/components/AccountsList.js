import { html, LitElement } from 'lit';
import styles from './AccountsList-styles.js';

export class AccountsList extends LitElement {
  static styles = styles;

  static properties = {
    name: { type: String },
    accounts: { type: Array },
  };

  constructor() {
    super();
    this.name = 'Kimo';
  }

  render() {
    if (!this.accounts || this.accounts.length === 0) {
      return html`<p class="error">No hay cuentas</p>`;
    }

    return html`
      <div class="container">
        <h2>Cuentas</h2>
        <table>
          ${this.accounts.map(
            account => html`
              <tr>
                <td>
                  <p class="alias">${account.alias}</p>
                  <p class="iban">${account.number.iban}</p>
                </td>
                <td>
                  <span class="amount ${account.amount.currency}"
                    >${account.amount.amount}</span
                  >
                </td>
              </tr>
            `,
          )}
        </table>
      </div>
    `;
  }
}
customElements.define('bk-accounts-list', AccountsList);
