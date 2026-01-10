import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthServices";
import { inputLoginSchema } from "../../types/auth/Login.Schema";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
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
}
