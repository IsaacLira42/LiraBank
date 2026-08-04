import { Request, Response, NextFunction } from "express";
import { TransacaoService } from "../services/Transacao.Service";
import {
  TransacaoCreateInputSchema,
  TransacaoListarQuerySchema,
} from "../types/transacao/Transacao.Schema";

export class TransacaoController {
  private transacaoService: TransacaoService;

  constructor(transacaoService: TransacaoService) {
    this.transacaoService = transacaoService;
  }

  listarExtrato = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuarioId = Number(req.user?.id);
      const query = TransacaoListarQuerySchema.parse(req.query);

      const extrato = await this.transacaoService.listarExtrato(usuarioId, query);

      return res.status(200).json({
        success: true,
        data: extrato,
      });
    } catch (error) {
      next(error);
    }
  };

  listMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuarioId = Number(req.user?.id);
      const transacoes = await this.transacaoService.listByUsuario(usuarioId);
      return res.status(200).json(transacoes);
    } catch (error) {
      next(error);
    }
  };

  createMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuarioId = Number(req.user?.id);
      const data = TransacaoCreateInputSchema.parse(req.body);

      const transacao = await this.transacaoService.createByUsuario(
        usuarioId,
        data
      );

      return res.status(201).json(transacao);
    } catch (error) {
      next(error);
    }
  };
}
