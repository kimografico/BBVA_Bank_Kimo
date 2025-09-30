import { html, LitElement } from 'lit';
import styles from '../styles/UserProfile-styles.js';
import { UserService } from '../services/UserService.js';
import { ValidationService } from '../services/ValidationService.js';
import { i18n } from '../services/LanguageService.js';
import { LanguageChangeMixin } from '../mixins/LanguageChangeMixin.js';
import './toast.js';

export class UserProfile extends LanguageChangeMixin(LitElement) {
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

  // Otras veces lo he hecho asi para evitar el switch, y me parece más limpio,
  // pero menos legible. ¿Cómo lo haceis vosotros?
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
    return Object.values(this.errors).some(error => error);
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

    if (!this._hasChanges()) {
      this._showToast('error', i18n.translate('ui.no-changes'));
      return;
    }

    if (this._hasErrors()) {
      this._showToast('error', i18n.translate('ui.error-form'));
      return;
    }

    if (!this._sendToService()) {
      this._showToast('error', i18n.translate('ui.error-update'));
      return;
    }

    this._showToast(
      'success',
      i18n
        .translate('user-profile.toast.success')
        .replace('{{name}}', this.user.name),
    );

    this.originalUser = { ...this.user };
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
          <img
            src="${this.user.avatar}"
            alt="${i18n.translate('user-profile.user-data.avatar-alt')}"
          />
        </div>
        <div class="info">
          <h1>${this.user.name} ${this.user.surname}</h1>
          <p>
            <b>${i18n.translate('user-profile.user-data.email')}:</b> ${this
              .user.email}
          </p>
          <p>
            <b>${i18n.translate('user-profile.user-data.address')}:</b> ${this
              .user.address}
          </p>
          <p>
            <b>${i18n.translate('user-profile.user-data.phone')}:</b> ${this
              .user.phone}
          </p>
          <button @click=${this._handleEdit} id="edit-btn">
            ${i18n.translate('ui.edit')}
          </button>
        </div>
      </div>
      <div class="user-form">
        <form @submit=${this._handleSubmit}>
          <h1>${i18n.translate('user-profile.user-data.edit-profile')}</h1>
          <label>
            <span>${i18n.translate('user-profile.user-data.name')}:</span>
            <input
              type="text"
              name="name"
              .value=${this.user.name}
              @input=${this._handleInput}
              required
            />
            ${this.errors.name
              ? html`<span class="error"
                  >${i18n.translate('user-profile.errors.name')}</span
                >`
              : ''}
          </label>
          <label>
            <span>${i18n.translate('user-profile.user-data.surname')}:</span>
            <input
              type="text"
              name="surname"
              .value=${this.user.surname}
              @input=${this._handleInput}
              required
            />
            ${this.errors.surname
              ? html`<span class="error"
                  >${i18n.translate('user-profile.errors.surname')}</span
                >`
              : ''}
          </label>
          <label>
            <span>${i18n.translate('user-profile.user-data.email')}:</span>
            <input
              type="email"
              name="email"
              .value=${this.user.email}
              @input=${this._handleInput}
              required
            />
            ${this.errors.email
              ? html`<span class="error"
                  >${i18n.translate('user-profile.errors.email')}</span
                >`
              : ''}
          </label>
          <label>
            <span>${i18n.translate('user-profile.user-data.address')}:</span>
            <input
              type="text"
              name="address"
              .value=${this.user.address}
              @input=${this._handleInput}
              required
            />
            ${this.errors.address
              ? html`<span class="error"
                  >${i18n.translate('user-profile.errors.address')}</span
                >`
              : ''}
          </label>
          <label>
            <span>${i18n.translate('user-profile.user-data.phone')}:</span>
            <input
              type="tel"
              name="phone"
              .value=${this.user.phone}
              @input=${this._handleInput}
              pattern="\\d{9}"
              required
            />
            ${this.errors.phone
              ? html`<span class="error"
                  >${i18n.translate('user-profile.errors.phone')}</span
                >`
              : ''}
          </label>
          <div class="buttons">
            <button type="submit" ?disabled=${this._hasErrors()}>
              ${i18n.translate('ui.save-changes')}
            </button>
            <button type="button" @click=${this._handleCancel} id="cancel-btn">
              ${i18n.translate('ui.cancel')}
            </button>
          </div>
        </form>
      </div>
      <bk-toast></bk-toast>
    `;
  }
}

customElements.define('bk-user-profile', UserProfile);
