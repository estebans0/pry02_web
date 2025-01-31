// src/models/actor.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const actorSchema = new Schema({
  name:       { type: String, required: true },
  birthDate:  { type: Date },
  biography:  { type: String },
  mainImage:  { type: String },
  images:     [{ type: String }],
  // Referencia a películas en las que ha participado
  movies:     [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
}, { timestamps: true });

module.exports = mongoose.model('Actor', actorSchema);
