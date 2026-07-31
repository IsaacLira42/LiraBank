import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { LoginSchema } from "../types/LoginSchema";
import { RegisterSchema } from "../types/RegisterSchema";
import z from "zod";

type LoginInput = z.infer<typeof LoginSchema>;
type RegisterInput = z.infer<typeof RegisterSchema>;

export type ContaInfo = {
  id: number;
  agencia: string;
  numero: string;
  saldo: string | number;
  status: "ATIVA" | "BLOQUEADA";
  createdAt: string;
};

export type UserProfile = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  createdAt: string;
  conta: ContaInfo | null;
};

export function useProfileQuery(enabled: boolean) {
  return useQuery<UserProfile>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await api.get<UserProfile>("/auth/me");
      return response.data;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await api.post<{ token: string }>("/auth/login", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (data: RegisterInput) => {
      const response = await api.post("/auth/register", data);
      return response.data;
    },
  });
}
