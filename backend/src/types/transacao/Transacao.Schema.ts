import z from "zod";

const TransacaoCreateInputSchema = z.object({
  quantia: z.number().positive(),
  type: z.enum(["DEPOSITO", "SAQUE", "TRANSFERENCIA"]).default("DEPOSITO"),
});

export { TransacaoCreateInputSchema };
