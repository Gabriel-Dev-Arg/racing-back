const User = require("../models/User");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();


// Controlador para registrar un nuevo usuario

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    //el nuevo usuario manda email y password



//control de usuario si existe o no ,
//si existe el usuario le va a dejar un mensaje que ya esta registrado
//si no existe directamente se lo crea
try {
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "El email ya está registrado" });
    }

    const user = await User.create({
        email,
        password,
    });

    if (user) {
      const token = jwt.sign({
        id: user._id,
        email: user.email
      }, process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token,
            message: "Usuario registrado exitosamente",
        }
      
      );
    } else {
        res.status(400).json({
            message: "Error al registrar el usuario",
        });
    }
} catch (error) {
    res.status(500).json({
        message: "Error en el servidor",
        error: error.message,
    });
}
};

// Controlador para iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Busca al usuario por email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
  
      // Compara la contraseña ingresada con la hasheada
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Datos invalidos' });
      }

      const token = jwt.sign({
        id: user._id,
        email: user.email
      }, process.env.JWT_SECRET,
      {expiresIn: '1h'}
    )
  
      res.status(200).json({
        _id: user._id,
        email: user.email,
        token,
        message: 'Inicio de sesión exitoso',
      });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  };
    
    
module.exports = { registerUser,loginUser };
