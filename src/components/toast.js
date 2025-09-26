import { LitElement, html, css } from 'lit';
import { i18n } from '../services/LanguageService.js';

export class Toast extends LitElement {
  static styles = css`
    #toast-container {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 1000;
      align-items: center;
    }

    .toast {
      position: fixed;
      bottom: 5px;
      z-index: 1000;
      pointer-events: none; /* Permite que los clics pasen a través del toast */
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
      opacity: 0;
      transform: translateY(20px);
      transition:
        opacity 0.3s,
        transform 0.3s;
      min-width: 250px;
      max-width: 400px;
      word-wrap: break-word;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    .toast.success {
      background-color: #4caf50;
    }

    .toast.error {
      background-color: #d80e00;
    }

    .toast.info {
      background-color: var(--primary-color);
    }

    .toast.warning {
      background-color: #ff9800;
    }
  `;

  static properties = {
    type: { type: String }, // success, error, info, warning
    message: { type: String },
  };

  constructor() {
    super();
    this.type = 'info';
    this.message = '';
  }

  showToast(message, type = 'info', duration = 3000) {
    this.message = message;
    this.type = type;
    this.duration = duration;

    const container = this.shadowRoot.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    // ENTRADA
    setTimeout(() => toast.classList.add('show'), 50);

    // SALIDA
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300); // esperar la animación
    }, duration);
  }

  showError(message, duration = 4000) {
    this.showToast(message, 'error', duration);
  }

  showSuccess(message, duration = 3000) {
    this.showToast(message, 'success', duration);
  }

  showWarning(message, duration = 3500) {
    this.showToast(message, 'warning', duration);
  }

  showInfo(message, duration = 3000) {
    this.showToast(message, 'info', duration);
  }

  render() {
    const toastMessage =
      this.message || i18n.translate(`ui.toast.${this.type}`);
    return html`
      <div id="toast-container">
        <div class="toast ${this.type}">
          <p>${toastMessage}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('bk-toast', Toast);
