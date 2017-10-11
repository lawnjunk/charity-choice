'use strict';

require('./lib/setup.js');
const superagent = require('superagent');
const server = require('../lib/server.js');
const charityMock = require('./lib/charity-mock.js');
const profileMock = require('./lib/profile-mock.js');
const favoriteMock = require('./lib/favorite-mock.js');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/favorites', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(profileMock.remove);
  afterEach(charityMock.remove);
  afterEach(favoriteMock.remove);

  describe('POST /favorites', () => {
    test.only('200 OK create a favorite', () => {
      let tempProfile;
      let tempCharity;

      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create();
        })
        .then(mock => {
          tempCharity = mock;
          return superagent.post(`${apiURL}/favorites`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .send({
              profile: tempProfile.profile._id,
              charity: tempCharity._id,
            });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.charity).toEqual(tempCharity._id.toString());
          expect(res.body.profile).toEqual(tempProfile.profile._id.toString());
          expect(res.body.account).toEqual(tempProfile.tempAccount.account._id.toString());
        });
    });
  });
  describe('GET /favorites', () => { });
  describe('DELETE /favorites', () => { });
});