'use strict';

const faker = require('faker');
const Charity = require('../model/charity.js');

let create = () => {
  let result = {};
  return new Charity({
    name: faker.company.companyName(),
    streetAdd: faker.addres.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    mission: faker.lorem.words(30),
    cause: faker.lorem.words(1),
    rating: faker.random.number(),
    websiteURL: faker.internet.url(),
    photoURL: faker.image.imageURL(),
    keywords: [faker.lorem.words(1)],
    category: faker.lorem.words(1),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    created: faker.date.past(),
  }).save()
  .then(charity => {
    result.charity = charity;
    return result;
  });
};

let createMany = (num) => {
  let result = {};
  return Promise.all(new Array(num).fill(0)
    .map(() => {
      return new Charity({
        name: faker.company.companyName(),
        streetAdd: faker.addres.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        mission: faker.lorem.words(30),
        cause: faker.lorem.words(1),
        rating: faker.random.number(),
        websiteURL: faker.internet.url(),
        photoURL: faker.image.imageURL(),
        keywords: [faker.lorem.words(1)],
        category: faker.lorem.words(1),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        created: faker.date.past(),
      })
      .save();
    })
    .then(charities => {
      result.charities = charities;
      return result;
    })
  );
};

let remove = () => Promise.all([
  Charity.remove({}),
]);

module.exports = {create, createMany, remove};
