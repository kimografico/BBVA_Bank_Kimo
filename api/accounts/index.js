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
        alias: 'COMPARTIDA ',
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
          {
            id: '1-t3',
            description: 'Transferencia recibida',
            amount: { amount: 200.0, currency: 'EUR' },
            date: '2024/07/28',
          },
          {
            id: '1-t4',
            description: 'Pago suscripción',
            amount: { amount: -9.99, currency: 'EUR' },
            date: '2024/07/30',
          },
        ],
      },
      {
        id: '2',
        alias: 'pagosonline',
        number: { iban: 'ES9720381559465767581659' },
        amount: { amount: 20.0, currency: 'EUR' },
        level: { level: 1, description: 'National Account' },
        transactions: [
          {
            id: '2-t1',
            description: 'Compra tienda online',
            amount: { amount: -35.0, currency: 'EUR' },
            date: '2024/06/12',
          },
          {
            id: '2-t2',
            description: 'Reembolso',
            amount: { amount: 50.0, currency: 'EUR' },
            date: '2024/06/14',
          },
          {
            id: '2-t3',
            description: 'Pago servicio web',
            amount: { amount: -5.0, currency: 'EUR' },
            date: '2024/06/20',
          },
          {
            id: '2-t4',
            description: 'Suscripción streaming',
            amount: { amount: -9.99, currency: 'EUR' },
            date: '2024/06/25',
          },
          {
            id: '2-t5',
            description: 'Compra electrónica pequeña',
            amount: { amount: -12.49, currency: 'EUR' },
            date: '2024/07/02',
          },
          {
            id: '2-t6',
            description: 'Devolución artículo',
            amount: { amount: 25.0, currency: 'EUR' },
            date: '2024/07/08',
          },
          {
            id: '2-t7',
            description: 'Pago app móvil',
            amount: { amount: -3.99, currency: 'EUR' },
            date: '2024/07/11',
          },
          {
            id: '2-t8',
            description: 'Cargo por conversión',
            amount: { amount: -1.5, currency: 'EUR' },
            date: '2024/07/12',
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
      {
        id: '4',
        alias: 'Ahorros 1',
        number: { iban: 'ES6612340000001111222233' },
        amount: { amount: 5200.0, currency: 'USD' },
        level: { level: 2, description: 'International Account' },
        transactions: [
          {
            id: '4-t1',
            description: 'Traspaso desde nómina',
            amount: { amount: 500.0, currency: 'EUR' },
            date: '2024/04/01',
          },
          {
            id: '4-t2',
            description: 'Intereses',
            amount: { amount: 3.2, currency: 'EUR' },
            date: '2024/07/01',
          },
          {
            id: '4-t3',
            description: 'Retirada cajero',
            amount: { amount: -60.0, currency: 'EUR' },
            date: '2024/08/10',
          },
          {
            id: '4-t4',
            description: 'Compra electrónica',
            amount: { amount: -120.0, currency: 'EUR' },
            date: '2024/08/12',
          },
        ],
      },
      {
        id: '5',
        alias: 'Viajes',
        number: { iban: 'ES7711223344556677889900' },
        amount: { amount: 890.75, currency: 'EUR' },
        level: { level: 1, description: 'National Account' },
        transactions: [
          {
            id: '5-t1',
            description: 'Compra billete avión',
            amount: { amount: -450.0, currency: 'EUR' },
            date: '2024/03/15',
          },
          {
            id: '5-t2',
            description: 'Reserva hotel',
            amount: { amount: -200.0, currency: 'EUR' },
            date: '2024/03/16',
          },
          {
            id: '5-t3',
            description: 'Reembolso',
            amount: { amount: 50.0, currency: 'EUR' },
            date: '2024/03/20',
          },
        ],
      },
      {
        id: '6',
        alias: 'Empresa X',
        number: { iban: 'ES8800112233445566778899' },
        amount: { amount: 15000.0, currency: 'USD' },
        level: { level: 3, description: 'Business Account' },
        transactions: [
          {
            id: '6-t1',
            description: 'Factura cliente A',
            amount: { amount: 5000.0, currency: 'EUR' },
            date: '2024/02/28',
          },
          {
            id: '6-t2',
            description: 'Pago proveedor',
            amount: { amount: -1200.0, currency: 'EUR' },
            date: '2024/03/05',
          },
          {
            id: '6-t3',
            description: 'Compra material',
            amount: { amount: -300.0, currency: 'EUR' },
            date: '2024/03/10',
          },
          {
            id: '6-t4',
            description: 'Gastos viaje',
            amount: { amount: -450.0, currency: 'EUR' },
            date: '2024/04/02',
          },
        ],
      },
      {
        id: '7',
        alias: 'Tarjeta Black',
        number: { iban: 'ES9900990099009900990099' },
        amount: { amount: 60.5, currency: 'USD' },
        level: { level: 1, description: 'You have seen nothing Account' },
        transactions: [
          {
            id: '7-t1',
            description: 'Pago restaurante',
            amount: { amount: -35.5, currency: 'EUR' },
            date: '2024/08/05',
          },
          {
            id: '7-t2',
            description: 'Compra app',
            amount: { amount: -2.99, currency: 'EUR' },
            date: '2024/08/06',
          },
          {
            id: '7-t3',
            description: 'Cashback',
            amount: { amount: 1.0, currency: 'EUR' },
            date: '2024/08/07',
          },
        ],
      },
      {
        id: '8',
        alias: 'Inversiones',
        number: { iban: 'ES1200120012001200120012' },
        amount: { amount: 32000.0, currency: 'USD' },
        level: { level: 3, description: 'Investment Account' },
        transactions: [
          {
            id: '8-t1',
            description: 'Dividendo',
            amount: { amount: 250.0, currency: 'EUR' },
            date: '2024/06/30',
          },
          {
            id: '8-t2',
            description: 'Compra fondos',
            amount: { amount: -2000.0, currency: 'EUR' },
            date: '2024/07/02',
          },
          {
            id: '8-t3',
            description: 'Venta acciones',
            amount: { amount: 1800.0, currency: 'EUR' },
            date: '2024/07/10',
          },
          {
            id: '8-t4',
            description: 'Comisión',
            amount: { amount: -15.0, currency: 'EUR' },
            date: '2024/07/11',
          },
        ],
      },
      {
        id: '9',
        alias: 'Hipoteca',
        number: { iban: 'ES3300330033003300330033' },
        amount: { amount: -45000.0, currency: 'EUR' },
        level: { level: 3, description: 'Loan Account' },
        transactions: [
          {
            id: '9-t1',
            description: 'Pago cuota hipoteca',
            amount: { amount: -850.0, currency: 'EUR' },
            date: '2024/07/01',
          },
          {
            id: '9-t2',
            description: 'Interés mensual',
            amount: { amount: -150.0, currency: 'EUR' },
            date: '2024/07/01',
          },
          {
            id: '9-t3',
            description: 'Amortización extra',
            amount: { amount: -500.0, currency: 'EUR' },
            date: '2024/05/15',
          },
        ],
      },
      {
        id: '10',
        alias: 'Nómina',
        number: { iban: 'ES4412345566778899001122' },
        amount: { amount: 2300.0, currency: 'EUR' },
        level: { level: 1, description: 'National Account' },
        transactions: [
          {
            id: '10-t1',
            description: 'Ingreso nómina',
            amount: { amount: 2300.0, currency: 'EUR' },
            date: '2024/08/31',
          },
          {
            id: '10-t2',
            description: 'Pago seguro',
            amount: { amount: -120.0, currency: 'EUR' },
            date: '2024/09/01',
          },
          {
            id: '10-t3',
            description: 'Suscripción',
            amount: { amount: -15.0, currency: 'EUR' },
            date: '2024/09/02',
          },
        ],
      },
      {
        id: '11',
        alias: 'Caja chica',
        number: { iban: 'ES5511002200334400556600' },
        amount: { amount: 150.0, currency: 'EUR' },
        level: { level: 1, description: 'Petty Cash' },
        transactions: [
          {
            id: '11-t1',
            description: 'Compra material oficina',
            amount: { amount: -45.0, currency: 'EUR' },
            date: '2024/02/10',
          },
          {
            id: '11-t2',
            description: 'Ingreso devolución',
            amount: { amount: 20.0, currency: 'EUR' },
            date: '2024/02/12',
          },
          {
            id: '11-t3',
            description: 'Pequeños gastos',
            amount: { amount: -10.0, currency: 'EUR' },
            date: '2024/02/14',
          },
          {
            id: '11-t4',
            description: 'Ajuste contable',
            amount: { amount: 5.0, currency: 'EUR' },
            date: '2024/02/15',
          },
        ],
      },
      {
        id: '12',
        alias: 'Fondo familiares',
        number: { iban: 'ES6612003400567800990011' },
        amount: { amount: 760.4, currency: 'EUR' },
        level: { level: 2, description: 'Family Fund' },
        transactions: [
          {
            id: '12-t1',
            description: 'Donación familiar',
            amount: { amount: 200.0, currency: 'EUR' },
            date: '2024/01/20',
          },
          {
            id: '12-t2',
            description: 'Gastos escolares',
            amount: { amount: -120.0, currency: 'EUR' },
            date: '2024/03/05',
          },
          {
            id: '12-t3',
            description: 'Compra material',
            amount: { amount: -30.0, currency: 'EUR' },
            date: '2024/04/02',
          },
        ],
      },
    ];

    res.status(200).json(accounts);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
