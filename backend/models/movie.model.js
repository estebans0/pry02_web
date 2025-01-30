// pry02/backend/models/movie.model.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  director: { type: String },
  year: { type: Number },
  rating: { type: Number },
  actors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor'
  }],
  images: [{
    url: String,
    isPrincipal: { type: Boolean, default: false }
  }]
});

module.exports = mongoose.model('Movie', movieSchema);
