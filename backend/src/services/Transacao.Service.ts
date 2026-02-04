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

  async createByUsuario(usuarioId: number, quantia: number, type: TipoTransacao) {
    const conta = await this.contaRepository.findByIdUser(usuarioId);
    if (!conta) throw new AppError("Conta não encontrada.", 404);

    if (conta.status !== "ATIVA") {
      throw new AppError("Conta bloqueada. Não é possível criar transações.", 400);
    }

    if (!Number.isFinite(quantia) || quantia <= 0) {
      throw new AppError("Quantia inválida.", 400);
    }

    const decimal = new Prisma.Decimal(quantia);

    const transacao = await this.transacaoRepository.create({
      contaId: conta.id,
      quantia: decimal,
      type,
    });

    await this.contaRepository.incrementSaldo(conta.id, decimal);

    return transacao;
  }
}
