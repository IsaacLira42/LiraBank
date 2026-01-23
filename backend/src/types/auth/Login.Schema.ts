import z from "zod";

export const inputLoginSchema = z.object({
  email: z.email(),
  senha: z.string().min(8).max(30),
});
