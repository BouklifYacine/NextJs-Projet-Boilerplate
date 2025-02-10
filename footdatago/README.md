# 🚀 Next.js Full-Stack Boilerplate

Un template moderne et complet pour construire des applications web full-stack avec Next.js 15, conçu pour une expérience de développement optimale et une mise en production rapide.

## ✨ Fonctionnalités Principales

### 🔐 Authentification & Autorisation
- Authentification complète avec email/mot de passe
- Connexion sociale (Google, GitHub)
- Routes protégées et gestion des sessions
- Système de réinitialisation de mot de passe avec code unique (expiration 1h)
- Gestion des profils utilisateurs
- Protection CSRF et validation des données

### 📧 Système d'Emails Transactionnels
- Emails de bienvenue automatiques
- Notifications de changement de mot de passe
- Codes de vérification pour les actions sensibles
- Templates d'emails personnalisables avec React Email
- Support pour Gmail et Resend

### 💳 Système de Paiement et Abonnements
- Intégration complète de Stripe
- Gestion des abonnements (mensuel/annuel)
- Webhooks pour la synchronisation des paiements
- Historique des transactions
- Mise à niveau/rétrogradation des abonnements

### 🎨 Interface Utilisateur
- Design moderne et responsive
- Composants réutilisables avec shadcn/ui
- Mode sombre/clair
- Gestion des états de chargement
- Formulaires avec validation (React Hook Form + Zod)
- Notifications Toast
- Animations fluides avec Framer Motion

### 🛡️ Sécurité et Performance
- Protection XSS intégrée
- Rate limiting
- Validation serveur et client
- En-têtes de sécurité optimisés
- Sessions sécurisées
- Gestion des erreurs

## 🛠️ Stack Technique

### Frontend
- Next.js 15+
- React
- Tailwind CSS
- Shadcn UI
- React Hook Form
- TanStack Query
- Lucide React
- Framer Motion

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- AuthJS
- Stripe
- Nodemailer/Resend

## 📦 Installation

### Prérequis
- Node.js 18+
- PostgreSQL
- Compte Stripe
- Compte Gmail ou Resend

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
**Option Gmail:**
- Activer 2FA
- Générer un mot de passe d'application

**Option Resend:**
- Créer un compte
- Vérifier le domaine
- Copier la clé API

## 🚀 Démarrage

1. **Développement**
```bash
npm run dev
```

2. **Webhook Stripe (développement)**
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

## 📱 Fonctionnalités et Utilisation

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

### Panel Admin
- Gestion des utilisateurs
- Statistiques des abonnements
- Logs des actions importantes

## 🔧 Personnalisation

### Modification des Templates Email
Les templates sont dans `app/(emails)/`
```tsx
// Exemple de modification
<Text>Personnalisez votre message ici</Text>
```

### Ajout de Plans d'Abonnement
1. Créer le plan dans Stripe
2. Ajouter le plan dans `prisma/schema.prisma`
3. Mettre à jour les composants UI

## 🐛 Dépannage

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

## 📚 Documentation

Pour plus de détails, consultez :
- [Auth.js](https://authjs.dev/)
- [Prisma](https://www.prisma.io/docs/)
- [Stripe](https://stripe.com/docs)
- [Next.js](https://nextjs.org/docs)

## 💡 Support

Pour toute question :
1. Consulter les issues GitHub
2. Créer une nouvelle issue
3. Consulter la documentation des packages

## 📝 License

MIT