import { Request, Response, NextFunction } from "express";
import { ContaService } from "../services/Conta.Service";
import { ContaUpdateStatusSchema } from "../types/conta/Conta.Schema";

export class ContaController {
  private contaService: ContaService;

  constructor(contaService: ContaService) {
    this.contaService = contaService;
  }

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuarioId = Number(req.user?.id);
      const conta = await this.contaService.getByUsuarioId(usuarioId);
      return res.status(200).json(conta);
    } catch (error) {
      next(error);
    }
  };

  updateStatusMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuarioId = Number(req.user?.id);
      const data = ContaUpdateStatusSchema.parse(req.body);
      const conta = await this.contaService.updateStatusByUsuarioId(
        usuarioId,
        data.status
      );
      return res.status(200).json(conta);
    } catch (error) {
      next(error);
    }
  };

  getSaldoMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuarioId = Number(req.user?.id);
      const conta = await this.contaService.getSaldoByUsuarioId(usuarioId);
      return res.status(200).json({ saldo: conta.saldo });
    } catch (error) {
      next(error);
    }
  };
}
