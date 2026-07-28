// Contenu de la page « Travaux au CDVM ».
// Le texte accepte la même mise en forme légère que les études de cas
// (**gras** et `code`), rendue par formatText dans la page.

export interface CdvmSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
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
  period: 'Janvier 2026 → juillet 2026 · Domaine Développement',
  paragraphs: [
    "Le parc applicatif du CDVM, c'est une trentaine d'applications métier (`annuaire`, `ordival`, `sportval`, `sos_rentree`, `regie94`, `orv`, `dematrh`, `voeux_cd94`…) qui partagent toutes le même moteur maison **Belight** (backend PHP + frontend ExtJS). Elles vivent sur des dépôts SVN hébergés sur `svn3-prod-app`, et sont déployées sur des serveurs Windows en développement et Linux en production.",
    "Autour de ce parc, il y avait tout un ensemble de gestes **répétitifs, manuels et faillibles** : vérifier qu'un serveur de production est bien configuré avant d'y installer une application, fabriquer à la main la liste des fichiers d'un livrable, créer un dépôt SVN en SSH sur le serveur, migrer une librairie Excel obsolète fichier par fichier.",
    "Le fil rouge de mon travail a été de **transformer ces gestes manuels en outils**, et de ramener ces outils **dans les interfaces que les gens utilisent déjà** (le back-office Belight et l'application Liste Serveur) plutôt que dans des scripts que seul leur auteur sait lancer.",
  ],
};

export const chantiers: Chantier[] = [
  {
    slug: 'check-install',
    index: '01',
    title: 'check_install',
    tagline: 'Le contrôle technique du serveur',
    tags: ['PHP 8', 'CLI + Web', 'DOCX / ZIP', 'SMTP'],
    problem: [
      "Livrer une application sur un nouveau serveur, c'était partir d'un document Word de « Procédure d'installation » — un `.docx` listant la version de PHP attendue, la version de MariaDB, les directives `php.ini` et les extensions à activer — puis vérifier tout ça **à la main**, ligne par ligne, sur la machine cible.",
      "Une extension oubliée, un `memory_limit` trop bas, et l'application partait en erreur en production, souvent plusieurs jours après le déploiement, quand un utilisateur tombait dessus.",
    ],
    sections: [
      {
        title: 'Un script autonome qui répond à une seule question',
        paragraphs: [
          "`check.php` porte la classe `ServerChecker`, pilotée entièrement par un fichier `config.ini`. Déposée sur n'importe quel serveur, elle répond à : **est-ce que cette machine est prête à accueillir l'application ?** Sept familles de contrôles :",
        ],
        items: [
          "**Version de PHP**, avec une comparaison volontairement stricte : majeur et mineur doivent être *identiques*, seul le patch peut être supérieur. Un serveur en PHP 8.3 n'est pas « mieux » qu'un serveur en PHP 8.2 attendu, c'est un serveur différent.",
          "**Directives `php.ini`** (`memory_limit`, `max_execution_time`, `max_input_time`, `post_max_size`, `upload_max_filesize`), lues **directement dans le fichier `php.ini`** via `getIniFileValue()`, pas via `ini_get()`. En CLI, PHP charge un `php.ini` différent de celui d'Apache : `ini_get()` mentirait sur ce que verra réellement l'application. Il ne sert que de repli.",
          "**Service MariaDB actif**, avec une commande adaptée à l'OS (`Get-Service wampmariadb64` sous Windows, `service mariadb status` sous Linux), pour que le même script tourne en développement comme en production.",
          "**Version de MariaDB**, extraite de `mariadb --help | grep Distrib`.",
          "**Extensions PHP requises**. Le `config.ini` liste *toutes* les extensions connues, celles à vérifier étant décommentées. Le parsing INI natif de PHP ignore les commentaires, d'où `parseExtensions()` qui relit le fichier ligne à ligne. Activer un contrôle revient à enlever un `;`, lisible par n'importe quel exploitant.",
          "**Joignabilité de l'Active Directory** (`vipad.cg94.loc:636`), en `fsockopen` avec timeout, activée seulement si un hôte est renseigné.",
          "**Joignabilité du webservice SOAP**, même principe, avec gestion du préfixe `ssl://` selon le schéma.",
        ],
      },
      {
        title: 'Deux points de finition',
        items: [
          "**Le tri des résultats.** Les erreurs remontent en haut de chaque catégorie (`getResultPriority()`). Quand on ouvre un rapport, on veut voir ce qui cloche, pas scroller à travers vingt lignes vertes.",
          "**Le double rendu.** Le script détecte s'il tourne en web ou en CLI et produit soit un rapport HTML aux couleurs de la collectivité, soit un rapport texte aligné pour la console. Un seul script, deux contextes d'usage.",
        ],
        paragraphs: [
          "Il **envoie aussi un mail** à l'équipe de développement avec le log complet, avec un sujet différent selon qu'il y a des erreurs ou non. Les passerelles mail de la collectivité réécrivent les URLs, ce qui rendait les liens illisibles dans le rapport : `buildEmailHtmlBody()` échappe le contenu puis reconstruit des balises `<a>` propres avec un libellé lisible.",
        ],
      },
      {
        title: 'Le pont avec l\'existant : generate.php',
        paragraphs: [
          "Restait un maillon : quelqu'un devait quand même **écrire** le `config.ini` en recopiant le document Word. `generate.php` ouvre le `.docx` comme ce qu'il est, une archive ZIP, extrait `word/document.xml`, le parse en DOM et reconstruit le texte paragraphe par paragraphe pour préserver la structure. Puis il applique des extracteurs ciblés : nom de l'application, version PHP, version MariaDB, directives, extensions.",
          "Le morceau le plus retors a été `extractPhpSettings()`. Word produit des espaces insécables, colle parfois les paramètres les uns aux autres sans séparateur, et la mise en forme varie d'un document à l'autre. J'ai construit une regex à lookahead qui capture chaque valeur *jusqu'à la clé suivante*, avec normalisation des NBSP en amont, et une seconde passe plus permissive en repli si la première échoue. Une table de normalisation (`xml reader` → `xml`, `pdo mysql` → `pdo_mysql`) traduit les noms d'extensions écrits en langage humain.",
        ],
      },
    ],
    result:
      "On pointe le script sur le `.docx` de mise en production, on obtient un `config.ini` prêt à l'emploi. La chaîne complète, du document de procédure au rapport mail en passant par la configuration et la vérification, est automatisée de bout en bout.",
  },
  {
    slug: 'configinstall',
    index: '02',
    title: 'configinstall',
    tagline: 'Ramener check_install dans Belight',
    tags: ['ExtJS', 'PHP 8', 'SVN export'],
    problem: [
      "Le script fonctionnait, mais il fallait toujours ouvrir un terminal et connaître son existence. Je l'ai intégré au **back-office Belight**, dans l'onglet Assistant, à côté des autres outils de développement.",
    ],
    sections: [
      {
        title: 'Le formulaire',
        paragraphs: [
          "`ConfigInstall.js` est un formulaire ExtJS structuré en quatre fieldsets (Application, Paramètres PHP, MariaDB, Extensions), avec validation en saisie : `maskRe` bloque les caractères interdits à la frappe, `regex` valide le format (`8.2.13`, `256M`, `1G`), les messages d'erreur sont explicites. Les champs de taille mémoire passent automatiquement en majuscules à la volée, parce que `256m` et `256M` doivent produire le même résultat.",
          "`ConfigInstallViewController.js` pré-remplit le formulaire à l'ouverture : le nom de l'application est repris de la configuration Belight courante (débarrassé du suffixe `- Dev`), les emails développeurs sont préremplis, et la liste des extensions reçue du serveur est transformée dynamiquement en cases à cocher sur 6 colonnes. On ouvre le formulaire, l'essentiel est déjà rempli.",
        ],
      },
      {
        title: 'La factorisation qui compte',
        paragraphs: [
          "À ce stade j'avais **deux** générateurs de `config.ini` : le CLI (depuis le `.docx`) et le web (depuis le formulaire). Deux sources de vérité, donc deux occasions de diverger.",
          "J'ai extrait `ConfigIniBuilder.php`, une classe unique qui porte la liste de référence des extensions PHP et la méthode `build()` qui produit le fichier. Les deux points d'entrée l'appellent. Le fichier généré a exactement le même format, les mêmes commentaires, les mêmes défauts, quelle que soit la porte d'entrée.",
          "Le builder embarque une petite intelligence contextuelle : l'hôte Active Directory n'est prérempli **que si** l'extension `ldap` a été cochée, et l'URL SOAP **que si** l'extension `soap` l'a été. Pas de contrôle réseau parasite sur une application qui n'en a pas besoin.",
        ],
      },
      {
        title: 'Le kit de déploiement complet',
        paragraphs: [
          "Dernière brique, `zip_check_install.php` : un bouton « Récupérer les fichiers depuis SVN » qui fait un `svn export` de `check.php` et `config.ini` depuis le dépôt, les empaquette dans un ZIP horodaté et le propose au téléchargement.",
        ],
      },
    ],
    result:
      "Au moment de préparer une livraison, on ouvre l'assistant, on remplit le formulaire, on génère, on télécharge un ZIP, et on a le kit de vérification complet et à jour à déposer sur le serveur cible. Plus de « quelle version du script tu utilises, toi ? ».",
  },
  {
    slug: 'svncompare',
    index: '03',
    title: 'svncompare',
    tagline: 'Fabriquer les livrables sans les faire à la main',
    tags: ['PHP 8', 'ExtJS', 'svn diff', 'svn log'],
    problem: [
      "Belight disposait déjà d'un module **Package** qui génère les livrables de production : on coche des fichiers dans une arborescence, il fabrique l'archive. Sauf que **remplir cette liste était manuel**. Pour une livraison, il fallait se souvenir de tout ce qui avait changé depuis la mise en production précédente, ou lire les logs SVN à la main et retranscrire. Un fichier oublié dans le package, c'est une régression en production.",
      "Or l'information existe déjà : elle est dans SVN. Entre la révision de la dernière livraison et la révision courante, SVN sait exactement ce qui a été ajouté, modifié ou supprimé.",
    ],
    sections: [
      {
        title: 'Détection du dépôt et croisement avec le référentiel',
        paragraphs: [
          "`get_repositories.php` déduit l'application courante depuis l'URI de la requête, lance un `svn info` dans son répertoire pour récupérer l'URL du dépôt, puis **interroge l'application Liste Serveur** pour confronter cette URL au référentiel officiel.",
          "Ce croisement a une vraie valeur d'exploitation : si l'URL SVN locale ne correspond à aucune entrée active dans Liste Serveur, l'utilisateur voit un message d'alerte l'invitant à la corriger ou la créer. L'outil ne se contente pas de fonctionner, il **signale les incohérences du référentiel** au passage. Et la vérification est non bloquante : si Liste Serveur est injoignable, la comparaison fonctionne quand même.",
        ],
      },
      {
        title: 'Le parsing des révisions',
        paragraphs: [
          "`get_revisions.php` est une machine à états qui reconstruit, pour chaque révision, son numéro, sa date (reformatée en `jj/mm/aaaa`) et son message de commit multi-lignes. Avec une passe de normalisation d'encodage (`mb_detect_encoding` sur UTF-8 / ISO-8859-1 / Windows-1252 puis conversion), parce que les commits du dépôt ont été faits sur dix ans, depuis des postes et des clients SVN différents, et que les accents mal encodés cassaient le JSON de retour.",
          "Ce parsing sert directement l'ergonomie : dans les combos de sélection, chaque révision s'affiche `r1234 - 12/03/2026 - message du commit`. On choisit sa révision de départ **en lisant les messages de commit**, pas en devinant un numéro.",
        ],
      },
      {
        title: 'Le cœur : la comparaison filtrée',
        paragraphs: [
          "`compare_revisions.php` lance un `svn diff --summarize` entre les deux révisions, avec réordonnancement automatique si l'utilisateur les a inversées, puis applique un filtrage métier qui encode les règles réelles de fabrication d'un package du CDVM :",
        ],
        items: [
          "les fichiers de `__sencha_architect` (métadonnées de l'IDE) sont exclus ;",
          "`log.txt` est exclu ;",
          "dans `obfiles/log/`, seul `index.php` est conservé : on livre la structure du dossier de logs, pas les logs ;",
          "dans `templates/`, on garde les répertoires et les `index.php`, pas les modèles eux-mêmes.",
        ],
      },
      {
        title: "L'injection dans la grille",
        paragraphs: [
          "`SvnCompareViewController.js` alimente la grille du module Package via `loadResultsIntoGrid()`, avec **déduplication** : les fichiers déjà présents ne sont pas ajoutés deux fois, et l'utilisateur est informé du nombre de doublons évités. Les fichiers supprimés entre les deux révisions sont insérés avec l'action `Supprimer`, les autres avec `Ajouter` : la logique de suppression en production est portée aussi. Le retour final est un récapitulatif chiffré (X ajoutés, Y modifiés, Z supprimés, dont N déjà présents).",
        ],
      },
    ],
    result:
      "La construction d'un livrable passe de « se souvenir de ce qu'on a fait » à « choisir deux révisions ». Le risque d'oubli disparaît, et les règles d'exclusion, jusque-là de la connaissance tacite, sont appliquées uniformément quelle que soit la personne qui prépare la livraison.",
  },
  {
    slug: 'exploitation-svn',
    index: '04',
    title: 'Exploitation SVN',
    tagline: "L'administration des dépôts par le web",
    tags: ['Bash', 'sudo NOPASSWD', 'PHP 8', 'ExtJS', 'svnadmin'],
    problem: [
      "C'est le chantier le plus long (mars → juillet 2026) et le plus sensible, parce qu'il touche à l'administration système.",
      "Toute l'administration des dépôts SVN se faisait **en SSH sur `svn3-prod-app`, en root**. Créer un dépôt pour une nouvelle application, ajouter un utilisateur SVN, créer une branche de version, sauvegarder les dépôts, consulter l'historique : à chaque fois, une connexion serveur et des commandes à la main. Concentré sur quelques personnes, non tracé, et risqué : une faute de frappe dans un `rm -rf` ou un `svnadmin` n'a pas de bouton « annuler ».",
    ],
    sections: [
      {
        title: "L'architecture de sécurité",
        paragraphs: [
          "Le point de départ de la conception était contraignant : **Apache tourne sous l'utilisateur `apache`**, qui n'a évidemment pas le droit de créer des dépôts dans `/var/svn/repository` ni d'écrire dans le fichier d'authentification SVN. Donner ces droits à Apache aurait été inacceptable.",
          "La solution : un **wrapper bash unique, exécuté en root via `sudo` NOPASSWD**, avec une liste blanche d'actions. `svn-admin-wrapper` démarre en `set -euo pipefail`, et son `case \"$ACTION\"` se termine par un `*) echo \"Action non autorisee\"; exit 1`. **Tout ce qui n'est pas explicitement prévu est refusé.** PHP ne peut jamais exécuter une commande arbitraire en root : il ne peut que demander une des treize actions du catalogue (`show-history`, `list-users`, `add-user`, `delete-user`, `create-repo`, `create-repo-belight`, `delete-repo`, `delete-reference`, `rename-repo`, `backup-all`, `backup-one`, `backup-cleanup`, `backup-cleanup-one`, `migrate-trunk`).",
        ],
        items: [
          "les noms de dépôts et de branches sont validés par regex (`^[a-zA-Z0-9][a-zA-Z0-9._-]*$`) ;",
          "les types de références sont contraints à `branches` ou `tags`, les modes d'opération à `migrate` / `empty` / `copy` ;",
          "l'existence du dépôt est vérifiée par la présence du fichier `format`, la vraie signature d'un dépôt SVN, pas juste un dossier du bon nom ;",
          "pour la suppression de dumps, le chemin doit **commencer par** le répertoire autorisé et ne pas contenir `..` ;",
          "la validation est **doublée** côté PHP : chaque script vérifie ses entrées avant même d'appeler le wrapper. Si un appel PHP est contourné, le wrapper refuse quand même.",
        ],
      },
      {
        title: 'Deux garde-fous dont je suis content',
        paragraphs: [
          "**`delete-user` refuse de supprimer un compte qui a de l'activité SVN.** La fonction `user_has_svn_activity()` parcourt tous les dépôts, lit les logs, et si le login apparaît comme auteur d'un commit, elle renvoie `HAS_ACTIVITY` au lieu de supprimer. L'interface affiche alors une confirmation explicite, et seul un appel avec `force` procède. On ne supprime pas silencieusement un compte qui est dans l'historique du dépôt.",
          "La manipulation du fichier d'authentification `svnserve_auth_file` se fait en **awk avec réécriture dans un fichier temporaire puis `mv` atomique**, en respectant la structure des sections INI et en recréant la section `[users]` si elle est absente. Pas de `sed` en place sur un fichier critique d'authentification.",
        ],
      },
      {
        title: 'Les fonctionnalités livrées',
        items: [
          "**Création de dépôt** (`create_depot.php`), en deux modes : dépôt SVN nu, ou dépôt **initialisé avec le moteur belight_v7** (le script `initAppli` crée toute la structure applicative et la commite). Si le dépôt ou le répertoire web existe déjà, le script **ne force rien** : il renvoie `confirm_required` et laisse l'utilisateur trancher.",
          "**Liste des dépôts** (`list_depots.php`), un scan de `/var/svn/repository` qui remonte pour chaque dépôt l'URL, la dernière révision (`svnlook youngest`), le dernier auteur, la date et le message. Le script cherche dans `/var/svn/dump` un fichier dont la révision correspond **exactement** à la révision courante : un dump antérieur n'est pas compté comme une sauvegarde valide, parce que ce n'en est pas une. Et la suppression n'est proposée que si `last_revision <= 2` : un dépôt avec plus de deux révisions contient du travail réel.",
          "**Branches et tags** (`migrate_trunk.php` + `migrateTrunk`), en trois modes : `copy` (créer une branche ou un tag depuis le trunk courant), `empty` (référence vide) et `migrate`, le plus puissant : créer la branche de l'ancienne version, puis **purger le trunk et le réinitialiser avec le moteur belight_v7**. C'est exactement le geste d'une migration v6 → v7.",
          "**Historique SVN** (`show_history.php`), un `svn log --xml --verbose` parsé en SimpleXML, avec filtrage par plage de révisions, détail des chemins modifiés (action, chemin, mention de la copie source pour les branches) et un mode `authors_only` qui alimente justement la vérification d'activité avant suppression d'un compte.",
          "**Renommage, suppression de dépôt, suppression de branches et tags, gestion des comptes SVN** complètent le module.",
        ],
      },
      {
        title: 'La sauvegarde, le morceau le plus élaboré',
        paragraphs: [
          "Un dump complet de tous les dépôts prend plusieurs minutes, bien au-delà du timeout d'une requête HTTP. L'architecture retenue : le backup est **lancé en tâche de fond détachée** (`nohup … &`), il écrit sa progression dans un fichier de statut JSON, et le front interroge ce statut en polling pour alimenter une barre de progression ExtJS. `backup.php` est un dispatcher à cinq tâches : lancement, `status`, `download`, `cleanup`, et le dump d'un dépôt isolé.",
        ],
        items: [
          "**détection d'un backup déjà en cours**, avec affichage du nom de la personne qui l'a lancé, pour éviter que deux exploitants ne se marchent dessus sans comprendre pourquoi ;",
          "**compatibilité ascendante** du fichier de statut (un ancien format stockait le nom en deux champs, le code gère les deux) ;",
          "**pourcentage plafonné à 0,95** tant que le statut n'est pas `done` : 100 % ne s'affiche que quand c'est réellement fini, jamais « presque » ;",
          "**contrôle du chemin au téléchargement** : `realpath()` puis vérification du préfixe autorisé. Pas de traversée de répertoire possible via le paramètre `zipPath` ;",
          "**nettoyage automatique** des fichiers temporaires, après téléchargement et au lancement d'un nouveau backup.",
        ],
      },
      {
        title: "Côté interface",
        paragraphs: [
          "Une page **Exploitation → Gestion des dépôts SVN** qui rassemble tout : formulaire de création en haut à gauche, grille des utilisateurs SVN en haut à droite, grille principale des dépôts en dessous, avec colonnes d'action en icônes (historique, renommer, backup, supprimer), édition en ligne du nom, sélection multiple par cases à cocher pour les backups ciblés et persistance de l'état de la grille en cookie. Trois fenêtres modales complètent l'ensemble : création de branches et tags, consultation de l'historique, ajout d'un compte.",
        ],
      },
    ],
    result:
      "L'administration SVN quotidienne ne nécessite plus d'accès SSH root au serveur. Les opérations sont validées, tracées dans des logs et accessibles à l'équipe depuis une interface web, tout en restant strictement bornées par la liste blanche du wrapper.",
  },
  {
    slug: 'convert-phpexcel',
    index: '05',
    title: 'convert_phpexcel',
    tagline: 'La migration PHPExcel → PhpSpreadsheet',
    tags: ['PHP 8', 'CLI', 'Regex', 'Migration'],
    problem: [
      "PHPExcel est **abandonné depuis 2017**. Son successeur PhpSpreadsheet impose des changements en cascade : des classes namespacées au lieu de classes préfixées, des noms de méthodes en camelCase, des constantes déplacées, des clés de tableaux de style renommées (`allborders` → `allBorders`, `style` → `borderStyle`, `type` → `fillType`), des marges qui passent de chaînes à des flottants.",
      "Ces appels étaient disséminés dans une quinzaine de fichiers d'édition, répartis sur autant d'applications (`annuaire`, `ordival`, `sportval`, `sos_rentree`, `orv`, `adep`, `arcade`, `livres`, `dematrh`) plus le cœur du moteur, chacun de plusieurs centaines de lignes de génération Excel.",
      "Le faire à la main, c'était garantir des oublis : les changements sont mécaniques mais nombreux, et une clé de style oubliée ne casse pas le code, elle produit silencieusement un fichier Excel sans bordures.",
    ],
    sections: [
      {
        title: 'Un convertisseur, pas un script jetable',
        paragraphs: [
          "`convert_phpexcel.php` traite soit un fichier, soit tout un répertoire. La logique est portée par une table de patterns regex → remplacement, ce qui rend l'outil **extensible sans toucher au moteur** : quand on découvre un nouveau cas, on ajoute une ligne au tableau. Les points de conception qui font la différence :",
        ],
        items: [
          "**La sauvegarde n'est créée qu'en cas de modification réelle.** Le contenu converti est calculé *avant* toute écriture ; si rien ne change, le fichier n'est pas touché et aucun `.bak` inutile n'est créé.",
          "**Restauration automatique en cas d'échec d'écriture.** Si le `file_put_contents` échoue, le `.bak` est immédiatement recopié par-dessus. On ne laisse jamais un fichier à moitié converti.",
          "**L'insertion des `use` est contextuelle.** `addUseStatements()` cherche le dernier `require_once` ou `use` de premier niveau qui précède la déclaration de classe et s'insère juste après. Le fichier converti reste lisible, imports groupés au bon endroit. Le repli après `<?php` n'intervient que si aucun import n'existe.",
          "**Détection d'idempotence.** Si les `use` PhpSpreadsheet sont déjà présents, le fichier n'est pas retouché : on peut relancer le convertisseur sans risque.",
          "**Le récapitulatif résout les rétro-références.** Plutôt que d'afficher le pattern regex brut, `applyReplacements()` calcule le remplacement réellement obtenu pour chaque occurrence (en résolvant les `$1` / `$2`) avant de l'enregistrer. Le rapport affiche `->SetCellValue( → ->setCellValue( (47 fois)`, quelque chose qu'on peut relire et vérifier. Les suppressions sont typées différemment des remplacements, pour ne pas afficher une flèche vers le vide.",
        ],
      },
    ],
    result:
      "La migration de la génération Excel a été menée sur l'ensemble du parc, 15 fichiers répartis sur 9 applications plus le moteur Belight, de façon uniforme et vérifiable, avec un rapport de conversion pour chaque fichier. Le parc est sorti d'une dépendance abandonnée depuis huit ans.",
  },
];

export const principes = [
  {
    title: 'Une seule source de vérité',
    body: "`ConfigIniBuilder` a été extrait dès qu'il y a eu deux générateurs de `config.ini`. Le wrapper SVN est le point de passage unique de toute opération privilégiée. Quand deux chemins de code font la même chose, ils finissent par ne plus la faire pareil.",
  },
  {
    title: 'La sécurité par liste blanche',
    body: "Le wrapper n'énumère pas ce qui est interdit : il énumère ce qui est permis, et refuse tout le reste. Combiné à une validation dupliquée côté PHP et côté bash, et à des contrôles de chemins par préfixe autorisé.",
  },
  {
    title: 'Les règles tacites deviennent du code',
    body: "Les exclusions de fichiers dans un package, la correspondance dump/révision, l'interdiction de supprimer un compte qui a de l'activité : c'était de la connaissance dans la tête des gens. C'est maintenant dans les scripts, appliqué de la même façon par tout le monde.",
  },
  {
    title: "L'outil doit être là où sont les gens",
    body: "Un script CLI que seul son auteur sait lancer ne réduit le risque de personne. Chaque outil a été ramené dans une interface existante : `check_install` dans l'assistant Belight, `svncompare` dans le module Package, l'administration SVN dans Liste Serveur.",
  },
  {
    title: 'Ne jamais détruire sans filet',
    body: "Sauvegarde avant conversion et restauration en cas d'échec, `confirm_required` avant de recréer un dépôt existant, `HAS_ACTIVITY` avant de supprimer un compte, suppression de dépôt limitée aux dépôts quasi vides. Les opérations irréversibles demandent toujours un accord explicite.",
  },
];

export const recapitulatif = [
  {
    chantier: 'check_install',
    livrables: '`check.php`, `generate.php`, `config.ini`',
    remplace: 'La vérification manuelle des prérequis serveur, document Word en main',
  },
  {
    chantier: 'configinstall',
    livrables: 'Formulaire ExtJS, `ConfigIniBuilder`, export ZIP depuis SVN',
    remplace: 'La rédaction manuelle du `config.ini` et la circulation de versions divergentes du script',
  },
  {
    chantier: 'svncompare',
    livrables: '3 endpoints PHP + fenêtre ExtJS intégrée au module Package',
    remplace: "La reconstitution de mémoire de la liste des fichiers d'un livrable",
  },
  {
    chantier: 'Exploitation SVN',
    livrables: 'Wrapper sudo 13 actions, 12 scripts PHP, 11 scripts bash, 4 vues ExtJS',
    remplace: "L'administration SVN en SSH root sur le serveur de production",
  },
  {
    chantier: 'convert_phpexcel',
    livrables: 'Convertisseur automatique PHPExcel → PhpSpreadsheet',
    remplace: 'La migration manuelle de 15 fichiers d\'édition sur 9 applications',
  },
];

export const conclusion =
  "J'ai pris cinq gestes manuels, risqués et concentrés sur quelques personnes, et j'en ai fait des outils validés, tracés et accessibles à toute l'équipe, sans jamais élargir les droits d'Apache d'un pouce.";
