import { LitElement, html } from 'lit';
import styles from '../styles/header-styles.js';

export class BankHeader extends LitElement {
  static styles = styles;

  static properties = {
    bankTitle: { type: String },
  };

  constructor() {
    super();
    this.bankTitle = 'Mi Banco';
  }

  render() {
    return html` <header>
      <div>
        <h1>${this.bankTitle}</h1>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/accounts">Cuentas</a></li>
          <li><a href="/secretos">Secretos</a></li>
        </ul>
      </div>
    </header>`;
  }
}

customElements.define('bk-header', BankHeader);
