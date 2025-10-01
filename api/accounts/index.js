export default function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const accounts = [
      {
        id: '1',
        alias: 'COMPARTIDA',
        number: { iban: 'ES4401824723176778414475' },
        amount: { amount: 2433.15, currency: 'EUR' },
        level: { level: 1, description: 'National Account' },
        transactions: [
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
      },
      {
        id: '2',
        alias: 'PERSONAL',
        number: { iban: 'ES9121000418450200051332' },
        amount: { amount: 850.75, currency: 'EUR' },
        level: { level: 1, description: 'National Account' },
        transactions: [
          {
            id: '2-t1',
            description: 'Transferencia recibida',
            amount: { amount: 500.0, currency: 'EUR' },
            date: '2024/08/05',
          },
        ],
      },
      {
        id: '3',
        alias: 'USA',
        number: { iban: 'AE950213642574896367215' },
        amount: { amount: 1156.1, currency: 'USD' },
        level: { level: 2, description: 'International Account' },
        transactions: [],
      },
    ];

    res.status(200).json(accounts);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
