import { prisma } from "../config/prisma";
import { Prisma, Transacao } from "../generated/prisma/client";
import { TransacaoCreateDto } from "../types/transacao/Transacao.Dto";
import { TransacaoListarFiltroDto } from "../types/transacao/Transacao.Dto";

const transacaoComContas = {
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
} satisfies Prisma.TransacaoInclude;

type TransacaoComContas = Prisma.TransacaoGetPayload<{
  include: typeof transacaoComContas;
}>;

export class TransacaoRepository {
  async findByContaId(contaId: number): Promise<any[]> {
    return prisma.transacao.findMany({
      where: {
        OR: [
          { contaId },
          { contaDestinoId: contaId },
        ],
      },
      include: transacaoComContas,
      orderBy: { createdAt: "desc" },
    });
  }

  async findByContaIdPaginado(
    filtro: TransacaoListarFiltroDto
  ): Promise<{ items: TransacaoComContas[]; totalItems: number }> {
    const { contaId, page, limit, tipo, dataInicio, dataFim } = filtro;

    const where: Prisma.TransacaoWhereInput = {
      OR: [
        { contaId },
        { contaDestinoId: contaId },
      ],
    };

    if (tipo) {
      where.type = tipo;
    }

    if (dataInicio || dataFim) {
      where.createdAt = {
        ...(dataInicio && { gte: dataInicio }),
        ...(dataFim && { lte: dataFim }),
      };
    }

    const [items, totalItems] = await prisma.$transaction([
      prisma.transacao.findMany({
        where,
        include: transacaoComContas,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.transacao.count({ where }),
    ]);

    return { items, totalItems };
  }

  async create(data: TransacaoCreateDto): Promise<Transacao> {
    return prisma.transacao.create({ data });
  }
}
