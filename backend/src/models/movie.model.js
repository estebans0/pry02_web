// src/models/movie.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
  title:         { type: String, required: true },
  description:   { type: String },
  genre:         [{ type: String }],
  director:      { type: String },
  releaseYear:   { type: Number },
  rating:        { type: Number },
  mainImage:     { type: String },
  images:        [{ type: String }],
  // Reparto (cast) como arreglo de objetos que incluyen actor y personaje
  cast: [
    {
      actor:         { type: Schema.Types.ObjectId, ref: 'Actor' },
      characterName: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
