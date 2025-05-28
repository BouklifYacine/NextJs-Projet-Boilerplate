# syntax=docker/dockerfile:1.4

#################################################
# 1) Installer deps + prisma generate
#################################################
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

#################################################
# 2) Builder Next.js en montant le .env en secret
#################################################
FROM deps AS builder
WORKDIR /app
COPY . .

# on monte .env en secret puis on l’exporte juste pour le build
RUN --mount=type=secret,id=env,target=/run/secrets/env \
    set -a && . /run/secrets/env && npm run build

#################################################
# 3) Image de production légère
#################################################
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copier uniquement l’essentiel
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push && npm run start"]
