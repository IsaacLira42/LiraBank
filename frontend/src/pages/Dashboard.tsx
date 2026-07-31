import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
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
import {
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRightLeft,
  Wallet,
  Building,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ListTodo,
} from "lucide-react";
import {
  useContaQuery,
  useSaldoQuery,
  useTransactionsQuery,
  useDepositoMutation,
  useSaqueMutation,
  useTransferenciaMutation,
} from "@/hooks/useFinanceQueries";

function formatMoney(value: string | number) {
  const n = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(n)) return "R$ 0,00";
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Dashboard() {
  const { isAuthenticated, isChecking } = useAuth();

  // React Query Hooks
  const { data: conta, isLoading: loadingConta } = useContaQuery();
  const { data: saldoData, isLoading: loadingSaldo, error: errorSaldo, refetch: refetchSaldo } = useSaldoQuery();
  const { data: transacoes = [], isLoading: loadingTransacoes } = useTransactionsQuery();

  const depositoMutation = useDepositoMutation();
  const saqueMutation = useSaqueMutation();
  const transferenciaMutation = useTransferenciaMutation();

  // UI States
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<"deposito" | "saque" | "transferencia">("deposito");

  // Form States
  const [valorDeposito, setValorDeposito] = useState("");
  const [descDeposito, setDescDeposito] = useState("");
  const [valorSaque, setValorSaque] = useState("");
  const [descSaque, setDescSaque] = useState("");
  const [valorTransf, setValorTransf] = useState("");
  const [contaTransf, setContaTransf] = useState("");
  const [descTransf, setDescTransf] = useState("");

  // Feedback States
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (isChecking) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--color-verde-floresta)]" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/" />;

  const isBlocked = conta?.status === "BLOQUEADA";

  const clearFeedbacks = () => {
    setSuccessMsg(null);
    setErrorMsg(null);
  };

  const handleDeposito = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedbacks();
    const val = Number(valorDeposito);
    if (!val || val <= 0) {
      setErrorMsg("O valor do depósito deve ser maior que zero.");
      return;
    }

    depositoMutation.mutate(
      { quantia: val, descricao: descDeposito || undefined },
      {
        onSuccess: () => {
          setSuccessMsg(`Depósito de ${formatMoney(val)} realizado com sucesso!`);
          setValorDeposito("");
          setDescDeposito("");
          refetchSaldo();
        },
        onError: (err: any) => {
          setErrorMsg(err.response?.data?.message || "Erro ao realizar depósito.");
        },
      }
    );
  };

  const handleSaque = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedbacks();
    const val = Number(valorSaque);
    if (!val || val <= 0) {
      setErrorMsg("O valor do saque deve ser maior que zero.");
      return;
    }

    const currentSaldo = Number(saldoData?.saldo ?? 0);
    if (val > currentSaldo) {
      setErrorMsg("Saldo insuficiente para realizar esta operação.");
      return;
    }

    saqueMutation.mutate(
      { quantia: val, descricao: descSaque || undefined },
      {
        onSuccess: () => {
          setSuccessMsg(`Saque de ${formatMoney(val)} realizado com sucesso!`);
          setValorSaque("");
          setDescSaque("");
          refetchSaldo();
        },
        onError: (err: any) => {
          setErrorMsg(err.response?.data?.message || "Erro ao realizar saque.");
        },
      }
    );
  };

  const handleTransferencia = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedbacks();
    const val = Number(valorTransf);
    if (!val || val <= 0) {
      setErrorMsg("O valor da transferência deve ser maior que zero.");
      return;
    }
    if (!contaTransf.trim()) {
      setErrorMsg("Informe a conta de destino.");
      return;
    }
    if (contaTransf.trim() === conta?.numero) {
      setErrorMsg("Não é permitido transferir para sua própria conta.");
      return;
    }

    const currentSaldo = Number(saldoData?.saldo ?? 0);
    if (val > currentSaldo) {
      setErrorMsg("Saldo insuficiente para realizar a transferência.");
      return;
    }

    transferenciaMutation.mutate(
      {
        quantia: val,
        numeroContaDestino: contaTransf.trim(),
        descricao: descTransf || undefined,
      },
      {
        onSuccess: () => {
          setSuccessMsg(`Transferência de ${formatMoney(val)} enviada com sucesso!`);
          setValorTransf("");
          setContaTransf("");
          setDescTransf("");
          refetchSaldo();
        },
        onError: (err: any) => {
          setErrorMsg(err.response?.data?.message || "Erro ao realizar transferência.");
        },
      }
    );
  };

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 my-6 grid gap-6 font-assistant">
      {/* 1. Header & Feedback alerts */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-[var(--color-verde-floresta)]">
          Painel Financeiro
        </h2>
        <p className="text-[var(--color-texto)]">
          Gerencie seu saldo, realize transações bancárias em tempo real e acompanhe seu extrato.
        </p>

        {isBlocked && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-4 text-red-800 my-2 animate-pulse">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <div>
              <span className="font-semibold">Conta Bloqueada!</span> Operações financeiras e consulta de saldo suspensas até a regularização.
            </div>
          </div>
        )}

        {successMsg && (
          <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 my-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <div>{successMsg}</div>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-4 text-red-800 my-2">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            <div>{errorMsg}</div>
          </div>
        )}
      </div>

      {/* 2. Top Row: Account Card & Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Account Info Details */}
        <Card className="border-[var(--color-pistache)] md:col-span-2 overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="bg-[var(--color-verde-floresta)] text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Sua Conta LiraBank</CardTitle>
                <CardDescription className="text-gray-300">
                  Agência e dados da conta
                </CardDescription>
              </div>
              <Building className="h-8 w-8 text-[var(--color-pistache)]" />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 p-6">
            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div className="flex flex-col gap-1 border-r pr-2">
                <span className="text-gray-500 font-semibold text-xs uppercase">Agência</span>
                <span className="text-lg font-bold text-[var(--color-verde-floresta)]">
                  {loadingConta ? "..." : conta?.agencia || "0001"}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-r pr-2">
                <span className="text-gray-500 font-semibold text-xs uppercase">Conta</span>
                <span className="text-lg font-bold text-[var(--color-verde-floresta)]">
                  {loadingConta ? "..." : conta?.numero || "N/A"}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-r pr-2">
                <span className="text-gray-500 font-semibold text-xs uppercase">Status</span>
                <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  isBlocked
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}>
                  {loadingConta ? "..." : conta?.status || "N/A"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 font-semibold text-xs uppercase font-rubik">LiraBank</span>
                <span className="text-sm font-semibold text-gray-700">Digital Premium</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Card */}
        <Card className="border-[var(--color-pistache)] flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[var(--color-verde-floresta)]">
                Saldo Disponível
              </CardTitle>
              <Wallet className="h-6 w-6 text-[var(--color-verde-floresta)]" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 flex-grow flex flex-col justify-center">
            {loadingSaldo ? (
              <Loader2 className="h-8 w-8 animate-spin text-[var(--color-verde-floresta)]" />
            ) : errorSaldo || isBlocked ? (
              <div className="text-red-600 font-semibold flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span>Saldo Oculto (Conta Bloqueada)</span>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-[var(--color-verde-floresta)] tracking-tight">
                  {showBalance ? formatMoney(saldoData?.saldo ?? 0) : "••••••"}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[var(--color-verde-floresta)] hover:bg-[var(--color-pistache)]/20"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 3. Bottom Row: Quick Operations & History */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Operations Form */}
        <Card className="border-[var(--color-pistache)] lg:col-span-2 shadow-md">
          <CardHeader className="border-b">
            <CardTitle className="text-xl text-[var(--color-verde-floresta)]">
              Operações Rápidas
            </CardTitle>
            <CardDescription>
              Selecione o tipo de movimentação que deseja realizar.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* Tabs Selector */}
            <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-100 p-1.5 rounded-lg border">
              <button
                disabled={isBlocked}
                className={`py-2 px-3 text-xs font-semibold rounded-md transition-all ${
                  activeTab === "deposito"
                    ? "bg-[var(--color-verde-floresta)] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => { clearFeedbacks(); setActiveTab("deposito"); }}
              >
                Depósito
              </button>
              <button
                disabled={isBlocked}
                className={`py-2 px-3 text-xs font-semibold rounded-md transition-all ${
                  activeTab === "saque"
                    ? "bg-[var(--color-verde-floresta)] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => { clearFeedbacks(); setActiveTab("saque"); }}
              >
                Saque
              </button>
              <button
                disabled={isBlocked}
                className={`py-2 px-3 text-xs font-semibold rounded-md transition-all ${
                  activeTab === "transferencia"
                    ? "bg-[var(--color-verde-floresta)] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => { clearFeedbacks(); setActiveTab("transferencia"); }}
              >
                Transferir
              </button>
            </div>

            {/* Deposit Tab Form */}
            {activeTab === "deposito" && (
              <form onSubmit={handleDeposito} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="valorDep" className="text-[var(--color-verde-floresta)] font-medium">
                    Valor a Depositar
                  </Label>
                  <Input
                    id="valorDep"
                    type="number"
                    placeholder="R$ 0,00"
                    min="0.01"
                    step="0.01"
                    value={valorDeposito}
                    onChange={(e) => setValorDeposito(e.target.value)}
                    disabled={isBlocked || depositoMutation.isPending}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="descDep" className="text-[var(--color-verde-floresta)] font-medium">
                    Descrição (Opcional)
                  </Label>
                  <Input
                    id="descDep"
                    type="text"
                    placeholder="Ex: Poupança mensal"
                    maxLength={100}
                    value={descDeposito}
                    onChange={(e) => setDescDeposito(e.target.value)}
                    disabled={isBlocked || depositoMutation.isPending}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isBlocked || depositoMutation.isPending}
                  className="bg-[var(--color-pistache)] text-[var(--color-verde-floresta)] hover:bg-[var(--color-limao)] font-semibold transition-all mt-2 py-6 w-full"
                >
                  {depositoMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Confirmar Depósito"
                  )}
                </Button>
              </form>
            )}

            {/* Withdraw Tab Form */}
            {activeTab === "saque" && (
              <form onSubmit={handleSaque} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="valorSaq" className="text-[var(--color-verde-floresta)] font-medium">
                    Valor a Sacar
                  </Label>
                  <Input
                    id="valorSaq"
                    type="number"
                    placeholder="R$ 0,00"
                    min="0.01"
                    step="0.01"
                    value={valorSaque}
                    onChange={(e) => setValorSaque(e.target.value)}
                    disabled={isBlocked || saqueMutation.isPending}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="descSaq" className="text-[var(--color-verde-floresta)] font-medium">
                    Descrição (Opcional)
                  </Label>
                  <Input
                    id="descSaq"
                    type="text"
                    placeholder="Ex: Dinheiro para padaria"
                    maxLength={100}
                    value={descSaque}
                    onChange={(e) => setDescSaque(e.target.value)}
                    disabled={isBlocked || saqueMutation.isPending}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isBlocked || saqueMutation.isPending}
                  className="bg-[var(--color-pistache)] text-[var(--color-verde-floresta)] hover:bg-[var(--color-limao)] font-semibold transition-all mt-2 py-6 w-full"
                >
                  {saqueMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Confirmar Saque"
                  )}
                </Button>
              </form>
            )}

            {/* Transfer Tab Form */}
            {activeTab === "transferencia" && (
              <form onSubmit={handleTransferencia} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contaTransf" className="text-[var(--color-verde-floresta)] font-medium">
                    Número da Conta Destino
                  </Label>
                  <Input
                    id="contaTransf"
                    type="text"
                    placeholder="Digite a conta (Ex: 12345-6)"
                    value={contaTransf}
                    onChange={(e) => setContaTransf(e.target.value)}
                    disabled={isBlocked || transferenciaMutation.isPending}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="valorTransf" className="text-[var(--color-verde-floresta)] font-medium">
                    Valor a Transferir
                  </Label>
                  <Input
                    id="valorTransf"
                    type="number"
                    placeholder="R$ 0,00"
                    min="0.01"
                    step="0.01"
                    value={valorTransf}
                    onChange={(e) => setValorTransf(e.target.value)}
                    disabled={isBlocked || transferenciaMutation.isPending}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="descTransf" className="text-[var(--color-verde-floresta)] font-medium">
                    Descrição/Motivo (Opcional)
                  </Label>
                  <Input
                    id="descTransf"
                    type="text"
                    placeholder="Ex: Pagamento almoço"
                    maxLength={100}
                    value={descTransf}
                    onChange={(e) => setDescTransf(e.target.value)}
                    disabled={isBlocked || transferenciaMutation.isPending}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isBlocked || transferenciaMutation.isPending}
                  className="bg-[var(--color-pistache)] text-[var(--color-verde-floresta)] hover:bg-[var(--color-limao)] font-semibold transition-all mt-2 py-6 w-full"
                >
                  {transferenciaMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Confirmar Transferência"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Transactions Extrato */}
        <Card className="border-[var(--color-pistache)] lg:col-span-3 shadow-md flex flex-col justify-between">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-[var(--color-verde-floresta)]">
                  Extrato de Movimentações
                </CardTitle>
                <CardDescription>
                  Seu histórico de transações recentes.
                </CardDescription>
              </div>
              <ListTodo className="h-6 w-6 text-[var(--color-verde-floresta)]" />
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-grow overflow-y-auto max-h-[480px]">
            {loadingTransacoes ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--color-verde-floresta)]" />
              </div>
            ) : transacoes.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center text-gray-400 gap-2">
                <AlertCircle className="h-8 w-8" />
                <p>Nenhuma transação registrada nesta conta.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {transacoes.map((t) => {
                  const isRecipient = t.contaDestinoId === conta?.id;
                  const isTransfer = t.type === "TRANSFERENCIA";
                  const isDeposit = t.type === "DEPOSITO";

                  let flowIcon = <ArrowUpRight className="h-5 w-5 text-red-600" />;
                  let labelColor = "text-red-700 font-semibold";
                  let opName = "Saque";
                  let valuePrefix = "- ";

                  if (isDeposit) {
                    flowIcon = <ArrowDownLeft className="h-5 w-5 text-green-600" />;
                    labelColor = "text-green-700 font-semibold";
                    opName = "Depósito";
                    valuePrefix = "+ ";
                  } else if (isTransfer) {
                    if (isRecipient) {
                      flowIcon = <ArrowDownLeft className="h-5 w-5 text-green-600" />;
                      labelColor = "text-green-700 font-semibold";
                      const fromName = t.conta?.usuario?.nome || "Outro usuário";
                      opName = `Transferência Recebida (de ${fromName.split(" ")[0]})`;
                      valuePrefix = "+ ";
                    } else {
                      flowIcon = <ArrowRightLeft className="h-5 w-5 text-red-600" />;
                      labelColor = "text-red-700 font-semibold";
                      const toName = t.contaDestino?.usuario?.nome || "Outro usuário";
                      opName = `Transferência Enviada (para ${toName.split(" ")[0]})`;
                      valuePrefix = "- ";
                    }
                  }

                  return (
                    <div
                      key={t.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-gray-150 p-4 hover:bg-gray-50 transition-colors shadow-sm gap-2"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 bg-gray-100 p-2 rounded-full border">
                          {flowIcon}
                        </div>
                        <div className="grid gap-0.5">
                          <span className="font-semibold text-gray-800 text-sm">
                            {opName}
                          </span>
                          {t.descricao && (
                            <span className="text-xs text-gray-500">
                              💡 {t.descricao}
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-gray-400">
                            Comprovante: {t.codigoComprovante}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(t.createdAt).toLocaleString("pt-BR")}
                          </span>
                        </div>
                      </div>
                      <span className={`text-base font-bold text-right sm:self-center ${labelColor}`}>
                        {valuePrefix}
                        {formatMoney(t.quantia)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
