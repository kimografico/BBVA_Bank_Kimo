export default function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { id } = req.query;

    const transactions = {
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
        {
          id: '1-t3',
          description: 'Gasolina',
          amount: { amount: -45.2, currency: 'EUR' },
          date: '2024/08/04',
        },
        {
          id: '1-t4',
          description: 'Transferencia a ahorros',
          amount: { amount: -200.0, currency: 'EUR' },
          date: '2024/08/06',
        },
      ],
      2: [
        {
          id: '2-t1',
          description: 'Transferencia recibida',
          amount: { amount: 500.0, currency: 'EUR' },
          date: '2024/08/05',
        },
        {
          id: '2-t2',
          description: 'Compra online',
          amount: { amount: -85.3, currency: 'EUR' },
          date: '2024/08/07',
        },
      ],
      3: [
        {
          id: '3-t1',
          description: 'Wire transfer received',
          amount: { amount: 1200.0, currency: 'USD' },
          date: '2024/08/02',
        },
        {
          id: '3-t2',
          description: 'ATM withdrawal',
          amount: { amount: -43.9, currency: 'USD' },
          date: '2024/08/08',
        },
      ],
    };

    const accountTransactions = transactions[id] || [];
    res.status(200).json(accountTransactions);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
