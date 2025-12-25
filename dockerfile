# ─── STAGE 1: Dependencies ─────────────────────────────
FROM oven/bun:1.2-alpine AS deps
WORKDIR /app

# Installer les dépendances nécessaires pour Prisma et autres packages
RUN apk add --no-cache libc6-compat

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json bun.lock* ./
COPY prisma ./prisma

# Installation des dépendances avec Bun
RUN bun install --frozen-lockfile

# Générer les clients Prisma
RUN bunx prisma generate --schema=prisma/schema

# ─── STAGE 2: Builder ───────────────────────────────────
FROM oven/bun:1.2-alpine AS builder
WORKDIR /app

# Copier les dépendances depuis l'étape précédente
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Copier le reste du code source
COPY . .

# Construire l'application TanStack Start
RUN bun run build

# ─── STAGE 3: Runner ────────────────────────────────────
FROM oven/bun:1.2-alpine AS runner
LABEL org.opencontainers.image.description="Image de production pour TanStack Start Boilerplate"
LABEL org.name="TanStack-Start-Prod-Environment"

WORKDIR /app

# Installer uniquement les dépendances nécessaires pour l'exécution
RUN apk add --no-cache libc6-compat

# Créer un utilisateur non-root pour des raisons de sécurité
RUN addgroup --system --gid 1001 bunjs \
    && adduser --system --uid 1001 appuser

# Copier les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Définir l'utilisateur pour l'exécution
USER appuser

# Exposer le port utilisé par l'application
EXPOSE 3000

# Définir l'environnement de production
ENV NODE_ENV=production

# Exécuter les migrations Prisma puis démarrer l'application TanStack Start
CMD ["sh", "-c", "bunx prisma migrate deploy && exec bun run start"]