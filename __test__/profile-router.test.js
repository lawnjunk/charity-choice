'use strict';

require('./lib/setup.js');

const superagent = require('superagent');
const server = require('../lib/server.js');
const accountMock = require('./lib/account-mock.js');
const profileMock = require('./lib/profile-mock.js');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/profiles', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(profileMock.remove);

  describe('POST /profiles', () => {
    test('200 should return a profile', () => {
      let tempAccount;
      return accountMock.create('12345')
        .then(mock => {
          tempAccount = mock;
          return superagent.post(`${apiURL}/profiles`)
            .set('Authorization', `Bearer ${tempAccount.token}`)
            .send({
              firstName: 'John',
              lastName: 'Jacobs',
              city: 'Seattle',
              state: 'WA',
              photo: './image.jpg',
              donationGoal: '5000',
              moneySpent: '2500',
              bio: 'Lorem ipsum.',
              latitude: '555555',
              longitude: '-555555',
            });
        })
        .then(response => {
          expect(response.body.firstName).toEqual('John');
          expect(response.body.lastName).toEqual('Jacobs');
          expect(response.body.city).toEqual('Seattle');
          expect(response.body.state).toEqual('WA');
          expect(response.body.photo).toEqual('./image.jpg');
          expect(response.body.donationGoal).toEqual('5000');
          expect(response.body.moneySpent).toEqual('2500');
          expect(response.body.bio).toEqual('Lorem ipsum.');
          expect(response.body.latitude).toEqual('555555');
          expect(response.body.longitude).toEqual('-555555');
          expect(response.body.account).toEqual(tempAccount.account._id.toString());
          expect(response.status).toEqual(200);
        });
    });
  });
});
