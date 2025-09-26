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
  };

  constructor() {
    super();
    this.bankTitle = 'Mi Banco';
    const user = UserService.getUser(1);
    this.userName = `${user.name} ${user.surname}`;
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  render() {
    return html`
      <header>
        <div>
          <h1>${this.bankTitle}</h1>
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
          </ul>
        </div>
      </header>
    `;
  }
}

customElements.define('bk-header', BankHeader);
