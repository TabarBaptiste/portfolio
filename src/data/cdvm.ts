// Contenu de la page « Travaux au CDVM ».
// Le texte accepte la même mise en forme légère que les études de cas
// (**gras** et `code`), rendue par formatText dans la page.

export interface CdvmSection {
  title: string;
  paragraphs: string[];
}

export interface Chantier {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  tags: string[];
  problem: string[];
  sections: CdvmSection[];
  result: string;
}

export const intro = {
  eyebrow: 'Conseil départemental du Val-de-Marne',
  title: 'Outillage du cycle de vie applicatif',
  period: 'Octobre 2023 → septembre 2026 · Domaine Développement',
  paragraphs: [
    "Le parc applicatif du CDVM, c'est une trentaine d'applications métier qui partagent toutes le même moteur maison, **Belight** - un socle backend PHP et interface ExtJS commun à tout le parc. Ces applications vivent sur des dépôts **SVN**, clonés localement sur des postes Windows, et sont déployées sur des serveurs Linux en développement, qualification et production.",
    "Autour de ce parc, il y avait tout un ensemble de gestes **répétitifs, manuels et faillibles** : vérifier qu'un serveur de production est bien configuré avant d'y installer une application, fabriquer à la main la liste des fichiers d'un livrable, administrer les dépôts SVN en se connectant directement sur le serveur, migrer une librairie de génération Excel obsolète application par application.",
    "Le fil rouge de mon travail a été de **transformer ces gestes manuels en outils**, et de ramener ces outils **dans Belight et dans les interfaces que l'équipe utilise déjà**, plutôt que dans des scripts que seul leur auteur sait lancer.",
  ],
};

export interface GlossaireEntry {
  term: string;
  definition: string;
  slug: string;
  // Mots à repérer dans le texte pour poser une astérisque de renvoi vers cette entrée.
  // Vide = le terme est déjà mis en valeur autrement (ex : `code`), pas besoin d'astérisque.
  match: string[];
}

export const glossaire: GlossaireEntry[] = [
  {
    term: 'Belight',
    slug: 'belight',
    match: ['Belight'],
    definition:
      "Le moteur maison du CDVM : un socle commun de backend PHP et d'interface ExtJS, partagé par la trentaine d'applications métier du parc. Chaque application est une déclinaison de ce même socle.",
  },
  {
    term: 'ExtJS',
    slug: 'extjs',
    match: ['ExtJS'],
    definition:
      "Framework JavaScript pour interfaces web riches (formulaires, grilles, fenêtres), utilisé côté client par Belight et par Liste Serveur.",
  },
  {
    term: 'SVN (Subversion)',
    slug: 'svn',
    match: ['SVN'],
    definition:
      "Système de gestion de versions du code, comme Git mais centralisé : un seul dépôt de référence par application, avec un historique de révisions numérotées et un mécanisme de branches et tags.",
  },
  {
    term: 'Trunk / branche / tag',
    slug: 'trunk-branche-tag',
    match: ['trunk', 'branches?', 'tags?'],
    definition:
      "Vocabulaire SVN. Le trunk est la ligne de développement principale d'un dépôt. Une branche est une copie de travail parallèle (par exemple pour figer une ancienne version) ; un tag est une copie figée à un instant donné, en général une version livrée.",
  },
  {
    term: 'php.ini',
    slug: 'php-ini',
    match: [],
    definition:
      "Fichier de configuration de PHP : mémoire allouée, durée d'exécution maximale, extensions actives, etc. Un serveur web et une exécution en ligne de commande peuvent charger deux `php.ini` différents.",
  },
  {
    term: 'MariaDB',
    slug: 'mariadb',
    match: ['MariaDB'],
    definition:
      'Système de gestion de base de données relationnelle utilisé par les applications du CDVM, compatible avec MySQL.',
  },
  {
    term: 'Active Directory / LDAP',
    slug: 'active-directory-ldap',
    match: ['Active Directory', 'LDAP'],
    definition:
      "Annuaire d'entreprise de la collectivité, qui centralise les comptes utilisateurs. LDAP est le protocole standard utilisé pour l'interroger.",
  },
  {
    term: 'SOAP',
    slug: 'soap',
    match: ['SOAP'],
    definition:
      "Protocole d'échange entre applications via des webservices XML, utilisé ici pour un webservice interne à la collectivité.",
  },
  {
    term: 'Apache',
    slug: 'apache',
    match: ['Apache'],
    definition:
      "Serveur web qui exécute les applications PHP du parc. Il tourne sous un compte système dédié, volontairement limité en droits.",
  },
  {
    term: 'Liste Serveur',
    slug: 'liste-serveur',
    match: ['Liste Serveur'],
    definition:
      "Application interne du CDVM qui centralise l'inventaire des applications du parc et, depuis ce chantier, l'administration des dépôts SVN.",
  },
  {
    term: 'PHPExcel / PhpSpreadsheet',
    slug: 'phpexcel-phpspreadsheet',
    match: ['PHPExcel', 'PhpSpreadsheet'],
    definition:
      'Deux librairies PHP successives pour générer des fichiers Excel depuis le code. PHPExcel est abandonnée depuis 2017 ; PhpSpreadsheet est sa remplaçante activement maintenue.',
  },
  {
    term: 'CLI',
    slug: 'cli',
    match: ['CLI'],
    definition:
      "Command Line Interface : exécution d'un script en ligne de commande, par opposition à un appel depuis un navigateur web.",
  },
  {
    term: 'SEPI',
    slug: 'sepi',
    match: ['SEPI'],
    definition:
      "Service Exploitation et Production Informatique. L'équipe du CDVM chargée de mettre effectivement les applications en production sur les serveurs.",
  },
  {
    term: 'DOCMEP',
    slug: 'docmep',
    match: ['DOCMEP'],
    definition:
      "Document de mise en production : le document Word de procédure d'installation qui accompagne chaque livraison, rédigé par les développeurs à destination du SEPI.",
  },
];

export const chantiers: Chantier[] = [
  {
    slug: 'exploitation-svn',
    index: '01',
    title: 'Exploitation SVN',
    tagline: "L'administration SVN par le web",
    tags: ['Bash', 'sudo NOPASSWD', 'PHP 8', 'ExtJS', 'svnadmin'],
    problem: [
      "Toute l'administration des dépôts SVN se faisait en SSH sur le serveur, en root. Créer un dépôt pour une nouvelle application, ajouter un utilisateur SVN, créer une branche de version, sauvegarder l'ensemble des dépôts, consulter un historique : à chaque fois, une connexion serveur et des commandes tapées à la main. Concentré sur une poignée de personnes, non tracé, et risqué.",
    ],
    sections: [
      {
        title: "L'architecture de sécurité",
        paragraphs: [
          "Le point de départ était contraignant : Apache tourne sous un compte volontairement limité, qui n'a évidemment pas le droit de créer des dépôts SVN ni de modifier le fichier d'authentification SVN. Lui donner ces droits aurait été inacceptable.",
          "La solution a été de construire un intermédiaire unique en Bash, exécuté avec des droits root via `sudo`, mais strictement encadré : il n'expose qu'un catalogue fermé d'une treizaine d'opérations précises, et refuse explicitement tout ce qui n'y figure pas. PHP ne peut donc jamais exécuter une commande arbitraire en root, il peut seulement demander l'une des opérations prévues au catalogue, elle-même doublement validée : une première fois côté PHP, une seconde fois dans le wrapper Bash, avec des règles strictes sur les noms de dépôts autorisés, les types d'opérations possibles, et une vérification que le dépôt existe vraiment avant d'agir dessus.",
          "Un détail dont je suis particulièrement content : la suppression d'un compte SVN est bloquée si ce compte a une activité réelle dans l'historique d'au moins un dépôt, l'outil parcourt tous les dépôts, vérifie si la personne y a commité quelque chose, et si oui, demande une confirmation explicite plutôt que de supprimer silencieusement un compte qui fait partie de la mémoire du projet.",
        ],
      },
      {
        title: 'Les fonctionnalités livrées',
        paragraphs: [
          "La création de dépôt SVN, avec deux options : un dépôt nu, ou un dépôt directement initialisé avec la structure applicative de Belight. Dans les deux cas, si un dépôt du même nom existe déjà, rien n'est écrasé automatiquement : l'utilisateur est prévenu et doit confirmer explicitement.",
          "La liste des dépôts existants, avec pour chacun sa dernière révision, son dernier auteur, sa date de modification, et une vérification fine sur les sauvegardes : un dépôt n'est considéré comme sauvegardé à jour que si son archive de sauvegarde correspond exactement à sa révision actuelle, pas à une version antérieure qui donnerait une fausse impression de sécurité.",
          "La création de branches et de tags SVN, avec trois modes selon le besoin, dupliquer le trunk courant, créer une référence vide, ou le geste le plus élaboré : archiver l'ancienne version dans une branche puis réinitialiser le trunk avec la dernière version du moteur Belight, exactement le geste d'une montée de version majeure.",
          "La consultation de l'historique SVN complet d'un dépôt, avec filtrage par plage de révisions et détail des fichiers touchés.",
          "Le renommage et la suppression de dépôts, la gestion des branches et tags, et la gestion des comptes SVN complètent l'ensemble.",
        ],
      },
      {
        title: 'La sauvegarde, le morceau le plus élaboré',
        paragraphs: [
          "Une sauvegarde complète de tous les dépôts SVN prend plusieurs minutes, bien au-delà de ce qu'une page web peut attendre sans se bloquer. J'ai conçu ce traitement pour qu'il se lance en tâche de fond, indépendamment de la page qui l'a déclenché, en écrivant sa progression dans un fichier de suivi que l'interface interroge régulièrement pour alimenter une vraie barre de progression ExtJS.",
          "Plusieurs garde-fous s'y ajoutent : si une sauvegarde est déjà en cours, l'interface affiche qui l'a lancée. Le pourcentage affiché ne peut jamais atteindre 100 % tant que le traitement n'est pas réellement terminé. Le téléchargement du fichier final vérifie strictement que le chemin demandé reste dans le répertoire autorisé. Et les fichiers temporaires sont nettoyés automatiquement.",
        ],
      },
    ],
    result:
      "L'administration SVN courante ne nécessite plus d'accès SSH root au serveur. Les opérations sont validées, tracées, et accessibles à toute l'équipe depuis Liste Serveur, tout en restant strictement bornées par le catalogue fermé d'actions autorisées.",
  },
  {
    slug: 'check-install',
    index: '02',
    title: 'check_install',
    tagline: 'Le contrôle technique du serveur',
    tags: ['PHP 8', 'CLI + Web', 'DOCX / ZIP', 'SMTP'],
    problem: [
      "Livrer une application sur un nouveau serveur, c'était partir d'un document Word de procédure d'installation (le **DOCMEP**, document de mise en production), listant la version de PHP attendue, la version de MariaDB, les réglages `php.ini` et les extensions à activer, puis vérifier tout ça **à la main**, ligne par ligne, sur la machine cible. Cette vérification est à la charge du **SEPI** (Service Exploitation et Production Informatique), l'équipe chargée de mettre effectivement les applications en production, l'outil leur est destiné en priorité. Une extension oubliée, un `memory_limit` trop bas, et l'application partait en erreur en production, souvent plusieurs jours après le déploiement, quand un utilisateur tombait dessus.",
    ],
    sections: [
      {
        title: 'Un outil qui répond à une seule question',
        paragraphs: [
          "J'ai construit un script autonome, déposable sur n'importe quel serveur, qui répond à : *cette machine est-elle prête à accueillir l'application ?* Il exécute une série de contrôles : la version de PHP, avec une comparaison volontairement stricte, version majeure et mineure identiques, seul le correctif peut être supérieur, parce qu'un serveur en PHP 8.3 n'est pas « mieux » qu'un serveur attendu en PHP 8.2, c'est une version différente. Les réglages PHP critiques (mémoire allouée, durée d'exécution maximale, taille de fichiers acceptée), lus **directement dans le fichier `php.ini`** du serveur plutôt qu'en interrogeant PHP sur ses propres réglages, parce qu'en ligne de commande, PHP charge parfois un `php.ini` différent de celui utilisé par Apache, et une simple interrogation aurait pu donner une réponse trompeuse. L'état du service MariaDB et sa version, avec une commande adaptée selon Windows ou Linux, pour que le même outil serve en développement comme en production. Les extensions PHP requises, pilotées par une liste où chaque extension à vérifier est simplement décommentée, à la portée de n'importe quel exploitant sans toucher au code. Et deux contrôles réseau optionnels : la joignabilité de l'Active Directory de la collectivité, et celle d'un webservice SOAP interne, activés uniquement si nécessaire.",
        ],
      },
      {
        title: 'Un rapport qui remonte aux développeurs, pas au SEPI',
        paragraphs: [
          "L'outil envoie aussi un mail avec le rapport complet, avec un sujet différent selon qu'il y a des erreurs ou non. Ce mail part vers l'**équipe de développement**, pas vers le SEPI, pour que les développeurs puissent vérifier de leur côté s'il manque quelque chose dans le DOCMEP ou dans la configuration exécutée par le script.",
        ],
      },
      {
        title: "Le pont avec l'existant",
        paragraphs: [
          "Restait un maillon : quelqu'un devait quand même écrire la configuration de vérification en recopiant le document Word à la main. J'ai automatisé cette étape aussi : l'outil ouvre le `.docx` de procédure comme ce qu'il est au fond, une archive ZIP, en extrait le texte en préservant sa structure en paragraphes, puis repère automatiquement le nom de l'application, les versions attendues, les réglages et les extensions à activer.",
        ],
      },
    ],
    result:
      "On pointe l'outil sur le document de procédure de mise en production, on obtient une configuration de vérification prête à l'emploi.",
  },
  {
    slug: 'configinstall',
    index: '03',
    title: 'configinstall',
    tagline: 'Ramener cet outil dans Belight',
    tags: ['ExtJS', 'PHP 8', 'SVN export'],
    problem: [
      "L'outil de vérification fonctionnait, mais il fallait toujours ouvrir un terminal et savoir qu'il existait. Je l'ai intégré directement dans le back-office Belight, dans l'onglet Assistant, à côté des autres outils de développement.",
    ],
    sections: [
      {
        title: 'Le formulaire',
        paragraphs: [
          "J'ai construit un formulaire ExtJS structuré en quatre sections (Application, réglages PHP, MariaDB, extensions), avec une validation en temps réel : les caractères interdits sont bloqués à la frappe, le format attendu (une version PHP, une taille mémoire) est vérifié à la volée avec un message d'erreur explicite. Les champs de taille mémoire passent automatiquement en majuscules pendant la saisie, parce que `256m` et `256M` doivent produire exactement le même résultat.",
          "Le formulaire se pré-remplit tout seul à l'ouverture : le nom de l'application est repris de la configuration Belight courante, débarrassé du suffixe « - Dev » s'il traîne encore, les adresses mail de l'équipe de développement sont préremplies, et la liste des extensions disponibles est transformée automatiquement en cases à cocher.",
        ],
      },
      {
        title: 'La factorisation qui compte',
        paragraphs: [
          "À ce stade, j'avais deux façons de générer la même configuration : le script en ligne de commande d'un côté, le formulaire web de l'autre. Deux chemins qui produisent la même chose finissent toujours par diverger un jour. J'ai extrait cette logique dans un seul bloc partagé, utilisé par les deux entrées : la configuration générée est identique, quel que soit le chemin emprunté. Ce bloc commun embarque une petite intelligence contextuelle : l'adresse de l'Active Directory n'est proposée que si l'extension LDAP est cochée, et il en va de même pour le webservice SOAP.",
        ],
      },
      {
        title: 'Le kit de déploiement complet',
        paragraphs: [
          "Dernière brique : un bouton qui récupère automatiquement depuis SVN la dernière version des outils de vérification, les regroupe dans une archive ZIP horodatée, et la propose au téléchargement.",
        ],
      },
    ],
    result:
      "Au moment de préparer une livraison, on ouvre l'assistant Belight, on remplit le formulaire, on génère, on télécharge une archive, et on a le kit de vérification complet et à jour, prêt à déposer sur le serveur cible.",
  },
  {
    slug: 'svncompare',
    index: '04',
    title: 'svncompare',
    tagline: 'Fabriquer les livrables sans les faire à la main',
    tags: ['PHP 8', 'ExtJS', 'svn diff', 'svn log'],
    problem: [
      "Belight dispose déjà d'un module Package qui génère les livrables de production : on coche des fichiers dans une arborescence, il fabrique l'archive à déployer. Sauf que remplir cette liste était entièrement manuel. Pour chaque livraison, il fallait se souvenir de tout ce qui avait changé depuis la précédente mise en production, ou éplucher l'historique SVN à la main. Un fichier oublié dans le livrable, c'est une régression en production.",
      "Or cette information existe déjà, intacte, dans SVN : entre deux révisions, SVN sait exactement ce qui a été ajouté, modifié ou supprimé.",
    ],
    sections: [
      {
        title: 'La détection automatique du dépôt',
        paragraphs: [
          "J'ai construit une fenêtre de comparaison, ouverte depuis le module Package, qui détecte toute seule l'application en cours, retrouve automatiquement son dépôt SVN, et vérifie que cette information correspond bien à ce qui est déclaré dans **Liste Serveur**, l'application de la collectivité qui centralise l'inventaire de toutes les applications. Si les deux ne correspondent pas, un message d'alerte invite à corriger la fiche du référentiel, l'outil ne se contente pas de fonctionner, il signale au passage les incohérences qu'il croise. Et cette vérification n'est jamais bloquante : si Liste Serveur est injoignable, la comparaison fonctionne quand même.",
        ],
      },
      {
        title: 'Choisir une révision en la lisant, pas en la devinant',
        paragraphs: [
          "L'outil récupère l'historique des révisions SVN de l'application, chaque révision accompagnée de sa date et de son message de commit. On choisit donc sa révision de départ en lisant ce qui a été livré, pas en devinant un numéro au hasard. Un souci d'encodage m'a occupé un moment : les messages de commit ont été écrits sur plus de dix ans, depuis des postes et des clients SVN différents, et certains caractères accentués mal encodés faisaient planter l'affichage. J'ai ajouté une étape de normalisation systématique.",
        ],
      },
      {
        title: 'Le cœur : une comparaison qui connaît les règles du métier',
        paragraphs: [
          "Une fois les deux révisions choisies, l'outil lance une comparaison SVN entre elles, puis applique un filtrage qui encode les règles réelles de fabrication d'un livrable au CDVM : les fichiers propres à l'IDE de développement sont exclus, les fichiers de journalisation ne sont jamais livrés, certains dossiers techniques ne conservent que leur structure. Ces règles, c'était de la connaissance qu'il fallait avoir en tête à chaque livraison. Elles sont maintenant appliquées automatiquement, de la même façon, quelle que soit la personne qui prépare le livrable.",
          "Les résultats s'insèrent directement dans la grille du module Package, avec une vérification pour éviter les doublons, et un compte-rendu chiffré.",
        ],
      },
    ],
    result:
      "La construction d'un livrable passe de « se souvenir de ce qu'on a fait » à « choisir deux révisions SVN ». Le risque d'oubli disparaît.",
  },
  {
    slug: 'convert-phpexcel',
    index: '05',
    title: 'convert_phpexcel',
    tagline: 'La migration PHPExcel → PhpSpreadsheet',
    tags: ['PHP 8', 'CLI', 'Regex', 'Migration'],
    problem: [
      "PHPExcel, la librairie utilisée par une quinzaine de modules d'édition pour générer des fichiers Excel, est abandonnée depuis 2017. Sa remplaçante, PhpSpreadsheet, impose des changements mécaniques mais nombreux et dispersés : des noms de méthodes différents, des constantes déplacées, des propriétés de mise en forme renommées, des formats de valeurs qui changent. Ces usages étaient répartis dans une quinzaine de fichiers, sur autant d'applications différentes du parc, plus le cœur du moteur Belight.",
      "Le faire à la main, c'était garantir des oublis : une propriété de mise en forme oubliée ne fait pas planter le code, elle produit silencieusement un fichier Excel sans bordures.",
    ],
    sections: [
      {
        title: 'Un convertisseur, pas un script jetable',
        paragraphs: [
          "J'ai construit un outil de conversion automatique en PHP, capable de traiter un fichier isolé ou un dossier entier, piloté par une liste de correspondances entre l'ancienne et la nouvelle écriture, facile à enrichir dès qu'un nouveau cas se présente.",
          "Quelques choix de conception font la différence entre un script jetable et un outil de confiance : une copie de sauvegarde n'est créée que si le fichier va réellement être modifié. Si l'écriture du fichier converti échoue, la sauvegarde est automatiquement remise en place. Les nouvelles déclarations `use` nécessaires à PhpSpreadsheet sont insérées au bon endroit, juste après celles qui existent déjà, pour que le fichier converti reste lisible. Et l'outil peut être relancé sans risque sur un fichier déjà converti : il détecte que le travail est déjà fait et ne le refait pas.",
          "Le compte-rendu produit après chaque conversion affiche pour chaque changement le texte exact avant et après, pas une expression régulière abstraite, on peut le relire comme une vraie relecture, et repérer immédiatement si quelque chose semble anormal.",
        ],
      },
    ],
    result:
      "La migration a été menée sur l'ensemble du parc concerné, quinze fichiers, répartis sur neuf applications différentes, plus le moteur Belight, de façon uniforme et vérifiable. Le parc applicatif est sorti d'une dépendance abandonnée depuis huit ans.",
  },
];

export const principes = [
  {
    title: 'Une seule source de vérité',
    body: "Dès qu'une même information a pu être produite par deux chemins différents, je les ai fusionnés en un seul.",
  },
  {
    title: 'La sécurité par liste blanche, jamais par liste noire',
    body: "Là où des droits élevés étaient nécessaires, l'accès n'a jamais été ouvert en confiance : toujours un catalogue fermé d'opérations précises, avec tout le reste refusé par défaut.",
  },
  {
    title: 'Les règles tacites deviennent des règles écrites',
    body: "Les exclusions à respecter dans un livrable, la définition d'une sauvegarde réellement à jour, l'interdiction de supprimer un compte actif : c'était de la connaissance dans la tête des gens. C'est maintenant appliqué automatiquement.",
  },
  {
    title: "L'outil doit être là où sont les gens",
    body: "Chaque outil a été ramené dans Belight ou dans Liste Serveur, pas laissé en script isolé.",
  },
  {
    title: 'Ne jamais détruire sans confirmation ni filet',
    body: "Sauvegarde avant modification, confirmation explicite avant d'écraser quelque chose qui existe déjà, blocage avant de supprimer un compte actif.",
  },
];

export const conclusion =
  "En une phrase : j'ai pris cinq gestes manuels, risqués et concentrés sur quelques personnes, et j'en ai fait des outils validés, tracés et accessibles à toute l'équipe, sans jamais élargir les droits du compte Apache d'un pouce.";
