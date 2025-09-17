export const AccountService = {
  getAccounts() {
    return [
      {
        id: '1',
        number: {
          iban: 'ES4401824723176778414475',
        },
        alias: 'COMPARTIDA ',
        amount: {
          amount: 2433.15,
          currency: 'EUR',
        },
        level: {
          level: 1,
          description: 'National Account',
        },
      },
      {
        id: '2',
        number: {
          iban: 'ES9720381559465767581659',
        },
        alias: 'pagosonline',
        amount: {
          amount: 20,
          currency: 'EUR',
        },
        level: {
          level: 1,
          description: 'National Account',
        },
      },
      {
        id: '3',
        number: {
          iban: 'AE950213642574896367215',
        },
        alias: 'USA',
        amount: {
          amount: 1156.1,
          currency: 'USD',
        },
        level: {
          level: 2,
          description: 'International Account',
        },
      },
    ];
  },
};
