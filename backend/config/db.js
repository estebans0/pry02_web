// pry02/backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://estebanjs029:5y6HuNwgrkaiZJkW@cluster0.0ald2.mongodb.net/pry02_Web?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('MongoDB Atlas conectado exitosamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas', error);
    process.exit(1);
  }
};

module.exports = connectDB;
