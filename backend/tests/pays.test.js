const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app'); // ou le bon chemin vers ton app.js

//test /pays
describe('GET /pays', () => {
  it('devrait retourner 200 et un tableau', async () => {
    const res = await request(app).get('/pays');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');

  });
});
