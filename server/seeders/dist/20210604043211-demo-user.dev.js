"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var faker = require('faker');

var bcrypt = require('bcrypt');

var users = _toConsumableArray(Array(1)).map(function () {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date(),
    updatedAt: new Date()
  };
});

module.exports = {
  up: function up(queryInterface) {
    var userIds, userId, todos;
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryInterface.bulkInsert('users', users, {});
            _context.next = 3;
            return regeneratorRuntime.awrap(queryInterface.sequelize.query('SELECT id FROM users LIMIT 1;'));

          case 3:
            userIds = _context.sent;
            userId = userIds[0][0].id;
            todos = _toConsumableArray(Array(2)).map(function () {
              return {
                user_id: userId,
                description: faker.lorem.sentence(),
                done: false,
                createdAt: new Date(),
                updatedAt: new Date()
              };
            });
            return _context.abrupt("return", queryInterface.bulkInsert('todos', todos, {}));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface) {
    queryInterface.bulkDelete('users', null, {});
    queryInterface.bulkDelete('todos', null, {});
  }
};