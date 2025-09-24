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

// log requests (optional)
// server.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

// usar middlewares estándar (logger, static, cors, no-cache)
server.use(middlewares);

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

// monta el router bajo /api (asi /api/accounts y /api/accounts/:id funcionan automáticamente)
server.use('/api', router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `JSON Server (with /api) running on http://localhost:${PORT}/api`,
  );
});
