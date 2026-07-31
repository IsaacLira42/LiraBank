import z from "zod";

const TransacaoCreateInputSchema = z.object({
  quantia: z.number().positive("O valor deve ser maior que zero."),
  type: z.enum(["DEPOSITO", "SAQUE", "TRANSFERENCIA"]).default("DEPOSITO"),
  descricao: z.string().max(100).optional(),
  contaDestinoId: z.number().positive().optional(),
  numeroContaDestino: z.string().optional(),
});

export { TransacaoCreateInputSchema };

