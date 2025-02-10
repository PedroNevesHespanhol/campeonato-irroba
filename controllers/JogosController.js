import JogosService from '../services/JogosService.js';
class JogosController {
  async getJogos(req, res) {
    try {
    const campeonatoId = parseInt(req.params.campeonatoId, 10);
    const partidas = await JogosService.getJogos(campeonatoId);
    return res.status(201).json(partidas);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  }
}
export default new JogosController();