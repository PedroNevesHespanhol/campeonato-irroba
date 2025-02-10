import express from 'express';
const router = express.Router();

import TimeController from '../controllers/TimeController.js';
import CampeonatoController from '../controllers/CampeonatoController.js';
import JogosController from '../controllers/JogosController.js';

/**
 * @swagger
 * /times:
 *   post:
 *     summary: Add a new team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               campeonatoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Team created successfully
 *       400:
 *         description: Error creating team
 */
router.post('/times', TimeController.addTime);

/**
 * @swagger
 * /campeonatos:
 *   post:
 *     summary: Create a new championship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Championship created successfully
 *       400:
 *         description: Error creating championship
 */
router.post('/campeonatos', CampeonatoController.criarCampeonato);

/**
 * @swagger
 * /campeonatos/start:
 *   post:
 *     summary: Start a championship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Championship started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quartas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timeCasa:
 *                         type: string
 *                       timeVisitante:
 *                         type: string
 *                       golsCasa:
 *                         type: integer
 *                       golsVisitante:
 *                         type: integer
 *                       penaltis:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           penaltisCasa:
 *                             type: integer
 *                           penaltisVisitante:
 *                             type: integer
 *                       vencedor:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           nome:
 *                             type: string
 *                           pontuacao:
 *                             type: integer
 *                           dataInscricao:
 *                             type: string
 *                             format: date-time
 *                           campeonatoId:
 *                             type: integer
 *                       perdedor:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           nome:
 *                             type: string
 *                           pontuacao:
 *                             type: integer
 *                           dataInscricao:
 *                             type: string
 *                             format: date-time
 *                           campeonatoId:
 *                             type: integer
 *                 semifinais:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timeCasa:
 *                         type: string
 *                       timeVisitante:
 *                         type: string
 *                       golsCasa:
 *                         type: integer
 *                       golsVisitante:
 *                         type: integer
 *                       penaltis:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           penaltisCasa:
 *                             type: integer
 *                           penaltisVisitante:
 *                             type: integer
 *                       vencedor:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           nome:
 *                             type: string
 *                           pontuacao:
 *                             type: integer
 *                           dataInscricao:
 *                             type: string
 *                             format: date-time
 *                           campeonatoId:
 *                             type: integer
 *                       perdedor:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           nome:
 *                             type: string
 *                           pontuacao:
 *                             type: integer
 *                           dataInscricao:
 *                             type: string
 *                             format: date-time
 *                           campeonatoId:
 *                             type: integer
 *                 terceiro_lugar:
 *                   type: object
 *                   properties:
 *                     timeCasa:
 *                       type: string
 *                     timeVisitante:
 *                       type: string
 *                     golsCasa:
 *                       type: integer
 *                     golsVisitante:
 *                       type: integer
 *                     penaltis:
 *                       type: object
 *                       properties:
 *                         penaltisCasa:
 *                           type: integer
 *                         penaltisVisitante:
 *                           type: integer
 *                     vencedor:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         nome:
 *                           type: string
 *                         pontuacao:
 *                           type: integer
 *                         dataInscricao:
 *                           type: string
 *                           format: date-time
 *                         campeonatoId:
 *                           type: integer
 *                     perdedor:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         nome:
 *                           type: string
 *                         pontuacao:
 *                           type: integer
 *                         dataInscricao:
 *                           type: string
 *                           format: date-time
 *                         campeonatoId:
 *                           type: integer
 *                 final:
 *                   type: object
 *                   properties:
 *                     timeCasa:
 *                       type: string
 *                     timeVisitante:
 *                       type: string
 *                     golsCasa:
 *                       type: integer
 *                     golsVisitante:
 *                       type: integer
 *                     penaltis:
 *                       type: object
 *                       properties:
 *                         penaltisCasa:
 *                           type: integer
 *                         penaltisVisitante:
 *                           type: integer
 *                     vencedor:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         nome:
 *                           type: string
 *                         pontuacao:
 *                           type: integer
 *                         dataInscricao:
 *                           type: string
 *                           format: date-time
 *                         campeonatoId:
 *                           type: integer
 *                     perdedor:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         nome:
 *                           type: string
 *                         pontuacao:
 *                           type: integer
 *                         dataInscricao:
 *                           type: string
 *                           format: date-time
 *                         campeonatoId:
 *                           type: integer
 *                 campeao:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     pontuacao:
 *                       type: integer
 *                     dataInscricao:
 *                       type: string
 *                       format: date-time
 *                     campeonatoId:
 *                       type: integer
 *       400:
 *         description: Error starting championship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/campeonatos/start', CampeonatoController.startCampeonato);

/**
 * @swagger
 * /jogos/{campeonatoId}:
 *   get:
 *     summary: Get games by championship ID
 *     parameters:
 *       - in: path
 *         name: campeonatoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Games retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   timeA:
 *                     type: string
 *                   timeB:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Error retrieving games
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/jogos/:campeonatoId', JogosController.getJogos);

export default router;