'use strict';

const fs = require('fs-extra');
// const mongoose = require('mongoose');
const Charity = require('./../model/charity.js');

let mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost/dev';

fs.readFile(`${__dirname}/asset/charity.json`)
  .then(data => {
    // console.log(JSON.parse(data.toString()));
    return Promise.all(JSON.parse(data.toString()).map(charity => {
      let address = charity.mailingAddress;
      return new Charity({
        name: charity.charityName,
        streetAdd: address.streetAddress1,
        city: address.city,
        state: address.stateOrProvince,
        zip: address.postalCode,
        mission: charity.mission,
        cause: charity.cause.causeName,
        rating: Math.ceil(Math.random() * 5),
        websiteURL: charity.websiteURL,
        photoURL: 'NA',
        keywords: charity.tagLine,
        category: charity.category,
        phoneNumber: '204-867-5309',
        email: 'some@email.com',
      }).save();
    }));
  })
  .then(() => console.log('Charities Populated!!!'));
