import { LitElement, html } from 'lit';
import '../components/UserProfile.js';

export class UserProfileView extends LitElement {
  render() {
    return html`<bk-user-profile></bk-user-profile>`;
  }
}

customElements.define('user-profile-page', UserProfileView);
