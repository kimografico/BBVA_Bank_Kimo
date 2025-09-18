import { LitElement, html, css } from 'lit';

export class BankHeader extends LitElement {
  static styles = css`
    header {
      font-family: 'Source Serif 4', serif;
      font-weight: 700;
      font-size: 1.75rem;
      background-color: #001391;
      color: white;
      text-align: left;
      width: 100vw;
      margin-bottom: 25px;
      border-bottom: 6px solid #070e46;
      display: flex;
      justify-content: center;

      div {
        max-width: 1280px;
        width: calc(100% - 50px);
      }

      h1 {
        margin: 0;
      }
    }

    @media (max-width: 640px) {
      header {
        font-size: 1.6rem;
        text-align: center;
        h1 {
          padding: 20px;
        }
      }
    }
  `;

  static properties = {
    bankTitle: { type: String },
  };

  constructor() {
    super();
    this.bankTitle = 'Mi Banco';
  }

  render() {
    return html` <header>
      <div>
        <h1>${this.bankTitle}</h1>
      </div>
    </header>`;
  }
}

customElements.define('bk-header', BankHeader);
