import { Router } from "express";
import { UsuarioRepository } from "../repositories/Usuario.Repository";
import { UsuarioService } from "../services/Usuario.Service";
import { UsuarioController } from "../controllers/Usuario.Controller";
import { AuthMiddleware } from "../auth/middlewares/AuthMiddleware";

const usuarioRepository: UsuarioRepository = new UsuarioRepository();
const usuarioService: UsuarioService = new UsuarioService(usuarioRepository);
const usuarioController: UsuarioController = new UsuarioController(
  usuarioService
);

const UsuarioRouter = Router();

// UsuarioRouter.get("/", usuarioController.findAll);
UsuarioRouter.get("/:id", AuthMiddleware, usuarioController.findById);
UsuarioRouter.put("/:id", AuthMiddleware, usuarioController.update);

export default UsuarioRouter;
