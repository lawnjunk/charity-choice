'use strict';

require('./lib/setup.js');

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server.js');
const profileMock = require('./lib/profile-mock.js');
const charityMock = require('./lib/charity-mock.js');
const donationMock = require('./lib/donation-mock.js');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/donations', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(donationMock.remove);

  describe('POST /donations', () => {
    test('200 should return a donation', () => {
      let tempProfile;
      let tempCharity;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create();
        })
        .then(mock => {
          tempCharity = mock;
          return superagent.post(`${apiURL}/donations`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .send({
              amount: '50',
              inHonorOf: 'Helen Hanson',
            });
        })
        .then(response => {
          expect(response.status).toEqual(200);
        // expect(response.body.firstName).toEqual('John');
        // expect(response.body.lastName).toEqual('Jacobs');
        // expect(response.body.city).toEqual('Seattle');
        // expect(response.body.state).toEqual('WA');
        // expect(response.body.donationGoal).toEqual('5000');
        // expect(response.body.moneySpent).toEqual('2500');
        // expect(response.body.bio).toEqual('Lorem ipsum.');
        // expect(response.body.latitude).toEqual('555555');
        // expect(response.body.longitude).toEqual('-555555');
        // expect(response.body.account).toEqual(tempAccount.account._id.toString());
        });
    });
  });

  // describe('GET /donations?', () => {
  //   test('200 should return a donation', () => {
  //
  //   });
  // });

});
