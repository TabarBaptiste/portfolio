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
            'En ce qui conserve le workflow j\'ai utilisé GitHub Actions pour le CI/CD (vérifier les fichiers dans .workflow/ pour s\'assurer que tout est correct et que je n\'ai rien oublié).',
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
    description: 'Application web fullstack pour gérer et partager des recettes de cuisine. Frontend développé avec Angular en standalone components et Tailwind CSS. Backend REST API avec Node.js, Express et Prisma ORM connecté à PostgreSQL (Neon).',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    technologies: ['Angular', 'Express', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Render', 'Netlify'],
    github: 'https://github.com/TabarBaptiste/recettePerso',
    demo: 'https://recette-perso.netlify.app/',
    demoLabel: 'Voir le site',
    category: 'web',
    detailedContent: {
      introduction: 'J\'ai créer une application à usage personnel afin d\'enregistrer mes recettes de cuisine.\nJe peux modifier, supprimer, créer, consulter (CRUD) en me connectant via un code à quatre chiffres.',
      technical: [
        {
          title: 'Frontend',
          items: ['J\'ai conçu le front avec Angular et Tailwind CSS. J\'apprécie particulièrement la structure d\'Angular (MVC) avec laquelle on s\'y retrouve facilement. Et la personnalisation simplifiée de Tailwind CSS pour l\'aspect visuel de l\'application.']
        },
        {
          title: 'Backend',
          items: ['J\'ai utilisé Express API REST pour le backend car il offre une grande flexibilité et performance pour créer des API RESTful.']
        },
        {
          title: 'ORM',
          items: ['Prisma a été utilisé comme ORM pour la création simplifier de la structure de la Base de données Postgres']
        },
        {
          title: 'Base de données',
          items: ['Je me suis penché vers NeonDB pour sa simplicité d\'utilisation et d\'intégration, je dispose de 0,5Go de stockage qui est suffisant pour un usage personnel. Le changement vers une autre base de données en cas de stockage limité sera simplifié grâce à Prisma.']
        },
        {
          title: 'Web services',
          items: ['J\'ai opté pour Render comme web service et j\'y ai connecté NeonDB. Render permet d\'héberger et déployer facilement le backend de l\'application avec une intégration continue depuis GitHub.']
        },
        {
          title: 'Déploiement',
          items: ['Netlify pour le frontend et Render pour le backend ont été utilisés pour le déploiement de mon application. Ce sont deux solutions gratuites, simple d\'utilisation et accessible.']
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
