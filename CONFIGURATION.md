# 🔧 CONFIGURATION EXTRA NOW

## 🎯 Configuration Générale

```json
{
  "project": {
    "name": "Extra Now",
    "version": "1.0.0",
    "description": "Plateforme de mise en relation d'extras en hôtellerie & restauration",
    "author": "Extra Now Team",
    "email": "support@extranow.fr",
    "website": "www.extranow.fr",
    "launchDate": "2024-01"
  },

  "branding": {
    "logo": "Extra Now",
    "colors": {
      "primary": "#1a1a2e",
      "primaryDark": "#0f3460",
      "accent": "#ff6b35",
      "accentLight": "#ffa94d",
      "white": "#f8f9fa",
      "gray": "#e9ecef",
      "textDark": "#2c3e50",
      "success": "#27ae60",
      "warning": "#f39c12",
      "danger": "#e74c3c"
    },
    "fonts": {
      "family": "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      "h1": "3.5rem",
      "h2": "2.5rem",
      "h3": "1.8rem",
      "body": "1rem"
    }
  },

  "features": {
    "inscription": true,
    "matching": true,
    "notation": true,
    "paiement": true,
    "notifications": true,
    "support": true
  },

  "pages": [
    {
      "name": "Accueil",
      "path": "/",
      "file": "index.html",
      "description": "Page d'accueil avec hero et 5 sections"
    },
    {
      "name": "Entreprises",
      "path": "/entreprise",
      "file": "pages/entreprise.html",
      "description": "Page dédiée aux restaurateurs et hôteliers"
    },
    {
      "name": "Extras",
      "path": "/extra",
      "file": "pages/extra.html",
      "description": "Page d'inscription pour les extras"
    },
    {
      "name": "FAQ",
      "path": "/faq",
      "file": "pages/faq.html",
      "description": "Questions-réponses pour entreprises et extras"
    },
    {
      "name": "À Propos",
      "path": "/apropos",
      "file": "pages/apropos.html",
      "description": "Histoire et vision de la plateforme"
    }
  ],

  "seo": {
    "keywords": [
      "extra restauration",
      "extra hôtellerie",
      "mission serveur",
      "personnel événementiel",
      "extra cuisinier",
      "recrutement urgent"
    ],
    "canonicalUrl": "https://www.extranow.fr",
    "sitemap": "/sitemap.xml",
    "robots": "/robots.txt"
  },

  "api": {
    "baseUrl": "https://api.extranow.fr",
    "version": "v1",
    "endpoints": {
      "users": "/api/v1/users",
      "missions": "/api/v1/missions",
      "applications": "/api/v1/applications",
      "ratings": "/api/v1/ratings",
      "payments": "/api/v1/payments",
      "support": "/api/v1/support"
    }
  },

  "stripe": {
    "publicKey": "pk_live_XXXXXXXXXXXXXXXXXXXXX",
    "secretKey": "sk_live_XXXXXXXXXXXXXXXXXXXXX",
    "version": "2023-10-16",
    "webhook": "/webhook/stripe"
  },

  "email": {
    "service": "SendGrid",
    "apiKey": "SG.XXXXXXXXXXXXXXXXXXXXX",
    "from": "noreply@extranow.fr",
    "support": "support@extranow.fr",
    "templates": {
      "welcome": "d-xxxxxxxxxxxxxxxxxxxxx",
      "confirmation": "d-xxxxxxxxxxxxxxxxxxxxx",
      "reminder": "d-xxxxxxxxxxxxxxxxxxxxx",
      "receipt": "d-xxxxxxxxxxxxxxxxxxxxx"
    }
  },

  "notifications": {
    "email": true,
    "sms": true,
    "push": false,
    "inApp": true
  },

  "database": {
    "type": "PostgreSQL",
    "host": "db.extranow.fr",
    "port": 5432,
    "name": "extranow_db",
    "ssl": true
  },

  "security": {
    "jwt": {
      "secret": "XXXXXXXXXXXXXXXXXXXXX",
      "expiresIn": "7d"
    },
    "cors": {
      "origins": [
        "https://www.extranow.fr",
        "https://extranow.fr",
        "https://app.extranow.fr"
      ],
      "credentials": true
    },
    "rateLimit": {
      "windowMs": 15,
      "maxRequests": 100
    }
  },

  "compliance": {
    "gdpr": {
      "enabled": true,
      "policyUrl": "/politique-confidentialite"
    },
    "cgu": {
      "enabled": true,
      "url": "/cgu"
    },
    "legal": {
      "enabled": true,
      "url": "/mentions-legales"
    }
  },

  "analytics": {
    "google": {
      "trackingId": "G-XXXXXXXXXXXXX",
      "enabled": true
    },
    "mixpanel": {
      "token": "XXXXXXXXXXXXXXXXXXXXX",
      "enabled": true
    }
  },

  "monitoring": {
    "sentry": {
      "dsn": "https://XXXXXXXXXXXXXXXXXXXXX@XXXXX.ingest.sentry.io/XXXXX",
      "enabled": true
    },
    "logLevel": "info"
  },

  "deployment": {
    "platform": "Heroku / DigitalOcean / AWS",
    "environment": "production",
    "region": "eu-west-1",
    "cdn": "Cloudflare"
  }
}
```

---

## 🌍 VARIABLES D'ENVIRONNEMENT

```bash
# Environnement
NODE_ENV=production
PORT=3000

# Stripe
STRIPE_PUBLIC_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXXXXX

# Email (SendGrid)
SENDGRID_API_KEY=SG.XXXXXXXXXXXXXXXXXXXXX

# Base de données
DATABASE_URL=postgresql://user:password@host:port/database
DB_HOST=db.extranow.fr
DB_PORT=5432
DB_NAME=extranow_db

# JWT
JWT_SECRET=XXXXXXXXXXXXXXXXXXXXX
JWT_EXPIRES_IN=7d

# Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXXXXX

# Sentry
SENTRY_DSN=https://XXXXXXXXXXXXXXXXXXXXX@XXXXX.ingest.sentry.io/XXXXX

# Domaine
DOMAIN=https://www.extranow.fr
API_URL=https://api.extranow.fr
```

---

## 📊 CHIFFRES CLÉS À SUIVRE

| Métrique | Objectif | Tracking |
|----------|----------|----------|
| Extras inscrits | 5,000+ | Dashboard |
| Entreprises | 1,200+ | Dashboard |
| Missions réalisées | 15,000+ | Database |
| Satisfaction | 4.8/5 | Surveys |
| Taux conversion | 15% | Analytics |
| Revenue/mois | €50K+ | Stripe |

---

## 📅 ROADMAP

### Q1 2024
- ✅ Site web lancé
- ✅ Landing page
- [ ] Backend API
- [ ] Authentification

### Q2 2024
- [ ] Paiement Stripe
- [ ] Matching algorithm
- [ ] Notifications email
- [ ] Dashboard utilisateur

### Q3 2024
- [ ] App mobile iOS
- [ ] App mobile Android
- [ ] Support chat
- [ ] Système de notation

### Q4 2024
- [ ] Expansion géographique
- [ ] Partenariats B2B
- [ ] Blog & content
- [ ] Amélioration SEO

---

## 🚀 DÉPLOIEMENT

### Commandes
```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build

# Production
npm start

# Tests
npm test

# Deploy
git push heroku main
```

---

## 📊 MÉTRIQUES À SUIVRE

- Taux de conversion visiteurs → inscrits
- Temps moyen pour trouver un extra
- Taux de satisfaction
- Coût d'acquisition client (CAC)
- Lifetime value (LTV)
- Taux de rétention
- NPS (Net Promoter Score)

---

## 🔐 CONFORMITÉ

✅ RGPD - Données personnelles protégées  
✅ CGU - Termes d'utilisation clairs  
✅ PCI DSS - Paiements sécurisés (Stripe)  
✅ GDPR - Cookies et tracking transparents  
✅ Assurance responsabilité civile  

---

**Dernière mise à jour** : Janvier 2024
