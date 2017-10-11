'use strict';

const {Router} = require('express');
const httpErrors = require('http-errors');
const Favorite = require('../model/favorite.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');


const favoriteRouter = module.exports = new Router();