import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
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

    if (formData.senha !== formData.senhaConfirmacao) {
      alert("As senhas não coincidem.");
      return;
    }

    const payload = {
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
      senha: formData.senha,
      senhaConfirmacao: formData.senhaConfirmacao,
    };

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(`Erro: ${result.message || "Falha no cadastro"}`);
      return;
    }

    alert(result.message);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-8 mb-4 grid gap-4">
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
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
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
            placeholder="Mínimo 6 caracteres"
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
        <Button type="submit" className="w-full">
          Criar Conta
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
