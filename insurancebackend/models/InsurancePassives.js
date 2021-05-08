const mongoose = require('mongoose');

const InsurancePassives = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('passives', InsurancePassives);
