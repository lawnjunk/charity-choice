'use strict';

const faker = require('faker');
const accountMock = require('./account-mock.js');
const Profile = require('../../model/profile.js');

let create = () => {
  let result = {};
  return accountMock.create('12345')
    .then(tempAccount => {
      result.tempAccount = tempAccount;
      return new Profile({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        city: faker.address.city(),
        state: faker.address.state(),
        photo: faker.random.image(),
        donationGoal: faker.finance.amount(),
        moneySpent: faker.finance.amount(),
        bio: faker.lorem.words(100),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        account: result.tempAccount._id,
      }).save();
    })
    .then(profile => {
      result.profile = profile;
      return result;
    });
};

let createMany = (num) => {
  return Promise.all(new Array(num).fill(0).map(() => create()));
};

let remove = () => {
  return Promise.all([
    accountMock.remove(),
    Profile.remove({}),
  ]);
};

module.exports = { create, createMany, remove };
