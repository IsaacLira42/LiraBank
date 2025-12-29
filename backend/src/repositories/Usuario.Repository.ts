import { prisma } from "../config/prisma";
import { Usuario } from "../generated/prisma/client";
import { UsuarioCreateDto, UsuarioUpdateDto } from "../types/usuario/Usuario.Dto";


export class UsuarioRepository {

    async findAll(): Promise<Usuario[]> {
        return await prisma.usuario.findMany()
    }

    async findById(id: number): Promise<Usuario | null> {
        return await prisma.usuario.findUnique({
            where: {id}
        });
    }

    async create(data: UsuarioCreateDto): Promise<Usuario | null> {
        return await prisma.usuario.create({data});
    }

    async update(id: number, data: UsuarioUpdateDto): Promise<Usuario | null> {
        return await prisma.usuario.update({
            where: {id: id},
            data: data
        });
    }

    // Outros metodos
    async validarCpf(cpf: string): Promise<Usuario | null> {
        const usuario = await prisma.usuario.findUnique({
            where: {
                cpf: cpf
            }
        });

        return usuario;
    }

    async validarEmail(email: string): Promise<Usuario | null> {
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: email
            }
        });

        return usuario;
    }
}