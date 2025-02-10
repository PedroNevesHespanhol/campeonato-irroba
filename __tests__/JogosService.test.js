import { jest } from '@jest/globals';
import JogosService from '../services/JogosService.js';
import jogoRepository from '../repositories/JogoRepository.js';

jest.mock('../repositories/JogoRepository.js');

describe('JogosService', () => {
  describe('getJogos', () => {
    it('should return partidas when campeonatoId is valid', async () => {
      const campeonatoId = 1;
      const partidas = [{ id: 1, name: 'Partida 1' }];
      jogoRepository.findJogosByCampeonatoId = jest.fn().mockResolvedValue(partidas);

      const result = await JogosService.getJogos(campeonatoId);

      expect(result).toEqual(partidas);
      expect(jogoRepository.findJogosByCampeonatoId).toHaveBeenCalledWith(campeonatoId);
    });

    it('should throw an error when no partidas are found', async () => {
      const campeonatoId = 1;
      jogoRepository.findJogosByCampeonatoId = jest.fn().mockResolvedValue(null);

      await expect(JogosService.getJogos(campeonatoId)).rejects.toThrow('Não foram encontradas partidas desse campeonato!');
      expect(jogoRepository.findJogosByCampeonatoId).toHaveBeenCalledWith(campeonatoId);
    });
  });
});