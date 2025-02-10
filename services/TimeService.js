import timeRepository from '../repositories/TimeRepository.js';

class TimeService {
  async addTime(nome, campeonatoId) {
    const maximoInscritos = await timeRepository.getTimesByCampeonatoId(campeonatoId);
    if (maximoInscritos.length >= 8) {
      throw new Error('O campeonato já atingiu o número máximo de inscritos!');
    }
    const timeExistente = await timeRepository.getTimeByNomeAndCampeonatoId(nome, campeonatoId);
    if (timeExistente) {
      throw new Error('Este time já está cadastrado no campeonato!');
    }
    return await timeRepository.createTime(nome, campeonatoId);
  }
}

export default new TimeService();