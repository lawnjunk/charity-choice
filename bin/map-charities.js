'use strict';

const fs = require('fs-extra');

fs.readFile(`${__dirname}/asset/charity.json`)
  .then(data => {
    return JSON.parse(data.toString()).map(charity => {
      let address = charity.mailingAddress;
      return {
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
        keywords: charity.tagLine.split(' '),
        category: charity.category.categoryName,
        phoneNumber: '204-867-5309',
        email: 'some@email.com',
      };
    });
  })
  .then(res => {
    fs.writeJson(`${__dirname}/asset/mapped-charity.json`, res)
      .then(() => console.log('success'))
      .catch(console.log);
  });
