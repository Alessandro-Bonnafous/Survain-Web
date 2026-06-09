import type { GameplayContent } from './types'

/**
 * Gameplay content — English. Must stay structurally identical to `fr.ts`
 * (same ids, same block kinds and order, same table dimensions) — enforced by
 * the parity test.
 */
export const gameplayEn: GameplayContent = [
  {
    id: 'progression',
    title: 'Progression and Territorial Structure',
    chapters: [
      {
        id: 'contrees',
        title: 'The Lands',
        summary:
          'Choice of starting biome: Forests, Plains, Mountains or Coast, each with its own resources and specialisations.',
        blocks: [
          { kind: 'paragraph', text: 'Resources are distributed as follows:' },
          {
            kind: 'table',
            headers: ['Lands / Resources', 'Plant', 'Mineral', 'Animal'],
            rows: [
              ['Forest', '50%', '25%', '25%'],
              ['Plains', '25%', '25%', '50%'],
              ['Mountains', '25%', '50%', '25%'],
              ['Coast', '33%', '33%', '33%'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'The type of resources also differs, for example for wood:',
          },
          {
            kind: 'table',
            headers: ['Wood', 'T1 (grey)', 'T2 (green)', 'T3 (blue)'],
            rows: [
              ['Forest', 'Birch', 'Maple', 'Oak'],
              ['Plains', 'Hornbeam', 'Aspen', 'Elm'],
              ['Mountains', 'Walnut', 'Larch', 'Pine'],
              ['Coast', 'Palm', 'Cypress', 'Driftwood'],
            ],
          },
        ],
      },
      {
        id: 'provinces',
        title: 'The Provinces',
        summary:
          'The Settler federates several Lands and becomes a Baron, with a county seat, market, tavern, library, vaults and garrison.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The Settler who decides to recruit 6 Lands then becomes the Baron of the Province. They are free to push away undesirable Lands. They set up a collective space in their county seat where the Province buildings are gathered:',
          },
          {
            kind: 'list',
            items: [
              {
                strong: 'The warehouse:',
                text: 'storage for the resources needed to build and maintain the common buildings.',
              },
              {
                strong: 'The marketplace:',
                text: 'each settler sends a villager to run a stall offering specific resources.',
              },
              {
                strong: 'The library:',
                text: 'to write and exchange crafting learning books.',
              },
              {
                strong: 'The tavern:',
                text: 'the prime spot for villager morale and for meeting explorers who open the way to wild lands to explore as a group.',
              },
              { strong: 'The vault room:', text: 'for the Province finances.' },
              {
                strong: 'The political office:',
                text: 'to communicate with the other provinces and the region.',
              },
              {
                strong: 'A training camp:',
                text: 'to hone your skills through duels between friends.',
              },
              {
                strong: 'The garrison:',
                text: 'recruiting and equipping mercenaries to protect the county seat from enemy intrusions.',
              },
            ],
          },
        ],
      },
      {
        id: 'multijoueurs',
        title: 'Multiplayer extension',
        summary:
          'Players organise the common buildings, trade, learning, defence and group explorations.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'After building the tavern, an explorer offers a treasure map for sale; it grants access to the wild land for PvE.',
          },
          {
            kind: 'table',
            headers: ['Wild lands / Resources', 'Plant', 'Mineral', 'Animal'],
            rows: [
              ['Jungle', '70%', '10%', '20%'],
              ['Volcano', '10%', '70%', '20%'],
              ['Swamp', '20%', '10%', '70%'],
              ['Desert', '30%', '50%', '20%'],
              ['Canyon', '35%', '30%', '35%'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'There you find complementary resources, essential for T3.',
          },
          {
            kind: 'paragraph',
            text: 'You also find mobs and bosses that loot components for offerings to the Gods: heart / claws / blood / eye / mane / carapace.',
          },
        ],
      },
      {
        id: 'regions',
        title: 'The Regions',
        summary:
          'Provinces unite to overthrow the NPC Lord and reach the open world of the Kingdom.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Through their political office, the Baron decides to join a Region and allies with 9 other Provinces.',
          },
          {
            kind: 'paragraph',
            text: 'The priority will be to overthrow the NPC Lord. A general mobilisation of the Settlers, good organisation and T3 equipment will be needed to face the Lord’s mercenaries, handsomely paid with the tithes.',
          },
          { kind: 'image', image: { id: 'regions-pvp', alt: 'Map of regions and PvP zones' } },
        ],
      },
      {
        id: 'extension-pvp',
        title: 'PvP extension',
        summary:
          'Castles, the Capital, Norse temples and Wild Caves become the great theatres of conflict.',
        blocks: [
          { kind: 'paragraph', text: 'The Region then discovers the open world of the Kingdom.' },
          {
            kind: 'paragraph',
            text: 'There you find the Capital, with two layouts to choose from:',
          },
          {
            kind: 'list',
            items: [
              {
                strong: 'Crown City:',
                text: 'on the surface, wealth, commercial activity and the royal guards.',
              },
              {
                strong: 'Under City:',
                text: 'underground, the catacombs, the black market and the brigands of the night.',
              },
            ],
          },
          {
            kind: 'paragraph',
            text: 'On the outskirts of the capital, the 8 Norse temples fight at a distance for possession of the relics — battles the Settlers can take part in.',
          },
          { kind: 'image', image: { id: 'panorama-pvp', alt: 'PvP panorama of the Kingdom' } },
          {
            kind: 'paragraph',
            text: 'Also to be discovered are the Wild Caves that explorers find, the place to fight over the precious organs of the mobs.',
          },
          {
            kind: 'paragraph',
            text: 'And finally the epic castle-siege battles in the clashes between regions.',
          },
        ],
      },
    ],
  },
  {
    id: 'craft',
    title: 'Construction, Crafting and Gear',
    chapters: [
      {
        id: 'construction',
        title: 'Construction and crafting',
        summary:
          'The village grows through buildings, workshops, repairs, construction levels and crafting progression.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Once the village location is set, you must lay the first stone. There are many building types, such as houses, fishing, hunting, the warehouse, farming, livestock, the mine, the woodcutter, the blacksmith, the alchemist, the kitchen, the divine hall… Buildings can be built from the basic materials of the Land. Only once a building is 100% complete is the structure usable. Weather and the wear of time damage buildings, which must be repaired regularly. Inside the buildings, you then build the workshops to craft tools or gear of the same level (grey).',
          },
          {
            kind: 'paragraph',
            text: 'The specific resources of the wild lands open a new chapter of crafting. Buildings and workshops must be rebuilt to reach the improved level (green).',
          },
          {
            kind: 'paragraph',
            text: 'It is then the workshops of the Lord’s castle that allow crafting to be upgraded to the higher level (blue). The level of buildings plays a role in villager morale and their work performance.',
          },
          {
            kind: 'paragraph',
            text: 'At the start, the Settler knows rudimentary recipes, with a low learning level. They can learn others, either with the arrival of new villagers who master a trade, or with learning manuals they can buy or obtain in libraries.',
          },
          {
            kind: 'paragraph',
            text: 'There are three learning levels for crafting skills:',
          },
          {
            kind: 'list',
            items: [
              { strong: 'Novice:', text: '30% — the base level.' },
              {
                strong: 'Qualified:',
                text: '60% — the intermediate level allowing the trade to be passed on.',
              },
              { strong: 'Expert:', text: '90% — optimal crafting level.' },
            ],
          },
        ],
      },
      {
        id: 'crafting',
        title: 'Crafting mechanics',
        summary:
          'Automatic or manual crafting depends on recipes, mastery and specialty mini-games.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'A learned crafting skill has a base creation percentage of 30%.',
          },
          {
            kind: 'paragraph',
            text: 'This value determines the durability or performance of the crafted item.',
          },
          {
            kind: 'paragraph',
            text: 'If they do not know the recipe, they can use a manual or accompany a qualified crafter to acquire the skill.',
          },
          {
            kind: 'paragraph',
            text: 'The player can also improve their skill level by activating manual crafting (as a mini-game). If the percentage obtained is better, it becomes the new reference.',
          },
          {
            kind: 'paragraph',
            text: 'Otherwise, the item is crafted automatically with the skill’s percentage.',
          },
          { kind: 'paragraph', text: 'Here are a few examples:' },
          {
            kind: 'selector',
            label: 'Choose a trade:',
            options: [
              {
                label: 'Cook',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      {
                        text: 'Take the example of a cook at 42% for the campfire grill:',
                      },
                      {
                        text: 'Automatically, they can cook a grilled rabbit leg (T1) with 2.5 days of shelf life instead of 6 days.',
                      },
                      {
                        text: 'Manually, they must master the cooking temperature to try to improve their 42% mastery.',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Leatherworker',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      { text: 'Take the example of a tanner at 65% for bag leatherwork:' },
                      {
                        text: 'Automatically, they can make a leather satchel (T2) with 65 uses instead of 100.',
                      },
                      {
                        text: 'Manually, they must master cutting and sewing to improve their 65% mastery.',
                      },
                      {
                        text: 'They can also be accompanied by an apprentice (NPC or player) to teach good practices. The apprentice gains a mastery of 65-30 = 35%.',
                      },
                      {
                        text: 'They can write a learning manual in a library to pass on or sell.',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Blacksmith',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      {
                        text: 'Take the example of an assembler blacksmith at 82% for tool making:',
                      },
                      {
                        text: 'Automatically, they can make an iron pickaxe (T3) with 82 uses instead of 100.',
                      },
                      {
                        text: 'Manually, they must master three skills (furnace, forging and heat treatment) to improve their mastery.',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Gear',
                blocks: [
                  {
                    kind: 'list',
                    items: [
                      {
                        text: 'For gear, the impact of mastery is not on durability, but on effectiveness.',
                      },
                      {
                        text: 'So a T3 weapon crafted at 30% mastery deals as much damage as a T1 weapon at 90%.',
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
        title: 'Gear and damage types',
        summary:
          'Gear is personal: weapons, armour, damage elements and divine blessings depending on the biome.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Gear is a player’s bespoke weapons and armour. Only the player and their villagers can craft it. A third party can only recover its components.',
          },
          {
            kind: 'paragraph',
            text: 'Each biome has its specific gear, without preventing access to the other equipment; the base resources will simply be far more common there.',
          },
          { kind: 'paragraph', text: 'For example:' },
          {
            kind: 'list',
            items: [
              {
                text: 'A mountain dweller will easily find fur to craft reinforced leather armour that protects against cold damage, and their hammer made from Pine will deal damage with the cold modifier.',
              },
              { text: 'A forest dweller will be tied to physical damage.' },
              { text: 'A plains dweller will be tied to heat.' },
              { text: 'A coast dweller will be tied to wind.' },
            ],
          },
          { kind: 'paragraph', text: 'Each biome also has its own weapon set.' },
          {
            kind: 'selector',
            label: 'Select a weapon type / biome:',
            options: [
              {
                label: 'Light javelin — Forest physical',
                blocks: [
                  { kind: 'paragraph', text: 'Playstyle: Assassin / Mobile hunter.' },
                  {
                    kind: 'table',
                    headers: ['Type', 'Skill name', 'Effect'],
                    rows: [
                      ['Main attack', 'Tracking Thorn', 'Piercing shot that marks enemies'],
                      ['Control', 'Hunting Roots', 'Immobilisation by roots'],
                      ['Protect / Defence', 'Protective Canopy', 'Damage reduction + camouflage'],
                      ['Mobility', 'Sylvan Leap', 'Dash to a tree or marked target'],
                      [
                        'Ultimate',
                        'Hunt of the Great Stag',
                        'Spiritual charge causing fear and heavy damage',
                      ],
                    ],
                  },
                ],
              },
              {
                label: 'Heavy throwing axe — Mountain cold',
                blocks: [
                  { kind: 'paragraph', text: 'Playstyle: Bruiser / Tank.' },
                  {
                    kind: 'table',
                    headers: ['Type', 'Skill name', 'Effect'],
                    rows: [
                      ['Main attack', 'Glacier Axe', 'Heavy throw with icy slow'],
                      ['Control', 'Avalanche Fissure', 'Knockback and slippery terrain'],
                      ['Protect / Defence', 'White Mammoth Hide', 'Huge defensive shield'],
                      ['Mobility', 'Call of the Summit', 'Pulls enemies in with the axe'],
                      ['Ultimate', 'Wrath of the Avalanche', 'Giant avalanche with a final stun'],
                    ],
                  },
                ],
              },
              {
                label: 'Steppe javelin — Plains fire',
                blocks: [
                  { kind: 'paragraph', text: 'Playstyle: Aggressive fighter / Mobile.' },
                  {
                    kind: 'table',
                    headers: ['Type', 'Skill name', 'Effect'],
                    rows: [
                      ['Main attack', 'Incandescent Spear', 'Fire explosion + burn'],
                      ['Control', 'Solar Impalement', 'Charge with stun'],
                      ['Protect / Defence', 'Circle of the Nomads', 'Projectile deflection'],
                      ['Mobility', 'Run of the Tall Grass', 'Sprint leaving a trail of fire'],
                      [
                        'Ultimate',
                        'Storm of the Burning Steppe',
                        'Blazing storm controlling the area',
                      ],
                    ],
                  },
                ],
              },
              {
                label: 'Throwing harpoon — Coast wind',
                blocks: [
                  { kind: 'paragraph', text: 'Playstyle: Controller / Offensive support.' },
                  {
                    kind: 'table',
                    headers: ['Type', 'Skill name', 'Effect'],
                    rows: [
                      ['Main attack', 'Tide Harpoon', 'Light pull + wet mark'],
                      ['Control', 'Rising Wave', 'Lift and knockback'],
                      [
                        'Protect / Defence',
                        'Protective Breeze',
                        'Reduction of incoming projectiles',
                      ],
                      ['Mobility', 'Kraken Grapple', 'Movement by anchoring'],
                      ['Ultimate', 'Leviathan Maelstrom', 'Sea vortex sucking in enemies'],
                    ],
                  },
                ],
              },
            ],
          },
          {
            kind: 'paragraph',
            text: 'Each piece of gear can receive a blessing granting passive bonuses depending on the chosen deity.',
          },
        ],
      },
    ],
  },
  {
    id: 'eco',
    title: 'Management, Economy and Religion',
    chapters: [
      {
        id: 'gestion',
        title: 'Management and Economy',
        summary:
          'NPCs, trades, morale, fatigue, workshop chests, foremen, merchants, gold and tithes.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Each NPC has a base trade, and can take up an apprenticeship with the Player either by improving their original trade or by learning a new skill.',
          },
          {
            kind: 'paragraph',
            text: 'The Player assigns tasks to NPCs over different time slots; the rest of the time, the NPC tends to their family and home, rests and prays.',
          },
          {
            kind: 'paragraph',
            text: 'Their morale is determined by their fatigue, comfort, family status and divine factors; it conditions their performance, i.e. their effective working hours relative to their time slot.',
          },
          {
            kind: 'paragraph',
            text: 'Workshop chests are used to restock the raw materials needed for crafting. Logistics missions allow these chests to be restocked or emptied.',
          },
          {
            kind: 'paragraph',
            text: 'A foreman’s presence in a workshop to oversee the workbenches improves worker performance, but overusing them lowers morale. As construction levels rise (T1 → T3), morale is reinforced. The Player provides a chest with gold, in the town hall, available to foremen to distribute.',
          },
          {
            kind: 'paragraph',
            text: 'Travelling merchants pass through the village regularly to offer resources and manuals and to buy crafted production for gold.',
          },
          {
            kind: 'paragraph',
            text: 'The Capital, the Region and the Provinces levy cascading tithes. Bad payers expose themselves to reprisals led by tax collectors and their armed troops.',
          },
        ],
      },
      {
        id: 'comptoirs',
        title: 'Trading posts, dens and trade routes',
        summary: 'Shops, markets, workshops, docks, convoys and trade routes exposed to banditry.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'By joining the Province, the Region and then the Capital, the player can take over active commercial sites by paying rent to the local authority.',
          },
          {
            kind: 'paragraph',
            text: 'They may, for example, have a shop in the county seat or a workshop in the lord’s castle. In the Capital, with enough Reputation, they can take possession of a market, a tavern, a carter, a dock, a spy den…',
          },
          {
            kind: 'paragraph',
            text: 'In every case, they must send their NPCs to run the establishment; the NPCs are self-sufficient for lodging and food. The more staff there is, the higher the profitability.',
          },
          {
            kind: 'paragraph',
            text: 'The crux of the matter is therefore the availability of establishments and, above all, a sufficient number of villagers.',
          },
          {
            kind: 'paragraph',
            text: 'Another way to earn gold is to deliver resources at a fixed price to official warehouses, or to put items (except gear) up for sale on markets open to all.',
          },
          {
            kind: 'paragraph',
            text: 'To bring resources to their destination, you need a cart with its team, or a barge by sea. Each delivery must be registered in the departure logistics office to lock in the sale price and quantities. But these scheduled trade routes are exposed to espionage and therefore to banditry.',
          },
        ],
      },
      {
        id: 'capitale',
        title: 'The Capital',
        summary:
          'Choice between Royalists on the surface and Insurgents underground, with reputation and scheduled conflicts.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'On arriving in the Capital, the player must choose their path: Royalist on the surface or Insurgent underground; depending on their actions for one camp or the other, they earn reputation.',
          },
          {
            kind: 'list',
            items: [
              {
                strong: 'Royalists:',
                text: 'a faction loyal to the crown, defending order, the capital and established power; they control the surface, are tied to the King, run the official economy (taxes, trade), enjoy easier access to the capital’s structures, with the Royal Guard under the authority of High Marshal Valen.',
              },
              {
                strong: 'Insurgents:',
                text: 'they control the underground, sabotage the surface, run a parallel economy (black market, looting), with riskier / freer gameplay; the Black Hands under the authority of Redbeard.',
              },
            ],
          },
          {
            kind: 'paragraph',
            text: 'Regularly, and pre-emptively, each faction attacks the other on its own ground. Players can take part in these scheduled events, always in the spirit of balanced combat, and gain Reputation.',
          },
          {
            kind: 'paragraph',
            text: 'Depending on the depth of the offensive, commercial activity is disrupted, and the resulting damage requires funds for repairs.',
          },
          {
            kind: 'paragraph',
            text: 'The King uses the tithes to fund surface investments, and the Insurgents take a percentage on the hiring of mercenaries.',
          },
        ],
      },
      {
        id: 'religion',
        title: 'Religion and Divinity',
        summary:
          'Divine halls, offerings, blessings, sanctuaries and the influence of the Norse gods.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Religion plays a major role in the relational balance within the Kingdom and brings its worshippers varied and significant benefits. There are nine worlds in Norse mythology, held in the branches and roots of the giant tree Yggdrasil; eight are available to each Settler: Vanaheim, Alfheim, Midgard, Svartalfheim, Jötunheim, Muspellheim, Niflheim, Helheim, and Asgard in the Capital.',
          },
          {
            kind: 'paragraph',
            text: 'The choice must be made when building the Divine Hall, and it brings benefits to the Land for its farming, crafting or population depending on the chosen God. It also acts as a catalyst to attract new villagers. The player can then build mini-sanctuaries outside the PvP zone that allow them to return to their grave.',
          },
          {
            kind: 'paragraph',
            text: 'Each deity requires specific offerings, based on boss organs, to grant blessings on the player’s gear. Within the same Province, players can benefit from the Divine Halls of the other lands if they follow different religions.',
          },
          {
            kind: 'paragraph',
            text: 'For example, a blessing on boots granting stability requires:',
          },
          {
            kind: 'list',
            items: [
              { text: '2 claws + 1 boss carapace;' },
              {
                text: '1 specific T3 resource from each biome (Forest, Plains, Mountains, Coast);',
              },
              {
                text: 'in an acacia urn (wood harvested in a desert wild land).',
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
        title: 'Religion Battles',
        summary: 'Temples defend relics, treasures and offerings during balanced events.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Each Deity is represented by a temple in the Kingdom; it is in fact a stronghold protecting the offerings, treasures and even a relic, which grants a boost to the relevant worshippers.',
          },
          {
            kind: 'paragraph',
            text: 'Just like the faction clashes in the Capital, events are scheduled regularly and religious fanatics storm a more opulent temple. Players of the same religion can take part, always in the spirit of balanced combat, and raise their level of Faith.',
          },
          {
            kind: 'paragraph',
            text: 'This Faith, brought back to their own Divine Hall, spontaneously attracts new villagers.',
          },
        ],
      },
      {
        id: 'donjon',
        title: 'Open-world Dungeon',
        summary:
          'Group dungeons with a PvP arena at the entrance, then PvE exploration against rare bosses.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'In the taverns of the Capital, many explorers offer maps to dungeons located in the Kingdom, with teleportation to the site. The team leader can select dungeons based on the size of their group: 7, 14 or 21 members.',
          },
          {
            kind: 'paragraph',
            text: 'Dungeons generally have 3 entrances, and the first room is a 3-way PvP arena. The last survivor can activate an altar of Odin that lets the fallen recover their graves and continue the adventure.',
          },
          {
            kind: 'paragraph',
            text: 'The rest of the dungeon is full PvE without disruption, with a random map. Bosses are hard to bring down but reward heavily in organs for offerings.',
          },
          {
            kind: 'paragraph',
            text: 'The number of dungeons is limited per group and per day to avoid grinding.',
          },
        ],
      },
      {
        id: 'equilibres',
        title: 'Balanced combat',
        summary:
          'Structured PvP: forts, trade routes, the Capital, temples and dungeons with controlled numbers.',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The first objective is to avoid zerg phenomena or wild PK.',
          },
          {
            kind: 'paragraph',
            text: 'PvP is structured and organised according to the following patterns:',
          },
          {
            kind: 'table',
            headers: ['Confrontation', 'Trigger', 'Numbers', 'Stake'],
            rows: [
              [
                'Region fort attack',
                'Launched by the Lord (player)',
                '70 vs 70',
                'Gold in the throne room',
              ],
              [
                'Trade route skirmish',
                'Launched by a player after espionage',
                'Attackers = convoy escort count',
                'Transportable convoy resources',
              ],
              [
                'Royalists vs Insurgents (Capital)',
                'Regular event',
                '30 vs 30 NPCs',
                'Damage to infrastructure',
              ],
              ['Religion battles', 'Regular event', '30 vs 30 NPCs', 'Relics and treasures'],
              ['Open-world Dungeon', 'Map purchase', '21 vs 21 vs 21', 'PvE Boss'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'Forces are balanced in number. The mechanic is as follows: at the start, all belligerent groups are made up of NPCs, and the player can substitute for one of them as long as they belong to the right region, faction, religion… The number therefore always stays the same.',
          },
          {
            kind: 'paragraph',
            text: 'In addition, a Lord can activate a protection bubble on the Region fort to avoid relentless rushes from other Lords; but this protection is paid for with the gold collected from the Provinces’ tithes.',
          },
        ],
      },
    ],
  },
]
