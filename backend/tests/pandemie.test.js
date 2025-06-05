const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe('GET /pandemie', () => {
  it('devrait retourner un tableau de pandémies', async () => {
    const res = await request(app).get('/pandemie');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
