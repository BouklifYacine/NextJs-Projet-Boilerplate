# ─── STAGE 1: Dependencies ─────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Installer les dépendances nécessaires pour Prisma et autres packages
RUN apk add --no-cache libc6-compat

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./
COPY prisma ./prisma

# Installation des dépendances de production uniquement
RUN npm ci --production=false

# Générer les clients Prisma
RUN npx prisma generate

# ─── STAGE 2: Builder ───────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les dépendances depuis l'étape précédente
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Copier le reste du code source
COPY .env.production .env.production
COPY . .

# Définir l'environnement de production
ENV NODE_ENV=production

# Construire l'application
RUN npm run build

# ─── STAGE 3: Runner ────────────────────────────────────
FROM node:20-alpine AS runner
LABEL org.opencontainers.image.description="Image de production pour NextJs-Projet-Boilerplate"
LABEL org.name="NextJs-Prod-Environment"

WORKDIR /app

# Installer uniquement les dépendances nécessaires pour l'exécution
RUN apk add --no-cache libc6-compat

# Définir l'environnement de production
ENV NODE_ENV=production

# Créer un utilisateur non-root pour des raisons de sécurité
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Utiliser la fonctionnalité standalone de Next.js pour une image plus légère
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copier les fichiers de configuration nécessaires
COPY --from=builder /app/package.json ./package.json

# Définir l'utilisateur pour l'exécution
USER nextjs

# Exposer le port utilisé par l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "server.js"]
