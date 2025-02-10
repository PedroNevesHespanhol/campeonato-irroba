import timeService from '../services/TimeService.js';
class TimeController {
  async addTime(req, res) {
    try {
    const { nome, campeonatoId } = req.body;
    const novoTime = await timeService.addTime(nome, campeonatoId);
    return res.status(201).json(novoTime);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  }
}
export default new TimeController();