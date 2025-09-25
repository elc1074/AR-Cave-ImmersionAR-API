# ⚡ Quick Start - AR Cave Immersion API

## 1. Configuração Rápida (5 minutos)

### Pré-requisitos
- Node.js instalado
- Conta no Supabase (gratuita)

### Setup
```bash
# 1. Clone e instale
git clone <repo-url>
cd AR-Cave-ImmersionAR-API
npm install

# 2. Configure Supabase
# - Acesse https://supabase.com
# - Crie um projeto
# - Execute o SQL do arquivo supabase-schema.sql

# 3. Configure .env
cp .env.example .env
# Edite .env com suas credenciais do Supabase

# 4. Inicie a API
npm run dev
```

## 2. Teste Imediato com Insomnia

### Importar Collection
1. Abra o Insomnia
2. Import/Export > Import Data > From File
3. Selecione `insomnia-collection.json`
4. Escolha Environment "Development"

### Primeiro Teste
1. **Criar usuário**: `👥 Usuários > Criar Usuário`
2. **Listar usuários**: `👥 Usuários > Listar Usuários` 
3. **Criar desenho**: `🎨 Desenhos > Criar Desenho` (ajuste user_id)
4. **Ver resultado**: `🎨 Desenhos > Listar Todos os Desenhos`

## 3. Verificação Rápida

✅ API rodando em http://localhost:3000  
✅ Supabase conectado (sem erros 500)  
✅ Tabelas criadas (users e drawings)  
✅ Primeiro usuário criado  
✅ Primeiro desenho criado  

## 4. URLs Importantes

- **API Local**: http://localhost:3000
- **Supabase Dashboard**: https://app.supabase.com
- **Documentação Completa**: [INSOMNIA_GUIDE.md](INSOMNIA_GUIDE.md)

## 5. Estrutura das Requisições

### Criar Usuário
```http
POST /users
Content-Type: application/json

{"name": "Seu Nome"}
```

### Criar Desenho
```http
POST /drawings  
Content-Type: application/json

{
  "user_id": 1,
  "dados": {"tipo": "linha", "pontos": [{"x": 0, "y": 0}]},
  "cor": "#FF0000"
}
```

## 6. Solução de Problemas

**Erro 500?** → Verifique .env e credenciais Supabase  
**Collection não importa?** → Verifique se o arquivo JSON está íntegro  
**API não inicia?** → `npm install` e verifique Node.js versão  
**Supabase não conecta?** → Verifique URL e KEY no .env
