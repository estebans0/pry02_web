exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Verifica si ya existe un usuario con mismo username o email
    const userExists = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (userExists) {
      // Validar cuál campo choca para mostrar un mensaje más claro
      if (userExists.email === email) {
        return res.status(400).json({ message: 'El correo ya está registrado.' });
      } else {
        return res.status(400).json({ message: 'El nombre de usuario ya existe.' });
      }
    }

    // Crea nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();
    return res.status(201).json({ 
      message: 'Usuario registrado exitosamente', 
      user: newUser 
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};