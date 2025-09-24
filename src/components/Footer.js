import { LitElement, html, css } from 'lit';

export class BankFooter extends LitElement {
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

  static properties = {
    footerInfo: { type: String },
  };

  constructor() {
    super();
    this.footerInfo = 'Footer';
  }

  render() {
    return html`<footer><div>${this.footerInfo}</div></footer>`;
  }
}

customElements.define('bk-footer', BankFooter);
