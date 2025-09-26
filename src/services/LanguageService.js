export class LanguageService {
  constructor() {
    this.language = 'es';
    this.translations = {};
  }

  async loadLanguage(lang) {
    this.language = lang;
    const response = await fetch(`./src/languages/${lang}.json`);
    this.translations = await response.json();
  }

  translate(string) {
    return (
      string.split('.').reduce((obj, i) => obj?.[i], this.translations) ||
      string
    );
  }
}

export const i18n = new LanguageService();
