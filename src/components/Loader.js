import { LitElement, html, css } from 'lit';

export class Loader extends LitElement {
  static styles = css`
    #loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      color: var(--primary-color);
      z-index: 1000;
      visibility: hidden;
      opacity: 0;
      transition:
        opacity 0.3s ease,
        visibility 0.3s ease;
    }

    #loader.active {
      visibility: visible;
      opacity: 1;
    }
  `;

  static properties = {
    active: { type: Boolean }, // Propiedad reactiva para controlar la visibilidad en tiempo real
  };

  constructor() {
    super();
    this.active = false;
  }

  render() {
    return html`
      <div id="loader" class=${this.active ? 'active' : ''}>
        <p>Cargando...</p>
      </div>
    `;
  }
}

customElements.define('bk-loader', Loader);
