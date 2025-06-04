const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe('POST /stats', () => {
  it('devrait retourner un tableau de statistiques', async () => {
    const res = await request(app)
      .post('/stats')
      .send({
        countryId: '63',
        typeId: '1',
        startDate: '2020-01-01',
        endDate: '2020-12-31'
      });
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
