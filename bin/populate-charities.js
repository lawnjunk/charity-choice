'use strict';

const fs = require('fs-extra');
const mongoose = require('mongoose');
const Charity = require('./../model/charity.js');

let mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost/dev';


fs.readFile(`${__dirname}/asset/charity.json`)
  .then(data => {

    console.log(JSON.parse(data.toString())[2].organization._rapid_links);


    return Promise.all(JSON.parse(data.toString()).map(charity => {

      let address = charity.mailingAddress;
      return new Charity({
        name: charity.charityName,
        streetAdd: address.streetAddress1 ? address.streetAddress1 : 'NA',
        city: address.city ? address.city : 'NA',
        state: address.stateOrProvince ? address.stateOrProvince : 'NA',
        zip: address.postalCode ? address.postalCode : 'NA',
        mission: charity.mission ? charity.mission : 'NA',
        cause: 'NA', // FOR NOW
        rating: Math.ceil(Math.random() * 5),
        websiteURL: charity.websiteURL,
        // photoURL: charity.,
        // keywords: charity.,
        category: 'NA',
        // phoneNumber: charity.,
        // email: charity.,

      }).save();
    }));

    
  });