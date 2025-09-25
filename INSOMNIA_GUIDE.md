# Guia Insomnia - API AR Cave Immersion

Este guia mostra como configurar e testar todas as rotas da API usando o Insomnia.

## 🚀 Configuração Inicial

### 1. Configuração do Environment
Crie um novo Environment no Insomnia com as seguintes variáveis:

```json
{
  "base_url": "http://localhost:3000",
  "user_id": "1",
  "drawing_id": "1"
}
```

### 2. Headers Globais
Configure os headers padrão para todas as requisições:
```
Content-Type: application/json
Accept: application/json
```

## 👥 Rotas de Usuários

### 📋 Listar Todos os Usuários
**Método:** `GET`  
**URL:** `{{ _.base_url }}/users`  
**Headers:** Não necessário  
**Body:** Não necessário  

**Resposta Esperada (200):**
```json
{
  "value": [
    {
      "id": 1,
      "name": "João Silva",
      "created_at": "2025-09-25T10:00:00Z",
      "updated_at": "2025-09-25T10:00:00Z"
    }
  ]
}
```

---

### ➕ Criar Novo Usuário
**Método:** `POST`  
**URL:** `{{ _.base_url }}/users`  
**Headers:** `Content-Type: application/json`  
**Body (JSON):**
```json
{
  "name": "João Silva"
}
```

**Resposta Esperada (201):**
```json
{
  "value": [
    {
      "id": 1,
      "name": "João Silva",
      "created_at": "2025-09-25T10:00:00Z",
      "updated_at": "2025-09-25T10:00:00Z"
    }
  ]
}
```

**Exemplo de Erro (500):**
```json
{
  "error": "Internal Server Error"
}
```

## 🎨 Rotas de Desenhos

### 📋 Listar Todos os Desenhos
**Método:** `GET`  
**URL:** `{{ _.base_url }}/drawings`  
**Headers:** Não necessário  
**Body:** Não necessário  

**Resposta Esperada (200):**
```json
{
  "value": [
    {
      "id": 1,
      "user_id": 1,
      "dados": {
        "coordenadas": [
          {"x": 10, "y": 20},
          {"x": 30, "y": 40}
        ],
        "tipo": "linha"
      },
      "cor": "#FF5733",
      "created_at": "2025-09-25T10:00:00Z",
      "updated_at": "2025-09-25T10:00:00Z",
      "users": {
        "id": 1,
        "name": "João Silva"
      }
    }
  ]
}
```

---

### 👤 Listar Desenhos por Usuário
**Método:** `GET`  
**URL:** `{{ _.base_url }}/drawings/user/{{ _.user_id }}`  
**Headers:** Não necessário  
**Body:** Não necessário  

**Resposta Esperada (200):** Mesma estrutura do endpoint anterior, mas filtrado por usuário.

---

### ➕ Criar Novo Desenho
**Método:** `POST`  
**URL:** `{{ _.base_url }}/drawings`  
**Headers:** `Content-Type: application/json`  
**Body (JSON):**

**Exemplo 1 - Desenho Simples:**
```json
{
  "user_id": 1,
  "dados": {
    "coordenadas": [
      {"x": 10, "y": 20},
      {"x": 30, "y": 40},
      {"x": 50, "y": 60}
    ],
    "tipo": "linha"
  },
  "cor": "#FF5733"
}
```

**Exemplo 2 - Desenho Complexo:**
```json
{
  "user_id": 1,
  "dados": {
    "tipo": "forma",
    "geometria": "retangulo",
    "coordenadas": {
      "inicio": {"x": 0, "y": 0},
      "fim": {"x": 100, "y": 50}
    },
    "propriedades": {
      "preenchimento": true,
      "transparencia": 0.8
    }
  },
  "cor": "#00A8FF"
}
```

**Exemplo 3 - Sem Cor (usará padrão #000000):**
```json
{
  "user_id": 1,
  "dados": {
    "pontos": [
      {"x": 5, "y": 10},
      {"x": 15, "y": 25}
    ]
  }
}
```

**Resposta Esperada (201):**
```json
{
  "value": [
    {
      "id": 2,
      "user_id": 1,
      "dados": {
        "coordenadas": [
          {"x": 10, "y": 20},
          {"x": 30, "y": 40},
          {"x": 50, "y": 60}
        ],
        "tipo": "linha"
      },
      "cor": "#FF5733",
      "created_at": "2025-09-25T11:00:00Z",
      "updated_at": "2025-09-25T11:00:00Z",
      "users": {
        "id": 1,
        "name": "João Silva"
      }
    }
  ]
}
```

**Exemplo de Erro - Usuário não encontrado (404):**
```json
{
  "error": "Usuário não encontrado"
}
```

---

### ✏️ Atualizar Desenho
**Método:** `PUT`  
**URL:** `{{ _.base_url }}/drawings/{{ _.drawing_id }}`  
**Headers:** `Content-Type: application/json`  

**Body (JSON) - Atualizar apenas dados:**
```json
{
  "dados": {
    "coordenadas": [
      {"x": 100, "y": 200},
      {"x": 300, "y": 400}
    ],
    "tipo": "linha_modificada"
  }
}
```

**Body (JSON) - Atualizar apenas cor:**
```json
{
  "cor": "#9C88FF"
}
```

**Body (JSON) - Atualizar ambos:**
```json
{
  "dados": {
    "forma": "circulo",
    "centro": {"x": 50, "y": 50},
    "raio": 25
  },
  "cor": "#FF6B6B"
}
```

**Resposta Esperada (200):**
```json
{
  "value": [
    {
      "id": 1,
      "user_id": 1,
      "dados": {
        "coordenadas": [
          {"x": 100, "y": 200},
          {"x": 300, "y": 400}
        ],
        "tipo": "linha_modificada"
      },
      "cor": "#9C88FF",
      "created_at": "2025-09-25T10:00:00Z",
      "updated_at": "2025-09-25T11:30:00Z",
      "users": {
        "id": 1,
        "name": "João Silva"
      }
    }
  ]
}
```

**Exemplo de Erro - Desenho não encontrado (404):**
```json
{
  "error": "Desenho não encontrado"
}
```

---

### 🗑️ Deletar Desenho
**Método:** `DELETE`  
**URL:** `{{ _.base_url }}/drawings/{{ _.drawing_id }}`  
**Headers:** Não necessário  
**Body:** Não necessário  

**Resposta Esperada (200):**
```json
{
  "message": "Desenho deletado com sucesso"
}
```

**Exemplo de Erro - Desenho não encontrado (404):**
```json
{
  "error": "Desenho não encontrado"
}
```

## 🔄 Fluxo de Teste Completo

### 1. Sequência Recomendada para Testes

1. **Criar um usuário**
   ```
   POST /users
   ```

2. **Listar usuários** (para pegar o ID)
   ```
   GET /users
   ```

3. **Criar desenhos** (usando o user_id obtido)
   ```
   POST /drawings
   ```

4. **Listar todos os desenhos**
   ```
   GET /drawings
   ```

5. **Listar desenhos do usuário**
   ```
   GET /drawings/user/{user_id}
   ```

6. **Atualizar um desenho**
   ```
   PUT /drawings/{drawing_id}
   ```

7. **Deletar um desenho**
   ```
   DELETE /drawings/{drawing_id}
   ```

### 2. Collection para Importar no Insomnia

Crie um arquivo `insomnia-collection.json` e importe no Insomnia:

```json
{
  "_type": "export",
  "__export_format": 4,
  "resources": [
    {
      "_id": "env_ar_cave_api",
      "_type": "environment",
      "name": "AR Cave API",
      "data": {
        "base_url": "http://localhost:3000",
        "user_id": "1",
        "drawing_id": "1"
      }
    }
  ]
}
```

## ❗ Códigos de Status HTTP

- **200 OK**: Requisição bem-sucedida
- **201 Created**: Recurso criado com sucesso  
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro interno do servidor

## 🧪 Exemplos de Dados para Teste

### Usuários de Teste
```json
{"name": "João Silva"}
{"name": "Maria Santos"}
{"name": "Pedro Oliveira"}
```

### Desenhos de Teste
```json
// Desenho de linha
{
  "user_id": 1,
  "dados": {
    "tipo": "linha",
    "pontos": [{"x": 0, "y": 0}, {"x": 100, "y": 100}]
  },
  "cor": "#FF0000"
}

// Desenho de círculo
{
  "user_id": 1,
  "dados": {
    "tipo": "circulo",
    "centro": {"x": 50, "y": 50},
    "raio": 25
  },
  "cor": "#00FF00"
}

// Desenho de polígono
{
  "user_id": 1,
  "dados": {
    "tipo": "poligono",
    "vertices": [
      {"x": 10, "y": 10},
      {"x": 50, "y": 10},
      {"x": 30, "y": 40}
    ]
  },
  "cor": "#0000FF"
}
```

## 🔧 Solução de Problemas

### Erro de Conexão
- Verifique se a API está rodando (`npm run dev`)
- Confirme a URL base no environment

### Erro 500
- Verifique as configurações do Supabase no `.env`
- Confirme se as tabelas foram criadas no Supabase

### Erro 404 ao criar desenho
- Certifique-se que o `user_id` existe na tabela users
