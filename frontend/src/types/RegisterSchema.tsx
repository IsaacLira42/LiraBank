import * as z from "zod";

export const registerSchema = z
  .object({
    nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres").max(70),
    cpf: z.string().length(11, "O CPF deve ter 11 caracteres"),
    email: z.email("Email inválido").min(1, "O email é obrigatório"),
    senha: z.string().min(8, "A senha deve ter no mínimo 8 caracteres").max(30),
    senhaConfirmacao: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(30),
  })
  .refine((data) => data.senha === data.senhaConfirmacao, {
    message: "As senhas não coincidem",
    path: ["senhaConfirmacao"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
