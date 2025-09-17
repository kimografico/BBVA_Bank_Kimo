import { html, LitElement } from 'lit';
import styles from './bank-kimo-styles.js';
import './components/AccountsList.js';
import { AccountService } from './services/AccountService.js';

class BankKimo extends LitElement {
  static styles = styles;

  static properties = {
    header: { type: String },
  };

  constructor() {
    super();
    this.accounts = AccountService.getAccounts();
  }

  render() {
    return html`<bk-accounts-list
      .accounts=${this.accounts}
    ></bk-accounts-list> `;
  }
}

customElements.define('bank-kimo', BankKimo);
