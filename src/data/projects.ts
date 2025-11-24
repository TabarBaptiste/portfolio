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
    slug: 'dao-generator',
    title: 'Extension VSCode - PHP DAO Generator',
    description: 'Extension VSCode permettant de générer automatiquement des fichiers DAO PHP à partir des attributs d\'une table de base de données. Connexion au serveur via formulaire intégré, génération de code optimisée et monitoring avec Sentry. Disponible sur le marketplace VSCode.',
    image: '/projects/logo.png',
    technologies: ['TypeScript', 'CI/CD', 'Sentry', 'JavaScript', 'MCP', 'Base de données'],
    github: 'https://github.com/TabarBaptiste/dao-generation',
    demo: 'https://marketplace.visualstudio.com/items?itemName=Baptiste-TABAR-LABONNE.php-dao-generator',
    demoLabel: 'Marketplace',
    category: 'web',
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
    slug: 'recettes',
    title: 'Recettes - Application de recettes',
    description: 'Application web personnelle permettant de gérer, organiser et partager facilement mes recettes de cuisine.\n\n Elle centralise toutes mes préparations en un seul endroit et me permet d’ajouter, modifier ou supprimer des recettes en quelques secondes.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    technologies: ['Angular', 'Express', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Render', 'Netlify'],
    github: 'https://github.com/TabarBaptiste/recettePerso',
    demo: 'https://recette-perso.netlify.app/',
    demoLabel: 'Voir le site',
    category: 'web',
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
    category: 'web'
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
