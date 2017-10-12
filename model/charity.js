'use strict';

const mongoose = require('mongoose');

const charitySchema = mongoose.Schema({
  name: {type: String, required: true},
  streetAdd: {type: String},
  city: {type: String},
  state: {type: String},
  zip: {type: String},
  mission: {type: String},
  cause: {type: String},
  rating: {type: String},
  websiteURL: {type: String},
  photoURL: {type: String},
  keywords: [{type: String}],
  category: {type: String},
  phoneNumber: {type: String},
  email: {type: String},
  created: {type: Date, default: () => new Date()},
});

module.exports = mongoose.model('charity', charitySchema);
