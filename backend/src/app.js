// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Rutas
const userRoutes = require('./routes/user.routes');
const actorRoutes = require('./routes/actor.routes');
const movieRoutes = require('./routes/movie.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión DB
connectDB();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/actors', actorRoutes);
app.use('/api/movies', movieRoutes);

module.exports = app;
