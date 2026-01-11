import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
}

// Estende a interface Request do Express para adicionar a propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("Token de autenticação não fornecido.", 401));
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return next(
        new AppError("Configuração interna do servidor incompleta.", 500)
      );
    }

    const payload = jwt.verify(token, secret) as JwtPayload;
    req.user = { id: payload.id };

    return next();
  } catch (error) {
    return next(new AppError("Token inválido ou expirado.", 401));
  }
};
