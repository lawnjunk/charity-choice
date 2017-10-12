#!/usr/bin/env node
'use strict';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/dev';
const jsonFile = process.argv[2];

const { exec } = require('child_process');
const loadJsonFile = `mongoimport --uri ${MONGODB_URI} --collection charities --jsonArray ${jsonFile} `;

exec(loadJsonFile, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}: ${stderr.toString()}`);
    return;
  }
  console.log(`success ${stdout.toString()}`);
});
