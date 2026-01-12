import { Router } from "express";
import { UsuarioRepository } from "../repositories/Usuario.Repository";
import { UsuarioService } from "../services/Usuario.Service";
import { UsuarioController } from "../controllers/Usuario.Controller";
import { AuthService } from "../auth/services/AuthServices";
import { AuthController } from "../auth/controller/AuthController";
import { AuthMiddleware } from "../auth/middlewares/AuthMiddleware";
import { ContaService } from "../services/Conta.Service";
import { ContaRepository } from "../repositories/Conta.Repository";

const usuarioRepository: UsuarioRepository = new UsuarioRepository();

const usuarioService: UsuarioService = new UsuarioService(usuarioRepository);
const contaService: ContaService = new ContaService(new ContaRepository());
const usuarioController: UsuarioController = new UsuarioController(
  usuarioService,
  contaService
);
const authService: AuthService = new AuthService(usuarioRepository);
const authController: AuthController = new AuthController(
  authService,
  usuarioService
);

const AuthRouter = Router();

// Rota para registro de novos usuários
AuthRouter.post("/register", usuarioController.create);
AuthRouter.post("/login", authController.login);
AuthRouter.get("/me", AuthMiddleware, authController.me);

export default AuthRouter;
