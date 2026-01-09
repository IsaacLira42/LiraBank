import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

interface AuthDialogProps {
  children: ReactNode;
  initialMode: "login" | "register";
}

export const AuthDialog = ({ children, initialMode }: AuthDialogProps) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  const switchToRegister = () => setMode("register");
  const switchToLogin = () => setMode("login");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="max-w-5xl! p-4!"
      >
        <div className="flex flex-row">
          <div className="w-1/2 mr-4 relative overflow-hidden rounded-2xl">
            <figure className="absolute z-10 p-4">
              <img
                className="w-11 object-contain opacity-85"
                src="/logo_branco_lirabank.png"
                alt="logo do lira bank"
              />
            </figure>
            <div className="relative w-full min-h-155 rounded-2xl bg-pistache/60 flex flex-col justify-between">
              <div>
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-limao rounded-full blur-2xl"></div>
                <div className="absolute -bottom-30 -right-40 lg:-bottom-40 lg:-right-60 w-80 h-80 lg:w-125 lg:h-125 bg-limao rounded-full blur-2xl"></div>
                <div className="absolute -bottom-30 -left-15 w-64 h-64 lg:w-80 lg:h-80 bg-limao rounded-full blur-xl"></div>
              </div>
              <p className="absolute p-4 bottom-0 font-bold text-white">
                Um banco que abraça a modernidade
              </p>
            </div>
          </div>

          <div className="w-1/2 px-4 flex flex-col justify-center ">
            <DialogHeader>
              <figure>
                <img
                  className="w-9 object-contain"
                  src="/logo_verde_limao_lirabank.png"
                  alt="logo do lira bank"
                />
              </figure>
              <DialogTitle className="text-3xl">
                {mode === "login" ? "Login" : "Cadastro"}
              </DialogTitle>
            </DialogHeader>

            {mode === "login" ? (
              <LoginForm onSwitchToRegister={switchToRegister} />
            ) : (
              <RegisterForm onSwitchToLogin={switchToLogin} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
