#  Next.js Full-Stack DevGo Boilerplate v0.6

Une boilerplate moderne et complète pour construire des applications web full-stack avec Next.js 15, conçue pour une expérience de développement optimale et pour pouvoir se concentrer sur les fonctionnalités métier.

## ✨ Fonctionnalités Principales

### 🔐 Authentification & Autorisation
- Authentification complète avec email/mot de passe
- Connexion sociale (Google, GitHub)
- Routes protégées et gestion des sessions
- Système de réinitialisation de mot de passe avec code unique par email (expiration 1h)
- Mot de passe oublié avec email 
- Gestion des profils utilisateurs par les admins
- Protection CSRF et validation des données

### 📧 Système d'Emails Transactionnels
- Emails de bienvenue automatiques
- Notifications de changement de mot de passe
- Codes de vérification pour les actions sensibles
- Templates d'emails personnalisables avec React Email
- Support pour Gmail 

### 💳 Système de Paiement et Abonnements
- Intégration complète de Stripe
- Gestion des abonnements (mensuel/annuel)
- Webhooks pour la synchronisation des paiements
- Historique des transactions
- Mise à niveau/rétrogradation des abonnements en mode dev uniquement 

### 🎨 Interface Utilisateur
- Design moderne et responsive
- Composants réutilisables avec shadcn/ui
- Gestion des états de chargement
- Formulaires avec validation (React Hook Form + Zod)
- Notifications Toast
- Animations fluides avec Framer Motion sur la landing page 

### 🛡️ Sécurité et Performance
- Protection XSS intégrée
- Rate limiting
- Validation serveur et client
- En-têtes de sécurité optimisés
- Sessions sécurisées
- Gestion des erreurs
- Routes sécurisées avec session et rôles

## 🛠️ Stack Technique

### Frontend
- Next.js 15+
- TypeScript 
- React
- Tailwind CSS
- Shadcn UI
- React Hook Form
- TanStack Query
- Lucide React
- Framer Motion

### Backend
- Next.js API Routes
- TypeScript 
- Prisma ORM
- PostgreSQL
- AuthJS
- Stripe
- Nodemailer (Resend dans la prochaine version)

## 📦 Installation

### Prérequis
- Node.js 18+
- PostgreSQL
- Compte Stripe
- Compte Gmail 

### Configuration Initiale

1. **Cloner et installer**
```bash
git clone [votre-repo]
cd [nom-projet]
npm install
```

2. **Configuration des variables d'environnement**
```bash
cp .env.example .env
```

3. **Variables d'environnement requises**
```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"

# Auth
AUTH_SECRET="votre-secret"
NEXTAUTH_URL="http://localhost:3000"

# Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Email
SMTP_USER="votre-email@gmail.com"
SMTP_PASSWORD="mot-de-passe-app"
# OU
RESEND_API_KEY=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_PRICE_ID=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Configuration de la Base de Données

1. **Initialisation de Prisma**
```bash
npx prisma generate
npx prisma db push
```

### Configuration des Services

#### 1. Stripe
- Créer un compte Stripe
- Configurer un produit d'abonnement
- Noter le PRICE_ID
- Configurer le webhook (URL: `/api/webhook`)

#### 2. Email
**Option Gmail :**
- Activer 2FA
- Générer un mot de passe d'application
- Le rentrer ensuite dans le .env : SMTP_PASSWORD="mot-de-passe-app"

## Démarrage

1. **Développement**
```bash
npm run dev
```

2. **Webhook Stripe (développement)**
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

##  Fonctionnalités et Utilisation

### Gestion des Utilisateurs
- Inscription avec email/mot de passe
- Connexion sociale (Google/GitHub)
- Gestion du profil :
  - Modification email
  - Changement de mot de passe
  - Mise à jour du pseudo
  - Suppression de compte

### Système d'Abonnement
- Plans disponibles : Gratuit et Pro
- Changement de plan
- Gestion de la facturation
- Historique des paiements
- Possibilité de résilier son abonnement 

### Panel Admin
- Gestion des utilisateurs
- Statistiques des revenus moyens de l'application par utilisateur  
- Statistiques des revenus totaux de l'application
- Statistiques des revenus par mois de l'application
- Statistiques des revenus moyens de l'application
- Pagination dynamique 
- Filtre par admin et abonnement pour voir si les utilisateurs sont admins et/ou ont des abonnements 
- Input de recherche par pseudo pour trouver les utilisateurs de votre site 
- Possibilité pour l'admin de passer des utilisateurs en Admin et des admins en utilisateur 

##  Personnalisation

### Modification des Templates Email
Les templates sont dans `app/(emails)/`
```tsx
// Exemple de modification
<Text>Personnalisez votre message ici</Text>
```
Les changer ensuite là où ces emails sont utilisés. Vérifiez les API de bienvenue.

### Ajout de Plans d'Abonnement
1. Créer le plan dans Stripe
2. Ajouter le plan dans `prisma/schema.prisma`
3. Mettre à jour les composants UI

### Ajout de produits Stripe dans notre application 
1. Aller sur le mode Compte Stripe dans catalogue produits 
2. Cliquer sur Créer un produit, valider quand tout est bon 
3. Aller dans catalogue de produits et cliquer sur l'ID du produit que vous voulez récupérer 
4. En mode test, copier l'ID du produit en cliquant sur les 3 petits points. En mode dev, copier directement l'ID du produit affiché 
5. Aller dans le .env et copier votre produit selon son type d'abonnement, ici par mois : STRIPE_MONTHLY_PRICE_ID="blabla"
6. Utiliser le .env dans votre code pour ne pas afficher le secret avec process.env.STRIPE_MONTHLY_PRICE_ID

### Version 1.0 qui commencera son développement en Mai 

# 🚀 FEATURES ESSENTIELLES

## 🛠️ Architecture & Tech
- Dark Mode
- Zustand pour state management
- Redis pour le cache
- Architecture modulaire
- CI/CD (Github Actions)
- Tests complets (Unit, E2E, Integration)

## 🎨 Personnalisation
- Système marque blanche
  * Couleurs personnalisables
  * Polices configurables

## 🔒 Sécurité
- 2FA (email)
- Protection CSRF améliorée
- Rate limiting
- Super Admin unique

## 👤 ESPACE UTILISATEUR
### Profil & Préférences
- Upload photo de profil
- Paramètres notifications
- Préférences emails
- Export données personnelles
- Système de feedback/bug

## 📊 DASHBOARD ADMIN
### 🏠 Page d'Accueil
#### Stats Aujourd'hui
- Inscriptions du jour
- Revenus journaliers
- Utilisateurs actifs
- Nouveaux abonnements

#### Vue Hebdomadaire
- Graphique inscriptions
- Total revenus semaine
- Comparaison semaine -1

### 👥 Gestion Utilisateurs
#### Filtres Avancés
- Période (aujourd'hui/7j/30j)
- Source (Email/Google/GitHub)
- Abonnement (Mensuel/Annuel)

#### Actions
- Export CSV
- Ban/Unban
- Gestion rôles
- Vue détaillée

### 💰 Section Revenus
#### Stats Mensuelles
- Total du mois
- Comparaison M-1
- Graphique journalier
- Top 3 meilleurs jours

#### Abonnements
- Répartition (camembert)
- Liste derniers abonnés

### 📝 Section Activité
#### Timeline
- Nouvelles inscriptions
- Nouveaux abonnements
- Changements de rôles
- Actions importantes

### 🔔 Notifications
#### Système Temps Réel
##### Cloche notifications
- Nouveaux abonnés
- Feedbacks reçus
- Utilisateurs bannis

#### Emails Admin
- Rapport hebdo inscriptions
- Rapport hebdo revenus

## 🎨 UI/UX
### Design
- Design System complet
- Composants réutilisables
- Animations fluides
- Tooltips contextuels
- Skeleton loading
- Full responsive

## ⚡ PERFORMANCE
### Optimisations
- Images optimisées
- Lazy loading
- Cache stratégique
- Monitoring temps réel

## 📚 DOCUMENTATION
### Guides
- Installation détaillée
- Guide développeur
- Guide customisation
- Bonnes pratiques
- Doc API complète

### Problèmes Courants

1. **Erreur de Base de Données**
- Vérifier la connexion PostgreSQL
- Valider DATABASE_URL
- Exécuter `npx prisma db push`

2. **Problèmes d'Email**
- Vérifier les credentials SMTP
- Consulter les logs email
- Tester avec Resend

3. **Erreurs Stripe**
- Vérifier les clés API
- Confirmer le webhook
- Consulter les logs Stripe

##  Documentation

Pour plus de détails, consultez :
- [Auth.js](https://authjs.dev/)
- [Prisma](https://www.prisma.io/docs/)
- [Stripe](https://stripe.com/docs)
- [Next.js](https://nextjs.org/docs)

##  Support

Pour toute question :
1. Consulter les issues GitHub
2. Créer une nouvelle issue
3. Consulter la documentation des packages

## 📝 License

MIT