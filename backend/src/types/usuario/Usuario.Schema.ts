import z from "zod";

const UsuarioCreateSchema = z.object({
  nome: z.string().min(3).max(70),
  cpf: z.string().min(11).max(11),
  email: z.string().email(),
  senha: z.string().min(8).max(30),
});

const UsuarioCreateInputSchema = z.object({
  nome: z.string().min(3).max(70),
  cpf: z.string().min(11).max(11),
  email: z.string().email(),
  senha: z.string().min(8).max(30),
  senhaConfirmacao: z.string().min(8).max(30),
});

const UsuarioUpdateSchema = UsuarioCreateSchema.partial();

const UsuarioResponseSchema = z.object({
  id: z.number().int().positive(),
  nome: z.string().min(3).max(70),
  cpf: z.string().min(11).max(11),
  email: z.string().email(),
});

export {
  UsuarioCreateSchema,
  UsuarioCreateInputSchema,
  UsuarioUpdateSchema,
  UsuarioResponseSchema,
};

