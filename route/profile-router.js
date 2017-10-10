'use strict';

const {Router} = require('express');
const httpErrors = require('http-errors');
const jsonParser = require('body-parser').json();
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Profile = require('../model/profile.js');

module.exports = new Router()
.post('/profiles', bearerAuth, jsonParser, (req, res, next) => {
  console.log('lul wat', req.body);
  if (!req.account)
    return next(httpErrors(401, 'REQUEST ERROR: no account found'));
  return new Profile({
    ...req.body,
    photo: undefined,
    account: req.account._id,
    username: req.account.username,
    email: req.account.email,
  }).save()
  .then(profile => {
    console.log(profile);
    res.json(profile)
  })
  .catch(next);
});
