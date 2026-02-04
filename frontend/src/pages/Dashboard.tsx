import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Conta = {
  id: number;
  numero: string;
  saldo: string | number;
  status: "ATIVA" | "BLOQUEADA";
};

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

  const [conta, setConta] = useState<Conta | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [deposito, setDeposito] = useState(10);

  async function fetchContaETransacoes() {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const [contaRes, transRes] = await Promise.all([
        fetch(`${API_BASE}/contas/me`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/transacoes/me`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!contaRes.ok) throw new Error("Falha ao carregar conta");
      if (!transRes.ok) throw new Error("Falha ao carregar transações");

      const contaData: Conta = await contaRes.json();
      const transData: Transacao[] = await transRes.json();

      setConta(contaData);
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

      await fetchContaETransacoes();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao criar depósito");
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
        const msg = body?.message ? String(body.message) : "Falha ao atualizar status";
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
    if (isAuthenticated && token) {
      fetchContaETransacoes();
    }
  }, [isAuthenticated, token]);

  if (isChecking) return null;
  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 my-6 grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>
          <CardDescription>Informações básicas da sua conta</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && <p className="text-destructive">{error}</p>}

          {!conta ? (
            <p>{loading ? "Carregando..." : "Sem dados de conta"}</p>
          ) : (
            <div className="grid gap-2">
              <p>
                <span className="font-semibold">Número:</span> {conta.numero}
              </p>
              <p>
                <span className="font-semibold">Saldo:</span> {formatMoney(conta.saldo)}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {conta.status}
              </p>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  disabled={loading || conta.status === "ATIVA"}
                  onClick={() => atualizarStatus("ATIVA")}
                >
                  Ativar
                </Button>
                <Button
                  variant="destructive"
                  disabled={loading || conta.status === "BLOQUEADA"}
                  onClick={() => atualizarStatus("BLOQUEADA")}
                >
                  Bloquear
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Depósito fictício</CardTitle>
          <CardDescription>Criar uma transação (somente inclusão)</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid gap-2 max-w-sm">
            <Label htmlFor="deposito">Valor</Label>
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
            <Button disabled={loading} onClick={criarDeposito}>
              Criar depósito
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transações</CardTitle>
          <CardDescription>Histórico (somente leitura)</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {loading && <p>Carregando...</p>}

          {transacoes.length === 0 ? (
            <p>Nenhuma transação registrada.</p>
          ) : (
            <div className="grid gap-2">
              {transacoes.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <div className="grid">
                    <span className="font-medium">{t.type}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(t.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <span className="font-semibold">{formatMoney(t.quantia)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
