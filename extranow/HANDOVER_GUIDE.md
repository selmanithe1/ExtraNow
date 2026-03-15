# Guide de Passation - ExtraNow MVP

Félicitations pour l'acquisition d'ExtraNow ! Ce document contient toutes les informations nécessaires pour installer, configurer et lancer la plateforme.

## 🚀 Technologies Utilisées

- **Framework** : Next.js 15+ (App Router)
- **Base de données** : PostgreSQL via Prisma ORM
- **Authentification** : NextAuth.js (système complet Admin, Extras, Entreprises)
- **Paiements** : Intégration Stripe (Missions pré-payées)
- **Emails** : Resend API (Notifications transactionnelles)
- **Design** : Tailwind CSS + Framer Motion (Animations premium)

## 🛠️ Installation Locale

1. **Cloner le projet** :

   ```bash
   git clone <url-du-repo>
   cd extranow
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   ```

3. **Configuration de la base de données** :
   - Assurez-vous d'avoir une instance PostgreSQL locale ou distante.
   - Initialisez les tables :
     ```bash
     npx prisma migrate dev
     npx prisma db seed
     ```

4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
   Le site sera accessible sur `http://localhost:3000`.

## ⚙️ Variables d'Environnement (.env)

Créez un fichier `.env` à la racine avec les clés suivantes :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/extranow"

# NextAuth
NEXTAUTH_SECRET="votre_secret_aleatoire"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend (Emails)
RESEND_API_KEY="re_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🛡️ Accès Par Défaut

- **Compte Admin** : `admin@extranow.fr` / `admin123`
- **Dashboard Admin** : accessible via `/admin` après connexion.

## 🏗️ Déploiement Production

La plateforme est optimisée pour **Vercel**.

- Connectez votre repo GitHub à Vercel.
- Configurez les variables d'environnement dans le dashboard Vercel.
- Build command : `npm run build`

---

_Support : Pour toute question technique, n'hésitez pas à consulter les logs système ou la documentation officielle de Next.js._
