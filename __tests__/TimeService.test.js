import { jest } from '@jest/globals';
import TimeService from '../services/TimeService.js';
import timeRepository from '../repositories/TimeRepository.js';

jest.mock('../repositories/TimeRepository.js');

describe('TimeService', () => {
  describe('addTime', () => {
    it('should throw an error if the championship has reached the maximum number of teams', async () => {
      timeRepository.getTimesByCampeonatoId = jest.fn().mockResolvedValue(new Array(8));
      
      await expect(TimeService.addTime('Team A', 1)).rejects.toThrow('O campeonato já atingiu o número máximo de inscritos!');
    });

    it('should throw an error if the team is already registered in the championship', async () => {
      timeRepository.getTimesByCampeonatoId = jest.fn().mockResolvedValue(new Array(7));
      timeRepository.getTimeByNomeAndCampeonatoId= jest.fn().mockResolvedValue({ nome: 'Team A' });
      
      await expect(TimeService.addTime('Team A', 1)).rejects.toThrow('Este time já está cadastrado no campeonato!');
    });

    it('should create a new team if the championship has not reached the maximum number of teams and the team is not already registered', async () => {
      timeRepository.getTimesByCampeonatoId = jest.fn().mockResolvedValue(new Array(7));
      timeRepository.getTimeByNomeAndCampeonatoId = jest.fn().mockResolvedValue(null);
      timeRepository.createTime = jest.fn().mockResolvedValue({ id: 1, nome: 'Team A', campeonatoId: 1 });

      const result = await TimeService.addTime('Team A', 1);

      expect(result).toEqual({ id: 1, nome: 'Team A', campeonatoId: 1 });
      expect(timeRepository.createTime).toHaveBeenCalledWith('Team A', 1);
    });
  });
});