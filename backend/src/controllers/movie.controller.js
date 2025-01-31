// src/controllers/movie.controller.js
const Movie = require('../models/movie.model');
const Actor = require('../models/actor.model');

// Crear Película
exports.createMovie = async (req, res) => {
  try {
    const { 
      title, description, genre, director, releaseYear, rating,
      mainImage, images
    } = req.body;
    
    const newMovie = new Movie({
      title, 
      description,
      genre, 
      director, 
      releaseYear, 
      rating,
      mainImage, 
      images
    });

    await newMovie.save();
    return res.status(201).json({ message: 'Película creada', movie: newMovie });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear película', error });
  }
};

// Obtener lista de Películas con paginación y filtros
exports.getMovies = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      title = '', 
      genre, 
      year, 
      rating 
    } = req.query;

    let query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (genre) {
      query.genre = { $in: [genre] };
    }
    if (year) {
      query.releaseYear = year;
    }
    if (rating) {
      query.rating = rating;
    }

    const movies = await Movie.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Movie.countDocuments(query);

    return res.status(200).json({
      movies,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener películas', error });
  }
};

// Obtener Película por ID (con reparto)
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('cast.actor', 'name mainImage');
    if(!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener película', error });
  }
};

// Actualizar Película
exports.updateMovie = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      genre, 
      director, 
      releaseYear, 
      rating, 
      mainImage,
      images
    } = req.body;

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, description, genre, director, releaseYear, rating, mainImage, images },
      { new: true }
    );
    if(!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    return res.status(200).json({ message: 'Película actualizada', movie });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar película', error });
  }
};

// Eliminar Película
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    // Remover la referencia de la película en los actores
    const castActorIds = movie.cast.map(c => c.actor);
    await Actor.updateMany(
      { _id: { $in: castActorIds } },
      { $pull: { movies: movie._id } }
    );

    return res.status(200).json({ message: 'Película eliminada' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar película', error });
  }
};

// Asociar un actor a una película (agregar al reparto)
exports.addActorToMovie = async (req, res) => {
  try {
    const { actorId, characterName } = req.body;
    const movie = await Movie.findById(req.params.id);
    if(!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }

    // Agregamos el actor al cast de la película
    movie.cast.push({ actor: actorId, characterName });
    await movie.save();

    // Agregamos la película a la lista de películas del actor
    const actor = await Actor.findById(actorId);
    if(actor) {
      actor.movies.push(movie._id);
      await actor.save();
    }

    return res.status(200).json({ message: 'Actor añadido al reparto', movie });
  } catch (error) {
    return res.status(500).json({ message: 'Error al asociar actor a película', error });
  }
};
