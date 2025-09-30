const express = require ('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

//Obtener noticias

router.get("/news", protect, (req, res) => {
    res.json({ message: "Noticias de Racing" }); // Reemplazar con lógica real
  });

// Obtener partidos
router.get("/matches", protect, (req, res) => {
    res.json({ message: "Partidos de Racing" }); // Reemplazar con lógica real
  });

module.exports = router;