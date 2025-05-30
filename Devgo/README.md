# NextJs-Projet-Boilerplate

Ce projet est un boilerplate pour les applications Next.js avec une configuration Docker et Prisma.

## Gestion des migrations Prisma

Lorsque vous modifiez le schéma Prisma (`prisma/schema.prisma`), vous devez créer et appliquer des migrations pour mettre à jour la structure de la base de données.

### Commandes pour les migrations

#### En développement local

Pour créer et appliquer une migration en environnement de développement :

```bash
# Créer une nouvelle migration basée sur les changements du schéma
npx prisma migrate dev --name nom_de_votre_migration
```

Cette commande va :
1. Comparer votre schéma actuel avec l'état de la base de données
2. Générer un fichier de migration SQL dans le dossier `prisma/migrations`
3. Appliquer la migration à votre base de données
4. Régénérer le client Prisma

#### En production

Pour appliquer les migrations en environnement de production :

```bash
npx prisma migrate deploy
```

Cette commande applique toutes les migrations en attente sans générer de nouveaux fichiers.

### Utilisation avec Docker

Si vous utilisez Docker pour le développement, vous pouvez exécuter les migrations à l'intérieur du conteneur :

```bash
# Pour le développement
docker exec -it devgo-dev npx prisma migrate dev --name nom_de_votre_migration

# Pour la production
docker exec -it devgo-prod npx prisma migrate deploy
```

### Réinitialisation de la base de données

Si vous avez besoin de réinitialiser complètement votre base de données en développement :

```bash
npx prisma migrate reset
```

Cette commande va :
1. Supprimer et recréer la base de données
2. Appliquer toutes les migrations
3. Exécuter les seeders (si configurés)

## Autres commandes utiles

```bash
# Visualiser votre schéma dans une interface web
npx prisma studio

# Générer le client Prisma après des modifications manuelles
npx prisma generate
```

## Documentation supplémentaire

Pour plus d'informations sur Docker, consultez le [README.Docker.md](./README.Docker.md).