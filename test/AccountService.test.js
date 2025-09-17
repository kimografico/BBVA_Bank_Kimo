import { expect } from '@open-wc/testing';

import { AccountService } from '../src/services/AccountService.js';

describe('AccountsService', () => {
  it('should yield an account list', () => {
    const accounts = AccountService.getAccounts();
    expect(accounts).to.be.an('array');
    expect(accounts).to.have.length.greaterThan(0);
  });

  it('should return accounts with the right shape', () => {
    const accounts = AccountService.getAccounts();

    accounts.forEach(account => {
      expect(account).to.have.all.keys(
        'id',
        'number',
        'alias',
        'amount',
        'level',
      );
      expect(account.number).to.have.key('iban');
      expect(account.amount).to.have.all.keys('amount', 'currency');
      expect(account.level).to.have.all.keys('level', 'description');
    });
  });
});
