import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";
import { Conta } from "../generated/prisma/client";
import { ContaCreateDto } from "../types/conta/Conta.Dto";

export class ContaRepository {
  async create(data: ContaCreateDto): Promise<Conta> {
    return await prisma.conta.create({ data });
  }

  async findByIdUser(usuarioId: number): Promise<Conta | null> {
    return await prisma.conta.findUnique({
      where: {
        usuarioId: usuarioId,
      },
    });
  }

  async updateStatus(id: number, status: "ATIVA" | "BLOQUEADA"): Promise<Conta> {
    return prisma.conta.update({
      where: { id },
      data: { status },
    });
  }

  async incrementSaldo(id: number, quantia: Prisma.Decimal): Promise<Conta> {
    return prisma.conta.update({
      where: { id },
      data: {
        saldo: {
          increment: quantia,
        },
      },
    });
  }

  async findByNumero(numero: string): Promise<Conta | null> {
    return await prisma.conta.findUnique({ where: { numero } });
  }
}
