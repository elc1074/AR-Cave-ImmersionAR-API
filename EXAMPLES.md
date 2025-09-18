# Exemplos de uso da API (com TypeORM)

## Criar um usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao.silva@email.com"
  }'
```

Resposta esperada:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao.silva@email.com",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  },
  "message": "Usuário criado com sucesso"
}
```

## Listar todos os usuários

```bash
curl -X GET http://localhost:3000/api/users
```

## Obter usuário por ID (com desenhos)

```bash
curl -X GET http://localhost:3000/api/users/1
```

## Atualizar usuário

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Santos Silva"
  }'
```

## Criar um desenho (com nova coluna cor)

```bash
curl -X POST http://localhost:3000/api/drawings \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "cor": "vermelho",
    "dados": {
      "shapes": [
        {
          "type": "circle",
          "x": 100,
          "y": 150,
          "radius": 50,
          "fill": "#ff0000"
        },
        {
          "type": "square",
          "x": 200,
          "y": 200,
          "width": 100,
          "height": 100,
          "fill": "#ff0000"
        }
      ],
      "timestamp": "2024-01-15T10:35:00.000Z",
      "tools": ["pencil", "eraser"]
    }
  }'
```

## Criar um desenho apenas com cor

```bash
curl -X POST http://localhost:3000/api/drawings \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "cor": "azul",
    "dados": {
      "color_palette": ["#0000ff", "#87CEEB", "#4169E1"],
      "brush_size": 5
    }
  }'
```

## Listar desenhos de um usuário

```bash
curl -X GET http://localhost:3000/api/users/1/drawings
```

ou

```bash
curl -X GET http://localhost:3000/api/drawings/user/1
```

## Atualizar apenas a cor de um desenho

```bash
curl -X PUT http://localhost:3000/api/drawings/1 \
  -H "Content-Type: application/json" \
  -d '{
    "cor": "verde"
  }'
```

## Atualizar dados e cor de um desenho

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
      "modified": true,
      "timestamp": "2024-01-15T10:40:00.000Z"
    }
  }'
```

## Buscar desenhos por cor (exemplo de dados retornados)

Ao fazer `GET /api/drawings`, você pode filtrar no client-side por cor:

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
        "name": "João Silva",
        "email": "joao.silva@email.com"
      }
    }
  ]
}
```

## Deletar um desenho

```bash
curl -X DELETE http://localhost:3000/api/drawings/1
```

## Deletar um usuário

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Health Check

```bash
curl -X GET http://localhost:3000/api/health
```

Resposta esperada:
```json
{
  "success": true,
  "message": "API funcionando corretamente",
  "timestamp": "2024-01-15T10:45:00.000Z"
}
```

## Novidades com TypeORM

### Relacionamentos automáticos
- Ao buscar um usuário, os desenhos são carregados automaticamente (se solicitado)
- Ao buscar desenhos, os dados do usuário são incluídos

### Nova coluna "cor"
- Campo opcional para armazenar a cor principal do desenho
- Pode ser usado para filtros e categorização
- Suporta valores como: "vermelho", "azul", "#ff0000", "rgb(255,0,0)", etc.

### Validações aprimoradas
- TypeORM garante integridade referencial
- Relacionamentos são validados automaticamente
- Timestamps são gerenciados automaticamente
