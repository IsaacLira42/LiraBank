import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";
import { ContaRepository } from "../repositories/Conta.Repository";
import { TransacaoRepository } from "../repositories/Transacao.Repository";
import { AppError } from "../utils/AppError";
import { TipoTransacao } from "../generated/prisma/client";

export class TransacaoService {
  private transacaoRepository: TransacaoRepository;
  private contaRepository: ContaRepository;

  constructor(
    transacaoRepository: TransacaoRepository,
    contaRepository: ContaRepository
  ) {
    this.transacaoRepository = transacaoRepository;
    this.contaRepository = contaRepository;
  }

  async listByUsuario(usuarioId: number) {
    const conta = await this.contaRepository.findByIdUser(usuarioId);
    if (!conta) throw new AppError("Conta não encontrada.", 404);

    return this.transacaoRepository.findByContaId(conta.id);
  }

  async createByUsuario(
    usuarioId: number,
    data: {
      quantia: number;
      type: TipoTransacao;
      descricao?: string;
      contaDestinoId?: number;
      numeroContaDestino?: string;
    }
  ) {
    const { quantia, type, descricao, contaDestinoId, numeroContaDestino } = data;

    if (!Number.isFinite(quantia) || quantia <= 0) {
      throw new AppError("O valor da operação deve ser maior que zero.", 400);
    }

    const decimal = new Prisma.Decimal(quantia);

    return await prisma.$transaction(async (tx) => {
      // 1. Obter a conta de origem e validar
      const contaOrigem = await tx.conta.findUnique({
        where: { usuarioId },
      });

      if (!contaOrigem) {
        throw new AppError("Conta de origem não encontrada.", 404);
      }

      if (contaOrigem.status !== "ATIVA") {
        throw new AppError("Sua conta está bloqueada. Operação não permitida.", 400);
      }

      // 2. Executar operações conforme o tipo
      if (type === "DEPOSITO") {
        // Incrementa saldo da conta de origem
        await tx.conta.update({
          where: { id: contaOrigem.id },
          data: {
            saldo: { increment: decimal },
          },
        });

        // Registra transação
        const transacao = await tx.transacao.create({
          data: {
            contaId: contaOrigem.id,
            quantia: decimal,
            type: "DEPOSITO",
            descricao: descricao || "Depósito em conta",
          },
        });

        return transacao;
      }

      if (type === "SAQUE") {
        // Valida saldo suficiente
        const saldoAtual = new Prisma.Decimal(contaOrigem.saldo);
        if (saldoAtual.lessThan(decimal)) {
          throw new AppError("Saldo insuficiente para realizar o saque.", 400);
        }

        // Decrementa saldo
        await tx.conta.update({
          where: { id: contaOrigem.id },
          data: {
            saldo: { decrement: decimal },
          },
        });

        // Registra transação
        const transacao = await tx.transacao.create({
          data: {
            contaId: contaOrigem.id,
            quantia: decimal,
            type: "SAQUE",
            descricao: descricao || "Saque realizado",
          },
        });

        return transacao;
      }

      if (type === "TRANSFERENCIA") {
        // Resolve conta de destino
        let contaDestino = null;

        if (contaDestinoId) {
          contaDestino = await tx.conta.findUnique({
            where: { id: contaDestinoId },
          });
        } else if (numeroContaDestino) {
          contaDestino = await tx.conta.findUnique({
            where: { numero: numeroContaDestino },
          });
        }

        if (!contaDestino) {
          throw new AppError("Conta de destino não encontrada.", 404);
        }

        if (contaDestino.status !== "ATIVA") {
          throw new AppError("A conta de destino está bloqueada ou inativa.", 400);
        }

        if (contaOrigem.id === contaDestino.id) {
          throw new AppError("Não é permitido realizar transferências para a própria conta.", 400);
        }

        // Valida saldo suficiente
        const saldoAtual = new Prisma.Decimal(contaOrigem.saldo);
        if (saldoAtual.lessThan(decimal)) {
          throw new AppError("Saldo insuficiente para realizar a transferência.", 400);
        }

        // Decrementa origem
        await tx.conta.update({
          where: { id: contaOrigem.id },
          data: {
            saldo: { decrement: decimal },
          },
        });

        // Incrementa destino
        await tx.conta.update({
          where: { id: contaDestino.id },
          data: {
            saldo: { increment: decimal },
          },
        });

        // Registra transação
        const transacao = await tx.transacao.create({
          data: {
            contaId: contaOrigem.id,
            contaDestinoId: contaDestino.id,
            quantia: decimal,
            type: "TRANSFERENCIA",
            descricao: descricao || "Transferência enviada",
          },
        });

        return transacao;
      }

      throw new AppError("Tipo de transação inválido.", 400);
    });
  }
}
