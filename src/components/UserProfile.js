import { html, LitElement } from 'lit';
import styles from '../styles/UserProfile-styles.js';
import { UserService } from '../services/UserService.js';

export class UserProfile extends LitElement {
  static styles = styles;

  static properties = {
    user: { type: Object },
  };

  constructor() {
    super();
    this.user = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.user = UserService.getUser(1);
  }

  render() {
    return html`
      <div class="user-card">
        <div class="avatar-container">
          <img src="${this.user.avatar}" alt="Avatar de ${this.user.name}" />
        </div>
        <div class="info">
          <h1>${this.user.name} ${this.user.surname}</h1>
          <p><b>Email:</b> ${this.user.email}</p>
          <p><b>Dirección:</b> ${this.user.address}</p>
          <p><b>Teléfono:</b> ${this.user.phone}</p>
          <button>Editar info</button>
        </div>
      </div>
    `;
  }
}

customElements.define('bk-user-profile', UserProfile);
