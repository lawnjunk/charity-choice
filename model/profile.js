'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  donationGoal: { type: String },
  moneySpent: { type: String },
  photo: {type: String},
  bio: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  account: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
});

module.exports = mongoose.model('profile', profileSchema);
