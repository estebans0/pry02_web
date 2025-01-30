// pry02/backend/controllers/user.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Verificar si el usuario existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role
    });

    await newUser.save();
    return res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Buscar usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    // Generar token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'SECRET_KEY',
      { expiresIn: '1d' }
    );
    return res.json({ message: 'Login exitoso', token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
