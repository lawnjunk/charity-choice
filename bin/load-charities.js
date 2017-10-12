'use strict';

const { exec } = require('child_process');
const loadJsonFile = `mongoimport --db ${process.env.LOAD_CHARITY_COLLECTION} --collection charities --drop --jsonArray ${__dirname}/asset/mapped-charity.json `;

module.exports = () => {
  exec(loadJsonFile, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}: ${stderr}`);
      return;
    }
    console.log(`success ${stdout}`);
  });
};


