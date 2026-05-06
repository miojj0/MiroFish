FROM python:3.11

# Instalar Node.js e npm (para scripts se necessário)
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Instalar uv
COPY --from=ghcr.io/astral-sh/uv:0.9.26 /uv /uvx /bin/

WORKDIR /app

# Copiar tudo
COPY . .

# Instalar apenas Python (frontend já está buildado em dist/)
RUN cd backend && uv sync --frozen

EXPOSE 3000 5001

# Rodar backend (serve frontend/dist como estático)
CMD sh -c "cd backend && uv run python run.py"