import { html, LitElement } from 'lit';
import { initRouter } from './router.js';
import styles from './styles/bank-kimo-styles.js';
import { AccountService } from './services/AccountService.js';
import { i18n } from './services/LanguageService.js';
import { LanguageChangeMixin } from './mixins/LanguageChangeMixin.js';
import './components/AccountsList.js';
import './components/Header.js';
import './components/Footer.js';
import './components/Loader.js';

class BankKimo extends LanguageChangeMixin(LitElement) {
  static styles = styles;

  static properties = {
    header: { type: String },
  };

  constructor() {
    super();
    this.accounts = AccountService.getAccounts();
    this.header = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    await i18n.loadLanguage('es');
    this._updateTexts();
  }

  _updateTexts() {
    this.header = i18n.translate('header.title');
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
      <bk-footer></bk-footer>
    `;
  }
}

customElements.define('bank-kimo', BankKimo);
