import { randomBytes } from "crypto";
import { ContaRepository } from "../repositories/Conta.Repository";
import { AppError } from "../utils/AppError";

export class ContaService {
  private contaRepository: ContaRepository;

  constructor(contaRepository: ContaRepository) {
    this.contaRepository = contaRepository;
  }

  async create(usuarioId: number) {
    const maxTentativas = 5;
    let tentativas = 0;

    // Verifica se o usuário já possui uma conta
    const conta = await this.contaRepository.findByIdUser(usuarioId);
    if (conta) throw new AppError("Usuário já possui uma conta.", 400);

    while (tentativas < maxTentativas) {
      // Gera número aleatório
      const numero = randomBytes(10).toString("hex").toUpperCase();

      const contaExistente = await this.contaRepository.findByNumero(numero);

      // Se não existir, cria a conta
      if (!contaExistente) {
        const conta = {
          numero,
          usuarioId,
          status: "ATIVA" as const,
          saldo: 0,
        };

        return await this.contaRepository.create(conta);
      }

      tentativas++;
    }

    // Se esgotou todas as tentativas
    throw new AppError(
      "Não foi possível gerar um número de conta único após múltiplas tentativas.",
      500
    );
  }
}
