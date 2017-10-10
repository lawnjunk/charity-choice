'use strict';

const {Router} = require('express');
const httpErrors = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Profile = require('../model/profile.js');

module.exports = new Router()
  .post('/profiles', bearerAuth, (req, res, next) => {

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
        res.json(profile);
      })
      .catch(next);
  })
  .get('/profiles/:id', bearerAuth, (req, res, next) => {
    Profile.findById(req.params.id)
      .then(profile => {
        if(!profile)
          throw httpErrors(404, '__REQUEST_ERROR__ profile not found');
        res.json(profile);
      })
      .catch(next);
  })
  .get('/profiles', bearerAuth, (req, res, next) => {
    let {page='0'} = req.query;
    page = Number(page);
    if(isNaN(page))
      page=0;
    page = page < 0 ? 0 : page;

    let profilesCache;
    Profile.find({})
      .skip(page * 100)
      .limit(100)
      .then(profiles => {
        profilesCache = profiles;
        return Profile.find({}).count();
      })
      .then(count => {
        let result = {
          count,
          data: profilesCache,
        };

        let lastPage = Math.floor(count / 100);
        res.links({
          next: `http://localhost/profiles?page=${page+1}`,
          prev: `http://localhost/profiles?page=${page < 1 ? 0 : page - 1}`,
          last: `http://localhost/profiles?page=${lastPage}`,
        });
        res.json(result);
      })
      .catch(next);
  });
