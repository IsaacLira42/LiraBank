# 🏦 LiraBank - Full-Stack Banking Experience

![](./apresentacao_do_lira_bank.gif)

O **LiraBank** é uma simulação de banco digital desenvolvida para demonstrar o domínio de uma stack moderna, focando em **escalabilidade**, **segurança** e **integridade de dados**.

---

## 🛠️ Stack Tecnológica

### Backend

<img src="https://skillicons.dev/icons?i=nodejs,ts,express,prisma,postgresql" height="40"/>

### Frontend

<img src="https://skillicons.dev/icons?i=react,vite,tailwind,shadcnui,zod" height="40"/>

### DevOps

<img src="https://skillicons.dev/icons?i=docker,git" height="40"/>

---

## 🚀 Diferenciais de Engenharia

- **Atomicidade nas Transações:** Garantia de que transferências (débito e crédito) ocorram de forma atômica ou falhem completamente, evitando inconsistências de saldo.
- **End-to-End Type Safety:** Uso rigoroso de TypeScript para consistência entre banco de dados e interface.
- **Validação de Camada:** Esquemas de dados validados com **Zod**, blindando a API contra payloads malformados.
- **Arquitetura em Camadas:** Organização em _Controllers_, _Services_ e _Repositories_ para facilitar a testabilidade.

---

## 🎯 Status do Projeto (Kanban)

### **✅ Concluído (MVP)**

- **Autenticação:** Sistema de Login/Cadastro com JWT e armazenamento de senhas com `bcrypt`.
- **Segurança de Rotas:** Middleware de autenticação para proteção de endpoints privados.
- **Core Bancário:** Abertura automática de conta com saldo inicial zero vinculada ao usuário.

### **🚧 Em Desenvolvimento (Próximos Passos)**

- **Operações Financeiras:** Implementação de Depósito, Saque e Transferências entre contas.
- **Resiliência:** Garantia de que falhas em transações não alterem saldos (Rollback).
- **Observabilidade:** Documentação interativa via **Swagger**.
- **Infraestrutura:** Orquestração total do ambiente via **Docker Compose**.

---

## 📂 Estrutura de Pastas

```text
LiraBank/
├── backend/            # API RESTful (PostgreSQL + Prisma)
│   ├── prisma/         # Schema e Migrations
│   ├── src/
│   │   ├── controllers/# Validação de entrada e resposta HTTP
│   │   ├── services/   # Regras de negócio e lógica bancária
│   │   └── repositories/# Interface de comunicação com o banco
├── frontend/           # Interface SPA (React)
│   ├── src/
│   │   ├── components/ # UI Atoms & Molecules (shadcn/ui)
│   │   └── pages/      # Views e contextos de estado

```

---

## ⚙️ Como Executar

1. **Backend:**

```bash
cd backend
```

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npx prisma migrate dev
```

```bash
npm run dev
```

2. **Frontend:**

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

---

## 🛡️ Regras de Negócio Implementadas/Planejadas

1. **Isolamento:** Um usuário jamais pode visualizar ou movimentar o saldo de terceiros.
2. **Validação de Saldo:** Saques e transferências são impedidos caso o saldo disponível seja insuficiente.
3. **Logs de Transação:** Registro obrigatório de data, tipo e valor para cada movimentação.

---

## 👤 Autor

**Isaac Lira**

- [LinkedIn](https://www.linkedin.com/in/isaaclira42/) | [Github](https://github.com/IsaacLira42)
