'use strict';

const { Router } = require('express');
const httpErrors = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Donation = require('../model/donation.js');

// let fuzzy = (filterTerm) => new RegExp('.*' + filterTerm.toLowerCase().split('').join('.*') + '.*');

module.exports = new Router()
  .post('/donations', bearerAuth, (req, res, next) => {
    console.log('req.body: ', req.body);
    return new Donation({
      ...req.body,
      amount: req.body.amount,
      inHonorOf: req.body.inHonorOf,
      account: req.body.account._id,
      profile: req.body.profile,
      charity: req.body.charity,
    }).save()
      .then(profile => {
        res.json(profile);
      })
      .catch(next);
  });

  // .get('/profiles', bearerAuth, (req, res, next) => {
  //   let { page = '0' } = req.query;
  //   delete req.query.page;
  //   page = Number(page);
  //   if (isNaN(page))
  //     page = 0;
  //   page = page < 0 ? 0 : page;
  //
  //   // Fuzzy Search
  //   if (req.query.firstName) req.query.firstName = ({$regex: fuzzy(req.query.firstName), $options: 'i'});
  //   if (req.query.lastName) req.query.lastName = ({$regex: fuzzy(req.query.lastName), $options: 'i'});
  //   if (req.query.city) req.query.city = ({$regex: fuzzy(req.query.city), $options: 'i'});
  //   if (req.query.state) req.query.state = ({$regex: fuzzy(req.query.state), $options: 'i'});
  //
  //   let profilesCache;
  //   Profile.find(req.query)
  //     .skip(page * 100)
  //     .limit(100)
  //     .then(profiles => {
  //       profilesCache = profiles;
  //       return Profile.find(req.query).count();
  //     })
  //     .then(count => {
  //       let result = {
  //         count,
  //         data: profilesCache,
  //       };
  //
  //       let lastPage = Math.floor(count / 100);
  //       res.links({
  //         next: `http://localhost/profiles?page=${page + 1}`,
  //         prev: `http://localhost/profiles?page=${page < 1 ? 0 : page - 1}`,
  //         last: `http://localhost/profiles?page=${lastPage}`,
  //       });
  //       res.json(result);
  //     })
  //     .catch(next);
  // });
