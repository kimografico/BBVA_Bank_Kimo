export const LanguageChangeMixin = SuperClass =>
  class extends SuperClass {
    connectedCallback() {
      super.connectedCallback();
      this._setupLanguageListener();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this._removeLanguageListener();
    }

    _setupLanguageListener() {
      this._handleLanguageChange = () => {
        this.requestUpdate();
      };
      document.addEventListener('language-changed', this._handleLanguageChange);
    }

    _removeLanguageListener() {
      if (this._handleLanguageChange) {
        document.removeEventListener(
          'language-changed',
          this._handleLanguageChange,
        );
      }
    }
  };
