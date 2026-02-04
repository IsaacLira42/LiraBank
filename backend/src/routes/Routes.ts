import { Router } from "express";
import UsuarioRouter from "./Usuario.Router";
import AuthRouter from "./Auth.Router";
import ContaRouter from "./Conta.Router";
import TransacaoRouter from "./Transacao.Router";

const Routes = Router();

Routes.use("/usuarios", UsuarioRouter);
Routes.use("/auth", AuthRouter);
Routes.use("/contas", ContaRouter);
Routes.use("/transacoes", TransacaoRouter);

export default Routes;
