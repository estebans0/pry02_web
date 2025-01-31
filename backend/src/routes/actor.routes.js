// src/routes/actor.routes.js
const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actor.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// Rutas
router.post('/', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  actorController.createActor
);

router.get('/', actorController.getActors);
router.get('/:id', actorController.getActorById);

router.put('/:id', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  actorController.updateActor
);

router.delete('/:id', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  actorController.deleteActor
);

module.exports = router;
