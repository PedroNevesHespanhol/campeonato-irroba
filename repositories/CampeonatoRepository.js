import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CampeonatoRepository {
  async createCampeonato(nome) {
    return await prisma.campeonato.create({ data: { nome } });
  }

  async getCampeonatoByNome(nome) {
    return await prisma.campeonato.findFirst({
      where: {
        nome: {
          equals: nome,
          mode: 'insensitive'
        }
      }
    });
  }

  async updateVencedor(id, vencedor) {
    return await prisma.campeonato.update({
      where: { id },
      data: { vencedorId: vencedor }
    });
  }

  async getAllCampeonatos() {
    return await prisma.campeonato.findMany();
  }
}

export default new CampeonatoRepository();