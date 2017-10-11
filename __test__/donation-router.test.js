'use strict';

require('./lib/setup.js');

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
          //console.log('tempProfile.profile: ', tempProfile.profile);
          //console.log('tempProfile.tempAccount.account: ', tempProfile.tempAccount.account);
          return superagent.post(`${apiURL}/donations`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .send({
              amount: 50,
              inHonorOf: 'Helen Hanson',
              account: tempProfile.tempAccount.account,
              profile: tempProfile.profile._id,
              charity: tempCharity._id,
            });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.amount).toEqual(50);
          expect(response.body.inHonorOf).toEqual('Helen Hanson');
          expect(response.body.account).toEqual(tempProfile.tempAccount.account._id.toString());
          expect(response.body.profile).toEqual(tempProfile.profile._id.toString());
          expect(response.body.charity).toEqual(tempCharity._id.toString());
        });
    });
  });

  describe('GET /donations', () => {
    test('should return 5 donations', () => {
      let tempProfile;
      let tempCharity;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create()
            .then(mock => {
              tempCharity = mock;
              return donationMock.createMany(5, tempProfile.profile, tempCharity)
                .then(() => {
                  return superagent.get(`${apiURL}/donations`)
                    .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
                })
                .then(res => {
                  console.log(res.body);
                  expect(res.status).toEqual(200);
                  expect(res.body.count).toEqual(5);
                  //expect(res.body.data.length).toEqual(100);
                  //expect(res.links).toBeTruthy();
                });
            });
        });
    });
  });
});
