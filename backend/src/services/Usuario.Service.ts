import { UsuarioRepository } from "../repositories/Usuario.Repository";
import {
  UsuarioResponseDto,
  UsuarioCreateInputDto,
  UsuarioCreateDto,
  UsuarioUpdateDto,
} from "../types/usuario/Usuario.Dto";
import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError";
import { Usuario } from "../generated/prisma/client";

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  constructor(usuarioRepository: UsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async findAll(): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.usuarioRepository.findAll();
    return this.mapUsuarios(usuarios);
  }

  async findById(id: number): Promise<UsuarioResponseDto | null> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) return null;

    return this.mapUsuario(usuario);
  }

  async getProfile(id: number) {
    const usuario = await this.usuarioRepository.findByIdWithConta(id);
    if (!usuario) throw new AppError("Usuário não encontrado.", 404);

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      createdAt: usuario.createdAt,
      conta: usuario.conta
        ? {
            id: usuario.conta.id,
            agencia: usuario.conta.agencia,
            numero: usuario.conta.numero,
            saldo: usuario.conta.saldo,
            status: usuario.conta.status,
            createdAt: usuario.conta.createdAt,
          }
        : null,
    };
  }

  async update(
    id: number,
    data: UsuarioUpdateDto
  ): Promise<UsuarioResponseDto | null> {
    const usuarioAtualizado = await this.usuarioRepository.update(id, data);
    if (!usuarioAtualizado) return null;

    return this.mapUsuario(usuarioAtualizado);
  }

  async create(data: UsuarioCreateInputDto): Promise<UsuarioResponseDto> {
    const usuarioCPF = await this.usuarioRepository.validarCpf(data.cpf);
    if (usuarioCPF) {
      throw new AppError("Já existe um usuário com esse CPF", 400);
    }

    const usuarioEmail = await this.usuarioRepository.validarEmail(data.email);
    if (usuarioEmail) {
      throw new AppError("Já existe um usuário com esse email", 400);
    }

    const { senha, senhaConfirmacao, ...resto } = data;

    if (senha !== senhaConfirmacao) {
      throw new AppError(
        "A senha e a confirmação de senha são diferentes",
        400
      );
    }

    const hashedSenha = await bcrypt.hash(senha, 12);

    const usuarioData: UsuarioCreateDto = {
      ...resto,
      senha: hashedSenha,
    };

    const usuarioCriado = await this.usuarioRepository.create(usuarioData);

    return this.mapUsuario(usuarioCriado);
  }

  // ========================
  // MAPPERS (PRIVADOS)
  // ========================

  private mapUsuario(usuario: Usuario): UsuarioResponseDto {
    const { senha, ...resto } = usuario;
    return resto;
  }

  private mapUsuarios(usuarios: Usuario[]): UsuarioResponseDto[] {
    return usuarios.map((usuario) => this.mapUsuario(usuario));
  }
}
