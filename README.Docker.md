# Guide Docker pour NextJs-Projet-Boilerplate

Ce guide explique comment utiliser Docker pour développer et déployer l'application NextJs-Projet-Boilerplate.

## Prérequis

- Docker et Docker Compose installés sur votre machine
- Un fichier `.env` configuré (basé sur `env.exemple`)

## Configuration de l'environnement

Avant de démarrer, assurez-vous de créer un fichier `.env` à la racine du projet en vous basant sur le fichier `env.exemple`. Ce fichier doit contenir toutes les variables d'environnement nécessaires au fonctionnement de l'application.

Ajoutez également ces variables pour la base de données PostgreSQL :

```
POSTGRES_PASSWORD=votre_mot_de_passe
POSTGRES_USER=votre_utilisateur
POSTGRES_DB=nom_de_votre_db
```

## Commandes Docker simplifiées

### Mode Développement

```bash
# Démarrer l'application en mode développement
docker compose -f docker-compose.dev.yml up --build -d

# Arrêter l'application
docker compose -f docker-compose.dev.yml down

# Voir les logs
docker logs -f devgo-dev

# Exécuter des commandes dans le conteneur (ex: Prisma)
docker exec -it devgo-dev npx prisma migrate dev
```

### Mode Production

```bash
# Démarrer l'application en mode production
docker compose up --build -d

# Arrêter l'application
docker compose down

# Voir les logs
docker logs -f devgo-prod

# Exécuter des commandes dans le conteneur (ex: Prisma)
docker exec -it devgo-prod npx prisma migrate deploy
```

## Caractéristiques des images Docker

### Image de développement (1.78GB)

- Nom du conteneur: `devgo-dev`
- Nom de l'image: `nextjs-projet-boilerplate-dev:latest`
- Inclut toutes les dépendances de développement
- Hot-reload activé (les modifications de code sont appliquées automatiquement)
- Volumes montés pour synchroniser les fichiers entre votre machine et le conteneur
- Base de données PostgreSQL accessible sur le port 5432

### Image de production (319MB)

- Nom du conteneur: `devgo-prod`
- Nom de l'image: `nextjs-projet-boilerplate-prod:latest`
- Image optimisée et légère (seulement 319MB)
- Construction multi-étapes pour réduire la taille de l'image finale
- Utilisation du mode standalone de Next.js
- Exécution avec un utilisateur non-root pour plus de sécurité

## Accès à l'application

L'application sera accessible à l'adresse : http://localhost:3000

## Différences principales entre développement et production

| Fonctionnalité | Développement | Production |
|----------------|---------------|------------|
| Hot-reload | ✅ | ❌ |
| Taille de l'image | 1.78GB | 319MB |
| Volumes montés | ✅ | ❌ |
| Optimisation | ❌ | ✅ |
| Utilisateur non-root | ❌ | ✅ |
| Fichier Docker | dockerfile.dev | dockerfile |
| Fichier Compose | docker-compose.dev.yml | compose.yaml |

## Dépannage

### Problèmes de connexion à la base de données

Si l'application ne peut pas se connecter à la base de données, vérifiez :

1. Que les variables d'environnement dans le fichier `.env` sont correctes
2. Que le conteneur de la base de données est bien démarré : `docker ps | grep db`
3. Que vous pouvez vous connecter à la base de données : `docker exec -it devgo-prod-db psql -U postgres`

### Problèmes de migration Prisma

Pour appliquer les migrations Prisma :

```bash
# En développement
docker exec -it devgo-dev npx prisma migrate dev

# En production
docker exec -it devgo-prod npx prisma migrate deploy
```

### Redémarrer les conteneurs

```bash
# En développement
docker restart devgo-dev devgo-dev-db

# En production
docker restart devgo-prod devgo-prod-db
```