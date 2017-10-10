'use strict';

const {Router} = require('express');
const Charity = require('../model/charity.js');
const httpErrors = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const charityRouter = module.exports = new Router();

charityRouter.get('/charities', bearerAuth, (req, res, next) => {
  let {page='0'} = req.query;
  delete req.query.page;
  page = Number(page);
  if(isNaN(page))
    page=0;
  page = page < 0 ? 0 : page;

  let charitiesCache;
  Charity.find(req.query)
    .skip(page * 100)
    .limit(100)
    .then(charities => {
      charitiesCache = charities;
      return Charity.find(req.query).count();
    })
    .then(count => {
      let result = {
        count,
        data: charitiesCache,
      };

      let lastPage = Math.floor(count / 100);
      res.links({
        next: `http://localhost/charities?page=${page+1}`,
        prev: `http://localhost/charities?page=${page < 1 ? 0 : page - 1}`,
        last: `http://localhost/charities?page=${lastPage}`,
      });
      res.json(result);
    })
    .catch(next);
});

charityRouter.get('/charities/:id', bearerAuth, (req, res, next) => {
  Charity.findById(req.params.id)
    .then(charity => {
      if(!charity)
        throw httpErrors(404, 'charity not found');
      res.json(charity);
    })
    .catch(next);
});
