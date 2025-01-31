// src/controllers/user.controller.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();

    return res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ 
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
