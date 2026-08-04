import z from "zod";

const TransacaoCreateInputSchema = z.object({
  quantia: z.number().positive("O valor deve ser maior que zero."),
  type: z.enum(["DEPOSITO", "SAQUE", "TRANSFERENCIA"]).default("DEPOSITO"),
  descricao: z.string().max(100).optional(),
  contaDestinoId: z.number().positive().optional(),
  numeroContaDestino: z.string().optional(),
});

const TransacaoListarQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  tipo: z.enum(["DEPOSITO", "SAQUE", "TRANSFERENCIA"]).optional(),
  dataInicio: z.iso.date().optional(),
  dataFim: z.iso.date().optional(),
});

export { TransacaoCreateInputSchema, TransacaoListarQuerySchema };

