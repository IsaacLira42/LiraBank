import z from "zod";
import { UsuarioCreateSchema, UsuarioCreateInputSchema, UsuarioResponseSchema, UsuarioUpdateSchema } from "./Usuario.Schema";


export type UsuarioCreateDto = z.infer<typeof UsuarioCreateSchema>;
export type UsuarioUpdateDto = z.infer<typeof UsuarioUpdateSchema>;
export type UsuarioResponseDto = z.infer<typeof UsuarioResponseSchema>;
export type UsuarioCreateInputDto = z.infer<typeof UsuarioCreateInputSchema>