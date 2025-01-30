// pry02/backend/routes/actor.routes.js
const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actor.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Obtener todos los actores
router.get('/', actorController.getAllActors);

// Obtener un actor por ID
router.get('/:id', actorController.getActorById);

// Crear un nuevo actor => Requiere token y rol admin
router.post('/', verifyToken, isAdmin, actorController.createActor);

// Actualizar un actor => Requiere token y rol admin
router.put('/:id', verifyToken, isAdmin, actorController.updateActor);

// Eliminar un actor => Requiere token y rol admin
router.delete('/:id', verifyToken, isAdmin, actorController.deleteActor);

module.exports = router;
