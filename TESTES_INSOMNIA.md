# Testes Rápidos - Insomnia

## 🚀 Setup Inicial

1. **Importe a Collection**
   - Abra o Insomnia
   - Clique em "Import/Export" > "Import Data" > "From File"
   - Selecione o arquivo `insomnia-collection.json`

2. **Configure o Environment**
   - Selecione "Development" no dropdown de environments
   - Certifique-se que `base_url` aponta para `http://localhost:3000`

3. **Inicie a API**
   ```bash
   npm run dev
   ```

## 🧪 Cenários de Teste

### Cenário 1: Teste Básico Completo
Execute nesta ordem:

1. **Criar Usuário**
   - Request: `👥 Usuários > Criar Usuário`
   - Copie o `id` da resposta

2. **Atualizar Environment**
   - Vá em Environments > Development
   - Atualize `user_id` com o ID copiado

3. **Criar Desenho**
   - Request: `🎨 Desenhos > Criar Desenho`
   - Copie o `id` da resposta

4. **Atualizar Environment**
   - Atualize `drawing_id` com o ID do desenho

5. **Testar Todas as Rotas**
   - `Listar Usuários`
   - `Listar Todos os Desenhos`
   - `Listar Desenhos por Usuário`
   - `Atualizar Desenho`
   - `Deletar Desenho`

### Cenário 2: Teste de Diferentes Tipos de Desenho

Execute os requests na pasta `🎨 Desenhos`:
1. `Criar Desenho` (linha)
2. `Criar Desenho - Círculo`
3. `Criar Desenho - Polígono`

### Cenário 3: Teste de Validações

#### Teste 1: Usuário Inexistente
- Use `Criar Desenho` com `user_id: 999`
- Espere erro 404

#### Teste 2: Desenho Inexistente
- Use `Atualizar Desenho` com `drawing_id: 999`
- Espere erro 404

#### Teste 3: Dados Inválidos
- Use `Criar Usuário` com body vazio `{}`
- Observe o comportamento

## 📋 Checklist de Testes

### ✅ Usuários
- [ ] Listar usuários (vazio inicialmente)
- [ ] Criar usuário com nome válido
- [ ] Listar usuários (com dados)
- [ ] Criar usuário com nome duplicado (deveria funcionar)

### ✅ Desenhos
- [ ] Listar desenhos (vazio inicialmente)
- [ ] Criar desenho com usuário válido
- [ ] Criar desenho com cor personalizada
- [ ] Criar desenho sem cor (usa padrão)
- [ ] Listar todos os desenhos
- [ ] Listar desenhos por usuário específico
- [ ] Atualizar dados do desenho
- [ ] Atualizar apenas cor do desenho
- [ ] Deletar desenho
- [ ] Tentar atualizar desenho inexistente
- [ ] Tentar deletar desenho inexistente
- [ ] Criar desenho com usuário inexistente

## 🎯 Dados de Teste Prontos

### Usuários
```json
{"name": "Alice Silva"}
{"name": "Bob Santos"}
{"name": "Carol Oliveira"}
```

### Desenhos Variados

**Linha Simples:**
```json
{
  "user_id": 1,
  "dados": {
    "tipo": "linha",
    "pontos": [{"x": 0, "y": 0}, {"x": 100, "y": 100}]
  },
  "cor": "#FF0000"
}
```

**Retângulo:**
```json
{
  "user_id": 1,
  "dados": {
    "tipo": "retangulo",
    "origem": {"x": 10, "y": 10},
    "largura": 50,
    "altura": 30
  },
  "cor": "#00FF00"
}
```

**Forma Livre:**
```json
{
  "user_id": 1,
  "dados": {
    "tipo": "forma_livre",
    "tracos": [
      [{"x": 5, "y": 5}, {"x": 10, "y": 15}, {"x": 15, "y": 10}],
      [{"x": 20, "y": 20}, {"x": 25, "y": 30}, {"x": 30, "y": 25}]
    ]
  },
  "cor": "#0000FF"
}
```

**Desenho 3D:**
```json
{
  "user_id": 1,
  "dados": {
    "tipo": "objeto_3d",
    "geometria": "cubo",
    "posicao": {"x": 0, "y": 0, "z": 0},
    "escala": {"x": 1, "y": 1, "z": 1},
    "rotacao": {"x": 0, "y": 45, "z": 0}
  },
  "cor": "#FF00FF"
}
```

## 📊 Validação de Respostas

### Estrutura Esperada - Usuário
```json
{
  "value": [
    {
      "id": number,
      "name": string,
      "created_at": string (ISO date),
      "updated_at": string (ISO date)
    }
  ]
}
```

### Estrutura Esperada - Desenho
```json
{
  "value": [
    {
      "id": number,
      "user_id": number,
      "dados": object,
      "cor": string,
      "created_at": string (ISO date),
      "updated_at": string (ISO date),
      "users": {
        "id": number,
        "name": string
      }
    }
  ]
}
```

## 🔍 Debug e Troubleshooting

### Logs do Servidor
Monitore o terminal onde a API está rodando para ver:
- Requisições sendo processadas
- Erros de SQL/Supabase
- Mensagens de debug

### Headers Importantes
Sempre inclua em POST/PUT:
```
Content-Type: application/json
```

### Status Codes
- `200`: Sucesso (GET, PUT, DELETE)
- `201`: Criado com sucesso (POST)
- `404`: Não encontrado
- `500`: Erro interno do servidor

### Troubleshooting Comum

**Erro 500 ao criar desenho:**
- Verifique se o `user_id` existe
- Confirme formato JSON válido

**Collection não funciona:**
- Verifique se a API está rodando na porta correta
- Confirme as variáveis do environment

**Supabase não conecta:**
- Verifique arquivo `.env`
- Confirme credenciais no painel Supabase
