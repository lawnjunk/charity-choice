#!/usr/bin/env node
'use strict';

// createa  command line utility that
// takes in a state 
const fs = require('fs-extra');
const superagent = require('superagent');
const { exec } = require('child_process');

const apiURL = 'http://api.data.charitynavigator.org/v2/organizations';

const CHARITY_APP_ID = process.env.CHARITY_APP_ID;
const CHARITY_APP_KEY = process.env.CHARITY_APP_KEY;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/dev';

const jsonFile = `${__dirname}/asset/charity.json`;
const loadJsonFile = `mongoimport --uri ${MONGODB_URI} --collection charities --jsonArray ${jsonFile} `;

console.log('ID', CHARITY_APP_ID, 'key:', CHARITY_APP_KEY);

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
  'FL', 'GA', 'HI', 'ID', 'IL', 'IN',
  'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
  // 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  // 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
  // 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  // 'VA', 'WA', 'WV', 'WI', 'WY',
];

console.log('Length:', states.length);

console.log(__dirname);

Promise.all(states.map(stateAbbr => {
  return superagent.get(apiURL)
    .set('Content-Type', 'application/json')
    .query({ app_id: CHARITY_APP_ID })
    .query({ app_key: CHARITY_APP_KEY })
    .query({ state: stateAbbr, pageNum: 1, pageSize: 100, rated: true })
    .then(charities => {
      return charities.body.map(charity => {
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
          keywords: charity.tagLine ? charity.tagLine.split(' ') : ['NO TAG LINE'],
          category: charity.category.categoryName,
          phoneNumber: '204-867-5309',
          email: 'some@email.com',
        };
      });
    });
}))
  .then(res => res.reduce((a, b) => a.concat(b), []))
  .then(res => {
    fs.writeJson(jsonFile, res)
      .then(() => console.log('success'))
      .catch(console.log);
  })
  .then(() => {
    exec(loadJsonFile, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}: ${stderr.toString()}`);
        return;
      }
      console.log(`success ${stdout.toString()}`);
    });
  });



