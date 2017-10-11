'use strict';

const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, required: true },
  charity: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('favorite', favoriteSchema);