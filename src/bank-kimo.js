import { html, LitElement } from 'lit';
import { initRouter } from './router.js';
import styles from './styles/bank-kimo-styles.js';
import { AccountService } from './services/AccountService.js';
import { i18n } from './services/LanguageService.js';
import './components/AccountsList.js';
import './components/Header.js';
import './components/Footer.js';
import './components/Loader.js';

class BankKimo extends LitElement {
  static styles = styles;

  static properties = {
    header: { type: String },
    footer: { type: String },
  };

  constructor() {
    super();
    this.accounts = AccountService.getAccounts();
    this.header = '';
    this.footer = '';
  }

  async connectedCallback() {
    super.connectedCallback();

    this._handleLanguageChange = () => {
      this._updateTexts();
    };
    document.addEventListener('language-changed', this._handleLanguageChange);

    await i18n.loadLanguage('es');
    this._updateTexts();
  }

  _updateTexts() {
    this.footer = `© 2025 Kimo ◆ ${i18n.translate('footer.info')}`;
    this.header = i18n.translate('header.title');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(
      'language-changed',
      this._handleLanguageChange,
    );
  }

  firstUpdated() {
    const outlet = this.shadowRoot.querySelector('#outlet');
    const loader = this.shadowRoot.querySelector('bk-loader');
    initRouter(outlet, loader);
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
