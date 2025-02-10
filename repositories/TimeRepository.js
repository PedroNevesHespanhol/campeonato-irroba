import { PrismaClient }  from '@prisma/client';
const prisma = new PrismaClient();

class TimeRepository {
  async createTime(nome, campeonatoId) {
    return await prisma.time.create({
      data: {
        nome,
        campeonatoId
      }
    });
  }

  async updatePontuacao(id, pontuacao) {

    await prisma.time.update({
      where: { id },
      data: {
        pontuacao: pontuacao
      }
    });
  }

  async getTimeByNomeAndCampeonatoId(nome, campeonatoId) {
    return await prisma.time.findFirst({
      where: {
        nome: {
          equals: nome
        },
        campeonatoId: {
          equals: campeonatoId
        }
      }
    });
  }

  async getTimesByCampeonatoId(campeonatoId) {
    return await prisma.time.findMany({
      where: {
        campeonatoId: {
          equals: campeonatoId
        }
      }
    });
  }

  async getTimeById(id) {
    return await prisma.time.findUnique({ where: { id } });
  }
  async getAllTimes() {
    return await prisma.time.findMany();
  }
}

export default new TimeRepository();