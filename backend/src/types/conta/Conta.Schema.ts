import z from "zod";

const ContaCreateSchema = z.object({
  agencia: z.string().default("0001"),
  numero: z.string().min(5).max(20),
  saldo: z.number().min(0).default(0),
  status: z.enum(["ATIVA", "BLOQUEADA"]).default("ATIVA"),
  usuarioId: z.number().positive(),
});

const ContaUpdateStatusSchema = z.object({
  status: z.enum(["ATIVA", "BLOQUEADA"]),
});

export { ContaCreateSchema, ContaUpdateStatusSchema };

