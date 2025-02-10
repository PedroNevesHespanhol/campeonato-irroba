import jogoRepository from '../repositories/JogoRepository.js';

class JogosService {
  async getJogos(campeonatoId) {
    const partidas = await jogoRepository.findJogosByCampeonatoId(campeonatoId);
    if (!partidas) {
      throw new Error('Não foram encontradas partidas desse campeonato!');
    }
    return partidas;
  }
}

export default new JogosService();