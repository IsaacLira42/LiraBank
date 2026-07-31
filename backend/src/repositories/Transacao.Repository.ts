import { prisma } from "../config/prisma";
import { Transacao } from "../generated/prisma/client";
import { TransacaoCreateDto } from "../types/transacao/Transacao.Dto";

export class TransacaoRepository {
  async findByContaId(contaId: number): Promise<any[]> {
    return prisma.transacao.findMany({
      where: {
        OR: [
          { contaId },
          { contaDestinoId: contaId },
        ],
      },
      include: {
        conta: {
          include: {
            usuario: {
              select: { nome: true },
            },
          },
        },
        contaDestino: {
          include: {
            usuario: {
              select: { nome: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: TransacaoCreateDto): Promise<Transacao> {
    return prisma.transacao.create({ data });
  }
}
