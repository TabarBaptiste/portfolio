export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageLight?: string;
  technologies: string[];
  github?: string;
  demo?: string | null;
  demoLabel?: string;
  category: 'web' | 'mobile';
  screenshots?: { name: string; path: string }[];
  detailedContent?: {
    introduction: string;
    features?: string[];
    technical?: {
      title: string;
      items: string[];
    }[];
    workflow?: string;
    monitoring?: string;
    assets?: {
      title: string;
      items: string[];
    };
  };
}

export const projects: Project[] = [
  {
    slug: 'alydousheure-fullstack',
    title: 'Aly dous\'heure - Plateforme de réservation',
    description: 'Plateforme web de réservation et de gestion pour une masseuse professionnelle. Système de prise de rendez-vous en ligne, paiement sécurisé, gestion des disponibilités, authentification utilisateur et tableau de bord statistiques pour le professionnel.',
    image: '/projects/alydousheure/hero.png',
    technologies: ['NestJS', 'Next.js', 'Prisma', 'Supabase', 'Stripe Connect', 'Cloudinary', 'Resend', 'Vercel', 'Render', 'GitHub Actions', 'IONOS'],
    github: 'https://github.com/TabarBaptiste/masseuse',
    demo: 'https://alydousheure.fr/',
    demoLabel: 'Voir le site',
    category: 'web',
    screenshots: [
      { name: 'Page d\'accueil', path: '/projects/alydousheure/hero.png' },
      { name: 'Détail d\'un massage', path: '/projects/alydousheure/massage_tonique.png' },
      { name: 'Liste des soins', path: '/projects/alydousheure/soins.png' },
      { name: 'Réservation', path: '/projects/alydousheure/reserver.png' },
    ],
    detailedContent: {
      introduction: 'Plateforme web **full-stack** développée pour digitaliser l\'activité d\'une masseuse professionnelle indépendante.\n\nLe projet couvre l\'ensemble du parcours client : de la découverte des prestations à la réservation en ligne, en passant par le paiement sécurisé et la gestion post-visite (avis clients).\n\nCôté professionnel, l\'application offre un **tableau de bord complet** pour gérer les réservations, visualiser les statistiques, administrer les prestations et paramétrer le site.\n\nL\'architecture est pensée pour être **performante, maintenable et évolutive**, avec une **séparation claire entre frontend et backend**, un **déploiement automatisé** et une **gestion rigoureuse des données sensibles**.',
      features: [
        'Système de réservation intelligent :',
        '  • Consultation des disponibilités en temps réel',
        '  • Sélection de prestations et créneaux horaires',
        '  • Gestion automatique des conflits et blocages',
        '  • Validation et confirmation par email',
        'Paiement sécurisé :',
        '  • Intégration complète de Stripe Connect',
        '  • Paiement en ligne lors de la réservation',
        '  • Gestion des remboursements et annulations',
        'Authentification et gestion utilisateur :',
        '  • Inscription et connexion sécurisées',
        '  • Vérification d\'email automatique',
        '  • Gestion de profil et historique des réservations',
        '  • Rôles utilisateur (client, professionnel, administrateur)',
        'Système d\'avis clients :',
        '  • Dépôt d\'avis après prestation',
        '  • Affichage public des témoignages',
        '  • Modération par le professionnel',
        'Tableau de bord professionnel :',
        '  • Vue d\'ensemble des réservations (passées, à venir, annulées)',
        '  • Statistiques détaillées (revenus, prestations populaires, taux d\'occupation)',
        '  • Gestion des créneaux et blocages de disponibilité',
        '  • Administration des prestations et tarifs',
        '  • Configuration des paramètres du site'
      ],
      technical: [
        {
          title: 'Frontend - Next.js',
          items: [
            'Framework React moderne avec **App Router** pour une navigation fluide avec **Next.js**',
            '**Server-Side Rendering (SSR)** pour l\'optimisation SEO',
            '**TypeScript** pour la sécurité des types',
            '**Tailwind CSS** pour un design responsive et cohérent',
            'Gestion d\'état avec **Zustand** pour les données globales',
            'Composants UI réutilisables et modulaires',
            'Optimisation des images et des performances'
          ]
        },
        {
          title: 'Backend - NestJS',
          items: [
            'Architecture modulaire et scalable avec **NestJS**',
            '**TypeScript** côté serveur pour une cohérence totale',
            'API REST sécurisée avec validation des données via **class-validator**',
            'Authentification JWT avec système de refresh tokens',
            'Gestion fine des rôles et permissions (Guards)',
            'Envoi d\'emails transactionnels automatisés',
            'Gestion des conflits de réservation en temps réel',
            'Logs structurés et gestion centralisée des erreurs'
          ]
        },
        {
          title: 'Base de données - Prisma & Supabase',
          items: [
            '**Prisma** comme ORM pour une gestion type-safe de la base',
            '**Supabase (PostgreSQL)** pour l\'hébergement de la base de données',
            'Schéma relationnel complet (utilisateurs, réservations, prestations, avis, disponibilités)',
            'Migrations versionnées pour la traçabilité',
            'Indexation optimisée pour les requêtes fréquentes'
          ]
        },
        {
          title: 'Paiement - Stripe Connect',
          items: [
            'Intégration complète de **Stripe Connect** en mode **Standard**',
            'Onboarding du professionnel via Stripe',
            'Création de sessions de paiement sécurisées',
            'Gestion des webhooks pour la synchronisation des paiements',
            'Remboursements automatiques en cas d\'annulation',
            'Tableau de bord Stripe pour le suivi des transactions'
          ]
        },
        {
          title: 'Services externes',
          items: [
            '**Cloudinary** pour l\'hébergement et l\'optimisation des images',
            '**Resend** pour l\'envoi d\'emails transactionnels et de notifications'
          ]
        },
        {
          title: 'Déploiement et Infrastructure',
          items: [
            '**Vercel** pour l\'hébergement du frontend (Next.js)',
            '**Render** pour l\'hébergement du backend (NestJS)',
            '**IONOS** pour la gestion du nom de domaine',
            'Configuration SSL/TLS pour la sécurité',
            'Variables d\'environnement sécurisées sur les deux plateformes',
            'Séparation claire entre environnements de développement et production'
          ]
        },
        {
          title: 'CI/CD - GitHub Actions',
          items: [
            'Pipeline automatisé pour le frontend et le backend',
            'Tests unitaires et d\'intégration automatiques',
            'Vérification du build avant déploiement',
            'Déploiement automatique sur Vercel et Render',
            'Notifications en cas d\'échec du pipeline'
          ]
        }
      ],
      workflow: 'Le projet suit un **workflow de développement moderne** :\n\n1. **Développement local** : Docker Compose pour orchestrer PostgreSQL, backend et frontend\n2. **Contrôle qualité** : GitHub Actions exécute les tests et validations à chaque push\n3. **Déploiement automatique** : merge sur `main` déclenche le déploiement sur Vercel (frontend) et Render (backend)\n4. **Monitoring** : surveillance des logs et des erreurs via les dashboards Vercel et Render\n\nCette approche garantit **fiabilité**, **traçabilité** et **déploiements rapides** tout en minimisant les risques d\'erreur.',
      monitoring: 'Le projet intègre plusieurs couches de surveillance :\n\n• **Logs structurés** pour le débogage et l\'analyse\n• **Gestion centralisée des erreurs** côté backend\n• **Webhooks Stripe** pour tracer les événements de paiement\n• **Dashboards Vercel et Render** pour les métriques de performance\n• **Emails de notification** pour les événements critiques',
      assets: {
        title: 'Architecture globale',
        items: [
          '**Frontend (Vercel)** ↔ **API REST** ↔ **Backend (Render)** ↔ **Supabase (PostgreSQL)**',
          '**Backend** ↔ **Stripe API** pour les paiements',
          '**GitHub** → **Actions CI/CD** → **Déploiement automatique**'
        ]
      }
    }
  },
  {
    slug: 'dao-generator',
    title: 'Extension VSCode - PHP DAO Generator',
    description: 'Extension VSCode permettant de générer automatiquement des fichiers DAO PHP à partir des attributs d\'une table de base de données. Connexion au serveur via formulaire intégré, génération de code optimisée et monitoring avec Sentry. Disponible sur le marketplace VSCode.',
    image: '/projects/logo.png',
    technologies: ['TypeScript', 'CI/CD', 'Sentry', 'JavaScript', 'MCP', 'Base de données'],
    github: 'https://github.com/TabarBaptiste/dao-generation',
    demo: 'https://marketplace.visualstudio.com/items?itemName=Baptiste-TABAR-LABONNE.php-dao-generator',
    demoLabel: 'Marketplace',
    category: 'web',
    screenshots: [
      { name: 'Procesus de génération', path: '/projects/PHP_DAO_Generator-visual_selection.png' },
      { name: 'Workflow CI/CD', path: '/projects/CI-CD-dao.svg' },
      { name: 'Pipline et surveillance automatisés', path: '/projects/monitoring-black-dao.svg' },
      { name: 'Pipline et surveillance automatisés', path: '/projects/monitoring-white-dao.svg' },
    ],
    detailedContent: {
      introduction: 'Ce projet a été développé à la demande de mon maître d’apprentissage au Conseil Départemental du Val-de-Marne.\n\n L’objectif était de simplifier et d’accélérer la création des objets DAO utilisés quotidiennement par l’équipe, en automatisant une tâche répétitive et source d’erreurs lorsqu’elle est réalisée manuellement.\n\n Les DAO (Data Access Objects) constituent un élément central de l’architecture PHP interne : ils assurent l’accès aux données stockées dans différents systèmes de gestion de base de données.\n\n L’extension permet aujourd’hui de générer ces fichiers en quelques secondes, tout en garantissant une structure cohérente et homogène.',
      features: [
        'Connexion simple aux serveurs de bases de données via un formulaire intégré.',
        'Exploration des bases, schémas et tables directement depuis la sidebar VSCode.',
        'Génération automatique de fichiers DAO à partir de la structure des tables.',
        'Deux modes de génération :',
        '  • Sauvegarder : crée une sauvegarde dans backup/ avant d\'écraser.',
        '  • Écraser : remplace directement les fichiers existants.',
        'Monitoring intégré via Sentry pour remonter les erreurs des utilisateurs et améliorer la stabilité.'
      ],
      technical: [
        {
          title: 'Développement',
          items: ['Extension a été développée en **TypeScript**.',
            'Architecture pensée pour être modulaire et facilement extensible.',
            'Gestion d’erreurs renforcée grâce à **Sentry**.',
            'Mots de passe des serveurs chiffrés en **AES-256-CBC** (dérivation de clé via scrypt) pour sécuriser les informations de connexion stockées localement.'
          ]
        },
        {
          title: 'Génération de code',
          items: [
            'Génération de code PHP complet : attributs typés, accesseurs (getters/setters) et méthodes CRUD (`read`, `insert`, `update`, `delete`) documentés avec PHPDoc.',
            'Détection intelligente du projet PHP cible : si aucun dossier ne correspond exactement au nom de la base de données, une **distance de Levenshtein** permet de retrouver le projet le plus proche.',
            'Versioning automatique des fichiers DAO existants (`1.00` → `1.10` → `1.20`...) à chaque régénération, pour suivre l\'historique des modifications.'
          ]
        },
        {
          title: 'CI/CD - Workflows GitHub Actions',
          items: [
            'Trois workflows assurent le contrôle qualité, la cohérence et la publication automatisée de l\'extension.',
            '**1. Copilot Code Review** : Analyse automatique des fichiers modifiés dans une PR, résumé des changements (lignes ajoutées/supprimées), détection des `console.log` indésirables et publication d\'un commentaire automatique sur la PR avec les recommandations d\'amélioration. \n **But** : assurer une première passe de revue de code automatisée et pédagogique.',
            '**2. PR Checks** : Composé de deux blocs \n **pr-lint** (valide le format du titre de la PR selon Conventional Commits et ajoute automatiquement un label `needs-review`) \n **code-quality** (installation et vérification du projet avec Node 22 + `npm ci`, exécution de `tsc --noEmit` pour assurer la validité des types TypeScript, ajout automatique d\'un commentaire si une erreur bloque la PR). \n **But** : garantir une base de code propre, typée et conforme avant chaque merge.',
            '**3. Release** : Build automatique de l\'extension, packaging via `vsce`, possibilité de publier sur le VSCode Marketplace via un `workflow_dispatch` et exécution du script de release (semantic-release). \n **But** : uniformiser et fiabiliser les livraisons de version.'
          ]
        },
        {
          title: 'Déploiement',
          items: [
            'La publication de l\'extension est automatisée grâce à **Azure**, permettant l\'**hébergement des artefacts de build**, la **gestion sécurisée du jeton VSCE** et le **déclenchement des workflows de publication**.',
            'Ce pipeline garantit des mises à jour rapides, cohérentes et reproductibles.'
          ]
        },
        {
          title: 'Monitoring',
          items: ['J\'ai utilisé **Sentry** pour récupérer les erreurs utilisateurs pour de les résoudre au plus vite afin d\'éviter une mauvaise expérience utilisateur.']
        }
      ]
    }
  },
  {
    slug: 'interface-svn',
    title: 'Interface web de gestion SVN',
    description: 'Interface web développée pour le Conseil Départemental du Val-de-Marne afin de centraliser la gestion des dépôts SVN (création, branches, tags, migration de trunk, sauvegardes, utilisateurs) directement depuis le navigateur, sans ligne de commande. Un script wrapper sécurisé, appelé via sudo par Apache, exécute une liste strictement définie d\'opérations serveur sans exposer les scripts sensibles ni ouvrir les droits du groupe Apache.',
    image: '',
    technologies: ['PHP', 'Bash', 'Apache', 'Linux', 'SVN', 'Ext JS'],
    category: 'web',
    screenshots: [
      { name: 'Gestion des dépôts SVN', path: '/projects/interface-svn/accueil.png' },
      { name: 'Migration du trunk vers une branche ou un tag', path: '/projects/interface-svn/branches.png' },
      { name: 'Historique d\'un dépôt', path: '/projects/interface-svn/historique.png' },
      { name: 'Lecture des droits d\'un fichier', path: '/projects/interface-svn/lecture-droits.png' },
      { name: 'Comprendre chmod', path: '/projects/interface-svn/chmod.png' },
      { name: 'Permissions en production', path: '/projects/interface-svn/permissions-production.png' }
    ],
    detailedContent: {
      introduction: 'Ce projet a été développé dans le cadre de mon alternance au Conseil Départemental du Val-de-Marne, où il est utilisé en production par l\'équipe. Toutes les opérations SVN (création de dépôt, gestion des branches et tags, sauvegardes, gestion des comptes) passaient jusqu\'ici uniquement par la ligne de commande sur le serveur Linux, une barrière inutile pour les collègues qui ne maîtrisaient pas le terminal et une perte de temps pour tout le monde.\n\nJ\'ai donc développé une interface web pour centraliser ces opérations directement depuis le navigateur, sans ligne de commande, intégrée à l\'application interne existante ("liste_serveur").\n\nCe qui semblait au départ être un détail d\'implémentation, faire communiquer cette interface avec le serveur Linux, s\'est transformé en un vrai travail sur les droits Unix et sur la sécurisation d\'exécution de commandes shell depuis du PHP. La solution la plus rapide aurait été d\'ouvrir les droits du groupe Apache directement sur les scripts SVN, mais c\'était une mauvaise idée côté sécurité : n\'importe quel code exécuté sous l\'utilisateur Apache aurait alors pu manipuler les dépôts. J\'ai préféré mettre en place un **script wrapper root**, autorisé via `sudoers` en `NOPASSWD` sur ce seul binaire, qui n\'accepte qu\'une liste fermée d\'actions codées en dur. Apache ne peut jamais exécuter de commande arbitraire, seulement demander une des opérations prévues.',
      features: [
        'Gestion des dépôts :',
        '  • Lister, créer, renommer et supprimer un dépôt',
        '  • Initialisation optionnelle avec le moteur applicatif interne (belight_v7)',
        'Branches et tags :',
        '  • Lister les branches/tags d\'un dépôt',
        '  • Supprimer une référence (branche ou tag)',
        '  • Migrer le trunk vers une nouvelle branche ou un tag, avec 3 modes (copie complète, migration, ou création vide)',
        'Sauvegardes :',
        '  • Sauvegarde globale (tous les dépôts ou une sélection), lancée en arrière-plan',
        '  • Suivi de progression en temps réel par polling (dépôt en cours, avancement, étape de compression)',
        '  • Sauvegarde unitaire d\'un seul dépôt, téléchargement du ZIP, nettoyage automatique des fichiers temporaires',
        'Gestion des utilisateurs SVN :',
        '  • Lister, créer et supprimer un compte directement dans le fichier d\'authentification',
        '  • Détection des utilisateurs ayant déjà commité pour éviter une suppression accidentelle (sauf suppression forcée assumée)',
        'Historique :',
        '  • Historique complet d\'un dépôt (auteur, date, message, fichiers modifiés)',
        '  • Filtrage par plage de révisions et par auteur'
      ],
      technical: [
        {
          title: 'Sécurité & droits Linux',
          items: [
            'Apache devait déclencher des opérations serveur (SVN, gestion des utilisateurs, fichiers) sans disposer d\'un accès direct trop permissif.',
            'Mise en place d\'un **script wrapper exécuté en root via `sudo`**, autorisé de façon strictement ciblée dans `sudoers` (`NOPASSWD` sur ce seul binaire).',
            'Le wrapper n\'expose qu\'une **liste fermée d\'actions** (`create-repo`, `delete-repo`, `rename-repo`, `backup-all`, `add-user`, `migrate-trunk`...) via un `case` bash : toute action non reconnue est rejetée, aucune commande arbitraire n\'est possible.',
            'Chaque action **revalide ses propres paramètres côté bash** (regex sur les noms, vérification d\'existence des chemins) sans jamais faire confiance aux données reçues, même si elles ont déjà été validées côté PHP.'
          ]
        },
        {
          title: 'Architecture - PHP & scripts Bash',
          items: [
            'Un endpoint PHP par fonctionnalité (`create_depot.php`, `backup.php`, `show_history.php`...) qui construit la commande et appelle exclusivement le wrapper, jamais les scripts SVN directement.',
            'Toutes les commandes shell passent par `escapeshellarg()` et la sortie est inspectée pour détecter des motifs d\'erreur (`svn: E`, `Permission denied`...), car `sudo` peut renvoyer un code 0 même en cas d\'échec partiel.',
            'Le téléchargement des sauvegardes utilise `realpath()` et une vérification de préfixe de dossier pour empêcher toute tentative de path traversal.',
            'Les scripts Bash métier (`initDepotSVN`, `deleteDepotSVN`, `migrateTrunk`, `backupToDiskSVNZip`...) restent isolés dans un dossier dédié, uniquement accessibles via le wrapper.'
          ]
        },
        {
          title: 'Sauvegarde asynchrone',
          items: [
            'La sauvegarde globale peut prendre du temps (plusieurs dépôts) : elle est lancée en arrière-plan avec `nohup`, détachée du process Apache, et retourne immédiatement son PID.',
            'L\'avancement est écrit dans un **fichier de statut JSON** (dépôt en cours, nombre traité/total, étape de compression) lu par le frontend via un polling régulier.',
            'Le frontend affiche une barre de progression en temps réel jusqu\'à la génération du ZIP final, prêt au téléchargement.'
          ]
        },
        {
          title: 'Frontend - Ext JS (Sencha)',
          items: [
            'Interface intégrée à l\'application interne existante, développée avec le framework **Ext JS** en suivant le pattern **MVVM** (View / ViewModel / ViewController) déjà en place dans le projet.',
            'Suivi de la sauvegarde via `PollingProvider` et une barre de progression native Ext JS.'
          ]
        }
      ]
    }
  },
  {
    slug: 'furious-ducks-thetiptop',
    title: 'Furious Ducks - Thé Tip Top : jeu-concours & refonte de marque',
    description: 'Projet de fin d\'année réalisé en groupe de trois au sein d\'une agence fictive : conception et développement d\'une plateforme de jeu-concours "100% gagnant" pour une marque de thé, avec refonte complète de son identité visuelle et stratégie digitale associée. Architecture full-TypeScript (NestJS, Next.js, PostgreSQL) pensée pour absorber 500 000 codes uniques et des pics de trafic imprévisibles.',
    image: '',
    technologies: ['NestJS', 'Next.js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Cypress', 'K6'],
    category: 'web',
    detailedContent: {
      introduction: 'Projet de fin d\'année réalisé en équipe de trois au sein de "Furious Ducks", une agence digitale fictive mise en situation dans le cadre de ma formation. Le client, "Thé Tip Top", est lui aussi fictif, mais l\'ensemble du dossier (cahier des charges, spécifications techniques, benchmark concurrentiel, stratégie et code) a été traité avec des exigences professionnelles réelles, jusqu\'à la mise en ligne du site pour la soutenance.\n\nLa demande : à l\'occasion de l\'ouverture d\'une dixième boutique, digitaliser un jeu-concours "100% gagnant" déclenché par un acte d\'achat en boutique (code ticket à 10 caractères saisi en ligne, gain instantané), tout en profitant de l\'opération pour refondre l\'identité visuelle de la marque et construire une véritable stratégie d\'acquisition et de fidélisation digitale.\n\nEn tant que **Développeur Lead** de l\'équipe, j\'ai piloté l\'architecture technique et les choix de stack, en binôme avec une cheffe de projet (stratégie marketing digitale) et un UX/UI designer. Ma partie de ce dossier porte sur la conception du backend, du frontend et de l\'infrastructure de la plateforme ; le [workflow CI/CD industrialisé de l\'agence](/projects/furious-ducks-cicd) que j\'ai également conçu est présenté séparément car il constitue un livrable technique à part entière.',
      features: [
        'Mécanique de jeu-concours :',
        '  • Génération et attribution de 500 000 codes tickets uniques à 10 caractères',
        '  • Saisie du code et découverte instantanée du gain',
        '  • Répartition des lots en gammes progressives (infuseur à thé → coffret découverte 69€)',
        'Comptes et authentification :',
        '  • Inscription avec consentement RGPD horodaté',
        '  • Connexion par email/mot de passe ou Social Login (Google, Facebook)',
        '  • Espace personnel avec historique des participations et des gains',
        'Back-office :',
        '  • Tableau de bord administrateur avec statistiques en temps réel',
        '  • Déclenchement du tirage au sort final',
        '  • Espace "employé boutique" pour rechercher un client et valider la remise d\'un lot',
        'Refonte de marque :',
        '  • Recherche et sélection du logo, charte graphique complète',
        '  • UX mapping (empathy map, experience map), zoning, wireframes et maquettes responsives',
        'Stratégie digitale associée :',
        '  • SEO, SMO et emailing pensés autour des trois objectifs (acquisition, identité, fidélisation)',
        '  • Suivi de performance via Google Analytics 4'
      ],
      technical: [
        {
          title: 'Backend - API REST (NestJS)',
          items: [
            '**NestJS 10** en **TypeScript**, retenu face à Express/Fastify pour sa structure modulaire imposée (auth, tickets, utilisateurs, gains, statistiques) qui limite la dette technique sur un projet multi-développeurs',
            '**Prisma** connecté à **PostgreSQL 16**, choisi pour la génération automatique de types à partir du schéma et ses migrations automatiques',
            'Authentification via **Passport.js** (JWT + OAuth2 Google/Facebook)',
            '**Redis** pour le cache des statistiques du dashboard admin, les sessions, le rate limiting et la file d\'attente de synchronisation vers l\'outil d\'emailing',
            'Validation des données via **class-validator**, documentation API générée avec **Swagger/OpenAPI**'
          ]
        },
        {
          title: 'Frontend - WebApp (Next.js)',
          items: [
            '**Next.js 14** en App Router, choisi pour le rendu SSR/SSG (référencement de l\'opération pendant toute sa durée) et les Server Components (moins de JS envoyé au mobile, support privilégié de la cible)',
            '**TailwindCSS** et **Shadcn/ui** pour l\'interface, **Zustand** pour l\'état global et **React Query** pour la synchronisation des données serveur',
            '**React Hook Form** et **Zod** pour les formulaires, en cohérence avec la validation côté serveur'
          ]
        },
        {
          title: 'Stratégie de tests',
          items: [
            'Pyramide de tests à quatre niveaux, intégrée au pipeline CI/CD : unitaires (**Jest**), intégration (base PostgreSQL/Redis réelles en conteneur dédié), end-to-end (**Cypress**) et performance (**K6**)',
            'Quality gate à 80% de couverture minimale sur le nouveau code avant tout déploiement',
            'Tests de charge K6 simulant les pics de trafic liés aux activations d\'influenceurs (jusqu\'à 500 utilisateurs simultanés), avec seuil de temps de réponse p95 < 500ms sur les endpoints critiques'
          ]
        },
        {
          title: 'Infrastructure et sécurité',
          items: [
            '**Docker / Docker Compose** pour containeriser API, base de données, Redis et frontend, avec parité stricte entre développement, staging et production',
            'Reverse proxy **Traefik** avec certificats TLS **Let\'s Encrypt** automatiques',
            'Sous-domaine dédié à l\'opération, isolé du site principal, pour ne pas polluer le référencement une fois le jeu-concours clos',
            'Sauvegardes selon le principe **3-2-1** (production, stockage objet distant, support externe), chiffrées en **AES-256**, avec test de restauration documenté avant le lancement'
          ]
        }
      ],
      workflow: 'Le projet a servi de **projet pilote** pour éprouver en conditions réelles le [workflow CI/CD industrialisé conçu pour Furious Ducks](/projects/furious-ducks-cicd) : chaque push déclenche automatiquement build, tests et analyse de qualité, avec promotion contrôlée d\'une image Docker identique du développement à la production.',
      monitoring: 'Le suivi de l\'opération repose sur :\n\n• **Prometheus / Grafana** pour les métriques techniques (latence, taux d\'erreur, charge)\n• **Google Analytics 4** pour les indicateurs marketing (acquisition, conversion, participation)\n• Rapports de tests de charge **K6** archivés à chaque sprint pour suivre l\'évolution des performances'
    }
  },
  {
    slug: 'furious-ducks-cicd',
    title: 'Furious Ducks - Workflow CI/CD industrialisé',
    description: 'Conception d\'un workflow CI/CD complet basé sur Docker pour industrialiser la production d\'une agence digitale fictive de 45 collaborateurs : pipelines automatisés (build, tests, sécurité, déploiement) sur trois environnements, monitoring, backups et transition vers l\'Agile Scrum. Projet de fin d\'année, livré avec sa propre infrastructure déployée pour la soutenance.',
    image: '',
    technologies: ['Docker', 'Jenkins', 'GitLab CE', 'Traefik', 'Harbor', 'SonarQube', 'Prometheus', 'Grafana', 'Loki', 'Restic'],
    category: 'web',
    detailedContent: {
      introduction: 'Second volet du projet de fin d\'année mené au sein de l\'agence fictive "Furious Ducks", cette fois côté organisation interne plutôt que côté client.\n\nLe constat de départ : une agence de 45 collaborateurs qui a grandi plus vite que ses pratiques de production. Sans versionning centralisé, sans backups automatisés et sans tests, chaque mise en production manuelle concentre un risque d\'erreur humaine, et les anomalies ne remontent qu\'une fois en production. La direction a confié à l\'équipe une mission en deux volets : faire évoluer la méthodologie de gestion de projet (du cycle en V vers l\'Agile Scrum) et concevoir un **workflow de production industrialisé, entièrement basé sur Docker**, capable de couvrir tous les projets de l\'agence quelle qu\'en soit la nature.\n\nEn tant que **Développeur Lead**, j\'ai conçu l\'architecture du workflow et justifié l\'ensemble des choix techniques. Le projet [Thé Tip Top](/projects/furious-ducks-thetiptop) a servi de projet pilote pour éprouver ce workflow dans des conditions réelles avant sa généralisation à l\'agence.',
      features: [
        'Pipeline CI/CD automatisé de bout en bout :',
        '  • Déclenchement automatique à chaque push/merge via webhooks GitLab',
        '  • Build des images Docker, tests (unitaires, intégration, E2E), scans qualité et sécurité',
        '  • Publication versionnée des artefacts dans un registre centralisé',
        '  • Déploiement automatique en DEV, contrôlé en PREPROD, validé manuellement en PROD',
        'Trois environnements strictement séparés (DEV / PREPROD / PROD) avec parité de configuration entre PREPROD et PROD',
        'Sécurité intégrée au pipeline (DevSecOps) : scan de vulnérabilités des images, audit des dépendances, détection de secrets',
        'Monitoring et alerting proactifs sur l\'ensemble des services',
        'Sauvegardes automatisées avec politique de rétention Grandfather-Father-Son',
        'Transition méthodologique du cycle en V vers l\'Agile Scrum, articulée avec le rythme des pipelines'
      ],
      technical: [
        {
          title: 'Reverse proxy - Traefik',
          items: [
            'Point d\'entrée unique du workflow : routage automatique vers les conteneurs (SCM, CI, registry, monitoring) via labels Docker Compose',
            'HTTPS systématique avec certificats **Let\'s Encrypt** auto-renouvelés, séparation par sous-domaines dédiés (ci., git., registry., monitor.)',
            'Middlewares d\'authentification et de limitation de débit sur les routes sensibles'
          ]
        },
        {
          title: 'SCM - GitLab Community Edition',
          items: [
            'Dépôt central de code, pipelines-as-code et fichiers de configuration ("source of truth" de l\'agence)',
            'Stratégie **GitFlow** (main, develop, feature/*, release/*, hotfix/*), branches protégées, Merge Request obligatoire avec au moins une approbation',
            '**Conventional Commits** et **Semantic Versioning** pour la traçabilité et la génération automatique de changelogs'
          ]
        },
        {
          title: 'Orchestration CI - Jenkins',
          items: [
            'Pipelines définis en **Jenkinsfile** versionnés dans chaque dépôt (Pipeline as Code)',
            'Credentials gérés via le Jenkins Credentials Store avec rotation trimestrielle',
            '**Shared Libraries** pour standardiser les étapes communes entre projets sans duplication',
            'RBAC à trois rôles : admin CI, mainteneur, développeur'
          ]
        },
        {
          title: 'Registry Docker - Harbor',
          items: [
            'Stockage centralisé, signature et scan de vulnérabilités de toutes les images produites',
            'Promotion d\'une **image identique** de DEV vers PREPROD puis PROD, sans reconstruction, garantissant la reproductibilité des déploiements',
            'Convention de tagging app:version, app:commitSHA, avec politique de rétention et garbage collection'
          ]
        },
        {
          title: 'Qualité et sécurité (DevSecOps)',
          items: [
            '**SonarQube Community Edition** avec quality gates bloquants (couverture minimale, zéro vulnérabilité critique, duplication < 3%)',
            '**K6** pour les tests de charge en PREPROD avant toute promotion en production',
            '**Trivy** (scan des images), **Semgrep** (analyse statique SAST) et **Gitleaks** (détection de secrets, hook pre-commit) intégrés directement dans les pipelines',
            'Gestion stricte des secrets : Jenkins Credentials Store pour les secrets CI/CD, credentials distincts par environnement, aucun secret versionné dans Git'
          ]
        },
        {
          title: 'Monitoring - Prometheus, Grafana, Loki',
          items: [
            '**Prometheus** pour la collecte de métriques (CPU, RAM, disque, latence, taux d\'erreur)',
            '**Grafana** pour les dashboards standardisés et l\'alerting basé sur les symptômes (plutôt que sur les causes)',
            '**Loki** pour l\'agrégation et l\'interrogation centralisée des logs de l\'ensemble des services'
          ]
        },
        {
          title: 'Backups - Restic & MinIO',
          items: [
            'Sauvegarde des données, configurations et volumes Docker via **Restic**, vers un stockage objet S3-compatible **MinIO**',
            'Politique de rétention Grandfather-Father-Son (quotidienne sur 7 jours, hebdomadaire sur 4 semaines, mensuelle sur 6 mois, annuelle sur 2 ans)'
          ]
        }
      ],
      workflow: 'Le workflow standardise la chaîne de production pour tous les projets de l\'agence (sites vitrines, applications web, API, mobile) sans imposer de technologie unique :\n\n1. **DEV** : intégration continue et tests automatisés à chaque push\n2. **PREPROD** : validation fonctionnelle et technique, recette et tests de charge K6, environnement au plus proche de la production\n3. **PROD** : promotion de l\'image Docker validée en PREPROD, sans reconstruction, avec validation humaine\n\nLa méthodologie **Agile Scrum** structure le rythme des sprints, chaque sprint donnant lieu à des livraisons testées et intégrées automatiquement, tandis que le workflow CI/CD automatise et sécurise la chaîne technique correspondante.',
      monitoring: 'La supervision proactive remplace une exploitation jusque-là réactive (incidents découverts en premier par le client) :\n\n• **Prometheus / Grafana** pour les métriques techniques et applicatives, avec alerting sur les symptômes (latence, taux d\'erreur, saturation)\n• **Loki** pour la journalisation centralisée\n• Vérification d\'intégrité hebdomadaire des sauvegardes et test de restauration documenté',
      assets: {
        title: 'Architecture globale du workflow',
        items: [
          '**Traefik** (entrée unique HTTPS) ↔ **GitLab CE** (SCM) → webhook → **Jenkins** (CI/CD)',
          '**Jenkins** → build/tests/scans → **Harbor** (registry) → déploiement **DEV → PREPROD → PROD**',
          '**Prometheus / Grafana / Loki** (monitoring) et **Restic / MinIO** (backups) supervisent l\'ensemble des services'
        ]
      }
    }
  },
  {
    slug: 'beroli',
    title: 'Beroli - Application mobile',
    description: 'Application mobile Flutter développée pour optimiser la gestion des interventions terrain d\'une entreprise. Authentification sécurisée, synchronisation en temps réel avec Firebase et interface intuitive pour les techniciens.',
    image: '',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/matbel91765/beroli',
    demo: 'https://www.canva.com/design/DAF-QIOEFEw/H_RNdqkVg2smDcXOgbXX9w/edit',
    demoLabel: 'Voir la présentation Canva',
    category: 'mobile'
  },
  {
    slug: 'rjweb',
    title: 'RjWeb - Plateforme communautaire',
    description: 'Plateforme web développée durant mon stage pour centraliser les activités du quartier Hilard à Laval. Inscription aux évènements, newsletter automatisée, gestion des participants et espace administrateur complet.',
    image: '/projects/preview.png',
    imageLight: '/projects/preview_white.png',
    technologies: ['PHP', 'JavaScript', 'MySQL', 'HTML', 'CSS'],
    github: 'https://github.com/TabarBaptiste/pyramide',
    demo: null,
    category: 'web',
    screenshots: [
      { name: 'Accueil', path: '/projects/utilisateur.png' },
      { name: 'Connexion', path: '/projects/connexion.png' },
      { name: 'Contact', path: '/projects/contact.png' },
      { name: 'Inscription', path: '/projects/inscription.png' },
      { name: 'Liste inscrits', path: '/projects/inscrit.png' },
      { name: 'Profil', path: '/projects/profil.png' },
      { name: 'À propos', path: '/projects/about.png' }
    ],
    detailedContent: {
      introduction: 'Plateforme web réalisée durant mon stage de BTS pour centraliser et faciliter la gestion des activités du quartier Hilard à Laval. \n\n Le site permettait aux habitants de s’inscrire aux évènements, de recevoir automatiquement les informations importantes par e-mail, et d’accéder à un espace personnel. \n\n Un espace administrateur complet permettait de gérer les évènements, les utilisateurs et les envois de newsletters.',
      features: [
        'Création de compte utilisateur, connexion, modification et suppression du compte.',
        'Inscription et désinscription aux différents évènements.',
        'Envoi automatique d’e-mails (confirmations, rappels, newsletters) avec **PHPMailer**.',
        'Espace administrateur permettant :',
        '  • de créer, modifier et supprimer les évènements,',
        '  • de gérer les participants,',
        '  • d’administrer les comptes utilisateurs.'
      ],
      technical: [
        {
          title: 'Frontend',
          items: ['Développé en **HTML**, **CSS**, **JavaScript**.', 'Interface simple et adaptée à un public non technique.']
        },
        {
          title: 'Backend',
          items: ['Développé en **PHP procédural** avec requêtes SQL directes.', 'Gestion de la base de données via **phpMyAdmin**.', 'Environnement local basé sur **WampServer**.']
        },
        {
          title: 'Outils et bibliothèques',
          items: ['**PHPMailer** pour l’envoi d’e-mails.', '**Sessions PHP** pour l’authentification.']
        }
      ]
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map(p => p.slug);
}
