import CampeonatoRepository from "../repositories/CampeonatoRepository.js";
import TimeRepository from'../repositories/TimeRepository.js';
import JogoRepository from '../repositories/JogoRepository.js';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

class CampeonatoService {
  async criarCampeonato(nome) {
    const campeonatoExistente = await CampeonatoRepository.getCampeonatoByNome(nome);
    if(campeonatoExistente){
      throw new Error('Este campeonato já existe!');
    }
    const novoCampeonato = await CampeonatoRepository.createCampeonato(nome);    
    return novoCampeonato;
  }

  async iniciarCampeonato(nome) {
    const campeonato = await CampeonatoRepository.getCampeonatoByNome(nome);
    if (!campeonato) throw new Error('Campeonato não encontrado!');

    const times = await TimeRepository.getTimesByCampeonatoId(campeonato.id);
    if (times.length !== 8) throw new Error('O campeonato deve ter exatamente 8 times para iniciar!');

    const torneio = await this.simularTorneio(times);
    await CampeonatoRepository.updateVencedor(campeonato.id, torneio.campeao.id);
    await JogoRepository.createJogo(campeonato.id, torneio);
    return torneio;
  }

  async sortearTimes(times) {
    return times.sort(() => Math.random() - 0.5);
  }

  async simularPartida(timeCasa, timeVisitante) {
    const { stdout, stderr } = await execPromise(`python c:\\Projetos\\campeonato-irroba\\teste.py`);
    if (stderr) throw new Error(`Erro ao simular partida: ${stderr}`);

    const resultado = stdout.trim().split('\n').map(Number);
    const golsCasa = resultado[0];
    const golsVisitante = resultado[1];
    let vencedor, perdedor, penaltis = null;

    if (golsCasa === golsVisitante) {
      // Desempate por penaltis
      const penaltisCasa = Math.floor(Math.random() * 6);
      const penaltisVisitante = Math.floor(Math.random() * 6);
      penaltis = { penaltisCasa, penaltisVisitante };

      if (penaltisCasa > penaltisVisitante) {
        vencedor = timeCasa;
        perdedor = timeVisitante;
      } else {
        vencedor = timeVisitante;
        perdedor = timeCasa;
      }
    } else {
      vencedor = golsCasa > golsVisitante ? timeCasa : timeVisitante;
      perdedor = golsCasa > golsVisitante ? timeVisitante : timeCasa;
    }
    
    // Atualiza a pontuação dos times
    const pontosCasa = Math.max(0, golsCasa - golsVisitante);
    const pontosVisitante = Math.max(0, golsVisitante - golsCasa);
    const novaPontuacaoCasa = Math.max(timeCasa.pontuacao + pontosCasa, 0);
    const novaPontuacaoVisitante = Math.max(timeVisitante.pontuacao + pontosVisitante, 0);

    timeCasa.pontuacao = novaPontuacaoCasa;
    timeVisitante.pontuacao = novaPontuacaoVisitante;

    await TimeRepository.updatePontuacao(timeCasa.id, novaPontuacaoCasa);
    await TimeRepository.updatePontuacao(timeVisitante.id, novaPontuacaoVisitante);

    return {
      timeCasa: timeCasa.nome,
      timeVisitante: timeVisitante.nome,
      golsCasa: golsCasa,
      golsVisitante: golsVisitante,
      penaltis: penaltis,
      vencedor: vencedor,
      perdedor: perdedor
    };
  }

  async simularTorneio(times) {
    let torneio = {
        quartas: [],
        semifinais: [],
        terceiro_lugar: {},
        final: {},
        campeao: {}
    };

    let timesSorteados = await this.sortearTimes(times);
    
    // Quartas de final
    let vencedoresQuartas = [];
    for (let i = 0; i < timesSorteados.length; i += 2) {
        let resultado = await this.simularPartida(timesSorteados[i], timesSorteados[i + 1]);
        torneio.quartas.push(resultado);
        vencedoresQuartas.push(resultado.vencedor);
    }

    // Semifinais
    let vencedoresSemi = [];
    let perdedoresSemi = [];
    for (let i = 0; i < vencedoresQuartas.length; i += 2) {
        let resultado = await this.simularPartida(vencedoresQuartas[i], vencedoresQuartas[i + 1]);
        torneio.semifinais.push(resultado);
        vencedoresSemi.push(resultado.vencedor);
        perdedoresSemi.push(resultado.perdedor);
    }

    // Jogo de terceiro lugar
    torneio.terceiro_lugar = await this.simularPartida(perdedoresSemi[0], perdedoresSemi[1]);

    // Final
    torneio.final = await this.simularPartida(vencedoresSemi[0], vencedoresSemi[1]);
    torneio.campeao = torneio.final.vencedor;

    return torneio;
  }

}
export default new CampeonatoService();
