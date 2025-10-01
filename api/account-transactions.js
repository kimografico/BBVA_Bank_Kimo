// filepath: c:\Users\casaez\Documents\proyectos\bbva-onboarding-project-bank-kimo\bank-kimo\api\account-transactions.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: 'Account ID is required' });
      return;
    }

    const transactionsData = {
      1: [
        {
          id: '1-t1',
          description: 'Ingreso nómina',
          amount: { amount: 1500.0, currency: 'EUR' },
          date: '2024/08/01',
        },
        {
          id: '1-t2',
          description: 'Pago supermercado',
          amount: { amount: -120.45, currency: 'EUR' },
          date: '2024/08/03',
        },
      ],
      2: [
        {
          id: '2-t1',
          description: 'Compra online',
          amount: { amount: -35.0, currency: 'EUR' },
          date: '2024/06/12',
        },
        {
          id: '2-t2',
          description: 'Reembolso',
          amount: { amount: 50.0, currency: 'EUR' },
          date: '2024/06/14',
        },
      ],
      3: [],
      4: [
        {
          id: '4-t1',
          description: 'Traspaso',
          amount: { amount: 500.0, currency: 'EUR' },
          date: '2024/04/01',
        },
      ],
    };

    const accountTransactions = transactionsData[id] || [];
    res.status(200).json(accountTransactions);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
