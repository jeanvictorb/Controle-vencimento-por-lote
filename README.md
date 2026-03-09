# 📦 Sistema de Controle de Vencimento de Lotes

Sistema web para gestão e monitoramento de vencimento de lotes, com alertas visuais por criticidade e busca por código de barras.

---

## 🖥️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | Java 17 + Spring Boot 3 |
| Banco de Dados | SQL Server (conexão somente leitura nas tabelas do ERP) |
| Autenticação | JWT (JSON Web Token) |
| Frontend | React 18 + Vite |
| HTTP Client | Axios |
| Agendamento | Spring Scheduler (cron diário 07:00) |

---

## 📁 Estrutura do Projeto

```
/
├── lotes-api/          # Backend Spring Boot
│   ├── sql/
│   │   └── criar_app_usuarios.sql   # Script para criar tabela de usuários
│   └── src/main/
│       ├── resources/
│       │   └── application.properties  # ⚠️ Configurar conexão SQL Server
│       └── java/com/empresa/lotesapi/
│           ├── entity/       # Lote, Material, Usuario
│           ├── repository/   # JPA Repositories
│           ├── service/      # Regras de negócio
│           ├── controller/   # Endpoints REST
│           ├── security/     # JWT Filter + Util
│           └── scheduler/    # Verificação diária de vencimentos
│
└── lotes-web/          # Frontend React + Vite
    └── src/
        ├── pages/      # Login, Dashboard, ListaLotes, BuscaLote
        ├── components/ # Sidebar, Layout, LotesTable
        ├── services/   # api.js (Axios + mock demo)
        └── context/    # AuthContext (JWT)
```

---

## ⚙️ Configuração e Execução

### 1. Banco de Dados

Execute o script no seu banco SQL Server (via DBeaver ou SSMS):

```sql
-- Cria a tabela de usuários do app e um usuário admin inicial
-- Arquivo: lotes-api/sql/criar_app_usuarios.sql
```

> O sistema lê as tabelas existentes `TBL_LOTES` e `TBL_MATERIAIS` do ERP. A única tabela criada pelo app é `APP_USUARIOS`.

### 2. Backend (Spring Boot)

Configure o arquivo `lotes-api/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://SEU_SERVIDOR:1433;databaseName=SEU_BANCO;encrypt=true;trustServerCertificate=true
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

jwt.secret=sua-chave-secreta-com-pelo-menos-32-chars
jwt.expiration=86400000
```

Inicie o backend:

```bash
cd lotes-api
mvn spring-boot:run
```

A API estará disponível em: `http://localhost:8080`

### 3. Frontend (React)

Configure a URL da API no arquivo `lotes-web/.env`:

```env
VITE_API_URL=http://localhost:8080
```

Instale as dependências e inicie:

```bash
cd lotes-web
npm install
npm run dev
```

Acesse: **http://localhost:5173**

---

## 🔐 Gerenciamento de Usuários

Para adicionar usuários ao sistema, gere o hash BCrypt da senha em [bcrypt-generator.com](https://bcrypt-generator.com) (rounds = 10) e insira via DBeaver:

```sql
INSERT INTO APP_USUARIOS (DS_LOGIN, DS_SENHA, DS_NOME)
VALUES ('joao.silva', '$2a$10$HASH_DA_SENHA', 'João Silva');
```

O usuário padrão criado pelo script é:
- **Login:** `admin`
- **Senha:** `admin123`

---

## 🌐 Endpoints da API

| Método | URL | Descrição | Auth |
|---|---|---|---|
| `POST` | `/api/auth/login` | Autenticação → retorna JWT | ❌ |
| `GET` | `/api/lotes/dashboard` | Painel com totais e listas | ✅ |
| `GET` | `/api/lotes/vencidos` | Lotes com vencimento passado | ✅ |
| `GET` | `/api/lotes/criticos` | Lotes vencendo em ≤ 7 dias | ✅ |
| `GET` | `/api/lotes/atencao` | Lotes vencendo em ≤ 30 dias | ✅ |
| `GET` | `/api/lotes/buscar?codigoBarra=xxx` | Busca por código de barras | ✅ |

---

## 🚦 Regras de Alerta

| Status | Cor | Critério |
|---|---|---|
| 🔴 **Vencido** | Vermelho | Data de vencimento < Hoje |
| 🔴 **Crítico** | Vermelho | Vence em ≤ 7 dias |
| 🟡 **Atenção** | Amarelo | Vence em ≤ 30 dias |

O sistema verifica os lotes automaticamente todo dia às **07:00** via cron job.

---

## 👁️ Modo Demo

Para visualizar o sistema sem configurar o banco de dados, acesse a tela de login e clique em **"Ver Demonstração (sem backend)"**. Dados fictícios serão carregados automaticamente.

---

## 📋 Tabelas Utilizadas do ERP

| Tabela | Uso |
|---|---|
| `TBL_LOTES` | Dados dos lotes (incluindo `DT_VENCIMENTO`) |
| `TBL_MATERIAIS` | Produtos (incluindo `CD_CODBARRA` para o scanner) |
| `APP_USUARIOS` | Usuários do sistema (criada pelo app) |
