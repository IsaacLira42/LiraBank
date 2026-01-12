import { Router } from "express";
import { UsuarioRepository } from "../repositories/Usuario.Repository";
import { UsuarioService } from "../services/Usuario.Service";
import { UsuarioController } from "../controllers/Usuario.Controller";
import { AuthMiddleware } from "../auth/middlewares/AuthMiddleware";
import { ContaRepository } from "../repositories/Conta.Repository";
import { ContaService } from "../services/Conta.Service";

const contaRepository: ContaRepository = new ContaRepository();
const contaService: ContaService = new ContaService(contaRepository);

const usuarioRepository: UsuarioRepository = new UsuarioRepository();
const usuarioService: UsuarioService = new UsuarioService(usuarioRepository);
const usuarioController: UsuarioController = new UsuarioController(
  usuarioService,
  contaService
);

const UsuarioRouter = Router();

UsuarioRouter.get("/:id", AuthMiddleware, usuarioController.findById);
UsuarioRouter.put("/:id", AuthMiddleware, usuarioController.update);

export default UsuarioRouter;
