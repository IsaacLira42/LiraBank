import { Request, Response, NextFunction } from "express";
import { ContaService } from "../services/Conta.Service";
import { ContaCreateInputSchema } from "../types/conta/Conta.Schema";

export class ContaController {
  private contaService: ContaService;

  constructor(contaService: ContaService) {
    this.contaService = contaService;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contaData = ContaCreateInputSchema.parse(req.body);

      const usuarioId = Number(req.user?.id);

      const newConta = await this.contaService.create(usuarioId, contaData);

      return res.status(201).json(newConta);
    } catch (error) {
      next(error);
    }
  };
}
