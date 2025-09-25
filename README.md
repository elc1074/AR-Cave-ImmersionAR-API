# AR Cave Immersion API

API REST desenvolvida em Node.js com TypeScript e Supabase para gerenciar usuários e desenhos da aplicação AR Cave Immersion.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Fastify** - Framework web rápido para Node.js
- **Supabase** - Backend-as-a-Service com PostgreSQL
- **@supabase/supabase-js** - Cliente JavaScript para Supabase

## 📋 Pré-requisitos

- Node.js (versão 18+ recomendada)
- Conta no Supabase
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

### 3. Configure o Supabase
1. Crie um projeto no [Supabase](https://supabase.com)
2. Crie as tabelas necessárias (veja seção "Estrutura do Banco")

### 4. Configure as variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações do Supabase:
```env
# Configuração do Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

# Configuração do Servidor
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
```

## 🗄️ Estrutura do Banco de Dados

Execute o arquivo `supabase-schema.sql` no SQL Editor do seu projeto Supabase para criar as tabelas necessárias.

### Tabelas:
- **users**: Gerencia os usuários da aplicação
- **drawings**: Armazena os desenhos criados pelos usuários

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
- `GET /users` - Listar todos os usuários
- `POST /users` - Criar novo usuário

### Desenhos
- `GET /drawings` - Listar todos os desenhos
- `GET /drawings/user/:userId` - Listar desenhos de um usuário específico
- `POST /drawings` - Criar novo desenho
- `PUT /drawings/:id` - Atualizar desenho existente
- `DELETE /drawings/:id` - Deletar desenho

## 📖 Exemplos de Uso

### Criar usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva"}'
```

### Criar desenho
```bash
curl -X POST http://localhost:3000/drawings \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "dados": {"coordenadas": [{"x": 10, "y": 20}]},
    "cor": "#FF5733"
  }'
```

### Buscar todos os desenhos
```bash
curl http://localhost:3000/drawings
```

### Buscar desenhos de um usuário
```bash
curl http://localhost:3000/drawings/user/1
```

## 🧪 Testando com Insomnia

Para facilitar os testes, fornecemos documentação completa para o Insomnia:

- **[Guia Completo do Insomnia](INSOMNIA_GUIDE.md)** - Documentação detalhada com exemplos
- **[Testes Rápidos](TESTES_INSOMNIA.md)** - Checklist e cenários de teste
- **[Collection do Insomnia](insomnia-collection.json)** - Arquivo para importar diretamente

### Import Rápido
1. Abra o Insomnia
2. Vá em Import/Export > Import Data > From File
3. Selecione o arquivo `insomnia-collection.json`
4. Configure o environment com sua URL base

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