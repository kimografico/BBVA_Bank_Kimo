export const AccountService = {
  _accounts: [
    {
      id: '1',
      number: { iban: 'ES4401824723176778414475' },
      alias: 'COMPARTIDA',
      amount: { amount: 2433.15, currency: 'EUR' },
      level: { level: 1, description: 'National Account' },
    },
    {
      id: '2',
      number: { iban: 'ES9720381559465767581659' },
      alias: 'pagosonline',
      amount: { amount: 20, currency: 'EUR' },
      level: { level: 1, description: 'National Account' },
    },
    {
      id: '3',
      number: { iban: 'AE950213642574896367215' },
      alias: 'USA',
      amount: { amount: 1156.1, currency: 'USD' },
      level: { level: 2, description: 'International Account' },
    },
    // {
    //   id: '4',
    //   number: { iban: 'ES6622381999998888777766' },
    //   alias: 'AHORROS',
    //   amount: { amount: 5020.5, currency: 'EUR' },
    //   level: { level: 1, description: 'National Account' },
    // },
    // {
    //   id: '5',
    //   number: { iban: 'ES9911223344556677889900' },
    //   alias: 'GASTOS',
    //   amount: { amount: 850, currency: 'EUR' },
    //   level: { level: 1, description: 'National Account' },
    // },
    // {
    //   id: '6',
    //   number: { iban: 'US1234567890123456789012' },
    //   alias: 'INVERSIÓN',
    //   amount: { amount: 12000, currency: 'USD' },
    //   level: { level: 2, description: 'International Account' },
    // },
    // {
    //   id: '7',
    //   number: { iban: 'ES9988776655443322110000' },
    //   alias: 'VACACIONES',
    //   amount: { amount: 3000, currency: 'EUR' },
    //   level: { level: 1, description: 'National Account' },
    // },
    // {
    //   id: '8',
    //   number: { iban: 'US9876543210987654321098' },
    //   alias: 'EMERGENCIA',
    //   amount: { amount: 1500, currency: 'USD' },
    //   level: { level: 2, description: 'International Account' },
    // },
  ],
  getAccounts() {
    return this._accounts;
  },

  aliasExist(alias) {
    return Boolean(this._accounts.find(account => account.alias === alias));
  },

  updateAccountAlias(id, alias) {
    const account = this._accounts.find(acc => acc.id === id); // Esto es una referencia al array (no una copia). Se enlaza

    if (!account) {
      return '❌ Error! La cuenta no existe';
    }

    if (alias === this._accounts.find(acc => acc.id === id).alias.toUpperCase())
      return '⚠️ No se pudo cambiar el alias, el nuevo alias es el mismo que el antiguo';

    if (this.aliasExist(alias))
      return '⚠️ No se pudo cambiar el alias, ese alias ya existe';

    account.alias = alias; // Aqui se hace el cambio, sin necesidad de sustituir el array completo
    return '✅ Se ha cambiado el alias con éxito';
  },
};
