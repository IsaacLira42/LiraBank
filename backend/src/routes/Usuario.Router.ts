import { Router } from "express";
import { AuthMiddleware } from "../auth/middlewares/AuthMiddleware";
import { container } from "../container";

const UsuarioRouter = Router();
const { usuarioController } = container;

UsuarioRouter.get("/:id", AuthMiddleware, usuarioController.findById);
UsuarioRouter.put("/:id", AuthMiddleware, usuarioController.update);

export default UsuarioRouter;
