# 📖 Histórias de Usuário — LiraBank

## 📌 Visão Geral

O **LiraBank** é um banco digital desenvolvido para fins de estudo e portfólio Full Stack. O sistema permitirá que usuários realizem operações bancárias básicas de forma segura, utilizando autenticação via JWT, regras de negócio centralizadas no backend e uma interface moderna construída em React.

---

# Épico 1 — Autenticação

## HU01 — Cadastro de usuário

**Como visitante**, quero criar uma conta no LiraBank para utilizar os serviços bancários.

### Critérios de Aceitação

- O usuário informa:
  - Nome completo;
  - CPF;
  - E-mail;
  - Senha.

- CPF deve ser único.
- E-mail deve ser único.
- A senha deve ser criptografada utilizando bcrypt.
- Uma conta bancária deve ser criada automaticamente.
- O saldo inicial da conta deve ser R$ 0,00.
- O número da conta deve ser gerado automaticamente.
- A agência padrão será **0001**.

---

## HU02 — Login

**Como usuário**, quero realizar login para acessar minha conta.

### Critérios de Aceitação

- Login utilizando e-mail e senha.
- A senha deve ser validada através do hash armazenado.
- A API retorna um JWT válido.
- Rotas privadas exigem autenticação.
- O frontend deve manter a sessão autenticada.

---

## HU03 — Visualizar perfil

**Como usuário**, quero visualizar meus dados pessoais.

### Critérios de Aceitação

Exibir:

- Nome;
- CPF mascarado;
- E-mail;
- Número da conta;
- Agência;
- Status da conta;
- Data de criação.

---

# Épico 2 — Conta Bancária

## HU04 — Consultar saldo

**Como cliente**, quero visualizar meu saldo disponível.

### Critérios de Aceitação

- Buscar a conta do usuário autenticado.
- Retornar saldo atualizado.
- Apenas contas ativas podem consultar saldo.

---

## HU05 — Consultar dados da conta

**Como cliente**, quero visualizar os dados da minha conta bancária.

### Critérios de Aceitação

Exibir:

- Número da conta;
- Agência;
- Saldo;
- Status;
- Data de criação.

---

# Épico 3 — Depósitos

## HU06 — Realizar depósito

**Como cliente**, quero depositar dinheiro em minha conta.

### Critérios de Aceitação

- O valor deve ser maior que zero.
- A conta deve estar ativa.
- O saldo deve ser atualizado.
- Uma transação do tipo **DEPÓSITO** deve ser registrada.
- Um comprovante deve ser gerado automaticamente.

---

# Épico 4 — Saques

## HU07 — Realizar saque

**Como cliente**, quero sacar dinheiro da minha conta.

### Critérios de Aceitação

- O valor deve ser positivo.
- A conta deve estar ativa.
- Deve existir saldo suficiente.
- O saldo deve ser atualizado.
- Registrar uma transação do tipo **SAQUE**.
- Gerar comprovante automaticamente.

---

# Épico 5 — Transferências

## HU08 — Transferir dinheiro

**Como cliente**, quero transferir dinheiro para outro usuário.

### Critérios de Aceitação

- Conta de destino deve existir.
- Conta de origem deve estar ativa.
- Conta de destino deve estar ativa.
- Não permitir transferência para a própria conta.
- O valor deve ser maior que zero.
- Deve existir saldo suficiente.
- O débito e o crédito devem ocorrer dentro de uma transação do banco de dados.
- Registrar uma transação do tipo **TRANSFERÊNCIA**.
- Gerar comprovante automaticamente.

---

# Épico 6 — Extrato

## HU09 — Consultar extrato

**Como cliente**, quero visualizar meu histórico de movimentações.

### Critérios de Aceitação

Cada movimentação deve informar:

- Tipo;
- Valor;
- Data;
- Hora;
- Descrição;
- Conta envolvida;
- Identificador do comprovante.

Permitir filtros por:

- Período;
- Tipo de transação.

Ordenação:

- Mais recentes primeiro.

Paginação obrigatória.

---

# Épico 7 — Dashboard

## HU10 — Dashboard financeiro

**Como cliente**, quero visualizar um resumo financeiro da minha conta.

### Critérios de Aceitação

Exibir cartões com:

- Saldo atual;
- Entradas do mês;
- Saídas do mês;
- Quantidade de transações;
- Total de favorecidos;
- Última movimentação.

Exibir gráficos:

- Entradas × Saídas;
- Distribuição por tipo de transação;
- Evolução do saldo ao longo do tempo.

---

# Épico 8 — Favorecidos

## HU11 — Adicionar favorecido

**Como cliente**, quero salvar contas utilizadas com frequência para facilitar futuras transferências.

### Critérios de Aceitação

- Informar a conta destino.
- Opcionalmente informar um apelido.
- Não permitir adicionar a própria conta.
- Não permitir duplicidade.
- Conta destino deve existir.
- Conta destino deve estar ativa.

---

## HU12 — Listar favorecidos

**Como cliente**, quero visualizar minha lista de favorecidos.

### Critérios de Aceitação

Exibir:

- Nome;
- Número da conta;
- Agência;
- Apelido.

---

## HU13 — Editar favorecido

**Como cliente**, quero alterar o apelido de um favorecido.

### Critérios de Aceitação

- Permitir editar apenas o apelido.
- O relacionamento entre contas permanece inalterado.

---

## HU14 — Remover favorecido

**Como cliente**, quero remover um favorecido.

### Critérios de Aceitação

- A remoção não deve apagar nenhuma transação.
- Apenas remover o vínculo entre as contas.

---

## HU15 — Transferir para favorecido

**Como cliente**, quero selecionar um favorecido para realizar uma transferência rapidamente.

### Critérios de Aceitação

- Selecionar favorecido na tela de transferência.
- Preencher automaticamente:
  - Conta;
  - Agência;
  - Nome.

---

# Épico 9 — Comprovantes

## HU16 — Visualizar comprovante

**Como cliente**, quero visualizar o comprovante de qualquer movimentação.

### Critérios de Aceitação

Exibir:

- Identificador único;
- Tipo da operação;
- Valor;
- Conta de origem;
- Conta de destino (quando existir);
- Data;
- Hora;
- Descrição.

---

## HU17 — Baixar comprovante

**Como cliente**, quero baixar o comprovante em PDF.

### Critérios de Aceitação

- Gerar PDF automaticamente.
- Layout semelhante ao de bancos digitais.
- Nome do arquivo contendo o identificador da operação.

---

## HU18 — Compartilhar comprovante

**Como cliente**, quero compartilhar um comprovante.

### Critérios de Aceitação

Permitir:

- Copiar link;
- Compartilhar PDF;
- Compartilhar identificador da operação.

---

# Regras Gerais do Sistema

## Segurança

- Senhas nunca devem ser armazenadas em texto puro.
- Utilizar bcrypt.
- Autenticação via JWT.
- Rotas protegidas por middleware.
- Validação utilizando Zod.
- Nunca confiar nos dados enviados pelo frontend.

---

## Regras Financeiras

- Nenhum saldo pode ficar negativo.
- Toda movimentação deve gerar uma transação.
- Toda transação deve gerar um comprovante.
- Transferências devem utilizar transações do banco de dados (Prisma Transaction).
- Nenhuma operação financeira pode ocorrer em contas bloqueadas.

---

## Auditoria

Todas as operações devem registrar:

- Data;
- Hora;
- Tipo da operação;
- Usuário responsável;
- Conta envolvida.

---

# Fluxo Principal do Sistema

Visitante

→ Cadastro

→ Login

→ Dashboard

→ Consultar Saldo

→ Depositar

→ Sacar

→ Transferir

→ Consultar Extrato

→ Gerenciar Favorecidos

→ Visualizar Comprovantes

→ Logout
