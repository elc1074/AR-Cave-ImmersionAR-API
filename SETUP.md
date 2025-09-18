# Guia de Instalação e Configuração

## Pré-requisitos

### 1. Instalar Node.js
- Baixe e instale o Node.js (versão 18+) de: https://nodejs.org/
- Verifique a instalação:
```bash
node --version
npm --version
```

### 2. Instalar PostgreSQL
- Baixe e instale o PostgreSQL de: https://www.postgresql.org/download/
- Durante a instalação, anote a senha que você definir para o usuário `postgres`
- Verifique se o PostgreSQL está rodando:
```bash
psql --version
```

## Configuração do Projeto

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados

#### Opção A: Usar pgAdmin (Interface gráfica)
1. Abra o pgAdmin (instalado junto com PostgreSQL)
2. Conecte com seu servidor PostgreSQL
3. Clique com o botão direito em "Databases" → "Create" → "Database"
4. Nome: `ar_cave_db`
5. Clique em "Save"

#### Opção B: Usar linha de comando
```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar o banco de dados
CREATE DATABASE ar_cave_db;

# Sair do psql
\q
```

### 3. Configurar variáveis de ambiente
1. Copie o arquivo `.env.example` para `.env`:
```bash
copy .env.example .env
```

2. Edite o arquivo `.env` com suas configurações:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ar_cave_db
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_AQUI  # <- Coloque sua senha do PostgreSQL aqui

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Inicializar o banco de dados com TypeORM
```bash
npm run db:init
```

**Nota:** O TypeORM está configurado com `synchronize: true` em desenvolvimento, o que significa que as tabelas serão criadas/atualizadas automaticamente baseado nas entidades.

### 5. Iniciar o servidor
```bash
npm run dev
```

O servidor estará rodando em: http://localhost:3000

## Verificação da Instalação

### Teste básico
Acesse http://localhost:3000 no seu navegador. Você deve ver:
```json
{
  "success": true,
  "message": "AR Cave Immersion API está funcionando!",
  "version": "1.0.0",
  "endpoints": {
    "users": "/api/users",
    "drawings": "/api/drawings",
    "health": "/api/health"
  }
}
```

### Health Check
Acesse http://localhost:3000/api/health

## Resolução de Problemas

### Erro de autenticação do PostgreSQL
- Verifique se a senha no arquivo `.env` está correta
- Verifique se o PostgreSQL está rodando
- Teste a conexão:
```bash
psql -U postgres -d ar_cave_db
```

### Erro "database does not exist"
- Certifique-se de que o banco `ar_cave_db` foi criado
- Execute o comando SQL: `CREATE DATABASE ar_cave_db;`

### Porta já em uso
- Mude a porta no arquivo `.env`: `PORT=3001`
- Ou pare o processo que está usando a porta 3000

### Dependências não instaladas
```bash
rm -rf node_modules package-lock.json
npm install
```

## Scripts Disponíveis

- `npm run dev` - Modo desenvolvimento com hot reload
- `npm run build` - Compilar TypeScript
- `npm start` - Executar versão compilada
- `npm run db:init` - Inicializar banco de dados com TypeORM
- `npm run typeorm` - CLI do TypeORM para migrations manuais
