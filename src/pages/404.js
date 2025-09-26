import { LitElement, html } from 'lit';
import { i18n } from '../services/LanguageService.js';

export class PageNotFound extends LitElement {
  render() {
    return html`
      <h2>${i18n.translate('page-not-found.title')}</h2>
      <p>${i18n.translate('page-not-found.message')}</p>
    `;
  }
}

customElements.define('page-not-found', PageNotFound);
