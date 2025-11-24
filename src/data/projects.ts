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
      introduction: 'J\'ai conçu une extension à la demande de mon maître d\'apprentissage au Conseil Départemental du Val-de-Marne afin de faciliter la création de objets DAO en les générants automatiquement à partir de bases de données.\n\nLes DAO (Data Access Objects) permettent l\'accès aux données stockées dans divers SGBD (système de gestion de base de données).',
      features: [
        'Ajouter facilement des serveurs de bases de données.',
        'Explorer vos bases et tables directement depuis la sidebar.',
        'Générer automatiquement des fichiers DAO pour vos tables.',
        'Deux modes de génération :',
        '  • Sauvegarder : crée une sauvegarde dans backup/ avant d\'écraser.',
        '  • Écraser : remplace directement les fichiers existants.'
      ],
      technical: [
        {
          title: 'Développement',
          items: ['L\'extension a été développée en TypeScript.']
        },
        {
          title: 'Workflow CI/CD',
          items: [
            'En ce qui concerne le workflow j\'ai utilisé GitHub Actions pour le CI/CD (vérifier les fichiers dans .workflow/ pour s\'assurer que tout est correct et que je n\'ai rien oublié).',
            'Un workflow « Realease » pour mettre à jour automatiquement la version de l\'extension et publier l\'extension si je décide de le faire manuellement via le workflow_dispatch',
            '« PR Checks » avec code quality et pr-lint pour vérifier que le code est correct avant de faire le pull request'
          ]
        },
        {
          title: 'Monitoring',
          items: ['J\'ai utilisé Sentry pour récupérer les erreurs utilisateurs pour de les résoudre au plus vite afin d\'éviter une mauvaise expérience utilisateur.']
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
    demo: 'https://www.canva.com/design/DAF-QIOEFEw/Hb1j0QiRgpWCUF9E9B322Q/view?utm_content=DAF-QIOEFEw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hfc5b8fd71e',
    demoLabel: 'Présentation',
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
      introduction: 'Plateforme web développée durant mon stage de BTS pour centraliser les activités du quartier Lavalle. Inscription aux évènements, newsletter automatisée, gestion des participants et espace administrateur complet.',
      technical: [
        {
          title: 'Frontend',
          items: ['J\'ai utilisé HTML, CSS, JavaScript.']
        },
        {
          title: 'Backend',
          items: ['PHP pure avec requête SQL', 'PHPMyAdmin pour la base de données avec l\'environnement WampServer']
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
