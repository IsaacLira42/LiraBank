import z from "zod";
import { Prisma } from "../../generated/prisma/client";
import { TransacaoCreateInputSchema } from "./Transacao.Schema";

export type TransacaoCreateInputDto = z.infer<typeof TransacaoCreateInputSchema>;

export type TransacaoCreateDto = {
  contaId: number;
  quantia: Prisma.Decimal;
  type: "DEPOSITO" | "SAQUE" | "TRANSFERENCIA";
};
