import { registerSchema, type RegisterInput } from "@/types/RegisterSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const AuthPage = ({ mode = "login" }) => {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      senha: "",
      senhaConfirmacao: "",
    },
    mode: "onBlur",
  });
  function onSubmit(data: RegisterInput) {}
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {" "}
      <FieldGroup>
        {" "}
        {/* Nome */}{" "}
        <Controller
          name="nome"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {" "}
              <FieldLabel htmlFor="nome">Nome</FieldLabel>{" "}
              <Input {...field} id="nome" aria-invalid={fieldState.invalid} />{" "}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}{" "}
            </Field>
          )}
        />{" "}
        {/* Cpf */}{" "}
        <Controller
          name="cpf"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {" "}
              <FieldLabel htmlFor="cpf">Cpf</FieldLabel>{" "}
              <Input {...field} id="cpf" aria-invalid={fieldState.invalid} />{" "}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}{" "}
            </Field>
          )}
        />{" "}
        {/* Email */}{" "}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {" "}
              <FieldLabel htmlFor="email">Email</FieldLabel>{" "}
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
              />{" "}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}{" "}
            </Field>
          )}
        />{" "}
        {/* Senha */}{" "}
        <Controller
          name="senha"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {" "}
              <FieldLabel htmlFor="senha">Senha</FieldLabel>{" "}
              <Input
                {...field}
                id="senha"
                type="senha"
                aria-invalid={fieldState.invalid}
              />{" "}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}{" "}
            </Field>
          )}
        />{" "}
        {/* Confirmar senha */}{" "}
        <Controller
          name="senhaConfirmacao"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {" "}
              <FieldLabel htmlFor="senhaConfirmacao">
                {" "}
                Confirmar Senha{" "}
              </FieldLabel>{" "}
              <Input
                {...field}
                id="senhaConfirmacao"
                type="password"
                aria-invalid={fieldState.invalid}
              />{" "}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}{" "}
            </Field>
          )}
        />{" "}
      </FieldGroup>{" "}
      {/* Botões */}{" "}
      <div className="flex gap-2">
        {" "}
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          {" "}
          Reset{" "}
        </Button>{" "}
        <Button type="submit">Cadastrar</Button>{" "}
      </div>{" "}
    </form>
  );
};
export default AuthPage;
