import z from "zod";

const ContaCreateSchema = z.object({
  numero: z.string().min(5).max(20),
  saldo: z.number().min(0).default(0),
  status: z.enum(["ATIVA", "BLOQUEADA"]).default("ATIVA"),
  usuarioId: z.number().positive(),
});

export { ContaCreateSchema };
