import { LitElement, html, css } from 'lit';
import { LanguageChangeMixin } from '../mixins/LanguageChangeMixin.js';
import { i18n } from '../services/LanguageService.js';

export class BankFooter extends LanguageChangeMixin(LitElement) {
  static styles = css`
    footer {
      font-size: 0.9rem;
      /* background-color: var(--primary-color); */
      background: linear-gradient(
        90deg,
        var(--primary-color) 0%,
        var(--primary-color-dark) 125%
      );
      color: var(--text-color-light);
      text-align: center;
      width: 100vw;
      margin-top: 25px;
      div {
        padding: 10px 50px;
      }
    }

    @media (max-width: 640px) {
      footer {
        div {
          text-align: center;
          padding: 10px;
          width: calc(100vw - 20px);
        }
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this.requestUpdate(); // Forzar actualización dando tiempo a cargar el idioma
    }, 100);
  }

  render() {
    const footerText = `© 2025 Kimo ◆ ${i18n.translate('footer.info')}`;
    return html`<footer><div>${footerText}</div></footer>`;
  }
}

customElements.define('bk-footer', BankFooter);
