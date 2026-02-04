import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Transacao = {
  id: number;
  quantia: string | number;
  type: "DEPOSITO" | "SAQUE" | "TRANSFERENCIA";
  createdAt: string;
};

const API_BASE = "http://localhost:3000/api";

function formatMoney(value: string | number) {
  const n = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(n)) return String(value);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Dashboard() {
  const { isAuthenticated, isChecking } = useAuth();

  const token = localStorage.getItem("token");
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [deposito, setDeposito] = useState(10);

  async function fetchTransacoes() {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const transRes = await fetch(`${API_BASE}/transacoes/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!transRes.ok) throw new Error("Falha ao carregar transações");

      const transData: Transacao[] = await transRes.json();
      setTransacoes(transData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function criarDeposito() {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/transacoes/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantia: Number(deposito), type: "DEPOSITO" }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg = body?.message ? String(body.message) : "Falha ao criar depósito";
        throw new Error(msg);
      }

      await fetchTransacoes();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao criar depósito");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchTransacoes();
    }
  }, [isAuthenticated, token]);

  if (isChecking) return null;
  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 my-6 grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-[var(--color-verde-floresta)]">
            Depósito
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {error && <p className="text-[var(--color-verde-floresta)]">{error}</p>}

          <div className="grid gap-2 max-w-sm">
            <Label
              htmlFor="deposito"
              className="text-[var(--color-verde-floresta)]"
            >
              Valor
            </Label>
            <Input
              id="deposito"
              type="number"
              value={deposito}
              min={1}
              step={1}
              onChange={(e) => setDeposito(Number(e.target.value))}
            />
          </div>

          <div className="flex">
            <Button
              disabled={loading}
              className="bg-[var(--color-pistache)] text-[var(--color-verde-floresta)] hover:bg-[var(--color-limao)]"
              onClick={criarDeposito}
            >
              Criar depósito
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[var(--color-verde-floresta)]">
            Transações
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {loading && <p className="text-[var(--color-texto)]">Carregando...</p>}

          {transacoes.length === 0 ? (
            <p className="text-[var(--color-texto)]">Nenhuma transação registrada.</p>
          ) : (
            <div className="grid gap-2">
              {transacoes.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <div className="grid">
                    <span className="font-medium text-[var(--color-verde-floresta)]">
                      {t.type}
                    </span>
                    <span className="text-sm text-[var(--color-texto)]">
                      {new Date(t.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <span className="font-semibold text-[var(--color-verde-floresta)]">
                    {formatMoney(t.quantia)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
