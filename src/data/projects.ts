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
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
    technologies: ['NestJS', 'Next.js', 'Prisma', 'Supabase', 'Stripe Connect', 'Cloudinary', 'Resend', 'Vercel', 'Render', 'GitHub Actions', 'IONOS'],
    github: 'https://github.com/TabarBaptiste/masseuse',
    demo: 'https://alydousheure.fr/',
    demoLabel: 'Voir le site',
    category: 'web',
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
          title: 'Frontend – Next.js',
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
          title: 'Backend – NestJS',
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
          title: 'Base de données – Prisma & Supabase',
          items: [
            '**Prisma** comme ORM pour une gestion type-safe de la base',
            '**Supabase (PostgreSQL)** pour l\'hébergement de la base de données',
            'Schéma relationnel complet (utilisateurs, réservations, prestations, avis, disponibilités)',
            'Migrations versionnées pour la traçabilité',
            'Indexation optimisée pour les requêtes fréquentes'
          ]
        },
        {
          title: 'Paiement – Stripe Connect',
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
          title: 'CI/CD – GitHub Actions',
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
            'Gestion d’erreurs renforcée grâce à **Sentry**.'
          ]
        },
        {
          title: 'CI/CD – Workflows GitHub Actions',
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
    slug: 'beroli',
    title: 'Beroli - Application mobile',
    description: 'Application mobile Flutter développée pour optimiser la gestion des interventions terrain d\'une entreprise. Authentification sécurisée, synchronisation en temps réel avec Firebase et interface intuitive pour les techniciens.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/matbel91765/beroli',
    demo: 'https://www.canva.com/design/DAF-QIOEFEw/H_RNdqkVg2smDcXOgbXX9w/edit',
    demoLabel: 'Voir la présentation Canva',
    category: 'mobile'
  },
  {
    slug: 'fuel',
    title: 'Fuel',
    description: 'Application web pour suivre les pleins d\'essence avec calculs automatiques des kilomètres parcourus, consommation et coûts. Inclut des statistiques en temps réel, visualisations graphiques, estimations de trajet, et interface moderne.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Next.js API Routes', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/TabarBaptiste/fuel',
    demo: 'https://fuel-nine.vercel.app/',
    demoLabel: 'Voir l\'application',
    category: 'web',
    screenshots: [
      { name: 'Tableau de bord', path: '/projects/fuel/tableau_bord.png' },
      { name: 'Historique', path: '/projects/fuel/historique.png' },
      { name: 'Résumé mensuel', path: '/projects/fuel/resume_mensuel.png' },
      { name: 'Graphiques', path: '/projects/fuel/graphiques.png' }
    ],
    detailedContent: {
      introduction: 'Application web **full-stack** développée pour suivre et gérer efficacement les pleins d\'essence d\'un véhicule.\n\nPensée pour un usage personnel, elle offre une interface intuitive permettant d\'enregistrer chaque plein, de visualiser les statistiques de consommation et de coûts, avec des calculs automatiques des kilomètres parcourus et de la consommation moyenne.\n\nLe projet met l\'accent sur une **expérience utilisateur fluide**, des **visualisations graphiques claires** et une **persistance fiable des données**. L\'ensemble a été conçu pour être **performant**, **maintenable** et facilement **déployable**.',
      features: [
        'Gestion des pleins :',
        '  • Ajout et suppression de pleins d\'essence',
        '  • Saisie des données (kilométrage, litres, prix)',
        '  • Calcul automatique des kilomètres parcourus',
        '  • Calcul automatique de la consommation (L/100km)',
        '  • Calcul automatique des coûts totaux',
        'Statistiques et visualisations :',
        '  • Graphiques en temps réel des consommations',
        '  • Évolution des coûts sur le temps',
        '  • Moyennes et tendances',
        '  • Cartes visuelles interactives',
        'Estimations de trajet :',
        '  • Calcul des litres estimés pour un trajet donné',
        '  • Estimation du coût basé sur la consommation moyenne',
        '  • Planification économique des déplacements',
        'Authentification et sécurité :',
        '  • Connexion sécurisée via code PIN',
        '  • Protection des données personnelles',
      ],
      technical: [
        {
          title: 'Frontend – Next.js 14',
          items: [
            '**Next.js** avec App Router pour une navigation moderne',
            '**React** pour la construction d\'interfaces dynamiques',
            '**TypeScript** pour la sécurité des types',
            '**Tailwind CSS** pour un design responsive et cohérent',
            'Composants réutilisables et modulaires',
            'Optimisation des performances et du SEO'
          ]
        },
        {
          title: 'Backend – Next.js API Routes',
          items: [
            '**API Routes** de **Next.js** pour les endpoints backend',
            'Architecture RESTful pour les opérations CRUD',
            'Validation des données côté serveur',
            'Gestion des erreurs et logging'
          ]
        },
        {
          title: 'Base de données – Neon PostgreSQL & Prisma ORM',
          items: [
            '**Prisma ORM** pour une gestion type-safe de la base',
            '**Neon PostgreSQL** pour l\'hébergement cloud de la base de données',
            'Schéma relationnel pour les pleins et véhicules',
            'Migrations automatisées et versionnées'
          ]
        },
        {
          title: 'Déploiement – Vercel',
          items: [
            'Déploiement automatique avec **Vercel** pour l\'hébergement full-stack (frontend + API)',
            'Variables d\'environnement sécurisées',
            'Monitoring des performances intégré'
          ]
        }
      ],
      workflow: 'Le projet suit un **workflow de développement simplifié** adapté à une application personnelle :\n\n1. **Développement local** : Next.js en mode développement avec base de données Neon\n2. **Contrôle qualité** : Vérifications TypeScript et tests manuels\n3. **Déploiement automatique** : Push sur GitHub déclenche le déploiement sur Vercel\n\nCette approche garantit **rapidité de développement** et **fiabilité du déploiement** pour un projet personnel.'
    }
  },
  {
    slug: 'recettes',
    title: 'Recettes - Application de recettes',
    description: 'Application web personnelle permettant de gérer, organiser et partager facilement mes recettes de cuisine.\n\n Elle centralise toutes mes préparations en un seul endroit et me permet d’ajouter, modifier ou supprimer des recettes en quelques secondes.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    technologies: ['Angular', 'Express', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Render', 'Netlify'],
    github: 'https://github.com/TabarBaptiste/recettePerso',
    demo: 'https://recette-perso.netlify.app/',
    demoLabel: 'Voir le site',
    category: 'web',
    screenshots: [
      { name: 'Détails Techniques', path: '/projects/Recettes_Details_techniques.png' },
    ],
    detailedContent: {
      introduction: 'Application web **full-stack** permettant de créer, organiser et consulter mes recettes de cuisine.\n\n Pensée pour un usage personnel, elle offre un parcours simple et rapide : ajout, modification, suppression et consultation des recettes (**CRUD**) grâce à un accès sécurisé par **code PIN à quatre chiffres**.\n\nLe projet met l\'accent sur une **interface épurée**, une **structure claire** et une **logique backend fiable**. L\'ensemble a été conçu pour être facilement **maintenable**, **déployable** et **évolutif**, avec une gestion propre des données et un **hébergement découplé** entre le frontend et le backend',
      technical: [
        {
          title: 'Frontend',
          items: ['Le frontend est conçu avec **Angular** pour sa structure claire et modulable, ainsi qu\'avec **Tailwind CSS**, qui facilite la création d\'une interface sobre et cohérente. L\'utilisation des **standalone components** permet une architecture plus légère et moderne.']
        },
        {
          title: 'Backend',
          items: ['Le backend repose sur **Express**, choisi pour sa simplicité, sa performance et la flexibilité qu\'il offre dans la création d\'**API REST** robustes.']
        },
        {
          title: 'ORM',
          items: ['J\'ai utilisé **Prisma** pour sa rapidité de développement et la clarté de son schéma. Il facilite la gestion des migrations et assure une bonne lisibilité du modèle de données.']
        },
        {
          title: 'Base de données',
          items: ['La base de données est hébergée sur **NeonDB**, un service **PostgreSQL** moderne offrant une intégration simple, du stockage gratuit et un environnement scalable si besoin. Grâce à **Prisma**, une éventuelle migration vers un autre service resterait simple.']
        },
        {
          title: 'Web services',
          items: ['Le backend est déployé sur **Render**, connecté directement à **NeonDB**. Render permet un déploiement automatique via **GitHub** et une gestion intuitive des services.']
        },
        {
          title: 'Déploiement',
          items: ['Le frontend est déployé sur **Netlify**, tandis que le backend est hébergé sur **Render**.\n\nCes deux solutions offrent une mise en ligne rapide, gratuite et parfaitement adaptée aux projets personnels.']
        }
      ]
    }
  },
  {
    slug: 'alydousheure',
    title: 'Aly dous\'heure - Site vitrine',
    description: 'Site vitrine moderne pour une masseuse professionnelle. Système de réservation en ligne, catalogue complet des prestations, visualisation des disponibilités, formulaire de contact et géolocalisation. Interface responsive optimisée pour mobile et desktop.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    technologies: ['Astro', 'CI/CD', 'Tailwind CSS', 'JavaScript', 'Référencement SEO'],
    github: 'https://github.com/TabarBaptiste/alydousheure_vitrine',
    demo: 'https://aly-dousheure.netlify.app/',
    demoLabel: 'Voir le site',
    category: 'web',
    detailedContent: {
      introduction: 'Création d\'un site vitrine moderne pour une masseuse professionnelle indépendante.\n\nLe site présente les prestations, les disponibilités, les informations de contact ainsi qu\'une carte de localisation.\n\nL\'objectif était de proposer une interface claire, chaleureuse et mobile first.\n\nCe projet m\'a également permis de travailler sur un vrai besoin client en intégrant identité visuelle, optimisation du contenu et bonnes pratiques SEO.',
      features: [
        'Catalogue complet des prestations et tarifs',
        'Visualisation des horaires et disponibilités',
        'Liens directs vers appel téléphonique, WhatsApp et Instagram',
        'Géolocalisation intégrée',
        'Interface responsive (mobile-first)',
        'Optimisation SEO pour la visibilité locale'
      ],
      technical: [
        {
          title: 'Technologies',
          items: [
            '**Astro** pour le rendu statique et la structure du site',
            '**Tailwind CSS** pour le design et la mise en page',
            '**Google Analytics** & **Google Search Console** pour le suivi du trafic et l\'optimisation',
            '**@astrojs/sitemap** pour améliorer l\'indexation par les moteurs de recherche'
          ]
        }
      ],
      workflow: 'Un workflow **CI/CD GitHub Actions** est mis en place pour automatiser le process de build.\n\nÀ chaque push sur la branche `master`, le pipeline :\n\n1. Vérifie et récupère le dépôt\n2. Installe les dépendances\n3. Génère la version optimisée du site\n4. Produit un artefact prêt à être déployé\n\nCe système garantit un déploiement rapide, fiable et reproductible à chaque mise à jour du projet.'
    }
  },
  {
    slug: 'rjweb',
    title: 'RjWeb - Plateforme communautaire',
    description: 'Plateforme web développée durant mon stage pour centraliser les activités du quartier Lavalle. Inscription aux évènements, newsletter automatisée, gestion des participants et espace administrateur complet.',
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
      introduction: 'Plateforme web réalisée durant mon stage de BTS pour centraliser et faciliter la gestion des activités du quartier Lavalle. \n\n Le site permettait aux habitants de s’inscrire aux évènements, de recevoir automatiquement les informations importantes par e-mail, et d’accéder à un espace personnel. \n\n Un espace administrateur complet permettait de gérer les évènements, les utilisateurs et les envois de newsletters.',
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
