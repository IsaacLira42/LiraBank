import { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../services/Usuario.Service";
import { UsuarioCreateInputSchema, UsuarioUpdateSchema } from "../types/usuario/Usuario.Schema";
import { number } from "zod";


export class UsuarioController {
    private usuarioService: UsuarioService;

    constructor(usuarioService: UsuarioService) {
        this.usuarioService = usuarioService;
    }

    findAll = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarios = await this.usuarioService.findAll();
            
            return res.status(200).json(usuarios);
        } catch (error) {
            next(error);
        }
    }

    findById = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const id: number = Number(req.params);
            const usuario = await this.usuarioService.findById(id);

            return res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    update = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params);
            const data = UsuarioUpdateSchema.parse(req.body);

            const usuario = await this.usuarioService.update(id, data);

            return res.status(200).json(usuario)
        } catch (error) {
            next(error)
        }
    }

    create = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const data = UsuarioCreateInputSchema.parse(req.body);

            const usuario = await this.usuarioService.create(data);

            return res.status(201).json(usuario);
        } catch(error) {
            next(error);
        }
    }
}