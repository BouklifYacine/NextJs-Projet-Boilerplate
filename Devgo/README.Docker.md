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

## Développement

Pour lancer l'application en mode développement :

```bash
docker compose -f docker-compose.dev.yml up --build
```

Cette commande va :
1. Construire l'image Docker pour le développement (nommée `nextjs-projet-boilerplate-dev:latest`)
2. Démarrer un conteneur PostgreSQL
3. Démarrer l'application en mode développement avec hot-reload

L'application sera accessible à l'adresse : http://localhost:3000

### Caractéristiques du mode développement

- Hot-reload activé (les modifications de code sont appliquées automatiquement)
- Volumes montés pour synchroniser les fichiers entre votre machine et le conteneur
- Base de données PostgreSQL accessible sur le port 5432
- Image Docker optimisée avec une approche multi-étapes

## Production

Pour lancer l'application en mode production :

```bash
docker compose up --build
```

Cette commande va :
1. Construire l'image Docker optimisée pour la production (nommée `nextjs-projet-boilerplate-prod:latest`)
2. Démarrer un conteneur PostgreSQL
3. Démarrer l'application en mode production

L'application sera accessible à l'adresse : http://localhost:3000

### Caractéristiques du mode production

- Image Docker optimisée et légère
- Construction multi-étapes pour réduire la taille de l'image finale
- Utilisation du mode standalone de Next.js
- Exécution avec un utilisateur non-root pour plus de sécurité

## Identification des conteneurs dans Docker Desktop

Les images Docker ont été configurées avec des noms et des labels spécifiques pour faciliter leur identification dans Docker Desktop :

- **Image de développement** : `nextjs-projet-boilerplate-dev:latest` avec le label `NextJs-Dev-Environment`
- **Image de production** : `nextjs-projet-boilerplate-prod:latest` avec le label `NextJs-Prod-Environment`

Ces noms et labels vous permettent de distinguer facilement les différentes images et conteneurs dans l'interface de Docker Desktop.

## Déploiement sur un serveur distant

Pour déployer l'application sur un serveur distant :

1. Construisez l'image pour la plateforme cible :
   ```bash
   docker build -t votre-registry/nextjs-projet-boilerplate-prod:tag -f dockerfile .
   ```

2. Poussez l'image vers votre registry :
   ```bash
   docker push votre-registry/nextjs-projet-boilerplate-prod:tag
   ```

3. Sur le serveur distant, créez un fichier `compose.yaml` et un fichier `.env` avec les configurations appropriées.

4. Lancez l'application :
   ```bash
   docker compose up -d
   ```

## Dépannage

### Problèmes de connexion à la base de données

Si l'application ne peut pas se connecter à la base de données, vérifiez :

1. Que les variables d'environnement dans le fichier `.env` sont correctes
2. Que le service de base de données est bien démarré (`docker compose ps`)
3. Que l'URL de connexion à la base de données est correcte

### Problèmes de build

Si le build échoue, essayez de nettoyer les caches Docker :

```bash
docker builder prune
```

### Problèmes de performance

Si l'application est lente en mode développement, vous pouvez essayer de :

1. Augmenter les ressources allouées à Docker
2. Réduire le nombre de volumes montés
3. Utiliser un volume nommé pour `node_modules` au lieu de le monter depuis l'hôte