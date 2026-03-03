# 🎨 EXTRA NOW - GUIDE DE STYLE

## IDENTITÉ VISUELLE

### 🎯 Logo
**Nom** : ExtraNow (ou Extra Now)  
**Style** : Moderne, épuré, professionnel  
**Couleurs** : Bleu foncé (#1a1a2e) + Orange (#ff6b35)

```
Extra Now
^^^^^^  (Bleu foncé - primaire)
     ^^^  (Orange - accent/énergie)
```

---

## 🎨 PALETTE DE COULEURS

| Couleur | Code | Usage |
|---------|------|-------|
| **Primaire** | #1a1a2e | Headers, texte principal, backgrounds |
| **Primaire Dark** | #0f3460 | Dégradés, hover states |
| **Accent Orange** | #ff6b35 | CTA, highlights, accents |
| **Accent Light** | #ffa94d | Hover orange, transitions |
| **White** | #f8f9fa | Sections, cartes, bkg clair |
| **Gray** | #e9ecef | Séparations, backgrounds neutres |
| **Text Dark** | #2c3e50 | Corps du texte, lisibilité |
| **Success** | #27ae60 | Validations, confirmations |
| **Warning** | #f39c12 | Alertes, attention |
| **Danger** | #e74c3c | Erreurs, problèmes |

---

## 📝 TYPOGRAPHIE

### Familles de Police
```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Échelle Typographique

| Élément | Taille | Weight | Line-height |
|---------|--------|--------|-------------|
| **H1** | 3.5rem | 800 | 1.2 |
| **H2** | 2.5rem | 700 | 1.3 |
| **H3** | 1.8rem | 700 | 1.4 |
| **H4** | 1.3rem | 600 | 1.5 |
| **Body** | 1rem | 400 | 1.6 |
| **Small** | 0.9rem | 400 | 1.5 |

### Spacing
```css
Line-height: 1.6 pour le corps du texte
Margin-bottom: 1.5rem entre paragraphes
Letter-spacing: 1px pour les titres
```

---

## 🎯 COMPOSANTS

### Boutons

#### CTA Primary (Orange)
```css
.btn-primary {
    background: #ff6b35;
    color: white;
    padding: 1rem 2.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-primary:hover {
    background: #ffa94d;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
}
```

#### Bouton Secondary (Blanc)
```css
.btn-secondary {
    background: white;
    color: #1a1a2e;
    padding: 1rem 2.5rem;
    border-radius: 8px;
    font-weight: 600;
}

.btn-secondary:hover {
    background: #e9ecef;
    transform: translateY(-2px);
}
```

### Cartes/Cards
```css
.card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border-top: 4px solid #ff6b35;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}
```

### Formulaires
```css
input, select, textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
}

input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #ff6b35;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}
```

---

## 📐 ESPACEMENTS

### Container Principal
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 2rem;
```

### Sections
```css
padding: 5rem 2rem;  /* Desktop */
padding: 3rem 1rem;  /* Tablet */
padding: 2rem 1rem;  /* Mobile */
```

### Gap Grid
```css
gap: 2rem;   /* Desktop */
gap: 1.5rem; /* Tablet */
gap: 1rem;   /* Mobile */
```

---

## 🌐 RESPONSIVE DESIGN

### Breakpoints
```css
@media (max-width: 1024px) { /* Laptop */}
@media (max-width: 768px)  { /* Tablet */}
@media (max-width: 480px)  { /* Mobile */}
```

### Principes Mobile-First
1. Commencer par le mobile (320px)
2. Ajouter styles pour tablettes (768px)
3. Ajouter styles pour desktops (1024px+)
4. Tester sur tous les appareils

---

## ✨ ANIMATIONS & TRANSITIONS

### Transition Standard
```css
transition: all 0.3s ease;
```

### Hover Effects
```css
transform: translateY(-2px);           /* Lift effect */
transform: scale(1.05);                /* Scale effect */
box-shadow: 0 10px 25px rgba(...);    /* Shadow effect */
```

### Durations
```css
0.2s : Microinteractions rapides
0.3s : Hover states, transitions
0.5s : Page transitions
1s   : Animations longues
```

---

## 🎯 ICONOGRAPHIE

### Emojis Utilisés
| Emoji | Utilisation |
|-------|------------|
| ✓ | Confirmations, avantages |
| 🔒 | Sécurité, protection |
| 💬 | Support, communication |
| 📋 | Formulaires, documents |
| ⚡ | Rapidité, performance |
| 👥 | Communauté, équipe |
| 🎯 | Objectifs, cibles |
| 💰 | Argent, paiement |
| ⭐ | Qualité, évaluation |
| 🕐 | Temps, flexibilité |

### Tailles
```css
.icon-small  { font-size: 1.5rem; }
.icon-medium { font-size: 2rem;   }
.icon-large  { font-size: 3rem;   }
```

---

## 🎬 SECTIONS TYPES

### Hero Section
```css
min-height: 600px;
background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
color: white;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
```

### Feature Sections
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 2rem;
```

### Stats Section
```css
background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
color: white;
```

---

## 📱 MOBILE OPTIMIZATION

### Priorités
1. Lisibilité (min 16px)
2. Touch targets (min 48x48px)
3. Performance (< 3s load)
4. Accessibilité (contrast 4.5:1)

### Fonts Mobile
```css
h1: 1.8rem  (desktop: 3.5rem)
h2: 1.5rem  (desktop: 2.5rem)
body: 1rem  (desktop: 1rem)
```

### Navigation Mobile
- Menu burger pour < 768px
- Navigation sticky en haut
- Liens espacés pour tactile

---

## ♿ ACCESSIBILITÉ

### Contrast Ratios
- Minimum 4.5:1 pour texte
- Minimum 3:1 pour éléments grands
- 7:1 pour texte et images

### Keyboard Navigation
- Tous les boutons accessibles au clavier
- Tab order logique
- Focus visible

### Screen Readers
- Alt text sur images
- Labels sur formulaires
- Semantic HTML5 (header, nav, section, article, footer)

---

## 🖼️ IMAGES & ICÔNES

### Formats
```
JPG  : Photos, images complexes
PNG  : Icônes, images avec transparence
SVG  : Logos, icônes scalables
WebP : Format moderne (avec fallback)
```

### Optimisation
- Compresser toutes les images
- Utiliser srcset pour responsive
- Lazy loading pour images non critiques
- Format WebP avec fallback JPG/PNG

---

## 📊 DÉGRADÉS

### Gradient Primaire
```css
background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
```

### Gradient Orange
```css
background: linear-gradient(135deg, #ff6b35 0%, #ffa94d 100%);
```

### Direction Recommandée
```
135deg : Top-left to bottom-right (diagonal)
90deg  : Vertical (top to bottom)
```

---

## 🔗 LIENS & NAVIGATION

```css
a {
    color: #ff6b35;      /* Orange */
    text-decoration: none;
    transition: color 0.3s;
}

a:hover {
    color: #ffa94d;      /* Orange clair */
    text-decoration: underline;
}

/* Dans footer */
footer a {
    color: #bbb;         /* Gris clair */
}

footer a:hover {
    color: #ff6b35;      /* Orange */
}
```

---

## 📝 NOTES FINALES

✅ Cohérence couleurs partout  
✅ Espacements réguliers  
✅ Typographie claire et lisible  
✅ Animations subtiles et fluides  
✅ Responsive sur tous appareils  
✅ Accessible pour tous  

---

**Date** : Janvier 2024  
**Version** : 1.0  
**Mainteneur** : Extra Now Team
