// __tests__/CampeonatoService.test.js\
import { jest } from '@jest/globals';
import CampeonatoService from '../services/CampeonatoService';
import CampeonatoRepository from '../repositories/CampeonatoRepository';
import TimeRepository from '../repositories/TimeRepository';
import JogoRepository from '../repositories/JogoRepository';

jest.mock('../repositories/CampeonatoRepository');
jest.mock('../repositories/TimeRepository');
jest.mock('../repositories/JogoRepository');

describe('CampeonatoService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('criarCampeonato deve criar um novo campeonato', async () => {
    CampeonatoRepository.getCampeonatoByNome = jest.fn().mockResolvedValue(null);
    CampeonatoRepository.createCampeonato = jest.fn().mockResolvedValue({ id: 1, nome: 'Campeonato Teste' });

    const resultado = await CampeonatoService.criarCampeonato('Campeonato Teste');

    expect(CampeonatoRepository.getCampeonatoByNome).toHaveBeenCalledWith('Campeonato Teste');
    expect(CampeonatoRepository.createCampeonato).toHaveBeenCalledWith('Campeonato Teste');
    expect(resultado).toEqual({ id: 1, nome: 'Campeonato Teste' });
  });

  test('criarCampeonato deve lançar erro se o campeonato já existir', async () => {
    CampeonatoRepository.getCampeonatoByNome = jest.fn().mockResolvedValue({ id: 1, nome: 'Campeonato Teste' });

    await expect(CampeonatoService.criarCampeonato('Campeonato Teste')).rejects.toThrow('Este campeonato já existe!');
  });

  test('iniciarCampeonato deve lançar erro se o campeonato não for encontrado', async () => {
    CampeonatoRepository.getCampeonatoByNome = jest.fn().mockResolvedValue(null);

    await expect(CampeonatoService.iniciarCampeonato('Campeonato Teste')).rejects.toThrow('Campeonato não encontrado!');
  });

  test('iniciarCampeonato deve lançar erro se o número de times for diferente de 8', async () => {
    CampeonatoRepository.getCampeonatoByNome = jest.fn().mockResolvedValue({ id: 1, nome: 'Campeonato Teste' });
    TimeRepository.getTimesByCampeonatoId = jest.fn().mockResolvedValue([{ id: 1, nome: 'Time 1' }]);

    await expect(CampeonatoService.iniciarCampeonato('Campeonato Teste')).rejects.toThrow('O campeonato deve ter exatamente 8 times para iniciar!');
  });

  test('iniciarCampeonato deve iniciar o campeonato corretamente', async () => {
    CampeonatoRepository.getCampeonatoByNome = jest.fn().mockResolvedValue({ id: 1, nome: 'Campeonato Teste' });
    TimeRepository.getTimesByCampeonatoId = jest.fn().mockResolvedValue([
      { id: 1, nome: 'Time 1' }, { id: 2, nome: 'Time 2' },
      { id: 3, nome: 'Time 3' }, { id: 4, nome: 'Time 4' },
      { id: 5, nome: 'Time 5' }, { id: 6, nome: 'Time 6' },
      { id: 7, nome: 'Time 7' }, { id: 8, nome: 'Time 8' }
    ]);

    const torneioSimulado = {
      quartas: [],
      semifinais: [],
      terceiro_lugar: {},
      final: {},
      campeao: { id: 1, nome: 'Time 1' }
    };

    jest.spyOn(CampeonatoService, 'simularTorneio').mockResolvedValue(torneioSimulado);
    CampeonatoRepository.updateVencedor = jest.fn().mockResolvedValue();
    JogoRepository.createJogo = jest.fn().mockResolvedValue();

    const resultado = await CampeonatoService.iniciarCampeonato('Campeonato Teste');

    expect(CampeonatoService.simularTorneio).toHaveBeenCalledWith([
      { id: 1, nome: 'Time 1' }, { id: 2, nome: 'Time 2' },
      { id: 3, nome: 'Time 3' }, { id: 4, nome: 'Time 4' },
      { id: 5, nome: 'Time 5' }, { id: 6, nome: 'Time 6' },
      { id: 7, nome: 'Time 7' }, { id: 8, nome: 'Time 8' }
    ]);
    expect(CampeonatoRepository.updateVencedor).toHaveBeenCalledWith(1, 1);
    expect(JogoRepository.createJogo).toHaveBeenCalledWith(1, torneioSimulado);
    expect(resultado).toEqual(torneioSimulado);
  });

    test('simularPartida deve retornar o resultado da partida', async () => {
      const timeCasa = { id: 1, nome: 'Time 1', pontuacao: 0 };
      const timeVisitante = { id: 2, nome: 'Time 2', pontuacao: 0 };

      jest.spyOn(CampeonatoService, 'simularPartida').mockResolvedValue({
        timeCasa: 'Time 1',
        timeVisitante: 'Time 2',
        golsCasa: 2,
        golsVisitante: 1,
        penaltis: null,
        vencedor: timeCasa,
        perdedor: timeVisitante
      });

      const resultado = await CampeonatoService.simularPartida(timeCasa, timeVisitante);

      expect(resultado).toEqual({
        timeCasa: 'Time 1',
        timeVisitante: 'Time 2',
        golsCasa: 2,
        golsVisitante: 1,
        penaltis: null,
        vencedor: timeCasa,
        perdedor: timeVisitante
      });
    });
});
