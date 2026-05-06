FROM python:3.11

# Instalar Node.js
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Instalar uv
COPY --from=ghcr.io/astral-sh/uv:0.9.26 /uv /uvx /bin/

WORKDIR /app

# Copiar tudo
COPY . .

# Instalar dependências
RUN npm install --prefix frontend && npm install
RUN cd backend && uv sync --frozen

# Build frontend
RUN npm run build --prefix frontend

EXPOSE 3000 5001

# Rodar apenas backend (serve frontend estático)
CMD ["npm", "start"]