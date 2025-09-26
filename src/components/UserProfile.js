import { html, LitElement } from 'lit';
import styles from '../styles/UserProfile-styles.js';
import { UserService } from '../services/UserService.js';
import { ValidationService } from '../services/ValidationService.js';
import './toast.js';

export class UserProfile extends LitElement {
  static styles = styles;

  static properties = {
    user: { type: Object },
    originalUser: { type: Object },
    errors: { type: Object },
  };

  constructor() {
    super();
    this.user = {};
    this.originalUser = {};
    this.errors = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.user = UserService.getUser(1);
    this.originalUser = { ...this.user };
  }

  _handleInput(event) {
    const { name, value } = event.target;
    this.user = { ...this.user, [name]: value };
    this.errors = {
      ...this.errors,
      [name]: UserProfile._validateField(name, value),
    };
  }

  // Otras veces lo he hecho asi para evitar el switch, y me parece más limpio, pero menos legible. ¿Cómo lo haceis vosotros?
  static _validateField(field, value) {
    const validateFunctionsMap = {
      name: ValidationService.validateName,
      surname: ValidationService.validateSurname,
      email: ValidationService.validateEmail,
      address: ValidationService.validateAddress,
      phone: ValidationService.validatePhone,
    };
    const validateFn = validateFunctionsMap[field];
    return validateFn(value);
  }

  _validateForm() {
    const formErrors = {
      name: UserProfile._validateField('name', this.user.name),
      surname: UserProfile._validateField('surname', this.user.surname),
      email: UserProfile._validateField('email', this.user.email),
      address: UserProfile._validateField('address', this.user.address),
      phone: UserProfile._validateField('phone', this.user.phone),
    };
    this.errors = formErrors;
  }

  _hasChanges() {
    const changes =
      this.user.name !== this.originalUser.name ||
      this.user.surname !== this.originalUser.surname ||
      this.user.email !== this.originalUser.email ||
      this.user.address !== this.originalUser.address ||
      this.user.phone !== this.originalUser.phone;
    return changes;
  }

  _hasErrors() {
    const errorMsgs = Object.values(this.errors);
    if (errorMsgs.length === 0) return false;
    return true;
  }

  _showToast(type, message) {
    const toast = this.shadowRoot.querySelector('bk-toast');

    if (type === 'success') {
      toast.showSuccess(message);
    } else if (type === 'error') {
      toast.showError(message);
    }
  }

  _ChangeCards() {
    const form = this.shadowRoot.querySelector('.user-form');
    const info = this.shadowRoot.querySelector('.user-card');
    form.style.display = 'none';
    info.style.display = 'flex';
  }

  _handleEdit() {
    const form = this.shadowRoot.querySelector('.user-form');
    const info = this.shadowRoot.querySelector('.user-card');
    form.style.display = 'block';
    info.style.display = 'none';
  }

  _handleCancel() {
    this._restoreOriginalUser();
    this._ChangeCards();
  }

  _handleSubmit(event) {
    event.preventDefault();
    this._validateForm();

    // En principio este error nunca deberia salir, ya que está deshabilitado el botón. Pero voy a mantener el método por si acaso
    if (this._hasErrors()) {
      this._showToast('error', 'Errores en el formulario');
      return;
    }

    if (!this._sendToService()) {
      this._showToast('error', 'Error al escribir datos');
      return;
    }

    if (!this._hasChanges()) {
      this._showToast('error', 'No se han realizado cambios');
      return;
    }

    this._showToast(
      'success',
      `Perfil de ${this.user.name} actualizado con éxito`,
    );

    this._ChangeCards();
  }

  _sendToService() {
    try {
      UserService.updateUser(this.user);
      return true;
    } catch (error) {
      return false;
    }
  }

  _restoreOriginalUser() {
    this.user = { ...this.originalUser };
    this.errors = {};
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
            ${this.errors.name
              ? html`<span class="error">${this.errors.name}</span>`
              : ''}
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
            ${this.errors.surname
              ? html`<span class="error">${this.errors.surname}</span>`
              : ''}
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
            ${this.errors.email
              ? html`<span class="error">${this.errors.email}</span>`
              : ''}
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
            ${this.errors.address
              ? html`<span class="error">${this.errors.address}</span>`
              : ''}
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
            ${this.errors.phone
              ? html`<span class="error">${this.errors.phone}</span>`
              : ''}
          </label>
          <div class="buttons">
            <button type="submit" ?disabled=${this._hasErrors()}>
              Guardar Cambios
            </button>
            <button type="button" @click=${this._handleCancel}>Cancelar</button>
          </div>
        </form>
      </div>
      <bk-toast></bk-toast>
    `;
  }
}

customElements.define('bk-user-profile', UserProfile);
