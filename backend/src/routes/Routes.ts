import { Router } from "express";
import UsuarioRouter from "./Usuario.Router";

const Routes = Router();

Routes.use("/usuarios", UsuarioRouter)


export default Routes;