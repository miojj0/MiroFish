# MiroFish no Railway - Guia de Deploy

## Pré-requisitos
- Conta no Railway (railway.app)
- Repositório Git com GitHub/GitLab/Bitbucket

## Passo 1: Conectar Repositório ao Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project" → "Deploy from GitHub"
3. Conecte sua conta GitHub e selecione o repositório `mirofish`
4. Railway detectará o Dockerfile automaticamente

## Passo 2: Configurar Variáveis de Ambiente

No dashboard do Railway, vá para **Variables** e adicione:

| Variável | Valor |
|----------|-------|
| `LLM_API_KEY` | Sua chave OpenAI (começa com `sk-proj-`) |
| `ZEP_API_KEY` | Sua chave Zep Cloud |
| `FLASK_DEBUG` | `False` (produção) |
| `FLASK_HOST` | `0.0.0.0` |

⚠️ **NÃO commite chaves no repositório!** Use o Railway Dashboard para variáveis sensíveis.

## Passo 3: Configurar Porta

No Railway:
1. Vá para **Settings**
2. Verifique se **Port** está setado como `5000` (ou confira em `backend/run.py`)
3. Ou defina `FLASK_PORT=5000` nas variáveis

## Passo 4: Deploy

1. Faça push para main/master:
```bash
git push origin main
```

2. Railway detectará automaticamente e iniciará o build
3. Monitore o build logs no dashboard

## Troubleshooting

### Erro: "LLM_API_KEY not configured"
- Verifique as variáveis de ambiente no dashboard do Railway
- Certifique-se de que não tem espaços extras

### Erro: "Port already in use"
- Railway provisiona a porta automaticamente
- Não use porta fixa, use a variável de ambiente `$PORT`

### Frontend não carrega
- Verifique se `frontend/dist/` está no repositório
- Verifique se o path está correto em `backend/app/__init__.py`

### Build tarda muito
- CAMEL-AI é pesado, pode levar 10-15 minutos no primeiro build
- Paciência com o build inicial
