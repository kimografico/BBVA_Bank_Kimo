import { i18n } from './LanguageService.js';

export const AccountService = {
  _accounts: [],

  async loadApiAccounts() {
    const apiUrl = 'http://localhost:3001/api/accounts/';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    this._accounts = result;
  },

  async loadApiTransactions(id) {
    const apiUrl = `http://localhost:3001/api/accounts/${id}/transactions`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  },

  getAccounts() {
    return this._accounts;
  },

  getAccount(id) {
    const found = this._accounts.find(account => Number(account.id) === id);
    return found;
  },

  getAccountTransactions(id) {
    const transactions = this.loadApiTransactions(id);
    return transactions;
  },

  aliasExist(alias) {
    return Boolean(this._accounts.find(account => account.alias === alias));
  },

  updateAccountAlias(id, alias) {
    const account = this._accounts.find(acc => acc.id === id); // Esto es una referencia al array (no una copia). Se enlaza

    if (!account) {
      return i18n.translate('services.account.errors.account-not-found');
    }

    if (
      alias === this._accounts.find(acc => acc.id === id).alias.toUpperCase()
    ) {
      return i18n.translate('services.account.errors.alias-same');
    }

    if (this.aliasExist(alias)) {
      return i18n.translate('services.account.errors.alias-exists');
    }

    account.alias = alias; // Aqui se hace el cambio, sin necesidad de sustituir el array completo
    return 'OK';
  },
};

AccountService.loadApiAccounts();
