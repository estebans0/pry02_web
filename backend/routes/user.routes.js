// pry02/backend/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Registro de usuario (POST)
router.post('/register', userController.register);

// Inicio de sesión (POST)
router.post('/login', userController.login);

module.exports = router;
