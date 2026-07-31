import { randomInt } from "crypto";
import { ContaRepository } from "../repositories/Conta.Repository";
import { AppError } from "../utils/AppError";

export class ContaService {
  private contaRepository: ContaRepository;

  constructor(contaRepository: ContaRepository) {
    this.contaRepository = contaRepository;
  }

  gerarNumeroConta(): string {
    const corpo = randomInt(10000, 99999).toString();
    const digito = randomInt(0, 9).toString();
    return `${corpo}-${digito}`;
  }

  async create(usuarioId: number) {
    const maxTentativas = 5;
    let tentativas = 0;

    // Verifica se o usuário já possui uma conta
    const conta = await this.contaRepository.findByIdUser(usuarioId);
    if (conta) throw new AppError("Usuário já possui uma conta.", 400);

    while (tentativas < maxTentativas) {
      // Gera número de conta no formato de banco digital (ex: 12345-6)
      const numero = this.gerarNumeroConta();

      const contaExistente = await this.contaRepository.findByNumero(numero);

      // Se não existir, cria a conta
      if (!contaExistente) {
        const novaConta = {
          agencia: "0001",
          numero,
          usuarioId,
          status: "ATIVA" as const,
          saldo: 0,
        };

        return await this.contaRepository.create(novaConta);
      }

      tentativas++;
    }

    // Se esgotou todas as tentativas
    throw new AppError(
      "Não foi possível gerar um número de conta único após múltiplas tentativas.",
      500
    );
  }

  async getByUsuarioId(usuarioId: number) {
    const conta = await this.contaRepository.findByIdUser(usuarioId);
    if (!conta) throw new AppError("Conta não encontrada.", 404);
    return conta;
  }

  async updateStatusByUsuarioId(
    usuarioId: number,
    status: "ATIVA" | "BLOQUEADA"
  ) {
    const conta = await this.getByUsuarioId(usuarioId);
    return this.contaRepository.updateStatus(conta.id, status);
  }
}
