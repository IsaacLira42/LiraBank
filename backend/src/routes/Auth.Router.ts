import { Router } from "express";
import { UsuarioRepository } from "../repositories/Usuario.Repository";
import { UsuarioService } from "../services/Usuario.Service";
import { UsuarioController } from "../controllers/Usuario.Controller";

const usuarioRepository: UsuarioRepository = new UsuarioRepository();
const usuarioService: UsuarioService = new UsuarioService(usuarioRepository);
const usuarioController: UsuarioController = new UsuarioController(
  usuarioService
);

const AuthRouter = Router();

// Rota para registro de novos usuários
AuthRouter.post("/register", usuarioController.create);

export default AuthRouter;
