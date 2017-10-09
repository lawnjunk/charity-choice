'use strict';

require('./lib/setup.js');
const superagent = require('superagent');
const server = require('../lib/server.js');
const charityMock = require('./lib/charity-mock.js');
const accountMock = require('./lib/account-mock.js');
const faker = require('faker');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/charities', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(charityMock.remove);

  describe('GET /charities', () => {
    test('should return 100 charities', () => {
      let tempAccount;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return charityMock.createMany(1000)
            .then(tempCharities => {
              return superagent.get(`${apiURL}/charities`)
                .set('Authorization', `Bearer ${tempAccount.token}`);
            })
            .then(res => {
              console.log(res.headers);
              expect(res.status).toEqual(200);
              expect(res.body.count).toEqual(1000);
              expect(res.body.data.length).toEqual(100);
            });
        });
    });

    test('200 should return a charity', () => {
      
    });
  });
});
