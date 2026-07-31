import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthServices";
import { inputLoginSchema } from "../../types/auth/Login.Schema";
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

      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.user?.id);

      if (!id || Number.isNaN(id)) {
        throw new AppError("ID de usuário inválido", 400);
      }

      const profile = await this.usuarioService.getProfile(id);

      return res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  };
}
