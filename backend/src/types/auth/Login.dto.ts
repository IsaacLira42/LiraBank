import z from "zod";
import { inputLoginSchema } from "./Login.Schema";

export type InputLoginDTO = z.infer<typeof inputLoginSchema>;
