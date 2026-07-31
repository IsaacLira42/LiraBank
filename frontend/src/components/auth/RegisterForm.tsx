import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useRegisterMutation } from "@/hooks/useAuthQueries";
import { registerSchema } from "@/types/RegisterSchema";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
}

export const RegisterForm = ({ onSwitchToLogin, onSuccess }: RegisterFormProps) => {
  const registerMutation = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    senhaConfirmacao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || "Dados inválidos");
      return;
    }

    try {
      await registerMutation.mutateAsync(validation.data);
      onSuccess?.();
      onSwitchToLogin();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Falha ao realizar cadastro";
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
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            name="cpf"
            placeholder="00000000000 (somente números)"
            value={formData.cpf}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            name="senha"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={formData.senha}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="senhaConfirmacao">Confirmação de Senha</Label>
          <Input
            id="senhaConfirmacao"
            name="senhaConfirmacao"
            type="password"
            placeholder="Repita a senha"
            value={formData.senhaConfirmacao}
            onChange={handleChange}
          />
        </div>
      </div>

      <DialogFooter className="w-full">
        <Button type="submit" disabled={registerMutation.isPending} className="w-full">
          {registerMutation.isPending ? "Criando Conta..." : "Criar Conta"}
        </Button>
      </DialogFooter>

      <hr className="my-7" />

      <p>
        Já possui conta?{" "}
        <span
          className="text-limao cursor-pointer underline"
          onClick={onSwitchToLogin}
        >
          faça login
        </span>
      </p>
    </form>
  );
};

