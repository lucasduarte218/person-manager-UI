# Configuração da API

## URL do Backend

A aplicação está configurada para usar diferentes URLs dependendo do ambiente:

### Produção
- **URL**: `https://PersonManager.somee.com/api`
- **Ambiente**: Detectado automaticamente quando a aplicação é buildada para produção

### Desenvolvimento
- **URL**: `https://localhost:7073/api`
- **Ambiente**: Detectado automaticamente quando rodando em modo dev

## Arquivos de Configuração

### `src/config/index.ts`
Configuração principal da aplicação contendo:
- URL base da API
- Endpoints específicos
- Configurações de autenticação
- Funções utilitárias

### `src/config/environments.ts`
Configurações específicas por ambiente:
- URLs diferentes para dev/prod
- Flags de debug
- Detecção automática de ambiente

## Como Alterar a URL do Backend

### Opção 1: Editar o arquivo de configuração
Edite `src/config/environments.ts` e altere a URL do ambiente desejado:

```typescript
export const environments = {
  production: {
    API_BASE_URL: 'https://SuaNovaURL.com/api',
    DEBUG: false
  }
}
```

### Opção 2: Usar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```
VITE_API_BASE_URL=https://SuaNovaURL.com/api
```

## Endpoints Disponíveis

### Autenticação
- `POST /v1/auth/login` - Login
- `POST /v1/auth/register` - Registro

### Pessoas (V1 - Sem autenticação)
- `GET /v1/person` - Listar pessoas
- `GET /v1/person/{id}` - Obter pessoa por ID
- `POST /v1/person` - Criar pessoa
- `PUT /v1/person/{id}` - Atualizar pessoa
- `DELETE /v1/person/{id}` - Deletar pessoa

### Pessoas (V2 - Com autenticação)
- `GET /v2/person` - Listar pessoas
- `GET /v2/person/{id}` - Obter pessoa por ID
- `POST /v2/person` - Criar pessoa
- `PUT /v2/person/{id}` - Atualizar pessoa
- `DELETE /v2/person/{id}` - Deletar pessoa

## Validação de Configuração

O sistema valida automaticamente se a URL da API está correta durante a inicialização da aplicação.
