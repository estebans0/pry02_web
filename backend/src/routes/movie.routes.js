// src/routes/movie.routes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// Rutas
router.post('/', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  movieController.createMovie
);

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);

router.put('/:id', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  movieController.updateMovie
);

router.delete('/:id', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  movieController.deleteMovie
);

// Agregar un actor a la película
router.post('/:id/add-actor',
  authMiddleware,
  roleMiddleware(['admin']),
  movieController.addActorToMovie
);

module.exports = router;
