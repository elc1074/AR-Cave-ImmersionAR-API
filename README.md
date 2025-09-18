# AR Cave Immersion API

API REST desenvolvida em Node.js com TypeScript e PostgreSQL para gerenciar usuários e desenhos da aplicação AR Cave Immersion.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Express.js** - Framework web para Node.js
- **PostgreSQL** - Banco de dados relacional
- **pg** - Driver PostgreSQL para Node.js

## 📋 Pré-requisitos

- Node.js (versão 18+ recomendada)
- PostgreSQL (versão 12+ recomendada)
- npm ou yarn

## ⚙️ Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd AR-Cave-ImmersionAR-API
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ar_cave_db
DB_USER=postgres
DB_PASSWORD=sua_senha

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Configure o banco de dados PostgreSQL
Certifique-se de que o PostgreSQL está rodando e crie o banco de dados:

```sql
CREATE DATABASE ar_cave_db;
```

### 5. Execute as migrations
```bash
npm run migrate
```

## 🏃‍♂️ Executando o projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📚 Endpoints da API

### Usuários
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Obter usuário por ID
- `POST /api/users` - Criar novo usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário
- `GET /api/users/:id/drawings` - Obter desenhos de um usuário

### Desenhos
- `GET /api/drawings` - Listar todos os desenhos
- `GET /api/drawings/:id` - Obter desenho por ID
- `GET /api/drawings/user/:userId` - Obter desenhos por usuário
- `POST /api/drawings` - Criar novo desenho
- `PUT /api/drawings/:id` - Atualizar desenho
- `DELETE /api/drawings/:id` - Deletar desenho

### Utilidades
- `GET /api/health` - Health check da API
- `GET /` - Informações da API

## 📊 Estrutura do Banco de Dados

### Tabela: users
```sql
id SERIAL PRIMARY KEY
name VARCHAR(255) NOT NULL
email VARCHAR(255) UNIQUE NOT NULL
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### Tabela: drawings
```sql
id SERIAL PRIMARY KEY
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
dados JSONB NOT NULL
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

## 🏗️ Estrutura do Projeto

```
src/
├── config/          # Configurações (banco de dados, etc.)
├── controllers/     # Controladores da aplicação
├── models/          # Modelos de dados
├── routes/          # Definição das rotas
├── types/           # Tipos TypeScript
├── migrations/      # Scripts de migração do banco
├── app.ts           # Configuração do Express
└── server.ts        # Ponto de entrada da aplicação
```

## 🧪 Testando a API

### Criar um usuário
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@email.com"}'
```

### Criar um desenho
```bash
curl -X POST http://localhost:3000/api/drawings \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "dados": {"color": "red", "shapes": ["circle", "square"]}}'
```

##  Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa a versão compilada
- `npm run migrate` - Executa as migrations do banco de dados