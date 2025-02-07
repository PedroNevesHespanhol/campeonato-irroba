const express = require('express');

const router = express.Router();

// POST /times
router.post('/times', (req, res) => {
  res.send('Novo time adicionado');
});

// GET /campeonatos
router.get('/campeonatos', (req, res) => {
  res.send('Lista de campeonatos');
});

module.exports = router;