import { Router } from "express";
import { UsuarioRepository } from "../repositories/Usuario.Repository";
import { UsuarioService } from "../services/Usuario.Service";
import { UsuarioController } from "../controllers/Usuario.Controller";

const usuarioRepository: UsuarioRepository = new UsuarioRepository();
const usuarioService: UsuarioService = new UsuarioService(usuarioRepository);
const usuarioController: UsuarioController = new UsuarioController(usuarioService);

const UsuarioRouter = Router();

UsuarioRouter.get("/", usuarioController.findAll);
UsuarioRouter.get("/:id", usuarioController.findById);
UsuarioRouter.put("/:id", usuarioController.update)
UsuarioRouter.post("/", usuarioController.create)

export default UsuarioRouter;