// pry02/backend/controllers/actor.controller.js
const Actor = require('../models/actor.model');
const Movie = require('../models/movie.model');

// Obtiene todos los actores con paginación
exports.getAllActors = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const actors = await Actor.find()
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Actor.countDocuments();

    return res.json({
      actors,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtiene un actor por su ID y las películas en las que participa
exports.getActorById = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findById(id);
    if (!actor) {
      return res.status(404).json({ message: 'Actor no encontrado' });
    }

    // Buscar las películas en las que participa este actor
    const movies = await Movie.find({ actors: id })
      .select('title images') // Seleccionar los campos a mostrar
      .lean();

    // Retornar actor y sus películas
    return res.json({
      actor,
      movies
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crea un nuevo actor. (Protegido para ADMIN)
exports.createActor = async (req, res) => {
  try {
    const newActor = new Actor(req.body);
    const savedActor = await newActor.save();
    return res.status(201).json(savedActor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualiza un actor por su ID. (Protegido para ADMIN)
exports.updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedActor = await Actor.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedActor) {
      return res.status(404).json({ message: 'Actor no encontrado' });
    }
    return res.json(updatedActor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Elimina un actor por su ID. (Protegido para ADMIN)
exports.deleteActor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActor = await Actor.findByIdAndDelete(id);
    if (!deletedActor) {
      return res.status(404).json({ message: 'Actor no encontrado' });
    }
    return res.json({ message: 'Actor eliminado con éxito' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
