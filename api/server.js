// npm run start:api
// http://localhost:3001/api/accounts/1/transactions

import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
// eslint-disable-next-line import/no-extraneous-dependencies
const jsonServer = require('json-server');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// lista de cuentas SIN transactions
server.get('/api/accounts', (req, res) => {
  const { db } = router;
  const accounts = db.get('accounts').value() || [];
  const accountsNoTx = accounts.map(acc => {
    const { transactions, ...rest } = acc;
    return rest;
  });
  return res.json(accountsNoTx);
});

// custom endpoint para transactions (maneja string/number ids)
server.get('/api/accounts/:id/transactions', (req, res) => {
  const { id } = req.params;
  const { db } = router; // lowdb instance
  const accounts = db.get('accounts').value() || [];
  const account = accounts.find(a => String(a.id) === String(id));

  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }

  const transactions = Array.isArray(account.transactions)
    ? account.transactions
    : [];
  return res.json(transactions);
});

// custom endpoint para devolver la cuenta SIN transactions
server.get('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
  const { db } = router;
  const accounts = db.get('accounts').value() || [];
  const account = accounts.find(a => String(a.id) === String(id));

  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }

  // crear copia sin transactions
  const { transactions, ...accountNoTx } = account;
  return res.json(accountNoTx);
});

// monta el router bajo /api (asi /api/accounts y otros recursos siguen funcionando)
server.use('/api', router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `JSON Server (with /api) running on http://localhost:${PORT}/api`,
  );
});
