import { html, LitElement } from 'lit';
import styles from '../styles/UserProfile-styles.js';
import { UserService } from '../services/UserService.js';
import './toast.js';

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

  _handleInput(event) {
    const { name, value } = event.target;
    this.user = { ...this.user, [name]: value };
  }

  _handleEdit() {
    const form = this.shadowRoot.querySelector('.user-form');
    const info = this.shadowRoot.querySelector('.user-card');
    form.style.display = 'block';
    info.style.display = 'none';
  }

  _handleCancel() {
    this._ChangeCards();
  }

  _ChangeCards() {
    const form = this.shadowRoot.querySelector('.user-form');
    const info = this.shadowRoot.querySelector('.user-card');
    form.style.display = 'none';
    info.style.display = 'flex';
  }

  _handleSubmit(event) {
    event.preventDefault();
    const toast = this.shadowRoot.querySelector('bk-toast');
    const message = `Perfil de ${this.user.name} actualizado con éxito`;
    toast.showSuccess(message);
    this._ChangeCards();
    // TODO: Mandar datos al servicio
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
          <button @click=${this._handleEdit}>Editar info</button>
        </div>
      </div>
      <div class="user-form">
        <form @submit=${this._handleSubmit}>
          <h1>Editar Perfil</h1>
          <label>
            <span>Nombre:</span>
            <input
              type="text"
              name="name"
              .value=${this.user.name}
              @input=${this._handleInput}
              required
            />
          </label>
          <label>
            <span>Apellidos:</span>
            <input
              type="text"
              name="surname"
              .value=${this.user.surname}
              @input=${this._handleInput}
              required
            />
          </label>
          <label>
            <span>Email:</span>
            <input
              type="email"
              name="email"
              .value=${this.user.email}
              @input=${this._handleInput}
              required
            />
          </label>
          <label>
            <span>Dirección:</span>
            <input
              type="text"
              name="address"
              .value=${this.user.address}
              @input=${this._handleInput}
              required
            />
          </label>
          <label>
            <span>Teléfono:</span>
            <input
              type="tel"
              name="phone"
              .value=${this.user.phone}
              @input=${this._handleInput}
              pattern="\\d{9}"
              required
            />
          </label>
          <div class="buttons">
            <button type="submit">Guardar Cambios</button>
            <button type="button" @click=${this._handleCancel}>Cancelar</button>
          </div>
        </form>
      </div>
      <bk-toast></bk-toast>
    `;
  }
}

customElements.define('bk-user-profile', UserProfile);
