import { LitElement, html } from 'lit';
import { UserService } from '../services/UserService.js';
import { i18n } from '../services/LanguageService.js';
import { LanguageChangeMixin } from '../mixins/LanguageChangeMixin.js';
import styles from '../styles/homepage-styles.js';

export class HomePage extends LanguageChangeMixin(LitElement) {
  static styles = styles;

  static properties = {
    userName: { type: String },
    currentLanguage: { type: String },
  };

  constructor() {
    super();
    const user = UserService.getUser(1);
    this.userName = `${user.name} ${user.surname}`;
    this.currentLanguage = 'es';
  }

  render() {
    return html`
      <div class="container">
        <div class="content-section">
          <h2>${i18n.translate('homepage.greeting')} ${this.userName}</h2>
          <p class="welcome-text">${i18n.translate('homepage.welcome')}</p>
          <p class="question-text">${i18n.translate('homepage.question')}</p>

          <ul>
            <li>
              <a href="/accounts"
                >${i18n.translate('homepage.links.accounts')}</a
              >
            </li>
            <li>
              <a href="/user">${i18n.translate('homepage.links.profile')}</a>
            </li>
            <li>
              <a href="/secrets">${i18n.translate('homepage.links.secrets')}</a>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);
