import { Router } from "express";
import { AuthMiddleware } from "../auth/middlewares/AuthMiddleware";
import { container } from "../container";

const ContaRouter = Router();
const { contaController } = container;

ContaRouter.get("/me", AuthMiddleware, contaController.me);
ContaRouter.get("/me/saldo", AuthMiddleware, contaController.getSaldoMe);
ContaRouter.put("/me/status", AuthMiddleware, contaController.updateStatusMe);

export default ContaRouter;
