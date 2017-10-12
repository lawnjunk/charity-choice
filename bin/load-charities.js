'use strict';

const fs = require('fs-extra');

fs.readFile(`${__dirname}/asset/mapped-charity.json`)
  .then(res => console.log(JSON.parse(res.toString())));

