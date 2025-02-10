Boilerplate Next.js Full-Stack
Un template moderne et complet pour construire des applications web full-stack avec Next.js 15.
Fonctionnalités
🔐 Authentification & Autorisation

Système d'authentification complet
Routes protégées
Gestion des rôles (Utilisateur, Admin, Super Admin)
Gestion des sessions
Système de réinitialisation de mot de passe 
Mot de passe oublié

📧 Système d'Emails

Emails de bienvenue
Vérification d'email
Emails de réinitialisation de mot de passe avec code unique et avec expiration d'une heure 
Templates d'emails personnalisables

💳 Intégration des Paiements

Intégration Stripe
Traitement sécurisé des paiements
Gestion des abonnements en BDD
Historique des paiements en BDD

🎨 Interface Utilisateur

Landing page moderne
Tableau de bord responsive
Panneau de paramètres utilisateur clair
DarkMode
Gestion du Loading 
Gestion des skeletons
Responsive

🗄️ Base de Données

Intégration Prisma ORM
Migrations de base de données
Seeding des données
Requêtes optimisées
Gestion des relations

🛡️ Sécurité

Protection CSRF
Prévention XSS
Limitation de requêtes
Validation des entrées coté client et serveur 
En-têtes sécurisés

Stack Technique

Frontend : Next.js 15+, React, Tailwind CSS
Backend :  Next.js
Base de données : PostgreSQL avec Prisma
Authentification : AuthJs
Paiements : Stripe
Email : Nodemailer (Resend si vous avez un nom de domaine car c'est bien meilleur)
Style : Tailwind CSS, Shadcn UI
Gestion des formulaires : React Hook Form + Zod
Autre librairie : React Hot Toast / TanStack Query / Motion / Lucide React / React Email / BcryptJS / Axios 



# Guide d'Installation

## Prérequis
- Node.js 18+ installé
- PostgreSQL installé et configuré
- Compte Stripe pour les paiements
- Compte Gmail (pour Nodemailer) ou Resend
- Git installé

## Étape 1: Configuration Initiale

1. Clonez le projet et installez les dépendances :
```bash
git clone [le-repos]
cd [nom-projet]
npm install
```

2. Créez votre fichier .env à partir du .env.example :
```bash
cp .env.example .env
```

3. Configurez les variables d'environnement dans .env :

```env
# Base de données exemmple
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"

# Auth
AUTH_SECRET="votre-secret-ultra-securise"
NEXTAUTH_URL="http://localhost:3000"

# Email (Gmail)
SMTP_USER="votre-email@gmail.com"
SMTP_PASSWORD="votre-mot-de-passe-app" # Mot de passe d'application Gmail


# Stripe
STRIPE_SECRET_KEY="sk_test_xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"
STRIPE_PRICE_ID="price_xxxxx" # ID de votre produit/abonnement


# URL App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Étape 2: Configuration de la Base de Données

1. Initialisez Prisma :

npx prisma generate
npx prisma db push


2. (Optionnel) Lancez le seeding pour créer le super admin :

npx prisma db seed


## Étape 3: Configuration de Stripe

1. Créez un compte sur Stripe.com
2. Dans le dashboard Stripe :
   - Créez un produit et notez son PRICE_ID
   - Configurez votre webhook (http://localhost:3000/api/webhook)
   - Copiez les clés API dans votre .env

## Étape 4: Configuration Email

### Pour Gmail :
1. Activez l'authentification 2FA sur votre compte Gmail
2. Générez un mot de passe d'application
3. Utilisez ce mot de passe dans SMTP_PASSWORD

### Pour Resend (recommandé en production) :
1. Créez un compte sur Resend.com
2. Vérifiez votre domaine
3. Copiez votre clé API dans RESEND_API_KEY

## Étape 5: Lancement du Projet

1. Démarrez le serveur de développement :

npm run dev


2. Pour tester Stripe en local, lancez le listener webhook :

stripe listen --forward-to localhost:3000/api/webhook


## Fonctionnalités et Tests

### Tester l'Authentification :
1. Créez un compte utilisateur
2. Vérifiez la réception de l'email de confirmation
3. Testez la réinitialisation de mot de passe
4. Connectez-vous avec le compte super admin

### Tester les Paiements :
1. Utilisez les cartes de test Stripe :
   - Succès : 4242 4242 4242 4242
   - Échec : 4000 0000 0000 0002

## Problèmes Courants

### Erreur de connexion à la base de données
- Vérifiez que PostgreSQL est bien lancé
- Vérifiez les identifiants dans DATABASE_URL

### Emails non reçus
- Vérifiez les logs SMTP
- Vérifiez les paramètres de sécurité Gmail
- Pour Resend, vérifiez la validation du domaine

### Erreurs Stripe
- Vérifiez que le webhook listener est actif
- Confirmez les clés API dans .env
- Vérifiez les logs Stripe Dashboard

## Déploiement

1. Mise à jour des variables d'environnement :
   - Changez NEXTAUTH_URL
   - Mettez à jour DATABASE_URL
   - Configurez les webhooks Stripe en production

2. Base de données :

npx prisma generate
npx prisma db push


3. Construction :

npm run build

## Support

Pour toute question ou problème :
1. Vérifiez la documentation des différentes librairies
2. Consultez les issues GitHub
3. Créez une nouvelle issue si nécessaire

## Ressources Utiles

- [Documentation Auth.js](https://authjs.dev/)
- [Documentation Prisma](https://www.prisma.io/docs/)
- [Documentation Stripe](https://stripe.com/docs)
- [Documentation Nodemailer](https://nodemailer.com/)
