// Repositories
import { UsuarioRepository } from "../repositories/Usuario.Repository";
import { ContaRepository } from "../repositories/Conta.Repository";

// Services
import { UsuarioService } from "../services/Usuario.Service";
import { ContaService } from "../services/Conta.Service";
import { AuthService } from "../auth/services/AuthServices";

// Controllers
import { UsuarioController } from "../controllers/Usuario.Controller";
import { AuthController } from "../auth/controller/AuthController";

// Repositories
const usuarioRepository = new UsuarioRepository();
const contaRepository = new ContaRepository();

// Services
const contaService = new ContaService(contaRepository);
const usuarioService = new UsuarioService(usuarioRepository);
const authService = new AuthService(usuarioRepository);

// Controllers
const usuarioController = new UsuarioController(usuarioService, contaService);

const authController = new AuthController(authService, usuarioService);

export const container = {
  usuarioController,
  authController,
};
