import { expect } from '@open-wc/testing';
import { AccountService } from '../src/services/AccountService.js';

describe('AccountsService', () => {
  const mockAccounts = [
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
  ];

  beforeEach(() => {
    // TODO: Me gustaría hacer esto con un mock, pero no he conseguido que funcione
    AccountService._accounts = JSON.parse(JSON.stringify(mockAccounts));
  });

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

  it('should return true if alias exists', () => {
    const exists = AccountService.aliasExist('COMPARTIDA');
    expect(exists).to.be.true;
  });

  it('should return false if alias does not exist', () => {
    const exists = AccountService.aliasExist('NON_EXISTENT_ALIAS');
    expect(exists).to.be.false;
  });

  it('should update the alias of an account', () => {
    const result = AccountService.updateAccountAlias('1', 'NuevoAlias');
    expect(result).to.include('éxito');

    const updatedAccount = AccountService.getAccounts().find(
      acc => acc.id === '1',
    );
    expect(updatedAccount.alias).to.equal('NuevoAlias');
  });

  it('should return an error if the alias already exists', () => {
    const result = AccountService.updateAccountAlias('1', 'pagosonline');
    expect(result).to.include('No se pudo cambiar el alias');
  });

  it('should return an error if the alias is the same as the current one', () => {
    const result = AccountService.updateAccountAlias('1', 'COMPARTIDA');
    expect(result).to.include('No se pudo cambiar el alias');
  });

  it('should return an error if the id does not exist', () => {
    const result = AccountService.updateAccountAlias('999', 'OtroAlias');
    expect(result).to.include('Error');
    expect(result).to.include('no existe');
  });

  it('should treat aliases as case-sensitive', () => {
    const result = AccountService.updateAccountAlias('1', 'compartida');
    expect(result).to.include('éxito');

    const updatedAccount = AccountService.getAccounts().find(
      acc => acc.id === '1',
    );
    expect(updatedAccount.alias).to.equal('compartida');
  });

  it('should return an empty array if no accounts exist', () => {
    AccountService._accounts = [];
    const accounts = AccountService.getAccounts();
    expect(accounts).to.be.an('array').that.is.empty;
  });
});
