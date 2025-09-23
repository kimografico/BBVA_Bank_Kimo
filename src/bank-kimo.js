import { html, LitElement } from 'lit';
import { initRouter } from './router.js';
import styles from './styles/bank-kimo-styles.js';
import { AccountService } from './services/AccountService.js';
import './components/AccountsList.js';
import './components/Header.js';
import './components/Footer.js';
import './components/Loader.js';

class BankKimo extends LitElement {
  firstUpdated() {
    const outlet = this.shadowRoot.querySelector('#outlet');
    const loader = this.shadowRoot.querySelector('bk-loader');
    initRouter(outlet, loader);
  }

  static styles = styles;

  static properties = {
    header: { type: String },
  };

  constructor() {
    super();
    this.accounts = AccountService.getAccounts();
    this.header = 'Banco Kimo';
    this.footer =
      '© 2025 Kimo ◆ Esta aplicación es un proyecto formativo y no representa a una entidad bancaria real';
  }

  render() {
    return html`
      <bk-header .bankTitle=${this.header}></bk-header>
      <main class="container">
        <bk-loader></bk-loader>
        <div id="outlet"></div>
      </main>
      <bk-footer .footerInfo=${this.footer}></bk-footer>
    `;
  }
}

customElements.define('bank-kimo', BankKimo);
