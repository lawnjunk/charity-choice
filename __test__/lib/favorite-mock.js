'use strict';

const Favorite = require('../../model/favorite.js');

let create = (profile, charity) => {
  // let result = {};
  return new Favorite({
    account: profile.account,
    profile: profile._id,
    charity: charity._id,
  }).save();
};

let createMany = (num, profiles, charities) => {
  let rand = (arr) => Math.floor(Math.random() * arr.length);
  return Promise.all(new Array(num).fill(0).map(() => {
    return create(profiles[rand(profiles)], charities[rand(charities)]);
  }));
};

let remove = () => Favorite.remove({});

module.exports = { create, createMany, remove };
