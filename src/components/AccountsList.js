import { html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import styles from '../styles/AccountsList-styles.js';
import './EditAliasModal.js';
import './toast.js';
import { AccountService } from '../services/AccountService.js';
import { i18n } from '../services/LanguageService.js';

export class AccountsList extends LitElement {
  static styles = styles;

  static properties = {
    accounts: { type: Array },
    filteredAccounts: { type: Array },
    listedAccountsType: { type: String },
  };

  constructor() {
    super();
    this.accounts = [];
    this.listedAccountsType = 'all';
    this.filteredAccounts = [];
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.accounts.length === 0) {
      this.accounts = AccountService.getAccounts();
      this.filteredAccounts = this.accounts;
    }
  }

  openEditModal(id, alias) {
    this.editingId = id;
    this.editingAlias = alias;
    this.shadowRoot
      .querySelector('bk-edit-alias-modal')
      .openModal(id, alias, this.accounts);
  }

  _handleSaveAlias(event) {
    const { id, alias } = event.detail;
    const toast = this.shadowRoot.querySelector('bk-toast');
    const message = AccountService.updateAccountAlias(id, alias);

    if (message === 'OK') {
      toast.showSuccess(
        i18n.translate('services.account.success.alias-updated'),
      );
    } else {
      toast.showError(message);
    }

    this.accounts = [...AccountService.getAccounts()];
    this._updateFilteredAccounts();
  }

  _onAccountTypeChange(event) {
    const { value } = event.target;
    this.listedAccountsType = value;
    this._updateFilteredAccounts();
  }

  _updateFilteredAccounts() {
    const filteredAccounts = this.accounts.filter(
      account =>
        account.amount.currency === this.listedAccountsType.toUpperCase() ||
        this.listedAccountsType === 'all',
    );
    this.filteredAccounts = filteredAccounts;
  }

  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('accounts')) {
      this._updateFilteredAccounts();
    }
  }

  render() {
    if (!this.filteredAccounts || this.filteredAccounts.length === 0) {
      return html`
        <p class="error">
          ${i18n.translate('accounts-list.messages.no-accounts')}
        </p>
        <bk-toast></bk-toast>
      `;
    }

    return html`
      <div class="container">
        <div class="header">
          <h2>${i18n.translate('accounts-list.header')}</h2>
          <select
            class="dropdown"
            id="pageSizeDropdown"
            @change=${this._onAccountTypeChange}
            .value=${String(this.listedAccountsType)}
          >
            <option value="all">
              ${i18n.translate('accounts-list.filters.all')}
            </option>
            <option value="eur">
              ${i18n.translate('accounts-list.filters.national')}
            </option>
            <option value="usd">
              ${i18n.translate('accounts-list.filters.international')}
            </option>
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
                    ${i18n.translate('accounts-list.table.edit-alias')}
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
