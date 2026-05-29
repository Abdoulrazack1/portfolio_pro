# Reddit — r/threejs

**Subreddit cible :** r/threejs
**Best time :** mardi-jeudi

---

## Titre

> Used Three.js for a personal portfolio: wireframe icosahedron in hero + exploded polyhedron view in skills section (vanilla JS, no React)

---

## Body

Hey r/threejs,

Je voulais partager mon usage de Three.js pour un portfolio personnel, en vanilla JS (pas React Three Fiber). Two scenes :

### 1. Hero — wireframe icosahedron

Un IcosahedronGeometry passé en `EdgesGeometry` + LineBasicMaterial. Rotation continue + réaction au scroll (la rotation accélère/ralentit selon `scrollY`).

```js
const geom = new THREE.IcosahedronGeometry(2, 0);
const edges = new THREE.EdgesGeometry(geom);
const mat = new THREE.LineBasicMaterial({ color: 0xfeead4, opacity: 0.6, transparent: true });
const wireframe = new THREE.LineSegments(edges, mat);
scene.add(wireframe);

function animate() {
  requestAnimationFrame(animate);
  wireframe.rotation.x += 0.001 + scrollVelocity * 0.0001;
  wireframe.rotation.y += 0.002 + scrollVelocity * 0.0002;
  renderer.render(scene, camera);
}
```

Particules en `BufferGeometry` (1500 points) avec PointsMaterial.

### 2. Skills section — exploded polyhedron view

Plusieurs `OctahedronGeometry` + `TetrahedronGeometry` éparpillés, qui s'éloignent du centre quand la section est dans le viewport (via IntersectionObserver) puis reviennent quand elle quitte le viewport.

Trick utilisé : `Group` qui contient tous les meshes, et j'anime la `position` de chaque mesh indépendamment vers une cible (lerp).

### Performance

- `prefers-reduced-motion` respecté → désactive les animations Three.js (juste un fade-in CSS à la place)
- Détection mobile → réduction du nb de particules (1500 → 400)
- `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` pour pas exploser sur Retina
- Lighthouse mobile perf score : à mesurer après deploy (cible 90+)

### Bundle

Three.js r128 bundlé localement (603 KB minified). Pas de CDN, pas de dépendance réseau au runtime.

### Code

https://github.com/Abdoulrazack1/portfolio_pro

Live demo : [à déployer GH Pages]

Heureux d'avoir vos retours sur :
- Mon usage du wireframe (pertinent / overdone ?)
- Si l'exploded view est lisible visuellement
- Comment vous géreriez mieux la perf sur low-end Android
- Si vous connaissez des techniques pour rendre l'icosaèdre encore plus expressif (subdivisions, distortion ?)

---

## Notes

- r/threejs apprécie le **code visible** (poster les snippets)
- Le sub a peu d'activité mais une audience qualifiée
- Si vous avez un compte CodeSandbox/Stackblitz isolant juste la scène, c'est le bonus
