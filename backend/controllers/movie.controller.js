// pry02/backend/controllers/movie.controller.js
const Movie = require('../models/movie.model');

/**
 * Obtiene todas las películas con paginación, si se proporciona page y limit en la query.
 * Ejemplo: GET /api/movies?page=1&limit=10
 */
exports.getAllMovies = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Buscar películas
    const movies = await Movie.find()
      .populate('actors', 'name') // Sólo muestra el campo 'name' de los actores
      .skip(skip)
      .limit(parseInt(limit));

    // Conteo total de películas (para calcular páginas totales)
    const total = await Movie.countDocuments();

    return res.json({
      movies,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtiene una película por su ID.
exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate('actors');
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    return res.json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crea una película nueva. (Protegido para ADMIN)
exports.createMovie = async (req, res) => {
  try {
    // req.body debe contener los campos (title, description, genre, etc.)
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    return res.status(201).json(savedMovie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualiza una película por su ID. (Protegido para ADMIN)
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Retorna el documento actualizado
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    return res.json(updatedMovie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Elimina una película por su ID. (Protegido para ADMIN)
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    return res.json({ message: 'Película eliminada con éxito' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
