# Setup da API AR Cave Immersion

## Passo a passo para configurar e executar a API

### 1. Configuração do Supabase

1. Acesse [Supabase](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. No SQL Editor, execute o conteúdo do arquivo `supabase-schema.sql`
4. Vá em Settings > API e copie:
   - Project URL
   - Project API Key (anon/public)

### 2. Configuração das variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env`
2. Configure as variáveis com os valores do seu projeto Supabase

### 3. Instalação e execução

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Ou buildar e executar em produção
npm run build
npm start
```

### 4. Testando a API

A API estará disponível em `http://localhost:3000`

Teste com:
```bash
# Criar um usuário
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Teste User"}'

# Listar usuários
curl http://localhost:3000/users

# Listar desenhos
curl http://localhost:3000/drawings
```

### Estrutura das tabelas no Supabase

As tabelas serão criadas automaticamente quando você executar o script SQL:

- `users`: id, name, created_at, updated_at
- `drawings`: id, user_id, dados (JSONB), cor, created_at, updated_at

### Endpoints disponíveis

- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `GET /drawings` - Listar todos os desenhos
- `GET /drawings/user/:userId` - Desenhos por usuário
- `POST /drawings` - Criar desenho
- `PUT /drawings/:id` - Atualizar desenho
- `DELETE /drawings/:id` - Deletar desenho
