FROM python:3.11

# Instalar Node.js e npm (para scripts se necessário)
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Instalar uv
COPY --from=ghcr.io/astral-sh/uv:0.9.26 /uv /uvx /bin/

WORKDIR /app

# Copiar apenas os arquivos necessários primeiro (melhor cache)
COPY backend/pyproject.toml backend/uv.lock ./backend/
RUN cd backend && uv sync --frozen

# Copiar o resto
COPY . .

EXPOSE 5000

# Rodar backend (serve frontend/dist como estático)
# Usa variável de ambiente PORT do Railway, com fallback para 5000
CMD sh -c "cd backend && uv run python run.py"