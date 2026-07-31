import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { useState, type FormEvent } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLoginMutation } from "@/hooks/useAuthQueries";
import { loginSchema } from "@/types/LoginSchema";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSuccess?: () => void;
}

export const LoginForm = ({ onSwitchToRegister, onSuccess }: LoginFormProps) => {
  const { login } = useAuth();
  const loginMutation = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    setErrorMessage(null);

    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || "Dados inválidos");
      return;
    }

    try {
      const result = await loginMutation.mutateAsync(validation.data);
      await login(result.token);
      onSuccess?.();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Falha ao realizar login";
      setErrorMessage(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="p-2 mb-2 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
          {errorMessage}
        </div>
      )}
      <div className="mt-4 mb-4 grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            className="rounded-2xl"
            id="email"
            name="email"
            type="email"
            placeholder="Digite o seu email"
            value={formData.email}
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
            value={formData.senha}
            required
            onChange={handleChange}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loginMutation.isPending} className="w-full">
          {loginMutation.isPending ? "Entrando..." : "Entrar"}
        </Button>
      </DialogFooter>

      <hr className="my-7" />

      <p>
        não possui conta?{" "}
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

