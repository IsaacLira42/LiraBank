import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import type { ContaInfo } from "./useAuthQueries";

export type TransacaoUsuario = {
  id: number;
  codigoComprovante: string;
  quantia: string | number;
  type: "DEPOSITO" | "SAQUE" | "TRANSFERENCIA";
  descricao?: string | null;
  createdAt: string;
  contaId: number;
  contaDestinoId?: number | null;
  conta: {
    id: number;
    agencia: string;
    numero: string;
    usuario: {
      nome: string;
    };
  };
  contaDestino?: {
    id: number;
    agencia: string;
    numero: string;
    usuario: {
      nome: string;
    };
  } | null;
};

// Hook para buscar dados completos da conta
export function useContaQuery() {
  return useQuery<ContaInfo>({
    queryKey: ["conta", "me"],
    queryFn: async () => {
      const response = await api.get<ContaInfo>("/contas/me");
      return response.data;
    },
  });
}

// Hook para buscar o saldo seguro da conta (com verificação de conta ativa)
export function useSaldoQuery() {
  return useQuery<{ saldo: string | number }>({
    queryKey: ["conta", "me", "saldo"],
    queryFn: async () => {
      const response = await api.get<{ saldo: string | number }>("/contas/me/saldo");
      return response.data;
    },
  });
}

// Hook para buscar o extrato de transações
export function useTransactionsQuery() {
  return useQuery<TransacaoUsuario[]>({
    queryKey: ["transacoes", "me"],
    queryFn: async () => {
      const response = await api.get<TransacaoUsuario[]>("/transacoes/me");
      return response.data;
    },
  });
}

// Mutação para depósito
export function useDepositoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { quantia: number; descricao?: string }) => {
      const response = await api.post("/transacoes/me", {
        quantia: data.quantia,
        descricao: data.descricao,
        type: "DEPOSITO",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conta"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
    },
  });
}

// Mutação para saque
export function useSaqueMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { quantia: number; descricao?: string }) => {
      const response = await api.post("/transacoes/me", {
        quantia: data.quantia,
        descricao: data.descricao,
        type: "SAQUE",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conta"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
    },
  });
}

// Mutação para transferência
export function useTransferenciaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      quantia: number;
      numeroContaDestino: string;
      descricao?: string;
    }) => {
      const response = await api.post("/transacoes/me", {
        quantia: data.quantia,
        numeroContaDestino: data.numeroContaDestino,
        descricao: data.descricao,
        type: "TRANSFERENCIA",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conta"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
    },
  });
}
