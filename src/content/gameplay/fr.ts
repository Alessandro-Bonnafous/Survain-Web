import type { GameplayContent } from './types'

/**
 * Contenu Gameplay — Français. Repris fidèlement du site legacy (gameplay.html).
 * La version `en.ts` doit rester structurellement identique (cf. test de parité).
 */
export const gameplayFr: GameplayContent = [
  {
    id: 'progression',
    title: 'Progression et Structure Territoriale',
    chapters: [
      {
        id: 'contrees',
        title: 'Les Contrées',
        summary:
          'Choix du biome de départ : Forêts, Plaines, Montagnes ou Côte maritime, avec ressources et spécialisations propres.',
        blocks: [
          { kind: 'paragraph', text: 'La distribution des ressources est la suivante :' },
          {
            kind: 'table',
            headers: ['Contrées / Ressources', 'Végétale', 'Minérale', 'Animale'],
            rows: [
              ['Forêt', '50%', '25%', '25%'],
              ['Plaines', '25%', '25%', '50%'],
              ['Montagnes', '25%', '50%', '25%'],
              ['Côte maritime', '33%', '33%', '33%'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'Le type de ressources est également différent, par exemple pour le bois :',
          },
          {
            kind: 'table',
            headers: ['Bois', 'T1 (gris)', 'T2 (vert)', 'T3 (bleu)'],
            rows: [
              ['Forêt', 'Bouleau', 'Erable', 'Chêne'],
              ['Plaines', 'Charme', 'Tremble', 'Orme'],
              ['Montagnes', 'Noyer', 'Mélèze', 'Pin'],
              ['Côte maritime', 'Palmier', 'Cyprès', 'Bois flotté'],
            ],
          },
        ],
      },
      {
        id: 'provinces',
        title: 'Les Provinces',
        summary:
          'Le Colon fédère plusieurs Contrées et devient Baron, avec chef-lieu, marché, taverne, bibliothèque, coffres et garnison.',
        blocks: [
          {
            kind: 'paragraph',
            text: "Le Colon qui décide de recruter 6 Contrées devient alors le Baron de la Province. Il a la liberté d'éloigner les Contrées indésirables. Il détermine un espace collectif dans son chef-lieu où seront regroupés les bâtiments de la Province :",
          },
          {
            kind: 'list',
            items: [
              {
                strong: "L'entrepôt :",
                text: "Stockage des ressources nécessaires à la construction et l'entretien des bâtiments communs.",
              },
              {
                strong: 'La place du marché :',
                text: 'Chaque colon envoie un villageois pour tenir une étale offrant des ressources spécifiques.',
              },
              {
                strong: 'La bibliothèque :',
                text: "Pour écrire et échanger les livres d'apprentissage de craft.",
              },
              {
                strong: 'La taverne :',
                text: 'Le lieu privilégié pour le moral des villageois et pour rencontrer des explorateurs qui ouvriront la voie vers des contrées sauvages à explorer en groupe.',
              },
              { strong: 'La salle des coffres :', text: 'Pour les finances de la Province.' },
              {
                strong: 'Le bureau politique :',
                text: 'Pour communiquer avec les autres provinces et la région.',
              },
              {
                strong: "Un camp d'entrainement :",
                text: 'Pour perfectionner ses skills entre duel entre amis.',
              },
              {
                strong: 'La garnison :',
                text: 'Recrutement et équipement des mercenaires pour protéger le chef-lieu des intrusions ennemies.',
              },
            ],
          },
        ],
      },
      {
        id: 'multijoueurs',
        title: 'Extension multijoueurs',
        summary:
          "Les joueurs organisent les bâtiments communs, les échanges, l'apprentissage, la défense et les explorations de groupe.",
        blocks: [
          {
            kind: 'paragraph',
            text: 'Après avoir construit la taverne, un explorateur propose à la vente une carte au trésor ; elle donne accès à la contrée sauvage pour PVE.',
          },
          {
            kind: 'table',
            headers: ['Contrées sauvages / Ressources', 'Végétale', 'Minérale', 'Animale'],
            rows: [
              ['Jungle', '70%', '10%', '20%'],
              ['Volcan', '10%', '70%', '20%'],
              ['Marais', '20%', '10%', '70%'],
              ['Désert', '30%', '50%', '20%'],
              ['Canyon', '35%', '30%', '35%'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'On y trouve des ressources complémentaires et indispensables pour le T3.',
          },
          {
            kind: 'paragraph',
            text: "On y trouve aussi des mobs et des boss qui vont loot des composantes d'offrandes aux Dieux : cœur / griffes / sang / œil / crinière / carapace.",
          },
        ],
      },
      {
        id: 'regions',
        title: 'Les Régions',
        summary:
          "Les Provinces s'unissent pour renverser le Seigneur PNJ et accéder au monde ouvert du Royaume.",
        blocks: [
          {
            kind: 'paragraph',
            text: "A travers son bureau politique, le Baron décide de rejoindre une Région, et s'associe à 9 autres Provinces.",
          },
          {
            kind: 'paragraph',
            text: 'La priorité sera de renverser le Seigneur PNJ. La mobilisation générale des Colons, une bonne organisation et un équipement T3 seront nécessaire pour affronter les mercenaires du Seigneur payés grassement avec les dîmes.',
          },
          { kind: 'image', image: { id: 'regions-pvp', alt: 'Carte des régions et zones PvP' } },
        ],
      },
      {
        id: 'extension-pvp',
        title: 'Extension PvP',
        summary:
          "Châteaux, Capitale, temples nordiques et Wild Caves deviennent les grands théâtres d'affrontement.",
        blocks: [
          { kind: 'paragraph', text: 'La Région découvre alors le monde ouvert du Royaume.' },
          { kind: 'paragraph', text: 'On y trouve la Capitale, avec deux plans au choix :' },
          {
            kind: 'list',
            items: [
              {
                strong: 'Crown City :',
                text: "en surface, la richesse, l'activité commerciale et les gardes royaux.",
              },
              {
                strong: 'Under City :',
                text: 'en souterrain, les catacombes, le marché noir et les brigands de la nuit.',
              },
            ],
          },
          {
            kind: 'paragraph',
            text: 'A la périphérie de la capitale, les 8 temples nordiques, qui s’affrontent à distance pour la possession des reliques, batailles auxquelles les Colons pourront prendre part.',
          },
          { kind: 'image', image: { id: 'panorama-pvp', alt: 'Panorama PvP du Royaume' } },
          {
            kind: 'paragraph',
            text: 'A découvrir aussi, les Wild Caves que les explorateurs découvrent et qui sont le lieu d’affrontement pour convoiter les précieux organes des mobs.',
          },
          {
            kind: 'paragraph',
            text: 'Et enfin les batailles épiques de prise de château dans les affrontements entre les régions.',
          },
        ],
      },
    ],
  },
  {
    id: 'craft',
    title: 'Construction, Artisanat et Stuff',
    chapters: [
      {
        id: 'construction',
        title: 'Constructions et artisanat',
        summary:
          'Le village se développe par bâtiments, ateliers, réparations, niveaux de construction et progression artisanale.',
        blocks: [
          {
            kind: 'paragraph',
            text: "Une fois déterminée la localisation du village, il faudra poser la première pierre et il existe de nombreux types de bâtiments, tels que les maisons, la pêche, la chasse, l'entrepôt, l'agriculture, l'élevage, la mine, le bucheron, le forgeron, l'alchimiste, la cuisine, le hall divin… Les bâtiments peuvent être construits à partir de matériaux basiques de la Contré. Ce n'est qu'une fois que le bâtiment sera achevé à 100% que la structure sera utilisable. Les intempéries et l'usure du temps endommageront les bâtiments qui doivent être régulièrement réparés. Dans les bâtiments, il faut ensuite construire les ateliers pour fabriquer les outils ou le stuff de même niveau (gris).",
          },
          {
            kind: 'paragraph',
            text: "Les ressources spécifiques des contrées sauvages vont ouvrir un nouveau volet d'artisanat. Les bâtiments et les ateliers sont à reconstruire pour passer au niveau amélioré (vert).",
          },
          {
            kind: 'paragraph',
            text: "Ce sont ensuite les ateliers du château du Seigneur qui permettront de upgrade l'artisanat au niveau supérieur (bleu). Le niveau des bâtiments joue un rôle sur le moral des villageois et leurs performances au travail.",
          },
          {
            kind: 'paragraph',
            text: "Au départ, le Colon connait les recettes rudimentaires, avec un faible niveau d'apprentissage. Il pourra en apprendre d'autres, soit avec l'arrivée de nouveaux villageois qui maitrise un métier, soit avec les manuels d'apprentissage qu'il pourra acheter ou obtenir dans les bibliothèques.",
          },
          {
            kind: 'paragraph',
            text: "On note trois niveaux d'apprentissage pour les compétences d'artisanat :",
          },
          {
            kind: 'list',
            items: [
              { strong: 'Novice :', text: "30% — c'est le niveau de base." },
              {
                strong: 'Qualifié :',
                text: "60% — c'est le niveau moyen permettant de transmettre le métier.",
              },
              { strong: 'Expert :', text: "90% — niveau optimum d'artisanat." },
            ],
          },
        ],
      },
      {
        id: 'crafting',
        title: 'Mécanisme du crafting',
        summary:
          'Le craft automatique ou manuel dépend des recettes, de la maîtrise et de mini-jeux de spécialité.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Une compétence de crafting apprise a de base un pourcentage de création de 30%.',
          },
          {
            kind: 'paragraph',
            text: "Cette valeur détermine la durabilité ou la performance de l'objet crafté.",
          },
          {
            kind: 'paragraph',
            text: "S'il ne connait pas la recette, il peut utiliser un manuel ou accompagner un crafteur qualifié pour acquérir la compétence.",
          },
          {
            kind: 'paragraph',
            text: "Le joueur a aussi la possibilité d'améliorer son niveau de compétence en activant le craft manuel (sous forme d'un mini-jeu). Si le pourcentage obtenu est meilleur, il devient la nouvelle référence.",
          },
          {
            kind: 'paragraph',
            text: "Sinon, de façon automatique, l'objet sera crafté avec le pourcentage de la compétence.",
          },
          { kind: 'paragraph', text: 'Voici quelques exemples :' },
          {
            kind: 'selector',
            label: 'Choisissez un métier :',
            options: [
              {
                label: 'Cuisinier',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      {
                        text: "Prenons l'exemple de cuisinier à 42% pour le feu de camp grillade :",
                      },
                      {
                        text: 'En automatique, il pourra cuisiner une cuisse de lapin grillée (T1) avec 2,5 jours de péremption au lieu de 6 jours.',
                      },
                      {
                        text: "En manuel, il doit maitriser la température de cuisson pour tenter d'améliorer son 42% de maitrise.",
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Maroquinier',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      { text: "Prenons l'exemple d'un tanneur à 65% pour maroquinier de sac :" },
                      {
                        text: 'En automatique, il pourra fabriquer une sacoche en cuir (T2) avec 65 utilisations au lieu de 100.',
                      },
                      {
                        text: 'En manuel, il doit maitriser la découpe et la couture pour améliorer son 65% de maitrise.',
                      },
                      {
                        text: "Il pourra également être accompagné d'un apprenti (PNJ ou joueur) pour lui enseigner les bonnes pratiques. Ce dernier obtiendra une maitrise à 65-30 = 35%.",
                      },
                      {
                        text: "Il pourra rédiger un manuel d'apprentissage dans une bibliothèque à transmettre ou à vendre.",
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Forgeron',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      {
                        text: "Prenons l'exemple d'un forgeron assembleur à 82% pour fabrication d'outils :",
                      },
                      {
                        text: 'En automatique, il pourra fabriquer une pioche en fer (T3) avec 82 utilisations au lieu de 100.',
                      },
                      {
                        text: 'En manuel, il doit maitriser trois compétences (four, forgeage et traitement thermique) pour améliorer sa maitrise.',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Stuff',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      {
                        text: "Pour le stuff, l'impact de la maitrise se joue non pas sur la durabilité, mais sur l'efficacité.",
                      },
                      {
                        text: 'Ainsi une arme T3 fabriquée avec 30% de maitrise fera autant de dégâts qu’une arme T1 avec 90%.',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'stuff',
        title: 'Stuff et type de dégâts',
        summary:
          'Le stuff est personnel : armes, armures, éléments de dégâts et bénédictions divines selon le biome.',
        blocks: [
          {
            kind: 'paragraph',
            text: "Le stuff constitue les armes et armures sur mesure d'un joueur. Il est le seul avec ses villageois à pouvoir le craft. Un tiers peut seulement en récupérer les composants.",
          },
          {
            kind: 'paragraph',
            text: "Chaque biome a son stuff spécifique, sans que cela empêche d'accéder aux autres équipements ; les ressources de base y seront bien plus fréquentes.",
          },
          { kind: 'paragraph', text: 'Par exemple :' },
          {
            kind: 'list',
            items: [
              {
                text: 'Un habitant des montagnes y trouvera facilement de la fourrure pour confectionner des armures de cuir renforcé qui le protégeront contre les dégâts de froid, et son marteau fabriqué à base de Pin infligera des dégâts avec le modificateur de froid.',
              },
              { text: 'Un habitant de la forêt sera lié aux dégâts physiques.' },
              { text: 'Un habitant des plaines sera lié au chaud.' },
              { text: 'Un habitant des côtes marines sera lié au vent.' },
            ],
          },
          { kind: 'paragraph', text: "Chaque biome dispose également de son set d'armes." },
          {
            kind: 'selector',
            label: "Sélectionnez un type d'arme / biome :",
            options: [
              {
                label: 'Javelot léger — Forêt physique',
                blocks: [
                  { kind: 'paragraph', text: 'Style de gameplay : Assassin / Chasseur mobile.' },
                  {
                    kind: 'table',
                    headers: ['Type', 'Nom de compétence', 'Effet'],
                    rows: [
                      [
                        'Attaque principale',
                        'Épine Traçante',
                        'Tir perforant qui marque les ennemis',
                      ],
                      ['Contrôle', 'Racines de Chasse', 'Immobilisation par racines'],
                      [
                        'Protect / Défense',
                        'Canopée Protectrice',
                        'Réduction des dégâts + camouflage',
                      ],
                      ['Mobilité', 'Bond Sylvestre', 'Dash vers arbre ou cible marquée'],
                      [
                        'Ultime',
                        'Chasse du Grand Cerf',
                        'Charge spirituelle provoquant peur et lourds dégâts',
                      ],
                    ],
                  },
                ],
              },
              {
                label: 'Hache lourde de lancer — Montagne froid',
                blocks: [
                  { kind: 'paragraph', text: 'Style de gameplay : Bruiser / Tank.' },
                  {
                    kind: 'table',
                    headers: ['Type', 'Nom de compétence', 'Effet'],
                    rows: [
                      [
                        'Attaque principale',
                        'Hache du Glacier',
                        'Lancer lourd avec ralentissement glacé',
                      ],
                      ['Contrôle', 'Fissure Avalanche', 'Projection et terrain glissant'],
                      ['Protect / Défense', 'Peau du Mammouth Blanc', 'Énorme bouclier défensif'],
                      ['Mobilité', 'Appel du Sommet', 'Attire les ennemis avec la hache'],
                      ['Ultime', "Colère de l'Avalanche", 'Avalanche géante avec stun final'],
                    ],
                  },
                ],
              },
              {
                label: 'Javelot des steppes — Plaine feu',
                blocks: [
                  { kind: 'paragraph', text: 'Style de gameplay : Fighter agressif / Mobile.' },
                  {
                    kind: 'table',
                    headers: ['Type', 'Nom de compétence', 'Effet'],
                    rows: [
                      ['Attaque principale', 'Lance Incandescente', 'Explosion feu + brûlure'],
                      ['Contrôle', 'Empalement Solaire', 'Charge avec étourdissement'],
                      ['Protect / Défense', 'Cercle des Nomades', 'Déviation des projectiles'],
                      [
                        'Mobilité',
                        'Course des Hautes Herbes',
                        'Sprint laissant une traînée de feu',
                      ],
                      [
                        'Ultime',
                        'Tempête de la Steppe Ardente',
                        'Tempête enflammée contrôlant la zone',
                      ],
                    ],
                  },
                ],
              },
              {
                label: 'Harpon de lancer — Côte maritime vent',
                blocks: [
                  { kind: 'paragraph', text: 'Style de gameplay : Contrôleur / Support offensif.' },
                  {
                    kind: 'table',
                    headers: ['Type', 'Nom de compétence', 'Effet'],
                    rows: [
                      [
                        'Attaque principale',
                        'Harpon des Marées',
                        'Traction légère + marque humide',
                      ],
                      ['Contrôle', 'Vague Ascendante', 'Soulèvement et repoussement'],
                      [
                        'Protect / Défense',
                        'Brise Protectrice',
                        'Réduction des projectiles entrants',
                      ],
                      ['Mobilité', 'Grappe du Kraken', 'Déplacement par ancrage'],
                      ['Ultime', 'Maelström du Léviathan', 'Vortex marin aspirant les ennemis'],
                    ],
                  },
                ],
              },
            ],
          },
          {
            kind: 'paragraph',
            text: "Chaque élément du stuff peut bénéficier d'une bénédiction apportant des bonus passifs en fonction de la divinité choisie.",
          },
        ],
      },
    ],
  },
  {
    id: 'eco',
    title: 'Gestion, Economie et Religion',
    chapters: [
      {
        id: 'gestion',
        title: 'Gestion et Economie',
        summary:
          "PNJ, métiers, moral, fatigue, coffres d'atelier, contremaîtres, marchands, golds et dîmes.",
        blocks: [
          {
            kind: 'paragraph',
            text: "Chaque PNJ dispose d'un métier de base, et il peut suivre un apprentissage auprès du Joueur soit en améliorant son métier d'origine, soit en apprenant une nouvelle compétence.",
          },
          {
            kind: 'paragraph',
            text: 'Le Joueur attribue des tâches aux PNJ, sur différentes plages horaires ; le reste du temps, le PNJ gère sa famille, son habitation, se repose et prie.',
          },
          {
            kind: 'paragraph',
            text: "Son moral est déterminé par son état de fatigue, de confort, de son état familial et des éléments divins ; il va conditionner sa performance, c'est-à-dire ses heures de travail effectif par rapport à sa plage horaire.",
          },
          {
            kind: 'paragraph',
            text: "Les coffres de l'atelier serviront à refournir les besoins en matières premières pour l'artisanat. Des missions de logistique permettront de refournir ou vider ces coffres.",
          },
          {
            kind: 'paragraph',
            text: "La présence d'un contremaitre dans un atelier pour suivre les activités des établis permet d'améliorer le niveau de performance des ouvriers, mais en abuser provoque une diminution de moral. Avec l'augmentation des niveaux de construction (T1 → T3), le moral en est renforcé. Le Joueur met à disposition un coffre avec des golds, dans l'hôtel de ville, disponible aux contremaitres pour distribuer.",
          },
          {
            kind: 'paragraph',
            text: 'Des marchands ambulants passeront régulièrement dans le village pour proposer des ressources, des manuels et acheter la production artisanale contre des golds.',
          },
          {
            kind: 'paragraph',
            text: "La Capitale, la Région et les Provinces prélèvent des dîmes en cascade. Les mauvais payeurs s'exposent aux représailles menées par les percepteurs et leurs troupes armées.",
          },
        ],
      },
      {
        id: 'comptoirs',
        title: 'Comptoirs, repaires et routes commerciales',
        summary:
          'Échoppes, marchés, ateliers, docks, convois et routes commerciales exposées au brigandage.',
        blocks: [
          {
            kind: 'paragraph',
            text: "En rejoignant la Province, la Région, puis la Capitale, le joueur peut prendre en gérance des sites commerciaux actifs en versant un loyer à l'autorité locale.",
          },
          {
            kind: 'paragraph',
            text: "Il peut par exemple avoir une échoppe dans le chef-lieu, un atelier dans le château du seigneur. Dans la Capitale, avec suffisamment de Réputation, il pourra prendre possession d'un marché, d'une taverne, d'un charretier, d'un dock, d'un repaire d'espions…",
          },
          {
            kind: 'paragraph',
            text: "Dans tous les cas, il devra envoyer ses PNJ pour gérer l'établissement ; ils seront autonomes pour se loger et s'alimenter. Plus il y aura de personnel, plus la rentabilité sera élevée.",
          },
          {
            kind: 'paragraph',
            text: 'Le nerf de la guerre est donc la disponibilité des établissements et surtout un nombre suffisant de villageois.',
          },
          {
            kind: 'paragraph',
            text: 'Un autre moyen pour se faire des golds est de livrer des ressources à prix fixe, dans les entrepôts officiels, ou bien de mettre en vente des objets (hors stuff) sur les marchés ouverts à tous.',
          },
          {
            kind: 'paragraph',
            text: "Pour amener des ressources à destination, il faut disposer d'un chariot avec son attelage ou bien une barge par voie maritime. Chaque livraison doit être inscrite dans le bureau logistique de départ pour figer le prix de vente et les quantités. Mais ces routes commerciales programmées sont exposées à l'espionnage et donc au brigandage.",
          },
        ],
      },
      {
        id: 'capitale',
        title: 'La Capitale',
        summary:
          'Choix entre Royalistes en surface et Insurgés dans les souterrains, avec réputation et conflits programmés.',
        blocks: [
          {
            kind: 'paragraph',
            text: "En arrivant dans la Capitale, le joueur doit choisir sa voie : Royaliste en surface ou Insurgé dans les souterrains ; en fonction de ses actions pour l'un ou l'autre camp, il obtiendra de la réputation.",
          },
          {
            kind: 'list',
            items: [
              {
                strong: 'Royalistes :',
                text: "faction loyale à la couronne, défendant l'ordre, la capitale et le pouvoir établi ; contrôlent la surface, liés au Roi, économie officielle (taxes, commerce), accès facilité aux structures de la capitale, Garde Royale sous l'autorité du High Marshal Valen.",
              },
              {
                strong: 'Insurgés :',
                text: 'contrôlent les souterrains, sabotent la surface, économie parallèle (marché noir, pillage), gameplay plus risqué / plus libre ; les Mains Noires sous l’autorité de Redbeard.',
              },
            ],
          },
          {
            kind: 'paragraph',
            text: "Régulièrement, et de façon préventive, chaque faction va attaquer l'autre sur son terrain. A ces events programmés, les Joueurs peuvent prendre part, toujours dans l'esprit du combat équilibré, et gagner de la Réputation.",
          },
          {
            kind: 'paragraph',
            text: "En fonction de la profondeur de l'offensive, l'activité commerciale en est perturbée, et les dégâts occasionnés nécessitent des fonds pour les réparations.",
          },
          {
            kind: 'paragraph',
            text: "Le Roi utilise les dîmes pour financer les investissements en surface, et les Insurgés prennent un pourcentage sur l'emploi des mercenaires.",
          },
        ],
      },
      {
        id: 'religion',
        title: 'Religion et Divinité',
        summary:
          'Halls divins, offrandes, bénédictions, sanctuaires et influence des dieux nordiques.',
        blocks: [
          {
            kind: 'paragraph',
            text: "La Religion joue un grand rôle dans les équilibres relationnels au sein du Royaume et elle apporte à ses adulateurs des avantages variés et importants. On compte neuf mondes dans la mythologie nordique, contenus dans les branches et les racines de l'arbre géant Yggdrasil ; huit sont disponibles au choix de chaque Colon : Vanaheim, Alfheim, Midgard, Svartalfheim, Jötunheim, Muspellheim, Niflheim, Helheim, et Asgard dans la Capitale.",
          },
          {
            kind: 'paragraph',
            text: "C'est au moment de la construction du Hall Divin que le choix doit être effectué, et il apportera des bénéfices à la Contrée pour son agriculture, son artisanat ou sa population en fonction du Dieu choisi. Il a aussi un effet catalyseur pour attirer de nouveaux villageois. Le joueur pourra alors fabriquer des mini-sanctuaires hors zone PvP qui lui permettront de revenir sur sa tombe.",
          },
          {
            kind: 'paragraph',
            text: "Chaque divinité requiert des offrandes spécifiques, basées sur les organes de boss, pour accorder des bénédictions sur le stuff du joueur. Dans une même Province, les joueurs peuvent profiter des Halls Divin des autres contrées, s'ils ont des religions différentes.",
          },
          {
            kind: 'paragraph',
            text: 'Par exemple, une bénédiction sur des bottes apportant de la stabilité nécessite :',
          },
          {
            kind: 'list',
            items: [
              { text: '2 griffes + 1 carapace de boss ;' },
              {
                text: '1 ressource T3 spécifique de chaque biome (Forêt, Plaines, Montagnes, Côte maritime) ;',
              },
              {
                text: 'dans une urne en acacia (bois récolté dans une contrée sauvage désertique).',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'pvp',
    title: 'PvP',
    chapters: [
      {
        id: 'religions',
        title: 'Batailles de Religions',
        summary:
          "Les temples défendent reliques, trésors et offrandes lors d'événements équilibrés.",
        blocks: [
          {
            kind: 'paragraph',
            text: "Chaque Divinité est représentée par un temple dans le Royaume ; il s'agit en fait d'une place forte qui protège les offrandes, des trésors voire une relique, qui apporte un boost aux adorateurs concernés.",
          },
          {
            kind: 'paragraph',
            text: "Tout comme pour les affrontements des factions dans la Capitale, des events sont régulièrement programmés et des fanatiques religieux vont se lancer à l'assaut d'un temple plus opulent. Les Joueurs de même religion peuvent y prendre part, toujours dans l'esprit du combat équilibré, et augmenter leur niveau de Foi.",
          },
          {
            kind: 'paragraph',
            text: 'Cette Foi rapportée à son propre Hall Divin va attirer spontanément de nouveaux villageois.',
          },
        ],
      },
      {
        id: 'donjon',
        title: 'Donjon Openworld',
        summary:
          "Donjons de groupe avec arène PvP d'entrée puis exploration PvE contre des boss rares.",
        blocks: [
          {
            kind: 'paragraph',
            text: "Dans les tavernes de la Capitale, nombreux sont les explorateurs qui proposent des cartes aux donjons situés dans le Royaume, avec téléportation sur le lieu. Le chef d'équipe peut sélectionner des donjons en fonction de la taille de son groupe : 7, 14 ou 21 membres.",
          },
          {
            kind: 'paragraph',
            text: "Les Donjons ont généralement 3 entrées, et la première salle constitue une arène PvP à 3 adversaires. Le dernier survivant peut activer un sanctuaire d'Odin qui permettra aux défunts de récupérer leurs tombes et poursuivre l'aventure.",
          },
          {
            kind: 'paragraph',
            text: 'Le reste du donjon est full PVE sans perturbations, avec une carte random. Les boss sont difficiles à tomber mais rapportent gros en organes pour les offrandes.',
          },
          {
            kind: 'paragraph',
            text: 'Le nombre de donjons est limité par groupe et par jour pour éviter le grinding.',
          },
        ],
      },
      {
        id: 'equilibres',
        title: 'Combats équilibrés',
        summary:
          'PvP structuré : forts, routes commerciales, Capitale, temples et donjons avec effectifs contrôlés.',
        blocks: [
          {
            kind: 'paragraph',
            text: "Le premier objectif est d'éviter les phénomènes de zerg ou bien de pk sauvage.",
          },
          {
            kind: 'paragraph',
            text: 'Le PvP est structuré et s’organise selon les schémas suivants :',
          },
          {
            kind: 'table',
            headers: ['Affrontement', 'Déclenchement', 'Effectifs', 'Enjeu'],
            rows: [
              [
                'Attaque de fort des Régions',
                'Lancé par le Seigneur (joueur)',
                '70 vs 70',
                'Gold dans la salle du trône',
              ],
              [
                'Escarmouche des routes commerciales',
                'Lancé par un joueur après espionnage',
                "Nb d'assaillants = nb escorte du convoi",
                'Ressources du convoi transportable',
              ],
              [
                'Royalistes vs Insurgés (Capitale)',
                'Event régulier',
                '30 vs 30 PNJ',
                'Dommages aux infrastructures',
              ],
              ['Batailles de religions', 'Event régulier', '30 vs 30 PNJ', 'Reliques et trésors'],
              ['Donjon Openworld', 'Achat de la carte', '21 vs 21 vs 21', 'PVE Boss'],
            ],
          },
          {
            kind: 'paragraph',
            text: "Les forces sont équilibrées en nombre. La mécanique est la suivante : au départ, tous les groupes belligérants sont constitués de PNJ, et le joueur peut se substituer à l'un d'eux dans la mesure où il appartient à la bonne région, faction, religion… Le nombre reste donc toujours le même.",
          },
          {
            kind: 'paragraph',
            text: 'Par ailleurs, un Seigneur peut activer une bulle de protection sur le fort de la Région, pour éviter les rushs incessants des autres Seigneurs ; mais cette protection est payante avec les golds récupérés par les dîmes des Provinces.',
          },
        ],
      },
    ],
  },
]
