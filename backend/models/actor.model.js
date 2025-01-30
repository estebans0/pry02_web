// pry02/backend/models/actor.model.js
const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: Date },
  biography: { type: String },
  images: [{
    url: String,
    isPrincipal: { type: Boolean, default: false }
  }]
});

module.exports = mongoose.model('Actor', actorSchema);
