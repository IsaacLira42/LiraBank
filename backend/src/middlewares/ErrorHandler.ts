import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    // Erro customizado da aplicação
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    // Erro de validação do Zod
    if (error instanceof ZodError) {
        return res.status(400).json({
            status: "error",
            message: "Erro de validação",
            errors: error.issues.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
        });
    }

    // Log do erro para debug
    console.error("Erro não tratado:", error);

    // Erro genérico
    return res.status(500).json({
        status: "error",
        message: process.env.NODE_ENV === "production"
            ? "Erro interno do servidor"
            : error.message,
    });
};
