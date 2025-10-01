import { i18n } from './LanguageService.js';
import { CONFIG } from '../config.js';

export const AccountService = {
  _accounts: [],

  async loadApiAccounts() {
    const accountsApiUrl = `${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.ACCOUNTS}`;
    const response = await fetch(accountsApiUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    this._accounts = result;
  },

  async loadApiTransactions(id) {
    const transactionsApiUrl = `${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.TRANSACTIONS(id)}`;
    const response = await fetch(transactionsApiUrl);
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

  async getAccountTransactions(id) {
    try {
      // ⭐ IMPORTANTE: Agregar await aquí
      const transactions = await this.loadApiTransactions(id);
      console.log('✅ Transactions loaded for account', id, ':', transactions);
      return transactions;
    } catch (error) {
      console.error('❌ Error in getAccountTransactions:', error);
      throw error; // Re-lanzar para que account-detail.js lo pueda manejar
    }
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
