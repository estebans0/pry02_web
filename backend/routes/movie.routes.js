// pry02/backend/routes/movie.routes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Obtener todas las películas (GET)
router.get('/', movieController.getAllMovies);

// Obtener película por ID (GET)
router.get('/:id', movieController.getMovieById);

// Crear nueva película (POST) => Requiere token y rol admin
router.post('/', verifyToken, isAdmin, movieController.createMovie);

// Actualizar película (PUT) => Requiere token y rol admin
router.put('/:id', verifyToken, isAdmin, movieController.updateMovie);

// Eliminar película (DELETE) => Requiere token y rol admin
router.delete('/:id', verifyToken, isAdmin, movieController.deleteMovie);

module.exports = router;
