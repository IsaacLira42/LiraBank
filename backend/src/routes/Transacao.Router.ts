import { Router } from "express";
import { AuthMiddleware } from "../auth/middlewares/AuthMiddleware";
import { container } from "../container";

const TransacaoRouter = Router();
const { transacaoController } = container;

TransacaoRouter.get("/", AuthMiddleware, transacaoController.listarExtrato);
TransacaoRouter.get("/me", AuthMiddleware, transacaoController.listMe);
TransacaoRouter.post("/me", AuthMiddleware, transacaoController.createMe);

export default TransacaoRouter;
