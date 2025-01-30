// pry02/backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar las rutas
const userRoutes = require('./routes/user.routes');
const movieRoutes = require('./routes/movie.routes');
const actorRoutes = require('./routes/actor.routes');

const app = express();

// Conectar a MongoDB Atlas
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Uso de rutas
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/actors', actorRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
