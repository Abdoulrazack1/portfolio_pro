# Reddit — r/webdev

**Subreddit cible :** r/webdev
**Flair :** `Showoff Saturday`
**Best time :** samedi matin

---

## Titre

> Built my portfolio in 100% vanilla JS with Three.js (wireframe icosahedron, exploded view, magnetic cursor) — zero framework, zero build

---

## Body

Hey r/webdev,

Je viens de refactor complet mon portfolio en mode "challenge : aucune dépendance externe sauf Three.js bundlé localement, zéro framework, zéro build step". Voilà ce que ça donne.

### Live demo

→ [https://abdoulrazack1.github.io/portfolio_pro/](https://abdoulrazack1.github.io/portfolio_pro/) (à déployer)

### Choix techniques

**Pourquoi vanilla JS** :
- Démontrer que je connais la plateforme native (IntersectionObserver, matchMedia, requestAnimationFrame, passive events)
- LCP < 1s sans aucune optimisation tooling
- Lighthouse perf 99 (mobile, throttled) — à confirmer après deploy
- 0 dépendance à patcher dans 6 mois

**Effets implémentés** :
- **Curseur magnétique** avec `mix-blend-mode: difference` sur hover
- **Scroll progress bar** en haut avec gradient animé
- **3D tilt** sur les cartes projets (perspective + rotateX/Y)
- **Radial light** sur les cartes Skills (CSS variables suivant la souris)
- **Shine sweep** sur les boutons au survol
- **Reveal en cascade** au scroll (IntersectionObserver, stagger)
- **Gradient stroke text** sur les accents (gold → persimmon)
- **Pulsing dot** sur les numéros de section
- **Marquee infini** des technos

**Three.js** :
- Icosaèdre wireframe en hero (qui tourne en réagissant au scroll)
- Exploded view de polyèdres en background des Skills
- Three.js r128 bundlé localement (603 KB) — pas de CDN, pas de dépendance réseau

**Accessibilité first-class** :
- `prefers-reduced-motion` respecté (désactive cursor magnétique + animations Three.js)
- `aria-label` + `aria-hidden` corrects
- HTML5 sémantique
- Détection `isCoarsePointer` → désactive cursor magnétique sur touch devices

### Stack

- HTML5 + CSS3 (variables, grid, blend modes)
- Vanilla JS (IntersectionObserver, matchMedia, RAF, passive listeners)
- Three.js r128 (icosahedron wireframe + exploded view)
- Polices : Fraunces (display italique) + Manrope (body) + JetBrains Mono (technique)

### Code

https://github.com/Abdoulrazack1/portfolio_pro

Heureux d'avoir des critiques constructives sur :
- L'esthétique générale (j'ai testé sur ~10 personnes mais r/webdev a un œil critique différent)
- Si vous voyez des accessibility issues que j'ai manquées
- Si quelqu'un détecte un truc qui pourrait casser sur Safari iOS (cible souvent oubliée)

---

## Notes

- **Inclure le GIF en haut** (essentiel pour ce post — c'est visuel)
- **Lien live démo cliquable**
- Si Lighthouse score top, le partager dans le post (validation chiffrée)
