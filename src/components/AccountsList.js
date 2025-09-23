import { html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import styles from '../styles/AccountsList-styles.js';
import './EditAliasModal.js';
import { AccountService } from '../services/AccountService.js';

export class AccountsList extends LitElement {
  static styles = styles;

  static properties = {
    accounts: { type: Array },
  };

  constructor() {
    super();
    this.accounts = AccountService.getAccounts();
  }

  openEditModal(id, alias) {
    this.editingId = id;
    this.editingAlias = alias;
    this.shadowRoot
      .querySelector('bk-edit-alias-modal')
      .openModal(id, alias, this.accounts);
  }

  _handleSaveAlias(event) {
    const { id, alias } = event.detail; // DESESTRUCTURACIÓN: const id = event.detail.id; const alias = event.detail.alias;

    const errorContainer = this.shadowRoot.getElementById('error');
    const message = AccountService.updateAccountAlias(id, alias);
    if (message.includes('éxito')) {
      errorContainer.style.color = 'var(--primary-color)';
    } else {
      errorContainer.style.color = 'red';
    }
    errorContainer.innerText = message;

    this.accounts = [...AccountService.getAccounts()]; // Para que se detecte y renderice el cambio hay que crear una copia de la lista
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
              <tr @click=${() => Router.go(`/accounts/${account.id}`)}>
                <td>
                  <p class="alias">${account.alias.toUpperCase()}</p>
                  <p class="iban">${account.number.iban}</p>
                </td>
                <td>
                  <span class="amount ${account.amount.currency}">
                    ${account.amount.amount}
                  </span>
                  <button
                    @click=${e => {
                      e.stopPropagation();
                      this.openEditModal(
                        account.id,
                        account.alias,
                        this.accounts,
                      );
                    }}
                  >
                    EDITAR ALIAS
                  </button>
                </td>
              </tr>
            `,
          )}
        </table>
      </div>
      <bk-edit-alias-modal
        .id=${this.editingId}
        .alias=${this.editingAlias}
        @save-alias=${this._handleSaveAlias}
      ></bk-edit-alias-modal>
      <p id="error"></p>
    `;
  }
}
customElements.define('bk-accounts-list', AccountsList);
