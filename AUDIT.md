# Audit de la refonte v2 — Portfolio Baptiste Tabar Labonne

Date : 2026-07-07
Périmètre : branche courante (refonte « éditoriale claire, la preuve par le concret »)
Méthode : grilles d'audit des skills `redesign-existing-projects`, `design-taste-frontend`, `high-end-visual-design`, `minimalist-ui`. Audit seul, aucune modification de code (workflow : audit → validation → implémentation).

---

## Lecture design (design read)

Portfolio de développeur full-stack destiné aux recruteurs et clients, langage éditorial clair « papier / encre » avec un accent unique bleu encre. Dials estimés : variance 5, motion 3, densité 4. C'est une cible cohérente pour l'audience, et la refonte l'atteint en grande partie.

## Ce qui est réussi (à préserver)

- **Identité cohérente** : palette papier/encre chaude, un seul accent (bleu encre), gris d'une seule famille, pas de dégradé violet « IA », pas de noir pur (`#161511` en dark). C'est exactement ce que recommandent les skills.
- **Dark mode complet** et initialisé avant le premier rendu (pas de flash), respect de `prefers-color-scheme`.
- **Accessibilité de base solide** : `:focus-visible` global, `prefers-reduced-motion` géré sur `.reveal`, `alt` descriptifs, labels au-dessus des inputs, `aria-label` sur les boutons icônes.
- **Contenu réel et concret** : vrais chiffres (3 ans, 4 projets), vraie cliente, compteur d'installations Marketplace récupéré au build avec fallback silencieux. Aucun lorem ipsum, aucun cliché marketing.
- **Grille projets asymétrique** (2+1 / 1+2 + rangées compactes) : bien mieux que les « 3 cartes égales » génériques.
- **SEO technique** : canonical par page, sitemap, robots.txt, JSON-LD Person + WebSite, meta OG/Twitter.
- **Micro-interactions sobres** : hover states partout, soulignement animé, flèches translatées, reveal au scroll via IntersectionObserver.

---

## P0 — Bugs et manques bloquants

### 1. `public/_redirects` corrompu
Contenu actuel : `/linkedin / 404claude` (une seule ligne, sans retour final). Le statut `404claude` est invalide, Netlify ignorera la règle. Par ailleurs l'intention est ambiguë : `/linkedin` existe comme page (`src/pages/linkedin.astro`). À valider : soit la page doit être publique (supprimer la règle), soit elle doit être masquée (`/linkedin /404 404` + `noindex`).

### 2. Pas de page 404
Aucun `src/pages/404.astro`. Un lien mort renvoie la 404 brute de Netlify, hors charte. Une 404 aux couleurs du site avec un lien retour est vite faite et attendue sur un portfolio.

### 3. `og:image` / `twitter:image` absents
`twitter:card` est déclaré en `summary_large_image` mais aucune image n'est fournie. Un partage LinkedIn (le canal n°1 pour un portfolio) s'affiche sans visuel. Prévoir une image OG 1200×630 et l'ajouter dans `Layout.astro`.

### 4. Navigation par ancres : hash et chevauchement du header
Dans `Layout.astro:235-244`, le script intercepte les clics `a[href^="#"]`, fait `preventDefault()` puis `scrollIntoView` :
- l'URL ne reçoit jamais le hash (deep-linking et bouton retour cassés) ;
- il est redondant avec `scroll-behavior: smooth` déjà posé en CSS ;
- il ne s'applique pas aux liens du header (qui sont en `/#projects`), d'où deux comportements différents.
De plus, les sections (`Section.astro`) n'ont pas de `scroll-mt-*` : le header fixe recouvre le titre de section à l'arrivée d'une ancre (seules les cartes projets ont `scroll-mt-28`). Recommandation : supprimer le script, garder le CSS, ajouter `scroll-mt-24` (ou `scroll-padding-top` sur `html`) pour toutes les sections.

---

## P1 — Design et typographie

### 5. Pipeline de polices : échafaudage de test livré en production
`src/config/fonts.ts` + `Layout.astro` embarquent 4 paires testables et 17 `@font-face` inline. La paire active (4 : Space Grotesk + Cooper BT) pose plusieurs problèmes :
- **Space Grotesk chargée via `<link>` Google Fonts** : render-blocking, contraire à la règle « self-host + `font-display: swap` » des skills. À auto-héberger en woff2.
- **Cooper BT servie en `.ttf`** alors que `Cooper-Regular/Bold/Black.woff2` existent déjà dans `public/fonts` (inutilisées). Le TTF est 2 à 3 fois plus lourd.
- **Aucun `<link rel="preload">`** sur la police display → FOUT visible sur le H1 (LCP/CLS).
- **Licences** : ITC Avant Garde, Cooper BT et Recoleta sont des polices commerciales. À vérifier avant mise en production publique ; sinon substituts libres (ex. Recoleta → Fraunces exclu par les skills, mais « Gelica »-like ; Cooper → « Ranade » ou rester sur Cooper si licence OK).
- Une fois la paire choisie, **purger** les 3 autres paires, les fichiers de fontes inutilisés et `fonts.ts`.

### 6. Faux navigateur en div sur le projet phare
`Projects.astro:66-87` : chrome de navigateur simulé (3 pastilles, fausse barre d'URL, dégradé + texte). C'est le « div-based fake screenshot », tell IA n°1 des skills, et le commentaire du code le dit lui-même (« en attendant les vraies captures »). De vraies captures existent déjà (`public/projects/preview.png`, `connexion.png`…). Remplacer le mockup par une vraie capture (recadrée, `aspect-video`, comme la carte Fuel).

### 7. Hero : pile trop chargée
Le hero empile 5 éléments : badge disponibilité + H1 + paragraphe + 2 CTA + 3 cartes de stats. La règle « hero stack ≤ 4, pas de micro-strip de preuve dans le hero » s'applique : les « preuves chiffrées » gagneraient à devenir une simple ligne de texte mono sous les CTA (sans cartes), ou à descendre sous le hero. Au minimum, retirer les bordures/cartes pour alléger.

### 8. Tirets demi-cadratins dans les titres techniques
10 occurrences de `–` dans `src/data/projects.ts` (« Frontend – Next.js », etc.). La règle des skills est binaire : remplacer par un tiret simple avec espaces (`Frontend - Next.js`) ou deux points (`Frontend : Next.js`).

### 9. Étiquettes numérotées et eyebrows
- `About.astro` : les principes sont numérotés `01 02 03 04` en mono. C'est le tell « section-number eyebrow » ; les titres se suffisent.
- Page projet (`[slug].astro`) : 5 eyebrows mono-caps d'affilée (Contexte, Ce que fait l'application, Décisions techniques, Workflow, Monitoring). Acceptable sur une étude de cas, mais au-dessus du quota « 1 eyebrow / 3 sections » ; envisager de passer ces labels en vrais `h2` display, comme « Captures d'écran » qui l'est déjà (incohérence de hiérarchie au passage : mélange de `p.eyebrow` et `h2` pour le même niveau).

---

## P2 — Code, performance, accessibilité

### 10. `window.addEventListener("scroll")` dans `Header.astro:108`
Pattern interdit par les trois skills (reflows continus). Remplacer par un sentinel IntersectionObserver (div de 40px en haut de page) ou l'API `scroll-driven animations`. Impact réel faible ici (le handler est léger et passif), mais c'est le bon réflexe.

### 11. Code mort
- `src/components/TechWatch.astro` (144 lignes) : importé nulle part.
- `src/components/ui/Card.astro` : plus utilisé (la classe `.card` de `global.css` a pris le relais).
À supprimer après validation.

### 12. Accessibilité — compléments
- **Pas de skip-link** « Aller au contenu » avant le header fixe.
- Bouton menu mobile sans `aria-expanded` ni `aria-controls` ; le toggle thème pourrait exposer `aria-pressed`.
- `#form-message` (Contact) devrait porter `role="status"` / `aria-live="polite"` pour que le succès/échec soit annoncé aux lecteurs d'écran.
- Le formulaire n'a aucune validation inline au-delà du natif ; un simple message d'erreur sous champ (pattern email) suffirait. Un honeypot anti-spam serait bienvenu (EmailJS sans captcha).

### 13. Google Analytics sans consentement
GA4 est chargé inconditionnellement (`Layout.astro:205`). En France (CNIL/RGPD), un traceur non exempté requiert un consentement préalable. Options : bannière de consentement, ou remplacer par une solution exemptée (Plausible, Umami, ou GA en mode consent par défaut refusé).

### 14. Images non optimisées
Les captures sont servies en `<img>` brut (PNG pleine taille). Astro fournit `astro:assets` (`<Image />`) : conversion AVIF/WebP, `srcset`, dimensions imposées (anti-CLS) sans dépendance supplémentaire. À appliquer au moins à la carte Fuel (au-dessus du pli sur mobile) et aux pages projets.

### 15. Divers
- `[slug].astro:37` : `min-h-screen` → `min-h-[100dvh]` (viewport iOS).
- `body class="overflow-x-hidden"` est un pansement : vérifier ce qui déborde réellement (probablement rien après correction du hero) et le retirer si possible.
- Clés EmailJS en dur comme fallback (`Contact.astro:150-152`) : ce sont des clés publiques par design, mais autant ne garder que `import.meta.env` pour éviter la divergence env/code.
- Pas d'état actif dans la nav (scroll-spy) : nice-to-have, pas bloquant sur une one-page.

---

## Ce que je ne recommande PAS de changer

- La palette, l'accent unique et le ton du contenu : c'est le point fort de la refonte.
- La structure one-page + études de cas : IA claire, slugs stables (règle SEO du protocole redesign : ne pas toucher aux URLs).
- Les rangées compactes de projets secondaires : bon usage du `divide-y` (3 items, sous le seuil des « longues listes »).
- Le badge de disponibilité avec point vert animé : le dot est ici sémantique (disponibilité réelle), c'est l'exception prévue par les skills.

## Ordre d'implémentation proposé (après validation)

1. **Correctifs** (P0) : `_redirects`, page 404, image OG, ancres (`scroll-mt` + suppression du script).
2. **Typographie** : figer la paire de polices, auto-héberger, woff2 + preload, purger l'échafaudage de test.
3. **Projet phare** : vraie capture à la place du faux navigateur.
4. **Hero** : alléger la pile (stats en ligne de texte).
5. **Finitions** : tirets, numéros `01-04`, scroll listener, code mort, skip-link + ARIA, consentement analytics, `astro:assets`.

Chaque lot est indépendant et peut être validé séparément.

---

## État d'implémentation (2026-07-07)

Tous les lots ont été implémentés dans le commit qui suit ce rapport, avec les ajustements suivants découverts en cours de route :

- **`/linkedin`** : page marquée « usage local uniquement » dans son propre code → sortie du build via le préfixe `_` d'Astro (`_linkedin.astro`), contenu conservé dans le repo. `_redirects` supprimé (il ne servait qu'à cette règle cassée).
- **Projet phare** : `preview.png` / `preview_white.png` appartiennent en réalité à RjWeb, et alydousheure.fr n'est pas accessible depuis l'environnement de build (politique réseau). Le faux chrome de navigateur a été retiré ; la carte garde une couverture typographique propre avec un TODO pour la vraie capture (~1600x760) à déposer dans `public/projects/`.
- **Débordement horizontal mobile** : cause racine identifiée (grilles sans `grid-cols-1` de base → colonnes dimensionnées en min-content). Corrigé sur les 4 grilles ; `overflow-x-hidden` retiré du body, 0 px de débordement vérifié à 320/390/768/1440 px.
- **Contraste** : `text-ink-400` (3,42:1 sur papier) remplacé par `text-ink-500` (5,31:1) sur tous les textes.
- **EmailJS** : les clés fallback ont été conservées volontairement (clés publiques par design, et impossible de vérifier la configuration des variables d'environnement Netlify depuis ici : les retirer aurait pu casser le formulaire en production).
- **Cooper BT** : conservée (déjà présente en woff2). Penser à vérifier la licence avant une mise en avant commerciale du site.

Vérifications effectuées : `astro check` (0 erreur), build 8 pages, captures Playwright light/dark/mobile, bannière de consentement, menu mobile (`aria-expanded`), page 404 servie avec le bon statut, **Lighthouse 100/100/100/100** (performance, accessibilité, bonnes pratiques, SEO) sur la home et 100 partout sur une page projet.
