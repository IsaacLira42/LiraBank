import { prisma } from "../config/prisma";
import { Transacao } from "../generated/prisma/client";
import { TransacaoCreateDto } from "../types/transacao/Transacao.Dto";

export class TransacaoRepository {
  async findByContaId(contaId: number): Promise<Transacao[]> {
    return prisma.transacao.findMany({
      where: { contaId },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: TransacaoCreateDto): Promise<Transacao> {
    return prisma.transacao.create({ data });
  }
}
