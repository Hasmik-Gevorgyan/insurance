const mongoose = require('mongoose');

const Actives = new mongoose.Schema({
  activeName: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  profitability: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('activestypes', Actives);
