import { UsuarioRepository } from "../repositories/Usuario.Repository"
import { UsuarioResponseDto, UsuarioCreateInputDto, UsuarioCreateDto, UsuarioUpdateDto } from "../types/usuario/Usuario.Dto";
import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError";
import { Usuario } from "../generated/prisma/client";

export class UsuarioService {

    private usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository: UsuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    async findAll(): Promise<UsuarioResponseDto[]> {       
        return await this.usuarioRepository.findAll();
    }

    async findById(id: number): Promise<UsuarioResponseDto | null> {
        return await this.usuarioRepository.findById(id);
    }

    async update(id: number, data: UsuarioUpdateDto): Promise<UsuarioResponseDto | null> {
        const usuarioAtualizado = this.prepararResponseUsuario(await this.usuarioRepository.update(id, data));
        return usuarioAtualizado;
    }

    async create(data: UsuarioCreateInputDto): Promise<UsuarioResponseDto | null> {
        // Verificar se o cpf ja foi cadastrado
        let usuarioCPF = await this.usuarioRepository.validarCpf(data.cpf);
        if (usuarioCPF) {
            throw new AppError("Ja existe um usurio com esse cpf", 400);
        }

        // Verificar se o email ja foi cadastrado
        const usuarioEmail = await this.usuarioRepository.validarEmail(data.email);
        if (usuarioEmail) {
            throw new AppError("Ja existe um usuario com esse email", 400);
        }

        const {senha, senhaConfirmacao, ...resto} = data;

        if (senha !== senhaConfirmacao) {
            throw new AppError("A senha e a senha de confirmação são diferentes");
        }

        const hashedSenha = await bcrypt.hash(senha, 12);

        const usuarioData: UsuarioCreateDto = { ...resto, senha: hashedSenha};

        const usuarioCriado = this.prepararResponseUsuario(await this.usuarioRepository.create(usuarioData));
        
        return usuarioCriado;
    }

    // Outros metodos
    prepararResponseUsuario = (data: Usuario | null): UsuarioResponseDto | null => {
        if (!data) return null;

        const {senha, ...resto} = data;
        return resto;
    }
}