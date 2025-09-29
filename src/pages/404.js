import { LitElement, html } from 'lit';
import { i18n } from '../services/LanguageService.js';

export class PageNotFound extends LitElement {
  connectedCallback() {
    super.connectedCallback();

    this._handleLanguageChange = () => {
      this.requestUpdate();
    };
    document.addEventListener('language-changed', this._handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(
      'language-changed',
      this._handleLanguageChange,
    );
  }

  render() {
    return html`
      <h2>${i18n.translate('page-not-found.title')}</h2>
      <p>${i18n.translate('page-not-found.message')}</p>
    `;
  }
}

customElements.define('page-not-found', PageNotFound);
