import { Router } from "express";
import { AuthMiddleware } from "../auth/middlewares/AuthMiddleware";
import { container } from "../container";

const AuthRouter = Router();
const { authController, usuarioController } = container;

AuthRouter.post("/register", usuarioController.create);
AuthRouter.post("/login", authController.login);
AuthRouter.get("/me", AuthMiddleware, authController.me);

export default AuthRouter;
