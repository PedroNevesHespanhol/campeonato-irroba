import campeonatoService from '../services/CampeonatoService.js';

class CampeonatoController {
  async criarCampeonato(req, res) {
    try {
      const { nome } = req.body;
      const campeonato = await campeonatoService.criarCampeonato(nome);
      return res.status(201).json(campeonato);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async startCampeonato(req, res) {
    try {
      const { id } = req.body;
      const iniciarCampeonato = await campeonatoService.iniciarCampeonato(id);
      return res.status(200).json(iniciarCampeonato);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new CampeonatoController();