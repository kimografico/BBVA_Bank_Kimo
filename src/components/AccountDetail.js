import { html, LitElement } from 'lit';
import styles from '../styles/AccountDetail-styles.js';
import { i18n } from '../services/LanguageService.js';
import { LanguageChangeMixin } from '../mixins/LanguageChangeMixin.js';
import { CONFIG } from '../config.js';

export class AccountDetail extends LanguageChangeMixin(LitElement) {
  static styles = styles;

  static properties = {
    account: { type: Object },
    transactions: { type: Array },
    error: { type: String },
    currentPage: { type: Number },
    pageSize: { type: Number },
  };

  constructor() {
    super();
    this.account = null;
    this.transactions = [];
    this.error = '';
    this.currentPage = 1;
    this.pageSize = CONFIG.PAGINATION.DEFAULT_PAGE_SIZE;
  }

  static _formatIBAN(iban) {
    return iban.replace(/(.{4})/g, '$1\u00A0').trim();
  }

  _sortByDate() {
    const list = Array.isArray(this.transactions) ? this.transactions : [];
    const sortedTransactions = [...list].sort((a, b) => {
      const da = a?.date ? new Date(a.date) : 0;
      const db = b?.date ? new Date(b.date) : 0;
      return db - da;
    });
    return sortedTransactions;
  }

  _getPagedTransactions(transactions) {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return transactions.slice(start, end);
  }

  _prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

  _nextPage() {
    const totalPages = Math.max(
      1,
      Math.ceil((this.transactions?.length || 0) / this.pageSize),
    );
    if (this.currentPage < totalPages) {
      this.currentPage += 1;
    }
  }

  _onPageSizeChange(event) {
    const value = Number(event.target.value);
    if (Number.isFinite(value) && value > 0) {
      this.pageSize = value;
      this.currentPage = 1;
    }
  }

  render() {
    const containerClass = this.error ? 'container error' : 'container';

    if (this.error) {
      return html`<div class="${containerClass}">${this.error}</div>`;
    }

    if (!this.account) {
      return html`<div class="${containerClass}">
        ${i18n.translate('account.loading-details')}
      </div>`;
    }

    const accountSection = html`
      <div class="${containerClass}">
        <div class="image-container">
          <img
            src="/assets/account-image.jpg"
            alt="${i18n.translate('ui.alt.background')}"
          />
        </div>
        <div class="content">
          <div class="header">
            <h2>
              ${i18n
                .translate('account.header')
                .replace('{{alias}}', this.account.alias)}
            </h2>
          </div>
          <div class="details">
            <p>
              <strong>${i18n.translate('account.details.id')}:</strong>
              ${this.account.id}
            </p>
            <p>
              <strong>${i18n.translate('account.details.alias')}:</strong>
              ${this.account.alias}
            </p>
            <p>
              <strong>${i18n.translate('account.details.iban')}:</strong>
              <span
                >${AccountDetail._formatIBAN(this.account.number.iban)}:</span
              >
            </p>
            <p>
              <strong>${i18n.translate('account.details.balance')}:</strong>
              <span class="${this.account.amount.currency}">
                ${this.account.amount.amount}
              </span>
            </p>
            <p>
              <strong>${i18n.translate('account.details.level')}:</strong>
              ${this.account.level.description}
            </p>
          </div>
        </div>
      </div>
    `;

    const sortedTransactions = this._sortByDate();

    let transactionsSection = html``;
    if (sortedTransactions.length > 0) {
      const totalPages = Math.max(
        1,
        Math.ceil(sortedTransactions.length / this.pageSize),
      );
      const paged = this._getPagedTransactions(sortedTransactions);
      transactionsSection = html`
        <div class="${containerClass}">
          <div class="content">
            <div class="header-transactions">
              <h3>${i18n.translate('account.transactions.header')}</h3>
            </div>

            ${paged.map(
              t => html`
                <div class="transactions" key=${t.id}>
                  <p class="date">${t.date}</p>
                  <p class="description">${t.description}</p>
                  <p
                    class="amount ${`${t.amount.currency} ${Number(t.amount?.amount) <= 0 ? 'negative' : ''}`}"
                  >
                    ${t.amount ? t.amount.amount : ''}
                  </p>
                </div>
              `,
            )}
            ${this.transactions.length > 5
              ? html`
                  <div class="pagination-controls">
                    <button
                      class="nav prev"
                      @click=${this._prevPage}
                      ?disabled=${this.currentPage <= 1}
                    >
                      🡨
                    </button>
                    <button
                      class="nav next"
                      @click=${this._nextPage}
                      ?disabled=${this.currentPage >= totalPages}
                    >
                      🡪
                    </button>

                    <select
                      id="pageSizeDropdown"
                      @change=${this._onPageSizeChange}
                      .value=${String(this.pageSize)}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                `
              : ''}
          </div>
        </div>
      `;
    }

    return html`<div class="big-container">
      ${accountSection} ${transactionsSection}
    </div>`;
  }
}
customElements.define('bk-account-detail', AccountDetail);
