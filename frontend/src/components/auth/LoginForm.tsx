import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { useState, type FormEvent } from "react";
import { Button } from "../ui/button";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export interface payloadLogin {
  email: string;
  senha: string;
}

interface loginResult {
  token: string;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: payloadLogin = {
      email: formData.email,
      senha: formData.senha,
    };

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result: loginResult = await response.json();

    if (!response.ok) {
      alert("Erro: Falha no login");
      return;
    }

    localStorage.setItem("token", result.token);
    console.log(result.token);

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-8 mb-4 grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            className="rounded-2xl"
            id="email"
            name="email"
            placeholder="Digite o seu email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="senha">Senha</Label>
          <Input
            className="rounded-2xl"
            type="password"
            id="senha"
            name="senha"
            placeholder="Digite a sua senha"
            required
            onChange={handleChange}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </DialogFooter>

      <hr className="my-7" />

      <p>
        não possue conta?{" "}
        <span
          className="text-limao cursor-pointer underline"
          onClick={onSwitchToRegister}
        >
          cadastre-se
        </span>
      </p>
    </form>
  );
};
