import { LitElement, html } from 'lit';

export class PageNotFound extends LitElement {
  render() {
    return html`
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
    `;
  }
}

customElements.define('page-not-found', PageNotFound);
