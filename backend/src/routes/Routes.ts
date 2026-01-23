import { Router } from "express";
import UsuarioRouter from "./Usuario.Router";
import AuthRouter from "./Auth.Router";

const Routes = Router();

Routes.use("/usuarios", UsuarioRouter);
Routes.use("/auth", AuthRouter);

export default Routes;
