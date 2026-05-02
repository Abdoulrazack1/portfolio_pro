# Portfolio · Abdoulrazack Abdillahi

Portfolio personnel — **Développeur Web & Web Mobile** (formation DWWM, basé à Lille).

## Stack

- **HTML5** sémantique
- **CSS3** vanilla (CSS variables, Flexbox, Grid, gradient mesh, blend modes)
- **JavaScript** vanilla (IntersectionObserver, custom cursor magnétique, scroll-aware nav, 3D tilt)
- **Three.js r128** pour les scènes 3D (icosaèdre wireframe + exploded view de polyèdres)
- **Typographies** : Fraunces (display italique) · Manrope (body) · JetBrains Mono (technique)
- **Sans framework**, sans build, zéro dépendance externe (Three.js bundlé localement)

## Structure

```
portfolio_pro/
├── index.html              ← page unique single-page
├── README.md
├── asset/
│   ├── css/
│   │   └── styles.css      ← tout le CSS (CSS variables, animations, responsive)
│   ├── js/
│   │   └── main.js         ← interactions + scènes Three.js
│   ├── vendor/
│   │   └── three.min.js    ← Three.js r128 (603 KB) bundlé localement
│   └── image/
│       ├── profil.jpg
│       ├── cycling.jpg
│       ├── js-ranker.jpg
│       ├── logic-lens.jpg
│       ├── safari-frenzy.png
│       ├── kinka.jpg
│       ├── peartech.jpg
│       └── inko.jpg
```

## Lancer en local

Aucun build nécessaire. Ouvre `index.html` dans un navigateur, ou lance un serveur statique :

```bash
# Python
python3 -m http.server 8000

# Node (avec npx)
npx serve .
```

Puis ouvre **http://localhost:8000**.

> ⚠️ Three.js a besoin du protocole `http://` pour se charger (CORS). Ouvrir `index.html` directement (`file://`) peut empêcher les scènes 3D de s'afficher selon le navigateur.

## Ce qu'il contient

- **Hero** — pitch principal avec **icosaèdre wireframe Three.js** + particules + coords GPS Lille
- **À propos** — photo + philosophie de travail (3 piliers)
- **Compétences** — 4 cartes (Front-end, Back-end & ML, Workflow, Méthode) avec **exploded view 3D** flottant en arrière-plan
- **Projets** — 7 missions phares avec **effet 3D tilt** au survol :
  1. **C.C. Salouel** — flagship full-stack club de cyclisme (Express, MySQL, JWT, OSRM, GPX)
  2. **Js-Ranker** — moteur de notation JS (Node.js, AST, CLI/API)
  3. **Logic-Lens** — Transformer Encoder TensorFlow.js qui extrait les formules cachées
  4. **Safari Frenzy** — mini-jeu pixel art (Canvas, Express, API scores)
  5. **Kinka** — e-commerce manga, ~30 pages
  6. **Peartech** — e-commerce tech, 68 commits
  7. **Inko** — lecteur manga
- **Parcours** — timeline DWWM (5 étapes)
- **Contact** — formulaire avec validation + canaux directs (email, GitHub, LinkedIn)

## Effets visuels notables

- **Curseur custom** avec effet hover + mix-blend-mode difference
- **Scroll progress bar** en haut avec gradient animé
- **3D tilt** sur les cartes projets (perspective + rotateX/Y suivant la souris)
- **Radial light** sur les cartes skills suivant le curseur (CSS variables)
- **Shine sweep** sur les boutons au survol
- **Reveal en cascade** avec stagger sur scroll (IntersectionObserver)
- **Gradient stroke text** sur les accents (gold→persimmon)
- **Pulsing dot** sur les numéros de section
- **Marquee infini** des technos entre hero et about

## Personnalisation rapide

| Élément | Fichier | Endroit |
|---|---|---|
| Couleur d'accent (orange persimmon) | `asset/css/styles.css` | `:root --accent` |
| Email | `index.html` | recherche `abdoul.abdillahi@gmail.com` |
| Téléphone | `index.html` | recherche `+33 7 84 68 54 65` |
| URL LinkedIn | `index.html` | recherche `linkedin.com` |
| Liens GitHub | `index.html` | recherche `Abdoulrazack1` |
| Coords GPS hero | `index.html` | recherche `LILLE · FR` |

## Déployer sur GitHub Pages

1. Pousse les fichiers dans ton repo `Portfolio` (branche `main`)
2. Settings → Pages → Source : `Deploy from a branch` → Branch : `main` / `/ (root)` → Save
3. Ton site sera accessible sur `https://abdoulrazack1.github.io/Portfolio/` en ~1 minute

## Crédits

Photo, projets et identité : **Abdoulrazack Abdillahi** · 2026 · Lille
