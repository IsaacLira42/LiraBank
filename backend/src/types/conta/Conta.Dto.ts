import z from "zod";
import { ContaCreateSchema } from "./Conta.Schema";

export type ContaCreateDto = z.infer<typeof ContaCreateSchema>;
