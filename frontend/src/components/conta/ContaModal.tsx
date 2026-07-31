import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";

function formatMoney(value: string | number) {
  const n = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(n)) return String(value);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function maskCpf(cpf?: string) {
  if (!cpf) return "";
  const clean = cpf.replace(/\D/g, "");
  if (clean.length !== 11) return cpf;
  return `${clean.slice(0, 3)}.***.***-${clean.slice(9, 11)}`;
}

export function ContaModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { user } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[var(--color-pistache)]">
        <DialogHeader>
          <DialogTitle className="text-[var(--color-verde-floresta)]">
            Perfil do Usuário e Conta
          </DialogTitle>
          <DialogDescription className="text-[var(--color-texto)]">
            Visualize seus dados cadastrais e os detalhes da sua conta bancária.
          </DialogDescription>
        </DialogHeader>

        {!user ? (
          <p className="text-[var(--color-texto)]">Sem dados de perfil</p>
        ) : (
          <div className="grid gap-3 text-[var(--color-texto)]">
            <div className="border-b pb-2">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                Dados Pessoais
              </p>
              <p>
                <span className="font-semibold text-[var(--color-verde-floresta)]">
                  Nome:
                </span>{" "}
                {user.nome}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-verde-floresta)]">
                  CPF:
                </span>{" "}
                {maskCpf(user.cpf)}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-verde-floresta)]">
                  E-mail:
                </span>{" "}
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                Dados da Conta
              </p>
              <p>
                <span className="font-semibold text-[var(--color-verde-floresta)]">
                  Agência:
                </span>{" "}
                {user.conta?.agencia || "0001"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-verde-floresta)]">
                  Número da Conta:
                </span>{" "}
                {user.conta?.numero || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-verde-floresta)]">
                  Saldo Disponível:
                </span>{" "}
                {formatMoney(user.conta?.saldo ?? 0)}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-verde-floresta)]">
                  Status:
                </span>{" "}
                <span
                  className={`font-bold ${
                    user.conta?.status === "ATIVA" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.conta?.status || "N/A"}
                </span>
              </p>
              <p>
                <span className="font-semibold text-[var(--color-verde-floresta)]">
                  Data de Criação:
                </span>{" "}
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-BR") : "N/A"}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


