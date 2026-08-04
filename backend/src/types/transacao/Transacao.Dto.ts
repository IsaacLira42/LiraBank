import z from "zod";
import { Prisma } from "../../generated/prisma/client";
import {
  TransacaoCreateInputSchema,
  TransacaoListarQuerySchema,
} from "./Transacao.Schema";

export type TransacaoCreateInputDto = z.infer<typeof TransacaoCreateInputSchema>;

export type TransacaoCreateDto = {
  contaId: number;
  quantia: Prisma.Decimal;
  type: "DEPOSITO" | "SAQUE" | "TRANSFERENCIA";
  descricao?: string | null;
  contaDestinoId?: number | null;
  codigoComprovante?: string;
};

export type TransacaoListarQueryDto = z.infer<typeof TransacaoListarQuerySchema>;

export type TransacaoListarFiltroDto = {
  contaId: number;
  page: number;
  limit: number;
  tipo?: "DEPOSITO" | "SAQUE" | "TRANSFERENCIA";
  dataInicio?: Date;
  dataFim?: Date;
};

export type TransacaoItemExtratoDto = {
  id: number;
  tipo: "DEPOSITO" | "SAQUE" | "TRANSFERENCIA";
  valor: number;
  descricao: string | null;
  data: Date | string;
  codigoComprovante: string;
  contaOrigem: {
    agencia: string;
    numero: string;
  } | null;
  contaDestino: {
    agencia: string;
    numero: string;
  } | null;
  nomeContraparte: string | null;
};

export type TransacaoExtratoDto = {
  items: TransacaoItemExtratoDto[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

