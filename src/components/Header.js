import { LitElement, html } from 'lit';
import styles from '../styles/header-styles.js';
import { UserService } from '../services/UserService.js';
import { i18n } from '../services/LanguageService.js';

export class BankHeader extends LitElement {
  static styles = styles;

  static properties = {
    bankTitle: { type: String },
    userName: { type: String },
    isMenuOpen: { type: Boolean },
    currentLanguage: { type: String },
  };

  constructor() {
    super();
    const user = UserService.getUser(1);
    this.userName = `${user.name} ${user.surname}`;
    this.isMenuOpen = false;
    this.currentLanguage = 'es';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  async _onLanguageChange(event) {
    const selectedLanguage = event.target.value;
    this.currentLanguage = selectedLanguage;

    await i18n.loadLanguage(selectedLanguage); // El Servicio tiene un fetch, asi que es asíncrono
    document.dispatchEvent(new CustomEvent('language-changed'));
    this.requestUpdate();

    this.closeMenu();
  }

  render() {
    return html`
      <header>
        <div>
          <h1>${i18n.translate('header.title')}</h1>
          <button class="menu-toggle" @click="${this.toggleMenu}">☰</button>
          <ul class="${this.isMenuOpen ? 'open' : ''}">
            <li>
              <a href="/" @click="${this.closeMenu}"
                >${i18n.translate('header.menu.home')}</a
              >
            </li>
            <li>
              <a href="/accounts" @click="${this.closeMenu}"
                >${i18n.translate('header.menu.accounts')}</a
              >
            </li>
            <li>
              <a href="/secretos" @click="${this.closeMenu}"
                >${i18n.translate('header.menu.secrets')}</a
              >
            </li>
            <li class="disabled">|</li>
            <li>
              <a href="/user" @click="${this.closeMenu}">👤 ${this.userName}</a>
            </li>
            <li class="language-selector">
              <select
                class="language-dropdown"
                @change="${this._onLanguageChange}"
                .value="${this.currentLanguage}"
                aria-label="${i18n.translate('header.language-selector.label')}"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </li>
          </ul>
        </div>
      </header>
    `;
  }
}

customElements.define('bk-header', BankHeader);
