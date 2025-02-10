import express from 'express';
const router = express.Router();

import TimeController from '../controllers/TimeController.js';
import CampeonatoController from '../controllers/CampeonatoController.js';
import JogosController from '../controllers/JogosController.js';

router.post('/times', TimeController.addTime);
router.post('/campeonatos', CampeonatoController.criarCampeonato);
router.post('/campeonatos/start', CampeonatoController.startCampeonato);
router.get('/jogos/:campeonatoId', JogosController.getJogos);

export default router;