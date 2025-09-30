const express = require ('express')
const {registerUser, loginUser} = require ('../controllers/authController')
const {protect} = require('../middleware/auth')
const router = express.Router();

//Ruta para registrar un usuario

router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta protegida de ejemplo
router.get('/profile', protect, (req, res) => {
    res.status(200).json({ message: 'Perfil del usuario', user: req.user });
  });

module.exports = router