import { LitElement, html, css } from 'lit';

export class Loader extends LitElement {
  static styles = css`
    :host {
      --dot-size: 14px;
      --gap: 12px;
      --loader-color: var(--primary-color, #0a66c2);
      --bg: rgba(255, 255, 255, 0.85);
    }

    #overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg);
      z-index: 1000;
      visibility: hidden;
      opacity: 0;
      transition:
        opacity 0.22s ease,
        visibility 0.22s;
      pointer-events: none;
    }

    #overlay.visible {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }

    .matrix {
      display: grid;
      grid-template-columns: repeat(3, var(--dot-size));
      grid-template-rows: repeat(3, var(--dot-size));
      gap: var(--gap);
      width: calc(3 * var(--dot-size) + 2 * var(--gap));
      height: calc(3 * var(--dot-size) + 2 * var(--gap));
      align-items: center;
      justify-items: center;
    }

    .cell {
      width: var(--dot-size);
      height: var(--dot-size);
      border-radius: 50%;
      background: var(--loader-color);
      opacity: 0.2;
      transform: scale(0.7) translateY(0);
      will-change: transform, opacity;
      animation: risePulse 840ms cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
    }

    /* Staggered pattern: diagonal wave */
    .cell.pos-0 {
      animation-delay: 0ms;
    }
    .cell.pos-1 {
      animation-delay: 70ms;
    }
    .cell.pos-2 {
      animation-delay: 140ms;
    }
    .cell.pos-3 {
      animation-delay: 50ms;
    }
    .cell.pos-4 {
      animation-delay: 120ms;
    }
    .cell.pos-5 {
      animation-delay: 190ms;
    }
    .cell.pos-6 {
      animation-delay: 100ms;
    }
    .cell.pos-7 {
      animation-delay: 170ms;
    }
    .cell.pos-8 {
      animation-delay: 240ms;
    }

    @keyframes risePulse {
      0% {
        transform: scale(0.7) translateY(0);
        opacity: 0.18;
        box-shadow: none;
      }
      40% {
        transform: scale(1.18) translateY(-6px);
        opacity: 1;
        box-shadow: 0 6px 12px rgba(10, 34, 80, 0.08);
      }
      100% {
        transform: scale(0.75) translateY(0);
        opacity: 0.22;
        box-shadow: none;
      }
    }
  `;

  static properties = {
    active: { type: Boolean },
  };

  constructor() {
    super();
    this.active = false;
  }

  render() {
    return html`
      <div
        id="overlay"
        class=${this.active ? 'visible' : ''}
        aria-hidden=${!this.active}
      >
        <div class="matrix" role="img" aria-label="Cargando">
          <div class="cell pos-0"></div>
          <div class="cell pos-1"></div>
          <div class="cell pos-2"></div>
          <div class="cell pos-3"></div>
          <div class="cell pos-4"></div>
          <div class="cell pos-5"></div>
          <div class="cell pos-6"></div>
          <div class="cell pos-7"></div>
          <div class="cell pos-8"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('bk-loader', Loader);
