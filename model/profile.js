'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  city: {type: String},
  state: {type: String},
  photo: {type: String},
  donationGoal: {type: String},
  moneySpent: {type: String},
  bio: {type: String},
  latitude: {type: String},
  longitude: {type: String},
  account: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'account'},
});

module.exports = mongoose.model('profile', profileSchema);
