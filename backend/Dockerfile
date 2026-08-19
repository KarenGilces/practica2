FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD ["sh", "-c", "npx prisma db push && npm run dev"]