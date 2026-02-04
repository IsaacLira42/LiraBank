// Repositories
import { UsuarioRepository } from "../repositories/Usuario.Repository";
import { ContaRepository } from "../repositories/Conta.Repository";
import { TransacaoRepository } from "../repositories/Transacao.Repository";

// Services
import { UsuarioService } from "../services/Usuario.Service";
import { ContaService } from "../services/Conta.Service";
import { TransacaoService } from "../services/Transacao.Service";
import { AuthService } from "../auth/services/AuthServices";

// Controllers
import { UsuarioController } from "../controllers/Usuario.Controller";
import { ContaController } from "../controllers/Conta.Controller";
import { TransacaoController } from "../controllers/Transacao.Controller";
import { AuthController } from "../auth/controller/AuthController";

// Repositories
const usuarioRepository = new UsuarioRepository();
const contaRepository = new ContaRepository();
const transacaoRepository = new TransacaoRepository();

// Services
const contaService = new ContaService(contaRepository);
const transacaoService = new TransacaoService(transacaoRepository, contaRepository);
const usuarioService = new UsuarioService(usuarioRepository);
const authService = new AuthService(usuarioRepository);

// Controllers
const usuarioController = new UsuarioController(usuarioService, contaService);
const contaController = new ContaController(contaService);
const transacaoController = new TransacaoController(transacaoService);

const authController = new AuthController(authService, usuarioService);

export const container = {
  usuarioController,
  contaController,
  transacaoController,
  authController,
};
