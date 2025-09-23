import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../components/AccountDetail.js';

export class AccountDetail extends LitElement {
  static properties = {
    accountId: { type: Number },
  };

  static styles = css`
    #back-button {
      font-family: 'Sansation', sans-serif;
      margin-top: 25px;
      border-radius: 20px;
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      padding: 5px 15px 8px 15px;
      transition: 0.5s;
      &::before {
        content: '🡨 ';
      }
      &:hover {
        cursor: pointer;
        background: var(--primary-color);
        color: white;
      }
    }
  `;

  onBeforeEnter(location) {
    this.accountId = Number(location.params.id);
  }

  static goBack() {
    window.location.href = '/accounts';
  }

  render() {
    return html`
      <bk-account-detail
        accountId="${ifDefined(this.accountId)}"
      ></bk-account-detail>
      <button id="back-button" @click=${AccountDetail.goBack}>
        Volver a la lista
      </button>
    `;
  }
}

customElements.define('account-detail-page', AccountDetail);

// Falta pasar el accountId al componente bk-account-detail por parametro,
// y luego usarlo en el componente para mostrar la info de la cuenta correspondiente.
// Accederemos a esa info desde el servicio.
