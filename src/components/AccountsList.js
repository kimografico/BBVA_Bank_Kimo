import { html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import styles from '../styles/AccountsList-styles.js';
import './EditAliasModal.js';
import './toast.js';
import { AccountService } from '../services/AccountService.js';

export class AccountsList extends LitElement {
  static styles = styles;

  static properties = {
    accounts: { type: Array },
    filteredAccounts: { type: Array },
    listedAccountsType: { type: String },
  };

  constructor() {
    super();
    this.accounts = AccountService.getAccounts();
    this.listedAccountsType = 'all';
    this.filteredAccounts = this.accounts;
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

    const toast = this.shadowRoot.querySelector('bk-toast');
    const message = AccountService.updateAccountAlias(id, alias);

    // Usar el toast en lugar del contenedor de error
    if (message.includes('éxito')) {
      toast.showSuccess(message);
    } else {
      toast.showError(message);
    }

    this.accounts = [...AccountService.getAccounts()]; // Para que se detecte y renderice el cambio hay que crear una copia de la lista

    // Actualizar filteredAccounts para reflejar los cambios
    this._updateFilteredAccounts();
  }

  _onAccountTypeChange(event) {
    const { value } = event.target;
    this.listedAccountsType = value;
    this._updateFilteredAccounts();
  }

  // Método auxiliar para actualizar las cuentas filtradas
  _updateFilteredAccounts() {
    const filteredAccounts = this.accounts.filter(
      account =>
        account.amount.currency === this.listedAccountsType.toUpperCase() ||
        this.listedAccountsType === 'all',
    );
    this.filteredAccounts = filteredAccounts;
  }

  render() {
    if (!this.filteredAccounts || this.filteredAccounts.length === 0) {
      return html`
        <p class="error">No hay cuentas</p>
        <bk-toast></bk-toast>
      `;
    }

    return html`
      <div class="container">
        <div class="header">
          <h2>Cuentas</h2>
          <select
            class="dropdown"
            id="pageSizeDropdown"
            @change=${this._onAccountTypeChange}
            .value=${String(this.listedAccountsType)}
          >
            <option value="all">Todas</option>
            <option value="eur">Nacionales</option>
            <option value="usd">Internacionales</option>
          </select>
        </div>
        <table>
          ${this.filteredAccounts.map(
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
      <bk-toast></bk-toast>
    `;
  }
}
customElements.define('bk-accounts-list', AccountsList);
