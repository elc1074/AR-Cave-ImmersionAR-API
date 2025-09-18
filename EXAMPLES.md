# Exemplos de uso da API Simplificada

## 🎯 **API Simplificada - Sem Autenticação**

Esta API foi simplificada para usar um único usuário padrão chamado **"DEFAULT MASTER"**. Todos os desenhos são automaticamente associados a este usuário.

---

## 👤 **Usuários**

### Obter informações do usuário master
```bash
curl -X GET http://localhost:3000/api/users/1
```

Resposta esperada:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "DEFAULT MASTER",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
    "drawings": [...]
  },
  "message": "Usuário encontrado"
}
```

### Listar todos os usuários
```bash
curl -X GET http://localhost:3000/api/users
```

---

## 🎨 **Desenhos (Simplificado)**

### Criar um desenho (sem user_id - automático!)
```bash
curl -X POST http://localhost:3000/api/drawings \
  -H "Content-Type: application/json" \
  -d '{
    "cor": "vermelho",
    "dados": {
      "shapes": [
        {
          "type": "circle",
          "x": 100,
          "y": 150,
          "radius": 50,
          "fill": "#ff0000"
        }
      ],
      "tools": ["pencil"],
      "timestamp": "2024-01-15T10:35:00.000Z"
    }
  }'
```

### Criar desenho só com dados (cor opcional)
```bash
curl -X POST http://localhost:3000/api/drawings \
  -H "Content-Type: application/json" \
  -d '{
    "dados": {
      "shapes": [
        {
          "type": "square",
          "x": 200,
          "y": 200,
          "width": 100,
          "height": 100
        }
      ]
    }
  }'
```

### Criar desenho só com cor e dados mínimos
```bash
curl -X POST http://localhost:3000/api/drawings \
  -H "Content-Type: application/json" \
  -d '{
    "cor": "azul",
    "dados": {
      "color_palette": ["#0000ff"],
      "brush_size": 5
    }
  }'
```

### Listar todos os desenhos
```bash
curl -X GET http://localhost:3000/api/drawings
```

Resposta esperada:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "cor": "vermelho",
      "dados": { "shapes": [...] },
      "created_at": "2024-01-15T10:35:00.000Z",
      "updated_at": "2024-01-15T10:35:00.000Z",
      "user": {
        "id": 1,
        "name": "DEFAULT MASTER"
      }
    }
  ],
  "message": "Desenhos recuperados com sucesso"
}
```

### Obter desenho específico
```bash
curl -X GET http://localhost:3000/api/drawings/1
```

### Atualizar apenas a cor
```bash
curl -X PUT http://localhost:3000/api/drawings/1 \
  -H "Content-Type: application/json" \
  -d '{
    "cor": "verde"
  }'
```

### Atualizar dados e cor
```bash
curl -X PUT http://localhost:3000/api/drawings/1 \
  -H "Content-Type: application/json" \
  -d '{
    "cor": "roxo",
    "dados": {
      "shapes": [
        {
          "type": "triangle",
          "x": 150,
          "y": 200,
          "base": 100,
          "height": 80,
          "fill": "#8A2BE2"
        }
      ],
      "modified": true
    }
  }'
```

### Deletar um desenho
```bash
curl -X DELETE http://localhost:3000/api/drawings/1
```

---

## 🏥 **Utilitários**

### Health Check
```bash
curl -X GET http://localhost:3000/api/health
```

### Informações da API
```bash
curl -X GET http://localhost:3000/
```

---

## ✨ **Principais Simplificações**

### ❌ **Removido:**
- Campo `email` do usuário
- Parâmetro `user_id` ao criar desenhos
- Autenticação JWT
- Validações de email
- Múltiplos usuários

### ✅ **Mantido:**
- Coluna `cor` nos desenhos
- Relacionamento User ↔ Drawings
- Validações básicas
- TypeORM com type safety
- Timestamps automáticos

### 🎯 **Como Funciona:**
1. **Usuário Master**: Criado automaticamente no banco
2. **Desenhos**: Todos associados ao usuário master
3. **API Simples**: Só precisa enviar `dados` e `cor` (opcional)
4. **Sem Autenticação**: Foco total na funcionalidade dos desenhos

---

## 📊 **Estrutura de Dados**

### Desenho Completo:
```json
{
  "id": 1,
  "user_id": 1,
  "cor": "azul",
  "dados": {
    "shapes": [
      {
        "type": "circle",
        "x": 100,
        "y": 100,
        "radius": 50,
        "fill": "#0000ff"
      }
    ],
    "tools": ["pencil", "eraser"],
    "canvas": {
      "width": 800,
      "height": 600
    },
    "metadata": {
      "created_with": "AR Cave",
      "version": "1.0"
    }
  },
  "created_at": "2024-01-15T10:35:00.000Z",
  "updated_at": "2024-01-15T10:35:00.000Z",
  "user": {
    "id": 1,
    "name": "DEFAULT MASTER"
  }
}
```

### Cores Sugeridas:
- `"vermelho"`, `"azul"`, `"verde"`, `"amarelo"`
- `"#ff0000"`, `"#0000ff"`, `"#00ff00"`
- `"rgb(255,0,0)"`, `"rgba(0,0,255,0.5)"`
