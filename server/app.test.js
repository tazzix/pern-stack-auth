process.env.NODE_ENV = 'test';

const request = require('supertest');
const App = require('./app');

describe('Run basic server tests', () => {
  let app = {};

  // Run migrations, clear DB, then seeding
  //   beforeAll(async () => {
  //     await migrate();
  //     const { db } = await seed.openDB();
  //     await seed.clearDB(db);
  //     await seed.seed(db);
  //     await seed.closeDB(db);
  //   }, 30000);

  // Wait for the app to load
  beforeAll(async () => {
    app = await App();
  }, 30000);

  //   it('should have a successful DB connection', () => {
  //     const db = app.get('db');
  //     return expect(typeof db).toBe('object');
  //   });

  it('should respond 200 to the [GET /tst]', () => request(app).get('/tst').expect(200));
});
