# Dev.to — Article technique

**Titre :** Building an Interactive Portfolio in 2026 with Vanilla JS and Three.js — No Framework, No Build
**Tags :** `javascript`, `threejs`, `webdev`, `frontend`
**Canonical URL :** https://github.com/Abdoulrazack1/portfolio_pro

---

## Plan

### 1. Le challenge
- Refaire mon portfolio
- Contrainte volontaire : 0 framework, 0 build step, 0 dépendance externe (sauf Three.js bundlé localement)
- Pourquoi cette contrainte (LCP, démo de maîtrise plateforme, longévité)

### 2. L'archi
- Structure des fichiers (3 dossiers : css, js, vendor, image)
- Pourquoi pas de bundler (et ce qu'on perd)

### 3. Deep-dive — Le curseur magnétique
- Détection : pas pointer fin (coarse pointer → désactivé)
- Track mouse position via `mousemove` (passive: true)
- mix-blend-mode: difference pour inversion contextuelle
- Animation rendue via `requestAnimationFrame`

### 4. Deep-dive — Three.js dans le hero
- Initialisation : Scene, PerspectiveCamera, WebGLRenderer
- IcosahedronGeometry + EdgesGeometry pour le wireframe
- Particules en BufferGeometry (1500 points)
- Adaptation au scroll (rotation speed)
- `resize` listener pour le responsive

### 5. Deep-dive — L'exploded view
- Plusieurs meshes dans un Group
- IntersectionObserver pour détecter l'entrée du viewport
- Lerp des positions vers cible "explosée" / "groupée"

### 6. Accessibilité
- `prefers-reduced-motion` détecté via `matchMedia`
- Désactivation des animations Three.js si reduced motion
- Sémantique HTML5 + ARIA appropriée
- Tests avec lecteur d'écran (VoiceOver, NVDA)

### 7. Performance
- `setPixelRatio(min(devicePixelRatio, 2))` pour pas exploser sur Retina
- Réduction du nb de particules sur mobile
- Lighthouse scores attendus (à mesurer)
- LCP < 1s sans optimisation tooling

### 8. SEO + Open Graph
- Meta tags description, author
- og:title / og:description / og:type
- Schema.org Person (à ajouter ?)

### 9. Pourquoi vanilla en 2026 ?
- L'argument "maîtrise de la plateforme"
- L'argument "longévité" (rien à patcher)
- Les contreparties (refactor cross-file plus manuel)
- Quand vanilla N'EST PAS adapté (apps complexes avec routing)

### 10. Liens
- Repo : https://github.com/Abdoulrazack1/portfolio_pro
- Live demo : [à déployer]

---

## Notes

- Article 1500-2500 mots
- 5+ snippets de code (cursor, Three.js init, IntersectionObserver, matchMedia, particles)
- 3-4 screenshots (home, hover state, exploded view, mobile)
- CTA : "Star, fork, ouvre une issue si tu vois un bug"
