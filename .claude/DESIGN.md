---
name: Warm Ledger
description: Portfolio de développeur full-stack — mise en page éditoriale sur fond papier chaleureux, titres serif Cooper BT, données techniques en monospace OCR-B, accent bleu encre unique.
colors:
  primary: "#1A1813"
  secondary: "#6B675D"
  tertiary: "#254D92"
  neutral: "#FAF8F3"
  paper: "#FAF8F3"
  paper-card: "#FFFFFF"
  ink-50: "#F6F4EE"
  ink-100: "#ECE9E1"
  ink-200: "#DAD6CB"
  ink-300: "#B5B0A3"
  ink-400: "#8B8679"
  ink-500: "#6B675D"
  ink-600: "#4C4941"
  ink-700: "#35322B"
  ink-800: "#23211B"
  ink-900: "#1A1813"
  accent-50: "#EDF2FB"
  accent-100: "#D3DFF5"
  accent-200: "#A9C0EA"
  accent-300: "#7A9CDB"
  accent-400: "#4F7AC8"
  accent-500: "#2E62B8"
  accent-600: "#254D92"
  accent-700: "#1C3B72"
  accent-800: "#142B54"
  accent-900: "#0C1C39"
  night-bg: "#161511"
  night-card: "#1F1D17"
  night-border: "#2E2B23"
  success: "#22C55E"
  success-container: "#F0FDF4"
  on-success-container: "#166534"
  error: "#EF4444"
  error-container: "#FEF2F2"
  on-error-container: "#991B1B"
typography:
  h1:
    fontFamily: Cooper BT
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 1.08
  h2:
    fontFamily: Cooper BT
    fontSize: 2.25rem
    fontWeight: 400
  h3:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: 600
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Space Grotesk
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
  label-mono:
    fontFamily: OCR-B
    fontSize: 0.75rem
    fontWeight: 400
    letterSpacing: 0.05em
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  section-y-mobile: 64px
  section-y-desktop: 96px
components:
  button-primary:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: 12px 24px
    typography: "{typography.body-md}"
  button-primary-hover:
    backgroundColor: "{colors.ink-700}"
  button-secondary:
    backgroundColor: "{colors.ink-100}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.lg}"
    padding: 12px 24px
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.ink-700}"
    rounded: "{rounded.lg}"
    padding: 12px 24px
  card:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.xl}"
    padding: 24px
  status-badge:
    backgroundColor: "{colors.accent-50}"
    textColor: "{colors.accent-600}"
    typography: "{typography.label-mono}"
    rounded: "{rounded.md}"
    padding: 4px 10px
  tech-label:
    textColor: "{colors.ink-500}"
    typography: "{typography.label-mono}"
  input:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.lg}"
    padding: 12px 16px
  nav-pill:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.full}"
---

## Overview

**Ledger éditorial, pas dashboard SaaS.** Ce portfolio emprunte au papier journal haut de gamme et au carnet technique : fond "papier" chaud, titres au corps serif généreux, et données de preuve (stack, dates, chiffres) rendues en monospace comme des relevés d'imprimante. Un unique accent — un bleu encre profond — porte toute l'interaction ; tout le reste vit dans une échelle de gris chauds.

L'objectif est la crédibilité, pas la démonstration : peu de couleurs, peu d'effets, de la place pour respirer. Le mode sombre n'est pas un simple inversement — c'est une pièce éclairée à la bougie (fonds bruns très sombres, jamais de noir bleuté).

## Colors

- **Primary — Ink 900 (#1A1813):** Encre presque noire, chaude. Titres, texte de boutons pleins, texte principal en mode sombre inversé.
- **Secondary — Ink 500 (#6B675D):** Gris chaud moyen. Texte de support, sous-titres, métadonnées, labels de formulaire.
- **Tertiary — Accent 600 (#254D92):** Bleu encre. Seul moteur d'interaction — liens, survols, icônes actives, focus. Utilisé avec parcimonie pour rester un signal fort.
- **Neutral — Paper (#FAF8F3):** Fond de page par défaut. Un blanc cassé chaud, jamais du blanc pur.
- **Paper Card (#FFFFFF):** Cartes et surfaces élevées en mode clair — contraste doux avec le fond papier.
- **Échelle Ink (50→900):** Grille de gris chauds pour texte, bordures et fonds neutres. 50–200 pour fonds/bordures discrets, 300–500 pour texte secondaire, 700–900 pour texte principal et éléments à fort contraste.
- **Échelle Accent (50→900):** Déclinaisons du bleu encre. 50/100 pour fonds de badges, 500/600 pour texte et icônes interactifs, 300 comme équivalent accent en mode sombre.
- **Night (bg #161511, card #1F1D17, border #2E2B23):** Surfaces du mode sombre — un brun-noir chaud, jamais de bleu-noir type "dark mode SaaS".
- **Success (#22C55E / container #F0FDF4):** Statut "en production", disponibilité, confirmation d'envoi de formulaire.
- **Error (#EF4444 / container #FEF2F2):** Échec d'envoi de formulaire uniquement — pas utilisé ailleurs dans l'UI.

Le mode sombre s'active via une classe `.dark` sur `<html>` (pas de media query seule) : chaque token clair a une contrepartie sombre explicite dans les classes Tailwind (`dark:bg-night-card`, `dark:text-ink-100`, etc.), jamais de calcul automatique.

## Typography

Deux polices auto-hébergées, un rôle chacune — pas de troisième police pour le corps de texte.

- **Cooper BT (display) :** titres uniquement (`h1`, titres de section `h2`, titres de carte projet phare). Serif chaleureuse, taille généreuse (3rem–4.5rem en `h1`), jamais utilisée en dessous de `text-3xl`.
- **Space Grotesk (sans) :** tout le reste — corps de texte, boutons, labels de formulaire, titres de niveau `h3`/`h4` (en `font-semibold`, pas en display).
- **OCR-B (mono) :** exclusivement pour les données "factuelles" : stack technique (`tech-label`), badges de statut, dates de parcours, chiffres clés (`dl`/`dd` du hero), email de contact, mentions du footer. Toujours en minuscule sauf les badges de statut qui passent en `uppercase tracking-wider`.

Règle de composition : un `h1`/`h2` en Cooper BT est toujours suivi d'un sous-titre en Space Grotesk `text-ink-500`/`text-lg` — jamais deux niveaux de display consécutifs.

## Layout

- **Largeur de contenu :** `max-w-content` = 68rem (1088px), centré (`mx-auto`), avec un padding horizontal de 16px (mobile) à 32px (desktop, `md:px-8`).
- **Rythme vertical des sections :** 64px de padding vertical sur mobile, 96px sur desktop (`py-16 md:py-24`). Chaque section (`<Section>`) porte son propre padding — pas de marges entre sections.
- **Grilles de cartes :** `gap-5` (20px) entre cartes de contenu, `gap-12` entre colonnes de mise en page (About, Contact). La grille "Projets" est asymétrique — un projet phare en `col-span-2`, les autres en cellules simples.
- **En-tête d'expérience :** grille fixe `[7rem_1fr]` (mobile) / `[9rem_1fr]` (desktop) — la colonne de date ne doit jamais rétrécir au contenu.

## Elevation & Depth

Pas d'ombres décoratives sur les éléments statiques — l'élévation est réservée aux éléments flottants ou en overlay :

- **Header desktop au scroll :** `shadow-md` appliqué uniquement une fois la page défilée, combiné à un flou d'arrière-plan (`backdrop-filter: blur(12px)`) et un fond semi-transparent (`bg-paper/85`).
- **Menu mobile / bannière de consentement :** `shadow-lg`, posés en `card` au-dessus du contenu.
- **Cartes de contenu (projets, compétences) :** aucune ombre au repos — seule la bordure (`border-ink-200`) les sépare du fond. Au survol, la bordure s'assombrit (`hover:border-ink-300`), jamais d'ombre ajoutée.

## Shapes

Échelle de radius à quatre paliers, plus le cas particulier "pilule" :

- **sm (6px) :** badges de statut, poignée de scrollbar.
- **md (8px) :** éléments de menu, petits contrôles.
- **lg (12px) :** boutons, champs de formulaire, CTA — le radius "interactif" par défaut.
- **xl (16px) :** cartes (`card`), conteneurs de contenu.
- **full :** navigation "pilule" desktop (`nav-pill`), indicateurs de statut (points).

## Components

- **Buttons :** trois variantes — `primary` (fond ink-900/paper inversé en clair↔sombre), `secondary` (fond ink-100), `outline` (bordure ink-300, fond transparent). Trois tailles (`sm`/`md`/`lg`) qui ne changent que le padding et la taille de texte, jamais le radius. Transition `colors` 200ms, jamais de transform au survol des boutons eux-mêmes (le mouvement est réservé aux icônes de flèche à l'intérieur).
- **Card :** fond `paper-card`/`night-card`, bordure 1px `ink-200`/`night-border`, radius `xl`. Bloc de base réutilisé pour projets, compétences, liens de contact, menu mobile et bannière de consentement.
- **Status badge :** pastille mono majuscule sur fond `accent-50`/`accent-900`, souvent précédée d'un point de couleur (vert = actif/en production).
- **Tech label :** liste de technologies séparées par `·`, toujours en `tech-label` (mono, `ink-500`, `text-xs`) — jamais en sans-serif.
- **Liens avec flèche :** icône `arrow-right`/`arrow-up-right` qui se déplace de quelques pixels au survol (`group-hover:translate-x-1`) — c'est le seul motif de micro-interaction du site, réutilisé partout (cartes projet, liens de contact, CV).
- **link-underline :** soulignement animé (fond dégradé qui s'étend de 0% à 100% au survol) pour les liens inline dans le texte courant, distinct des liens de navigation.
- **Reveal on scroll :** tous les blocs de contenu portent la classe `.reveal` (translateY 24px → 0, opacity 0 → 1, 0.6s ease-out), déclenchée par IntersectionObserver, avec des délais échelonnés (`transition-delay`) sur les grilles pour un effet de cascade. Désactivé entièrement si `prefers-reduced-motion: reduce`.

## Do's and Don'ts

- **Faire :** garder l'accent bleu comme unique couleur "active" — s'il y a une couleur vive sur l'écran en dehors du vert (statut) ou du rouge (erreur), c'est forcément l'accent.
- **Faire :** réserver Cooper BT aux titres de section et plus grands ; tout texte sous `text-3xl` reste en Space Grotesk.
- **Faire :** utiliser le mono OCR-B pour toute donnée factuelle/technique (stack, dates, chiffres), jamais pour de la prose.
- **Faire :** définir explicitement chaque variante `dark:` — ne jamais compter sur un assombrissement automatique des couleurs claires.
- **Ne pas faire :** ajouter d'ombre portée sur une carte au repos ; l'élévation ne s'exprime qu'au survol (bordure) ou en overlay (menus, bannières).
- **Ne pas faire :** utiliser un noir pur ou un blanc pur — toujours passer par `ink-900`/`paper` (teintes chaudes cassées).
- **Ne pas faire :** introduire une deuxième couleur d'accent ou un dégradé décoratif ; le seul dégradé toléré est le fond du bloc "projet phare" (`from-accent-50 to-paper`), pas un usage généralisé.
- **Ne pas faire :** appliquer une transform (translate/scale) sur un bouton entier au survol — le mouvement reste localisé aux icônes de flèche.
