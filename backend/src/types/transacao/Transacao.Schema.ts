import z from "zod";

const TransacaoCreateInputSchema = z.object({
  quantia: z.number().positive(),
  type: z.enum(["DEPOSITO", "SAQUE", "TRANSFERENCIA"]).default("DEPOSITO"),
  descricao: z.string().max(100).optional(),
  contaDestinoId: z.number().positive().optional(),
});

export { TransacaoCreateInputSchema };

