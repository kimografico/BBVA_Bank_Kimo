import { LitElement, html } from 'lit';
import '../components/AccountsList.js';

export class AccountsView extends LitElement {
  render() {
    return html`<bk-accounts-list></bk-accounts-list>`;
  }
}

customElements.define('accounts-page', AccountsView);
