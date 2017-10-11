'use strict';

const faker = require('faker');
const Donation = require('../../model/donation.js');


let create = (profile, charity) => {
  return new Donation({
    amount: faker.finance.amount(),
    inHonorOf: faker.name.findName(),
    account: profile.account,
    profile: profile._id,
    charity: charity._id,
  }).save();
};

let createMany = (num) => {
  return Promise.all(new Array(num).fill(0).map(() => create()));
};

let remove = () => {
  return Promise.all([
    Donation.remove({}),
  ]);
};

module.exports = { create, createMany, remove };
