'use strict';

const { Router } = require('express');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Donation = require('../model/donation.js');

let fuzzy = (filterTerm) => new RegExp('.*' + filterTerm.toLowerCase().split('').join('.*') + '.*');

module.exports = new Router()
  .post('/donations', bearerAuth, (req, res, next) => {
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
  })
  .get('/donations', bearerAuth, (req, res, next) => {
    let { page = '0' } = req.query;
    delete req.query.page;
    page = Number(page);
    if (isNaN(page))
      page = 0;
    page = page < 0 ? 0 : page;

    // Fuzzy Search
    if (req.query.amount) req.query.amount = ({$regex: fuzzy(req.query.amount), $options: 'i'});
    if (req.query.inHonorOf) req.query.inHonorOf = ({$regex: fuzzy(req.query.inHonorOf), $options: 'i'});

    let donationsCache;
    Donation.find(req.query)
      .skip(page * 100)
      .limit(100)
      .then(donations => {
        donationsCache = donations;
        return Donation.find(req.query).count();
      })
      .then(count => {
        let result = {
          count,
          data: donationsCache,
        };

        let lastPage = Math.floor(count / 100);
        res.links({
          next: `http://localhost/profiles?page=${page + 1}`,
          prev: `http://localhost/profiles?page=${page < 1 ? 0 : page - 1}`,
          last: `http://localhost/profiles?page=${lastPage}`,
        });
        res.json(result);
      })
      .catch(next);
  });
