import id from "zod/v4/locales/id.js";
import { UsuarioRepository } from "../../repositories/Usuario.Repository";
import { InputLoginDTO } from "../../types/auth/Login.dto";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  private usuarioRepository: UsuarioRepository;

  constructor(usuarioRepository: UsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  login = async (data: InputLoginDTO): Promise<{ token: string }> => {
    const { email, senha } = data;

    const usuario = await this.usuarioRepository.validarEmail(email);
    if (!usuario) throw new AppError("Email ou senha inválidos", 401);

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);
    if (!senhaVerificada) throw new AppError("Email ou senha inválidos", 401);

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new AppError("JWT Secret não configurada", 500);

    const token = jwt.sign(
      {
        id: usuario.id,
      },
      secret,
      {
        algorithm: "HS256",
        expiresIn: "8h",
        issuer: "api-auth",
      }
    );

    return { token };
  };
}
