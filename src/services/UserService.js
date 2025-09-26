export const UserService = {
  _users: [
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      email: 'johndoe@bbva.es',
      address: 'Calle Falsa 123',
      phone: '961234567',
      avatar: 'assets/johndoe.jpg',
    },
    {
      id: 2,
      name: 'Kimo',
      surname: 'Dev',
      email: 'kimo@soprasteria.com',
      address:
        'C/ Antiga Senda d En Senent, 11, El Pla del Real, 46023 València, Valencia',
      phone: '960021800',
      avatar: 'assets/kimodev.jpg',
    },
  ],

  getUser(id) {
    return this._users.find(user => user.id === id) || null;
  },
};
