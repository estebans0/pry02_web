// src/controllers/actor.controller.js
const Actor = require('../models/actor.model');
const Movie = require('../models/movie.model');

// Crear Actor
exports.createActor = async (req, res) => {
  try {
    const { name, birthDate, biography } = req.body;
    const newActor = new Actor({ name, birthDate, biography });
    await newActor.save();
    return res.status(201).json({ message: 'Actor creado', actor: newActor });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear actor', error });
  }
};

// Obtener lista de Actores con paginación y búsqueda
exports.getActors = async (req, res) => {
  try {
    const { page = 1, limit = 10, name = '' } = req.query;
    const query = name 
      ? { name: { $regex: name, $options: 'i' } }
      : {};

    const actors = await Actor.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Actor.countDocuments(query);

    return res.status(200).json({
      actors,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener actores', error });
  }
};

// Obtener Actor por ID (incluyendo sus películas)
exports.getActorById = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id)
      .populate('movies', 'title mainImage releaseYear rating');
    if(!actor) {
      return res.status(404).json({ message: 'Actor no encontrado' });
    }
    return res.status(200).json(actor);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener actor', error });
  }
};

// Actualizar Actor
exports.updateActor = async (req, res) => {
  try {
    const { name, birthDate, biography, mainImage, images } = req.body;
    const actor = await Actor.findByIdAndUpdate(
      req.params.id, 
      { name, birthDate, biography, mainImage, images },
      { new: true }
    );
    if(!actor) {
      return res.status(404).json({ message: 'Actor no encontrado' });
    }
    return res.status(200).json({ message: 'Actor actualizado', actor });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar actor', error });
  }
};

// Eliminar Actor
exports.deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if(!actor) {
      return res.status(404).json({ message: 'Actor no encontrado' });
    }
    // Opcionalmente, remover referencia de las películas
    await Movie.updateMany(
      { 'cast.actor': actor._id },
      { $pull: { cast: { actor: actor._id } } }
    );

    return res.status(200).json({ message: 'Actor eliminado' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar actor', error });
  }
};
