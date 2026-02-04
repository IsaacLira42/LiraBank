import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Conta = {
  id: number;
  numero: string;
  saldo: string | number;
  status: "ATIVA" | "BLOQUEADA";
};

const API_BASE = "http://localhost:3000/api";

function formatMoney(value: string | number) {
  const n = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(n)) return String(value);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ContaModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const token = localStorage.getItem("token");

  const [conta, setConta] = useState<Conta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchConta() {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/contas/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Falha ao carregar conta");

      const data: Conta = await res.json();
      setConta(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar conta");
    } finally {
      setLoading(false);
    }
  }

  async function atualizarStatus(status: "ATIVA" | "BLOQUEADA") {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/contas/me/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg = body?.message
          ? String(body.message)
          : "Falha ao atualizar status";
        throw new Error(msg);
      }

      const updated: Conta = await res.json();
      setConta(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao atualizar status");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open && token) {
      fetchConta();
    }
  }, [open, token]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[var(--color-pistache)]">
        <DialogHeader>
          <DialogTitle className="text-[var(--color-verde-floresta)]">
            Conta
          </DialogTitle>
          <DialogDescription className="text-[var(--color-texto)]">
            Visualize seus dados e ative/bloqueie a conta.
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-[var(--color-verde-floresta)]">{error}</p>}

        {!conta ? (
          <p className="text-[var(--color-texto)]">
            {loading ? "Carregando..." : "Sem dados de conta"}
          </p>
        ) : (
          <div className="grid gap-2 text-[var(--color-texto)]">
            <p>
              <span className="font-semibold text-[var(--color-verde-floresta)]">
                Número:
              </span>{" "}
              {conta.numero}
            </p>
            <p>
              <span className="font-semibold text-[var(--color-verde-floresta)]">
                Saldo:
              </span>{" "}
              {formatMoney(conta.saldo)}
            </p>
            <p>
              <span className="font-semibold text-[var(--color-verde-floresta)]">
                Status:
              </span>{" "}
              {conta.status}
            </p>
          </div>
        )}

        <DialogFooter>
          <div className="flex w-full gap-2">
            <Button
              type="button"
              disabled={loading || !conta || conta.status === "ATIVA"}
              className="flex-1 bg-[var(--color-pistache)] text-[var(--color-verde-floresta)] hover:bg-[var(--color-limao)]"
              onClick={() => atualizarStatus("ATIVA")}
            >
              Ativar
            </Button>
            <Button
              type="button"
              disabled={loading || !conta || conta.status === "BLOQUEADA"}
              className="flex-1 bg-[var(--color-verde-floresta)] text-[var(--color-branco)] hover:bg-[var(--color-verde-floresta)]/90"
              onClick={() => atualizarStatus("BLOQUEADA")}
            >
              Bloquear
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
