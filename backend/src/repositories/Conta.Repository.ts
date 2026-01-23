import { prisma } from "../config/prisma";
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

  async findByNumero(numero: string): Promise<Conta | null> {
    return await prisma.conta.findUnique({ where: { numero } });
  }
}
