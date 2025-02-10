import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class JogoRepository {
  async createJogo(campeonatoId, torneio) {
    return await prisma.jogo.create({
      data: { 
        campeonatoId, 
        partidas: torneio 
      },
    });
  }
  async findJogosByCampeonatoId(campeonatoId) {
    return await prisma.jogo.findFirst({
      where: {
        campeonatoId: {
          equals: campeonatoId
        }
      }
    });
  }
}

export default new JogoRepository();