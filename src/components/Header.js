import { LitElement, html } from 'lit';
import styles from '../styles/header-styles.js';
import { UserService } from '../services/UserService.js';

export class BankHeader extends LitElement {
  static styles = styles;

  static properties = {
    bankTitle: { type: String },
    userName: { type: String },
  };

  constructor() {
    super();
    this.bankTitle = 'Mi Banco';
    const user = UserService.getUser(1);
    this.userName = `${user.name} ${user.surname}`;
  }

  render() {
    return html` <header>
      <div>
        <h1>${this.bankTitle}</h1>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/accounts">Cuentas</a></li>
          <li><a href="/secretos">Secretos</a></li>
          <li class="disabled">|</li>
          <li><a href="/user">👤 ${this.userName}</a></li>
        </ul>
      </div>
    </header>`;
  }
}

customElements.define('bk-header', BankHeader);
