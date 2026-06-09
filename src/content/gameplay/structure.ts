import type { GameplayContent } from './types'

/**
 * Structure unique du contenu Gameplay (indépendante de la langue).
 *
 * - Les clés `*.title`, `*.summary`, `textKey`, `headerKeys`, `{ key }`, etc.
 *   pointent vers `locales/<lang>/gameplay.json`.
 * - Les chaînes nues dans les `rows` de tableaux (ex. `'25%'`) sont des valeurs
 *   **invariantes**, identiques par construction entre toutes les locales.
 *
 * Clés de vocabulaire partagé (réutilisées dans plusieurs tableaux) :
 *   gameplay.terms.biome.*      — Forêt / Plaines / Montagnes / Côte maritime
 *   gameplay.terms.resource.*   — Végétale / Minérale / Animale
 *   gameplay.terms.weaponHead.* — Type / Nom de compétence / Effet
 *   gameplay.terms.weaponRole.* — Attaque principale / Contrôle / …
 */

const BIOME = {
  forest: { key: 'gameplay.terms.biome.forest' },
  plains: { key: 'gameplay.terms.biome.plains' },
  mountains: { key: 'gameplay.terms.biome.mountains' },
  coast: { key: 'gameplay.terms.biome.coast' },
} as const

const RESOURCE_HEADERS = [
  'gameplay.terms.resource.plant',
  'gameplay.terms.resource.mineral',
  'gameplay.terms.resource.animal',
]

const WEAPON_HEADERS = [
  'gameplay.terms.weaponHead.type',
  'gameplay.terms.weaponHead.skill',
  'gameplay.terms.weaponHead.effect',
]

const ROLE = {
  main: { key: 'gameplay.terms.weaponRole.main' },
  control: { key: 'gameplay.terms.weaponRole.control' },
  defense: { key: 'gameplay.terms.weaponRole.defense' },
  mobility: { key: 'gameplay.terms.weaponRole.mobility' },
  ultimate: { key: 'gameplay.terms.weaponRole.ultimate' },
} as const

export const gameplayStructure: GameplayContent = [
  {
    id: 'progression',
    titleKey: 'gameplay.progression.title',
    chapters: [
      {
        id: 'contrees',
        titleKey: 'gameplay.progression.contrees.title',
        summaryKey: 'gameplay.progression.contrees.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.progression.contrees.p0' },
          {
            kind: 'table',
            headerKeys: ['gameplay.progression.contrees.resHeader', ...RESOURCE_HEADERS],
            rows: [
              [BIOME.forest, '50%', '25%', '25%'],
              [BIOME.plains, '25%', '25%', '50%'],
              [BIOME.mountains, '25%', '50%', '25%'],
              [BIOME.coast, '33%', '33%', '33%'],
            ],
          },
          { kind: 'paragraph', textKey: 'gameplay.progression.contrees.p1' },
          {
            kind: 'table',
            headerKeys: [
              'gameplay.progression.contrees.woodHeader',
              'gameplay.progression.contrees.t1',
              'gameplay.progression.contrees.t2',
              'gameplay.progression.contrees.t3',
            ],
            rows: [
              [
                BIOME.forest,
                { key: 'gameplay.progression.contrees.wood.forest1' },
                { key: 'gameplay.progression.contrees.wood.forest2' },
                { key: 'gameplay.progression.contrees.wood.forest3' },
              ],
              [
                BIOME.plains,
                { key: 'gameplay.progression.contrees.wood.plains1' },
                { key: 'gameplay.progression.contrees.wood.plains2' },
                { key: 'gameplay.progression.contrees.wood.plains3' },
              ],
              [
                BIOME.mountains,
                { key: 'gameplay.progression.contrees.wood.mountains1' },
                { key: 'gameplay.progression.contrees.wood.mountains2' },
                { key: 'gameplay.progression.contrees.wood.mountains3' },
              ],
              [
                BIOME.coast,
                { key: 'gameplay.progression.contrees.wood.coast1' },
                { key: 'gameplay.progression.contrees.wood.coast2' },
                { key: 'gameplay.progression.contrees.wood.coast3' },
              ],
            ],
          },
        ],
      },
      {
        id: 'provinces',
        titleKey: 'gameplay.progression.provinces.title',
        summaryKey: 'gameplay.progression.provinces.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.progression.provinces.intro' },
          {
            kind: 'list',
            items: [
              {
                strongKey: 'gameplay.progression.provinces.items.warehouse.strong',
                textKey: 'gameplay.progression.provinces.items.warehouse.text',
              },
              {
                strongKey: 'gameplay.progression.provinces.items.market.strong',
                textKey: 'gameplay.progression.provinces.items.market.text',
              },
              {
                strongKey: 'gameplay.progression.provinces.items.library.strong',
                textKey: 'gameplay.progression.provinces.items.library.text',
              },
              {
                strongKey: 'gameplay.progression.provinces.items.tavern.strong',
                textKey: 'gameplay.progression.provinces.items.tavern.text',
              },
              {
                strongKey: 'gameplay.progression.provinces.items.vault.strong',
                textKey: 'gameplay.progression.provinces.items.vault.text',
              },
              {
                strongKey: 'gameplay.progression.provinces.items.office.strong',
                textKey: 'gameplay.progression.provinces.items.office.text',
              },
              {
                strongKey: 'gameplay.progression.provinces.items.training.strong',
                textKey: 'gameplay.progression.provinces.items.training.text',
              },
              {
                strongKey: 'gameplay.progression.provinces.items.garrison.strong',
                textKey: 'gameplay.progression.provinces.items.garrison.text',
              },
            ],
          },
        ],
      },
      {
        id: 'multijoueurs',
        titleKey: 'gameplay.progression.multijoueurs.title',
        summaryKey: 'gameplay.progression.multijoueurs.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.progression.multijoueurs.p0' },
          {
            kind: 'table',
            headerKeys: ['gameplay.progression.multijoueurs.wildHeader', ...RESOURCE_HEADERS],
            rows: [
              [{ key: 'gameplay.progression.multijoueurs.wild.jungle' }, '70%', '10%', '20%'],
              [{ key: 'gameplay.progression.multijoueurs.wild.volcano' }, '10%', '70%', '20%'],
              [{ key: 'gameplay.progression.multijoueurs.wild.swamp' }, '20%', '10%', '70%'],
              [{ key: 'gameplay.progression.multijoueurs.wild.desert' }, '30%', '50%', '20%'],
              [{ key: 'gameplay.progression.multijoueurs.wild.canyon' }, '35%', '30%', '35%'],
            ],
          },
          { kind: 'paragraph', textKey: 'gameplay.progression.multijoueurs.p1' },
          { kind: 'paragraph', textKey: 'gameplay.progression.multijoueurs.p2' },
        ],
      },
      {
        id: 'regions',
        titleKey: 'gameplay.progression.regions.title',
        summaryKey: 'gameplay.progression.regions.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.progression.regions.p0' },
          { kind: 'paragraph', textKey: 'gameplay.progression.regions.p1' },
          { kind: 'image', imageId: 'regions-pvp', altKey: 'gameplay.progression.regions.imgAlt' },
        ],
      },
      {
        id: 'extension-pvp',
        titleKey: 'gameplay.progression.extensionPvp.title',
        summaryKey: 'gameplay.progression.extensionPvp.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.progression.extensionPvp.p0' },
          { kind: 'paragraph', textKey: 'gameplay.progression.extensionPvp.p1' },
          {
            kind: 'list',
            items: [
              {
                strongKey: 'gameplay.progression.extensionPvp.items.crown.strong',
                textKey: 'gameplay.progression.extensionPvp.items.crown.text',
              },
              {
                strongKey: 'gameplay.progression.extensionPvp.items.under.strong',
                textKey: 'gameplay.progression.extensionPvp.items.under.text',
              },
            ],
          },
          { kind: 'paragraph', textKey: 'gameplay.progression.extensionPvp.p2' },
          {
            kind: 'image',
            imageId: 'panorama-pvp',
            altKey: 'gameplay.progression.extensionPvp.imgAlt',
          },
          { kind: 'paragraph', textKey: 'gameplay.progression.extensionPvp.p3' },
          { kind: 'paragraph', textKey: 'gameplay.progression.extensionPvp.p4' },
        ],
      },
    ],
  },
  {
    id: 'craft',
    titleKey: 'gameplay.craft.title',
    chapters: [
      {
        id: 'construction',
        titleKey: 'gameplay.craft.construction.title',
        summaryKey: 'gameplay.craft.construction.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.craft.construction.p0' },
          { kind: 'paragraph', textKey: 'gameplay.craft.construction.p1' },
          { kind: 'paragraph', textKey: 'gameplay.craft.construction.p2' },
          { kind: 'paragraph', textKey: 'gameplay.craft.construction.p3' },
          { kind: 'paragraph', textKey: 'gameplay.craft.construction.p4' },
          {
            kind: 'list',
            items: [
              {
                strongKey: 'gameplay.craft.construction.levels.novice.strong',
                textKey: 'gameplay.craft.construction.levels.novice.text',
              },
              {
                strongKey: 'gameplay.craft.construction.levels.qualified.strong',
                textKey: 'gameplay.craft.construction.levels.qualified.text',
              },
              {
                strongKey: 'gameplay.craft.construction.levels.expert.strong',
                textKey: 'gameplay.craft.construction.levels.expert.text',
              },
            ],
          },
        ],
      },
      {
        id: 'crafting',
        titleKey: 'gameplay.craft.crafting.title',
        summaryKey: 'gameplay.craft.crafting.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.craft.crafting.p0' },
          { kind: 'paragraph', textKey: 'gameplay.craft.crafting.p1' },
          { kind: 'paragraph', textKey: 'gameplay.craft.crafting.p2' },
          { kind: 'paragraph', textKey: 'gameplay.craft.crafting.p3' },
          { kind: 'paragraph', textKey: 'gameplay.craft.crafting.p4' },
          { kind: 'paragraph', textKey: 'gameplay.craft.crafting.p5' },
          {
            kind: 'selector',
            labelKey: 'gameplay.craft.crafting.selectorLabel',
            options: [
              {
                labelKey: 'gameplay.craft.crafting.cook.label',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      { textKey: 'gameplay.craft.crafting.cook.i0' },
                      { textKey: 'gameplay.craft.crafting.cook.i1' },
                      { textKey: 'gameplay.craft.crafting.cook.i2' },
                    ],
                  },
                ],
              },
              {
                labelKey: 'gameplay.craft.crafting.leather.label',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      { textKey: 'gameplay.craft.crafting.leather.i0' },
                      { textKey: 'gameplay.craft.crafting.leather.i1' },
                      { textKey: 'gameplay.craft.crafting.leather.i2' },
                      { textKey: 'gameplay.craft.crafting.leather.i3' },
                      { textKey: 'gameplay.craft.crafting.leather.i4' },
                    ],
                  },
                ],
              },
              {
                labelKey: 'gameplay.craft.crafting.smith.label',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      { textKey: 'gameplay.craft.crafting.smith.i0' },
                      { textKey: 'gameplay.craft.crafting.smith.i1' },
                      { textKey: 'gameplay.craft.crafting.smith.i2' },
                    ],
                  },
                ],
              },
              {
                labelKey: 'gameplay.craft.crafting.gear.label',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      { textKey: 'gameplay.craft.crafting.gear.i0' },
                      { textKey: 'gameplay.craft.crafting.gear.i1' },
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
        titleKey: 'gameplay.craft.stuff.title',
        summaryKey: 'gameplay.craft.stuff.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.craft.stuff.p0' },
          { kind: 'paragraph', textKey: 'gameplay.craft.stuff.p1' },
          { kind: 'paragraph', textKey: 'gameplay.craft.stuff.p2' },
          {
            kind: 'list',
            items: [
              { textKey: 'gameplay.craft.stuff.dmg.mountains' },
              { textKey: 'gameplay.craft.stuff.dmg.forest' },
              { textKey: 'gameplay.craft.stuff.dmg.plains' },
              { textKey: 'gameplay.craft.stuff.dmg.coast' },
            ],
          },
          { kind: 'paragraph', textKey: 'gameplay.craft.stuff.p3' },
          {
            kind: 'selector',
            labelKey: 'gameplay.craft.stuff.selectorLabel',
            options: [
              {
                labelKey: 'gameplay.craft.stuff.weapons.javelin.label',
                blocks: [
                  { kind: 'paragraph', textKey: 'gameplay.craft.stuff.weapons.javelin.style' },
                  {
                    kind: 'table',
                    headerKeys: WEAPON_HEADERS,
                    rows: [
                      [
                        ROLE.main,
                        { key: 'gameplay.craft.stuff.weapons.javelin.s0n' },
                        { key: 'gameplay.craft.stuff.weapons.javelin.s0e' },
                      ],
                      [
                        ROLE.control,
                        { key: 'gameplay.craft.stuff.weapons.javelin.s1n' },
                        { key: 'gameplay.craft.stuff.weapons.javelin.s1e' },
                      ],
                      [
                        ROLE.defense,
                        { key: 'gameplay.craft.stuff.weapons.javelin.s2n' },
                        { key: 'gameplay.craft.stuff.weapons.javelin.s2e' },
                      ],
                      [
                        ROLE.mobility,
                        { key: 'gameplay.craft.stuff.weapons.javelin.s3n' },
                        { key: 'gameplay.craft.stuff.weapons.javelin.s3e' },
                      ],
                      [
                        ROLE.ultimate,
                        { key: 'gameplay.craft.stuff.weapons.javelin.s4n' },
                        { key: 'gameplay.craft.stuff.weapons.javelin.s4e' },
                      ],
                    ],
                  },
                ],
              },
              {
                labelKey: 'gameplay.craft.stuff.weapons.axe.label',
                blocks: [
                  { kind: 'paragraph', textKey: 'gameplay.craft.stuff.weapons.axe.style' },
                  {
                    kind: 'table',
                    headerKeys: WEAPON_HEADERS,
                    rows: [
                      [
                        ROLE.main,
                        { key: 'gameplay.craft.stuff.weapons.axe.s0n' },
                        { key: 'gameplay.craft.stuff.weapons.axe.s0e' },
                      ],
                      [
                        ROLE.control,
                        { key: 'gameplay.craft.stuff.weapons.axe.s1n' },
                        { key: 'gameplay.craft.stuff.weapons.axe.s1e' },
                      ],
                      [
                        ROLE.defense,
                        { key: 'gameplay.craft.stuff.weapons.axe.s2n' },
                        { key: 'gameplay.craft.stuff.weapons.axe.s2e' },
                      ],
                      [
                        ROLE.mobility,
                        { key: 'gameplay.craft.stuff.weapons.axe.s3n' },
                        { key: 'gameplay.craft.stuff.weapons.axe.s3e' },
                      ],
                      [
                        ROLE.ultimate,
                        { key: 'gameplay.craft.stuff.weapons.axe.s4n' },
                        { key: 'gameplay.craft.stuff.weapons.axe.s4e' },
                      ],
                    ],
                  },
                ],
              },
              {
                labelKey: 'gameplay.craft.stuff.weapons.steppe.label',
                blocks: [
                  { kind: 'paragraph', textKey: 'gameplay.craft.stuff.weapons.steppe.style' },
                  {
                    kind: 'table',
                    headerKeys: WEAPON_HEADERS,
                    rows: [
                      [
                        ROLE.main,
                        { key: 'gameplay.craft.stuff.weapons.steppe.s0n' },
                        { key: 'gameplay.craft.stuff.weapons.steppe.s0e' },
                      ],
                      [
                        ROLE.control,
                        { key: 'gameplay.craft.stuff.weapons.steppe.s1n' },
                        { key: 'gameplay.craft.stuff.weapons.steppe.s1e' },
                      ],
                      [
                        ROLE.defense,
                        { key: 'gameplay.craft.stuff.weapons.steppe.s2n' },
                        { key: 'gameplay.craft.stuff.weapons.steppe.s2e' },
                      ],
                      [
                        ROLE.mobility,
                        { key: 'gameplay.craft.stuff.weapons.steppe.s3n' },
                        { key: 'gameplay.craft.stuff.weapons.steppe.s3e' },
                      ],
                      [
                        ROLE.ultimate,
                        { key: 'gameplay.craft.stuff.weapons.steppe.s4n' },
                        { key: 'gameplay.craft.stuff.weapons.steppe.s4e' },
                      ],
                    ],
                  },
                ],
              },
              {
                labelKey: 'gameplay.craft.stuff.weapons.harpoon.label',
                blocks: [
                  { kind: 'paragraph', textKey: 'gameplay.craft.stuff.weapons.harpoon.style' },
                  {
                    kind: 'table',
                    headerKeys: WEAPON_HEADERS,
                    rows: [
                      [
                        ROLE.main,
                        { key: 'gameplay.craft.stuff.weapons.harpoon.s0n' },
                        { key: 'gameplay.craft.stuff.weapons.harpoon.s0e' },
                      ],
                      [
                        ROLE.control,
                        { key: 'gameplay.craft.stuff.weapons.harpoon.s1n' },
                        { key: 'gameplay.craft.stuff.weapons.harpoon.s1e' },
                      ],
                      [
                        ROLE.defense,
                        { key: 'gameplay.craft.stuff.weapons.harpoon.s2n' },
                        { key: 'gameplay.craft.stuff.weapons.harpoon.s2e' },
                      ],
                      [
                        ROLE.mobility,
                        { key: 'gameplay.craft.stuff.weapons.harpoon.s3n' },
                        { key: 'gameplay.craft.stuff.weapons.harpoon.s3e' },
                      ],
                      [
                        ROLE.ultimate,
                        { key: 'gameplay.craft.stuff.weapons.harpoon.s4n' },
                        { key: 'gameplay.craft.stuff.weapons.harpoon.s4e' },
                      ],
                    ],
                  },
                ],
              },
            ],
          },
          { kind: 'paragraph', textKey: 'gameplay.craft.stuff.p4' },
        ],
      },
    ],
  },
  {
    id: 'eco',
    titleKey: 'gameplay.eco.title',
    chapters: [
      {
        id: 'gestion',
        titleKey: 'gameplay.eco.gestion.title',
        summaryKey: 'gameplay.eco.gestion.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.eco.gestion.p0' },
          { kind: 'paragraph', textKey: 'gameplay.eco.gestion.p1' },
          { kind: 'paragraph', textKey: 'gameplay.eco.gestion.p2' },
          { kind: 'paragraph', textKey: 'gameplay.eco.gestion.p3' },
          { kind: 'paragraph', textKey: 'gameplay.eco.gestion.p4' },
          { kind: 'paragraph', textKey: 'gameplay.eco.gestion.p5' },
          { kind: 'paragraph', textKey: 'gameplay.eco.gestion.p6' },
        ],
      },
      {
        id: 'comptoirs',
        titleKey: 'gameplay.eco.comptoirs.title',
        summaryKey: 'gameplay.eco.comptoirs.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.eco.comptoirs.p0' },
          { kind: 'paragraph', textKey: 'gameplay.eco.comptoirs.p1' },
          { kind: 'paragraph', textKey: 'gameplay.eco.comptoirs.p2' },
          { kind: 'paragraph', textKey: 'gameplay.eco.comptoirs.p3' },
          { kind: 'paragraph', textKey: 'gameplay.eco.comptoirs.p4' },
          { kind: 'paragraph', textKey: 'gameplay.eco.comptoirs.p5' },
        ],
      },
      {
        id: 'capitale',
        titleKey: 'gameplay.eco.capitale.title',
        summaryKey: 'gameplay.eco.capitale.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.eco.capitale.p0' },
          {
            kind: 'list',
            items: [
              {
                strongKey: 'gameplay.eco.capitale.items.royalists.strong',
                textKey: 'gameplay.eco.capitale.items.royalists.text',
              },
              {
                strongKey: 'gameplay.eco.capitale.items.insurgents.strong',
                textKey: 'gameplay.eco.capitale.items.insurgents.text',
              },
            ],
          },
          { kind: 'paragraph', textKey: 'gameplay.eco.capitale.p1' },
          { kind: 'paragraph', textKey: 'gameplay.eco.capitale.p2' },
          { kind: 'paragraph', textKey: 'gameplay.eco.capitale.p3' },
        ],
      },
      {
        id: 'religion',
        titleKey: 'gameplay.eco.religion.title',
        summaryKey: 'gameplay.eco.religion.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.eco.religion.p0' },
          { kind: 'paragraph', textKey: 'gameplay.eco.religion.p1' },
          { kind: 'paragraph', textKey: 'gameplay.eco.religion.p2' },
          { kind: 'paragraph', textKey: 'gameplay.eco.religion.p3' },
          {
            kind: 'list',
            items: [
              { textKey: 'gameplay.eco.religion.offering.i0' },
              { textKey: 'gameplay.eco.religion.offering.i1' },
              { textKey: 'gameplay.eco.religion.offering.i2' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'pvp',
    titleKey: 'gameplay.pvp.title',
    chapters: [
      {
        id: 'religions',
        titleKey: 'gameplay.pvp.religions.title',
        summaryKey: 'gameplay.pvp.religions.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.pvp.religions.p0' },
          { kind: 'paragraph', textKey: 'gameplay.pvp.religions.p1' },
          { kind: 'paragraph', textKey: 'gameplay.pvp.religions.p2' },
        ],
      },
      {
        id: 'donjon',
        titleKey: 'gameplay.pvp.donjon.title',
        summaryKey: 'gameplay.pvp.donjon.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.pvp.donjon.p0' },
          { kind: 'paragraph', textKey: 'gameplay.pvp.donjon.p1' },
          { kind: 'paragraph', textKey: 'gameplay.pvp.donjon.p2' },
          { kind: 'paragraph', textKey: 'gameplay.pvp.donjon.p3' },
        ],
      },
      {
        id: 'equilibres',
        titleKey: 'gameplay.pvp.equilibres.title',
        summaryKey: 'gameplay.pvp.equilibres.summary',
        blocks: [
          { kind: 'paragraph', textKey: 'gameplay.pvp.equilibres.p0' },
          { kind: 'paragraph', textKey: 'gameplay.pvp.equilibres.p1' },
          {
            kind: 'table',
            headerKeys: [
              'gameplay.pvp.equilibres.head.fight',
              'gameplay.pvp.equilibres.head.trigger',
              'gameplay.pvp.equilibres.head.numbers',
              'gameplay.pvp.equilibres.head.stake',
            ],
            rows: [
              [
                { key: 'gameplay.pvp.equilibres.rows.fort.fight' },
                { key: 'gameplay.pvp.equilibres.rows.fort.trigger' },
                '70 vs 70',
                { key: 'gameplay.pvp.equilibres.rows.fort.stake' },
              ],
              [
                { key: 'gameplay.pvp.equilibres.rows.trade.fight' },
                { key: 'gameplay.pvp.equilibres.rows.trade.trigger' },
                { key: 'gameplay.pvp.equilibres.rows.trade.numbers' },
                { key: 'gameplay.pvp.equilibres.rows.trade.stake' },
              ],
              [
                { key: 'gameplay.pvp.equilibres.rows.capital.fight' },
                { key: 'gameplay.pvp.equilibres.rows.capital.trigger' },
                { key: 'gameplay.pvp.equilibres.rows.capital.numbers' },
                { key: 'gameplay.pvp.equilibres.rows.capital.stake' },
              ],
              [
                { key: 'gameplay.pvp.equilibres.rows.religion.fight' },
                { key: 'gameplay.pvp.equilibres.rows.religion.trigger' },
                { key: 'gameplay.pvp.equilibres.rows.religion.numbers' },
                { key: 'gameplay.pvp.equilibres.rows.religion.stake' },
              ],
              [
                { key: 'gameplay.pvp.equilibres.rows.dungeon.fight' },
                { key: 'gameplay.pvp.equilibres.rows.dungeon.trigger' },
                '21 vs 21 vs 21',
                { key: 'gameplay.pvp.equilibres.rows.dungeon.stake' },
              ],
            ],
          },
          { kind: 'paragraph', textKey: 'gameplay.pvp.equilibres.p2' },
          { kind: 'paragraph', textKey: 'gameplay.pvp.equilibres.p3' },
        ],
      },
    ],
  },
]
