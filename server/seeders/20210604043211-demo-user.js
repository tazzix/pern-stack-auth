const faker = require('faker');
const bcrypt = require('bcrypt');

const users = [...Array(1)].map(() => (
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert('users', users, {});

    const userIds = await queryInterface.sequelize.query('SELECT id FROM users LIMIT 1;');
    const userId = userIds[0][0].id;

    const todos = [...Array(2)].map(() => (
      {
        user_id: userId,
        description: faker.lorem.sentence(),
        done: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ));

    return queryInterface.bulkInsert('todos', todos, {}); // TODO: add await if it does not work, removed for linter to not complain
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('users', null, {});
    queryInterface.bulkDelete('todos', null, {});
  }
};
