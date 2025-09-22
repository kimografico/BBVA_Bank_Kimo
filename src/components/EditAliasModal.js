import { LitElement, html } from 'lit';
import styles from '../styles/EditAliasModal-styles.js';

export class EditAliasModal extends LitElement {
  static styles = styles;

  static properties = {
    accounts: { type: Array },
    editingId: { type: String },
    editingAlias: { type: String },
  };

  constructor() {
    super();
    this.editingAlias = '';
    this.editingId = '';
    this.accounts = [];
  }

  openModal(id, alias, accounts) {
    this.editingId = id;
    this.editingAlias = alias;
    this.accounts = accounts;
    this.shadowRoot.querySelector('dialog').showModal();
  }

  _onInput(event) {
    this.editingAlias = event.target.value;
  }

  _save() {
    this.dispatchEvent(
      new CustomEvent('save-alias', {
        detail: { id: this.editingId, alias: this.editingAlias },
        bubbles: true,
        composed: true,
      }),
    );
    this._close();
  }

  _close() {
    this.shadowRoot.querySelector('dialog').close();
  }

  render() {
    return html`
      <dialog>
        <div class="header">
          <h2>Introduce el nuevo Alias</h2>
        </div>
        <form @submit=${this._save}>
          <label>
            Nuevo alias:
            <input
              type="text"
              .value=${this.editingAlias}
              @input=${this._onInput}
            />
          </label>
          <menu>
            <button type="button" id="saveBtn" @click=${this._save}>
              CAMBIAR
            </button>
            <button type="button" id="closeBtn" @click=${this._close}>
              Cancelar
            </button>
          </menu>
        </form>
      </dialog>
    `;
  }
}

customElements.define('bk-edit-alias-modal', EditAliasModal);
