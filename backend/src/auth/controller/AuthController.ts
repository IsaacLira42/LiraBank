import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthServices";
import { inputLoginSchema } from "../../types/auth/Login.Schema";
import { UsuarioController } from "../../controllers/Usuario.Controller";
import { UsuarioService } from "../../services/Usuario.Service";
import { AppError } from "../../utils/AppError";

export class AuthController {
  private authService: AuthService;
  private usuarioService: UsuarioService;

  constructor(authService: AuthService, usuarioService: UsuarioService) {
    this.authService = authService;
    this.usuarioService = usuarioService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataLogin = inputLoginSchema.parse(req.body);

      const token = await this.authService.login(dataLogin);

      return res.status(201).json(token);
    } catch (error) {
      next(error);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.user?.id);

      const usuario = await this.usuarioService.findById(id);

      if (!usuario) throw new AppError("Usuario Inexistente", 400);

      const { cpf, email, ...rest } = usuario;

      return res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
}
