import { html, LitElement } from 'lit';
import styles from '../styles/AccountDetail-styles.js';

export class AccountDetail extends LitElement {
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
    this.error = null;
    this.currentPage = 1;
    this.pageSize = 5;
  }

  static _formatIBAN(iban) {
    return iban.replace(/(.{4})/g, '$1\u00A0').trim();
  }

  _sortByDate() {
    const sortedTransactions = [...this.transactions].sort((a, b) => {
      const da = a?.date ? new Date(a.date) : 0;
      const db = b?.date ? new Date(b.date) : 0;
      return db - da;
    });
    return sortedTransactions;
  }

  _getPagedTransactions(sorted) {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return sorted.slice(start, end);
  }

  _prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

  _nextPage() {
    const totalPages = Math.max(
      1,
      Math.ceil(this.transactions.length / this.pageSize),
    );
    if (this.currentPage < totalPages) {
      this.currentPage += 1;
    }
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

    const accountSection = html`
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
              <strong>IBAN:</strong>
              <span class="iban"
                >${AccountDetail._formatIBAN(this.account.number.iban)}</span
              >
            </p>
            <p>
              <strong>Saldo:</strong>
              <span class="${this.account.amount.currency}">
                ${this.account.amount.amount}
              </span>
            </p>
            <p><strong>Nivel:</strong> ${this.account.level.description}</p>
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
              <h3>Transacciones</h3>
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
            </div>
          </div>
        </div>
      `;
    }

    return html`${accountSection} ${transactionsSection}`;
  }
}
customElements.define('bk-account-detail', AccountDetail);
