

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rivalsrp:rivals123@rivals.wvzyguf.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema, model } = require('mongoose');

const coinSchema = new Schema({
  userID: { type: String, required: true },
  coins: { type: Number, default: 0 },
});

module.exports = model('Coin', coinSchema);