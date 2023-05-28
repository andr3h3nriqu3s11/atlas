import { CampaignType, ImportCampaign, Campaign, Rank, SWADE_RequirementType, BaseAttribute, HindranceType } from "@ref/types";

export const defaultSWADE: ImportCampaign<Campaign<CampaignType.SWADE>> = {
    campaign_type: CampaignType.SWADE,
    edges: [
        { 
            title: "Alertness",
            description: "Not much gets by your hero. He’s very observant and perceptive, and adds +2 to his Notice rolls to hear, see, or otherwise sense the world around him.",
            requirements: [],
            rank: Rank.Novice,
        },
        {
            title: "Ambidextrous",
            description: "Your hero is as deft with his left hand as he is with his right. He may ignore the -2 penalty for using his off-hand.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Arcane Background",
            description: "This is the Edge your character must purchase to have any sort of magical, psionic, or other supernatural ability. SeeChapter Four for a complete description.", 
            requirements: [],
            rank: Rank.Novice,
        },
        {
            title: "Arcane Resistance",
            description: "Your character is particularly resistant to magic (or psionics, or weird science, etc), whether by nature or by heritage. He acts as if he had 2 points of Armor when hit by damage-causing arcane powers, and adds +2 to his Trait rolls when resisting opposed powers. Even friendly arcane powers must subtract this modifier to affect the resistant hero.", 
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Improved Arcane Resistance",
            description: "Resistance As above but Armor and resistance are increased to 4.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Arcane Background"},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Attractive",
            description: "Your hero or heroine is very handsome or beautiful. His or her Charisma is increased by +2.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Vigor, level: 2},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Very Attractive",
            description: "Your hero or heroine is drop-dead gorgeous. His or her Charisma is increased by +4 total.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Attractive"},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Berserk",
            description: "Immediately after suffering a wound (including a Shaken result from physical damage), your hero must make a Smarts roll or go berserk. While Berserk, his Parry is reduced by 2 but he adds +2 to all Fighting and Strength rolls (including melee damage) and his Toughness. The warrior ignores all wound modifiers while berserk, but cannot use any skills, Edges, or maneuvers that require concentration, including Shooting and Taunt, but not Intimidation. Berserkers attack with reckless abandon. Anytime his Fighting die is a 1 (regardless of his Wild Die), he hits a random adjacent target, (not the original target). The attack may hit friend as well as foe. If there are no other adjacent targets, the blow simply misses. The Berserker may end his rage by doing nothing (not even moving) for one full action and making a Smarts roll at -2.",
            requirements: [],
            rank: Rank.Novice,
        },
        {
            title: "Brawny",
            description: "Your hero is very large or perhaps just very fit. Either way, his bulk resists damage better than most. Add +1 to your Toughness. In addition, your hero can carry more than most proportional to his Strength. He can carry 8 times his Strength in pounds without penalty instead of the usual 5 times his Strength.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Vigor, level: 2},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Strength, level: 2},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Fast Healer",
            description: "Your hero heals quickly. He may add +2 to his Vigor rolls when checking for natural healing.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Vigor, level: 3},
            ],
            rank: Rank. Novice,
        },
        {
            title: "Luck",
            description: "The player seems to be blessed by fate. He draws 1 extra benny at the beginning of each game session, allowing him to succeed at important tasks more often than most, and survive incredible dangers.",
            requirements: [],
            rank: Rank.Novice,
        },
        {
            title: "Great Luck",
            description: "The player draws 2 extra bennies instead of 1 for his luck at the start of each session.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Luck"},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Noble",
            description: "Those born of noble blood have many perks in life, but often have just as many responsibilities. Nobles have high status in their societies, are entitled to special treatment from their foes, gain +2 Charisma, and also have the Rich Edge. This gives the hero several Edges for the price of one, but the responsibilities more than offset the additional perks. Nobles often have troops under their control, as well as land, a family home, and other assets. All of this must be determined by the GM, and balanced by the grave responsibilities the character faces. As an example, a character in a fantasy campaign might have a company of swordsmen, a small keep, and even a 22 magical sword he inherited from his father. But he also has an entire county to manage, criminals to judge, justice to mete out, and a jealous neighbor who covets his lands and constantly plots against him at court.",
            requirements: [],
            rank: Rank.Novice,
        },
        {
            title: "Quick",
            description: "Your character was born with lightning-fast reflexes and a cool head. Whenever you are dealt a 5 or lower in combat, you may discard and draw again until you get a card higher than 5. Level Headed characters draw their additional card and take the best before using their Quick Edge.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Rich",
            description: "Whether your hero was born with a silver spoon in his mouth or earned it through hard work, he’s got more money than most others. The guidelines below are listed in modern terms so that your GM can fi gure out exactly what it means in campaign worlds of his own creation. Rich heroes start with three times the normal starting funds for the setting. If a regular income is appropriate for this setting, the hero receives the modern day equivalent of a $75,000 annual salary.",
            requirements: [],
            rank: Rank.Novice,
        },
        {
            title: "Filthy Rich (Rich)",
            description: "This character is very wealthy. He has fi ve times the starting funds for the setting and, if appropriate, a yearly income of around $250,000. Wealthier characters should have a very complete background as well. This needs to be worked out with the GM, and comes with many more assets as well as onerous responsibilities.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Rich"},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Filthy Rich (Noble)",
            description: "This character is very wealthy. He has fi ve times the starting funds for the setting and, if appropriate, a yearly income of around $250,000. Wealthier characters should have a very complete background as well. This needs to be worked out with the GM, and comes with many more assets as well as onerous responsibilities.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Noble"},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Block",
            description: "Heroes who engage in frequent hand-to- hand combat are far more skilled in personal defense than most others. They’ve learned not only how to attack, but how to block their opponent’s blows as well. A hero with this Edge adds +1 to his Parry.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Fighting", level: 3},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Improved Block",
            description: "As above, but the hero adds +2 to his Parry.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Block"},
            ],
            rank: Rank.Veteran,
        },
        {
            title: "Combat Reflexes",
            description: "Your hero recovers quickly from shock and trauma. He adds +2 to his Spirit roll when attempting to recover from being Shaken.",

            requirements: [],
            rank: Rank.Seasoned,
        },
        {
            title: "Dodge",
            description: "Some heroes are crafty types who know how to get out of harm’s way. This Edge allows them to use cover, movement, and concealment to make them harder to hit. Unless they are the victim of a surprise attack and taken completely unaware, attackers must subtract 1 from their Shooting or Throwing rolls when targeting them. Characters who attempt to evade area effect attacks may add +1 to their Agility roll as well (when allowed).",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Improved Dodge",
            description: "As above but attackers subtract 2 from their attack rolls, and the character adds +2 to evade area effect weapons when allowed.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Dodge"},
            ],
            rank: Rank.Veteran,
        },
        {
            title: "First Strike",
            description: "Once per turn the hero gets a free Fighting attack against a single foe who moves adjacent to him. This automatically interrupts the opponent’s action, and does not cost the hero his action if he is on Hold or has not yet acted this round.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Improved First Strike",
            description: "As above but the hero may make one free attack against each and every foe who moves adjacent to him.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "First Strike"},
            ],
            rank: Rank.Heroic,
        },
        {
            title: "Fleet-Footed",
            description: "The hero’s Pace is increased by +2 and he rolls a d10 instead of a d6 when running.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 2},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Florentine",
            description: "Fighting d8+ A character trained to fight “Florentine” is a master at wielding two weapons at once. He adds +1 to his Fighting rolls versus an opponent with a single weapon and no shield. In addition, opponents subtract 1 from any “gang up” bonuses they would normally get against the hero as his two flashing blades parry their blows.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
            ],
            rank: Rank.Novice ,
        },
        {
            title: "Frenzy",
            description: "Frenzied fighters make fast and furious melee attacks, sacrificing finesse for raw speed. This allows them to make an extra Fighting attack per round at a -2 penalty to all Fighting rolls. This attack must be taken at the same time as another Fighting attack though it may target any two foes adjacent to the hero (Wild Cards roll two Fighting dice and one Wild Die). The -2 penalty is subtracted from all attacks. A character armed with two weapons still only makes one extra attack. 24",
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Fighting", level: 4},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Improved Frenzy",
            description: "As above but the character may ignore the -2 Frenzy penalty.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Frenzy"},
            ],
            rank: Rank.Veteran,
        },
        {
            title: "Giant Killer",
            description: "The bigger they are, the harder they are to kill. At least for most. But your hero knows how to find the weak points in massive creatures. Your hero does +1d6 damage when attacking creatures three sizes or more larger than himself. An ogre (Size+3) with this ability, for example, gains the bonus only against creatures of Size +6 or greater. A human Giant Killer (Size 0), can claim the bonus against the ogre, however.",
            requirements: [],
            rank: Rank.Veteran,
        },
        {
            title: "Hard to Kill",
            description: "Your hero has more lives than a truckload of cats. When forced to make Vigor rolls due to Incapacitation, he may ignore his wound modifiers. This only applies to Vigor rolls called for by these tables—he still suffers from wound modifiers for other Trait rolls normally.",
            //TODO Wild Card
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Harder to Kill",
            description: "Your hero is tougher to kill than Rasputin. If he is ever “killed,” roll a die. On an odd result, he’s dead as usual. On an even roll, he’s Incapacitated but somehow escapes death. He may be captured, stripped of all his belongings, or mistakenly left for dead, but he somehow survives.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Hard to Kill"},
            ],
            rank: Rank.Veteran,
        },
        {
            title: "Level Headed",
            description: "Fighters who can keep their cool when everyone else is running for cover are deadly customers in combat. A hero with this Edge draws an additional action card in combat and acts on the best of the draw.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Smarts, level: 3},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Improved Level Headed",
            description: "As above but the hero draws 3 cards.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Level Headed"},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Marksman",
            description: "The hero excels at taking controlled, measured shots. If he does not move in a turn, he may fire as if he took the aim maneuver. Marksman may never be used with a rate of fi re greater than 1. Marksman works with both Shooting and Throwing.",
            requirements: [],
            rank: Rank.Seasoned,
        },
        {
            title: "Nerves of Steel",
            description: "Your hero has learned to fi ght on through the most intense pain. He may ignore 1 point of wound penalties.",
            //TODO Wild Card
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Vigor, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Improved Nerves of Steel",
            description: "The hero ignores 2 points of wound penalties.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Nerves of Steel"},
            ],
            rank: Rank.Novice,
        },
        {
            title: "No Mercy",
            description: "The character may spend a benny to reroll any one damage roll. Against area-effect attacks, each benny spent applies to one target.",
            requirements: [],
            rank: Rank.Seasoned,
        },
        {
            title: "Quick Draw",
            description: "This Edge allows a hero to draw a weapon and ignore the usual -2 to his attack that round. If the character must make an Agility roll to draw a weapon (see the combat section for more details), he adds +2 to the roll.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Rock and Roll!",
            description: "Some veteran shooters have learned how to compensate for the recoil of fully- automatic weapons. If a character with this Edge does not move, he may ignore the recoil penalty for fi ring a weapon on fully automatic.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Shooting", level: 3},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Steady Hands",
            description: "Your hero ignores the “unstable platform” penalty for fi ring from the backs of animals or while riding in moving vehicles.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Sweep",
            description: "Sweep allows a character to make a single Fighting attack and apply it against all adjacent targets at a -2 penalty. Resolve each damage roll separately. Allies are affected by such attacks as well, so heroes must be careful when and how they use this powerful ability. A character may not use Sweep in the same round she uses Frenzy.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Strength, level: 3},
                {type: SWADE_RequirementType.skill, title: "Fighting", level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Improved Sweep",
            description: "As above but the hero may ignore the -2 penalty.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Sweep"},
            ],
            rank: Rank.Veteran,
        },
        {
            title: "Trademark Weapon (Shooting)",
            description: "The hero knows one unique weapon (Excalibur, Old Betsy, Sting) like the back of his hand. When using that weapon, he adds +1 to his Fighting, Shooting, or Throwing rolls. A hero can take this Edge multiple times, applying it to a different weapon each time. If a Trademark Weapon is lost, the hero can replace it, but the benefit of the Edge doesn’t kick in for two game weeks.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Shooting", level: 4},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Trademark Weapon (Fighting)",
            description: "The hero knows one unique weapon (Excalibur, Old Betsy, Sting) like the back of his hand. When using that weapon, he adds +1 to his Fighting, Shooting, or Throwing rolls. A hero can take this Edge multiple times, applying it to a different weapon each time. If a Trademark Weapon is lost, the hero can replace it, but the benefit of the Edge doesn’t kick in for two game weeks.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Fighting", level: 4},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Improved Trademark Weapon (Shooting)",
            description: "As above but the bonus when using the weapon increases to +2.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Trademark Weapon (Shooting)"},
            ],
            rank: Rank.Veteran,
        },
        {
            title: "Improved Trademark Weapon (Fighting)",
            description: "As above but the bonus when using the weapon increases to +2.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Trademark Weapon (Fighting)"},
            ],
            rank: Rank.Veteran,
        },
        {
            title: "Two-Fisted",
            description: "A Two-Fisted hero isn’t ambidextrous—he’s simply learned to fi ght with two weapons (or both fists) at once. When attacking with a weapon in each hand, he rolls each attack separately but ignores the multi-action penalty.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Command",
            description: "Command is the ability to give clear instructions to surrounding allies and enforce your hero’s will upon them. This makes your character’s compatriots more willing to fi ght on despite their wounds, and so adds +1 to their Spirit rolls to recover from being Shaken.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Smarts, level: 2},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Fervor",
            description: "A simple phrase uttered by a great leader can sometimes have momentous results. A leader with this ability can inspire his men to bloody fervor by yelling a motto, slogan, or other inspirational words. Those in the command radius add +1 to their Fighting damage rolls.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 3},
                {type: SWADE_RequirementType.edge, title: 'Command'},
            ],
            rank: Rank.Veteran,
        },
        {
            title: "Hold the Line!",
            description: "This Edge strengthens the will of the men under the hero’s command. The troops add +1 to their Toughness.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Smarts, level: 3},
                {type: SWADE_RequirementType.edge, title: 'Command'},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Inspire",
            description: "Leaders with exceptional reputations and experience in battle inspire the soldiers around them. They add +2 to the Spirit rolls when recovering from being Shaken (this already includes the original +1 bonus for the Command Edge). This greatly improves the chances of men recovering from light wounds or poor morale that might normally take them out of the action.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: 'Command'},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Natural Leader",
            description: "This Edge signifies a special link between a leader and his men. With it, he may share his bennies with any troops under his command.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 3},
                {type: SWADE_RequirementType.edge, title: 'Command'},
            ],
            rank: Rank.Novice,
        },
        {
            title: "New Power",
            description: "An arcane character may learn a new power by choosing this Edge (which may be taken multiple times). He may choose from any powers normally available to his particular Arcane Background.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: 'Arcane Background'},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Power Points",
            description: "Wizards, weird scientists, and other arcane types always want more power. This Edge grants them an additional 5 Power Points. Power Points may be selected more than once, but only once per Rank.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: 'Arcane Background'},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Rapid Recharge",
            description: "This Edge allows an arcane character to regain 1 Power Point every 30 minutes.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: 'Arcane Background'},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 2},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Improved Rapid Recharge",
            description: "The character regains 1 Power Point every 15 minutes.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: 'Rapid Recharge'},
            ],
            rank: Rank.Veteran,
        },
        {
            title: "Soul Drain",
            description: "Spellcasters, mentalists, and other arcane types in dire need of Power Points may use this Edge to drain energy from their own souls. To use this dangerous ability, the arcane character first decides how many Power Points he wants to draw from himself. Then he makes a Spirit roll minus the number of points he’s trying to drain. (This is a free action.) On a Spirit total of 1 or less, the character suffers a wound and falls unconscious for 1d6 hours. On a failure, the character suffers a wound. On a success or better, the character gets the points he needed and may attempt to cast a spell with them immediately (they may not be saved).",
            requirements: [
                // TODO (any but Weird Science)
                {type: SWADE_RequirementType.edge, title: 'Arcane Background'},
                // TODO at least two other scientific Knowledge skills at d6+
                // Specification missing arcana
                {type: SWADE_RequirementType.skill, title: 'Knowledge', level: 4},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Ace",
            description: "Aces are special pilots and drivers who feel more comfortable behind the wheel, throttle, or fl ightstick than on their own two feet. Aces add +2 to Boating, Driving, and Piloting rolls. In addition, they may also spend bennies to make soak rolls for any vehicle or vessel they control. This is a Boating, Driving, or Piloting roll at -2 (cancelling their usual +2). Each success and raise negates a wound and any critical hit that would have resulted from it.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Acrobat",
            description: "Those who have formal training in the acrobatic arts or are naturally agile may take this Edge. It adds +2 to all Agility rolls made to perform acrobatic maneuvers (including Trick maneuvers), and also adds +1 to a character’s Parry as long as he has no encumbrance penalty. Example: Buck wants to leap over an angry crocodile and attempt to interrupt the enemy shaman who’s about to cast some dark spell. If Buck had the Acrobat Edge, he’d add +2 to his Agility roll to leap over the croc, but not to the opposed Agility test to try and interrupt the shaman’s action.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Strength, level: 2},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Champion",
            description: "Champions are holy (or unholy) men and women chosen to fight for a particular deity or religion. Most are pious souls ready and willing to lay down their lives for a greater cause, but some may have been born into the profession and follow their path with some reluctance. Champions fight the forces of darkness (or good). They add +2 damage when attacking supernaturally evil (or good) creatures, and have +2 Toughness when suffering damage from supernaturally evil (or good) sources, including arcane powers and the weapons, claws, or teeth of such creatures.",
            requirements: [
                // No need for Miracles specification because this depends on faith witch is Miracles Dependent
                {type: SWADE_RequirementType.edge, title: 'Arcane Background'},
                {type: SWADE_RequirementType.skill, title: 'Fighting', level: 3},
                {type: SWADE_RequirementType.skill, title: 'Faith', level: 2},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 3},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Strength, level: 2},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Vigor, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Gadgeteer",
            description: "These mechanical gurus are so technically savvy they can quickly build a machine to handle nearly any situation. Once per game session, a gadgeteer can create a “jury-rigged” device from spare parts. The device functions just like any other Weird Science device, and uses any power available to Weird Scientists in that setting (though this is still subject to Rank restrictions). It has half the inventor’s Power Points, and once these are used up, the gadget burns out and does not recharge. The inventor must have access to some parts and a reasonable amount of time (GM’s call, but at least 1d20 minutes) to create the gizmo.",
            requirements: [
                // No need for Weird Science specification because this depends on Weird Science witch is Weird Science Dependent
                {type: SWADE_RequirementType.edge, title: 'Arcane Background'},
                {type: SWADE_RequirementType.skill, title: 'Repair', level: 3},
                {type: SWADE_RequirementType.skill, title: 'Weird Science', level: 3},
                // TODO at least two other scientific Knowledge skills at d6+
                // Specification missing
                {type: SWADE_RequirementType.skill, title: 'Knowledge', level: 2},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Smarts, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Holy/Unholy Warrior",
            description: "Acolytes, clerics, paladins, holy slayers, and other avatars of the gods are frequently tasked with battling the forces of evil in the mortal world. This Edge gives them a slight advantage against such foes. As an action, a priest or other holy person may call upon his chosen deity to repulse supernaturally evil creatures, such as the undead, demons, and the like. It also works on evil characters with the Arcane Background (Miracles) Edge. Repulsing evil costs 1 Power Point and has a range of the character’s Spirit. Targeted creatures within that range must make a Spirit roll. Failure means the creature is Shaken; a 1 means it is destroyed. Wild Cards suffer an automatic Wound instead. A character may also be an Unholy Warrior working for the forces of evil. In this case, he repulses good creatures, such as angels, paladins, or good characters with Arcane Background (Miracles).",
            requirements: [
                // No need for Miracles specification because this depends on faith witch is Miracles Dependent
                {type: SWADE_RequirementType.edge, title: 'Arcane Background'},
                {type: SWADE_RequirementType.skill, title: 'Faith', level: 2},
                // TODO at least two other scientific Knowledge skills at d6+
                // TODO Missing specification
                {type: SWADE_RequirementType.skill, title: 'Knowledge', level: 2},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Investigator",
            description: "Investigators are characters who have spent a great deal of time researching ancient legends, working the streets, or deducing devilish mysteries. Some of these heroes are actual Private Investigators for hire while others may be sleuthing mages in a fantasy world or perhaps inquisitive college professors stumbling upon Things Man was not Meant to Know in the dark of night. Investigators add +2 to Investigation and Streetwise rolls, as well as Notice rolls made to search through evidence.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: 'Investigation', level: 3},
                {type: SWADE_RequirementType.skill, title: 'Streetwise', level: 3},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Smarts, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Jack-of-All-Trades",
            description: "Through advanced schooling, book- learning, computer-enhanced skill programs, or just amazing intuitive perception, your hero has a talent for picking up skills on the fl y. There is little he can’t fi gure out given a little time and a dash of luck. Any time he makes an unskilled roll for a Smarts-based skill, he may do so at d4 instead of the usual d4-2.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Smarts, level: 4},
            ],
            rank: Rank.Novice,
        },
        {
            title: "McGyver",
            description: "This character can improvise something when the need for a tool arises. He suffers no negative penalties on Trait rolls for lack of equipment in most situations. In addition, given a few simple tools, props, or devices, he can generally rig devices to help escape from death-traps, weapons to match some bizarre need, or otherwise create something that’s needed when such a thing isn’t actually present. The extent of this is completely up to the Game Master, but creativity should be rewarded, particularly in dire situations where few other answers are possible.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: 'Repair', level: 2},
                {type: SWADE_RequirementType.skill, title: 'Notice', level: 3},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Smarts, level: 2},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Mentalist",
            description: "Mentalists are masters of mind control and psionics. Some are pulp heroes, others are trained in secret government academies to root out traitors. Their frequent toying with human minds gives them a +2 on any opposed Psionics roll, whether they are using their powers against a foe or are trying to defend against a rival mentalist.",
            requirements: [
                // No need for Psionics specification because this depends on Psionics witch is Psionics Dependent
                {type: SWADE_RequirementType.edge, title: 'Arcane Background'},
                {type: SWADE_RequirementType.skill, title: 'Psionics', level: 2},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Smarts, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Mr. Fix it",
            description: "The inventor adds +2 to his Repair rolls. With a raise, he halves the time normally required to fi x something. This means that if a particular Repair job already states that a raise repairs it in half the time, a Mr. Fix It could fi nish the job in one-quarter the time with a raise.",
            requirements: [
                // No need for Weird Science specification because this depends on Weird Science witch is Weird Science Dependent
                {type: SWADE_RequirementType.edge, title: 'Arcane Background'},
                {type: SWADE_RequirementType.skill, title: 'Repair', level: 3},
                {type: SWADE_RequirementType.skill, title: 'Weird Science', level: 3},
                // TODO at least two other scientific Knowledge skills at d6+
                // TODO Missing specification
                {type: SWADE_RequirementType.skill, title: 'Knowledge', level: 2},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Smarts, level: 4},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Scholar",
            description: "Learned professors, devoted students, and amateur enthusiasts spend months of their lives studying particular fields. They become experts in these fi elds, and rarely fail to answer questions in their particular area of expertise. In addition, given a few simple tools, props, or devices, he can generally rig devices to help escape from death-traps, weapons to match some bizarre need, or otherwise create something that’s needed when such a thing isn’t actually present. The extent of this is completely up to the Game Master, but creativity should be rewarded, particularly in dire situations where few other answers are possible. Mentalist Mentalists are masters of mind control and psionics. Some are pulp heroes, others are trained in secret government academies to root out traitors. Their frequent toying with human minds gives them a +2 on any opposed Psionics roll, whether they are using their powers against a foe or are trying to defend against a rival mentalist. 31 Pick any two Knowledge skills that you have a d8 or better in. Add +2 to your total whenever these skills are used. Yes, those who study military history have a natural edge when commanding troops in mass battles—a +2 to a Knowledge (Battle) roll can mean the difference between a rousing victory and a crushing defeat.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: 'Knowledge', level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Thief",
            description: "Thieves specialize in deceit, treachery, and acrobatics. They can be invaluable where traps must be detected, walls must be climbed, and locks must be picked. Thieves add +2 to Climb, Lockpick, and Stealth rolls. The bonus to Stealth does not apply when the character is in a wilderness environment—only in urban areas.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: 'Climbing', level: 2},
                {type: SWADE_RequirementType.skill, title: 'Lockpicking', level: 2},
                {type: SWADE_RequirementType.skill, title: 'Stealth', level: 3},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Agility, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Wizard",
            description: "Wizards range from young apprentices to frighteningly powerful supreme sorcerers. They are often physically weak, however, and do not have the divine powers or healing abilities of priestly spellcasters. What they lack in spiritual favor, however, they more than make up for in utility and eldritch might. Wizards can cast the widest variety of spells, and if advanced wisely, have a wide variety of Power Edges to further increase their awesome abilities. Wizards learn their craft in formalized institutions or under the tutelage of experienced masters. Each raise a wizard gets on his Spellcasting roll reduces the cost of the spell by 1 Power Point. The wizard must have the points available to cast the spell in the first place before rolling.",
            requirements: [
                // No need for Magic specification because this depends on Spellcasting witch is Magic Dependent
                {type: SWADE_RequirementType.edge, title: 'Arcane Background'},
                // TODO at least two other scientific Knowledge skills at d6+
                // TODO Missing specification arcana
                {type: SWADE_RequirementType.skill, title: 'Knowledge', level: 3},
                {type: SWADE_RequirementType.skill, title: 'Spellcasting', level: 2},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Smarts, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Woodsman",
            description: "Woodsmen are rangers, scouts, and hunters who are more at home in the wilderness than in urban areas. They are skilled trackers and scouts, and know how to live off the land for months at a time. Woodsmen gain +2 to Tracking, Survival, and Stealth rolls made in the wilderness (not towns, ruins, or underground).",
            requirements: [
                {type: SWADE_RequirementType.skill, title: 'Survival', level: 3},
                {type: SWADE_RequirementType.skill, title: 'Tracking', level: 3},
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 2},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Charismatic",
            description: "Your hero has learned how to work with others, even those who might be somewhat opposed to him or his efforts. This adds +2 to his Charisma.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Common Bond",
            description: "This Edge signifies a special link between close companions—such as a typical party. It doesn’t matter whether or not the characters get along perfectly or not, they’ve just formed a close and common bond during their epic adventures. A character with this Edge may freely give his bennies to any other Wild Card he can communicate with. This represents the character giving his verbal or spiritual support to the ally. The player should say what his character is doing to give the support. The gesture could be as complex as a rousing speech, or as simple as a knowing nod.",
            // Wild Card
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Connections",
            description: "Whether it’s to the Feds, the cops, the Mob, or some big corporation, your heroine knows someone on the inside – someone who is willing to lend her a hand on occasion (usually once per game session). This Edge may be taken more than once, but each time must be applied to a different organization. The GM should also ensure the organization is limited to a single, unique organization. A hero may, for instance, have Connections (US Army), but he shouldn’t have a blanket Connection (Military). To use a character’s Connection requires that she first get in touch with one of her contacts. This requires a Streetwise roll. Failure means the particular contact wasn’t available, their cell phone wasn’t on, or they were otherwise tied up. Once in contact, the hero must make a Persuasion roll. The GM should feel free to modify both the Persuasion roll and any results based on the circumstances. A failure indicates the heroine’s contacts just couldn’t come through this time, or perhaps just weren’t persuaded that their help was really necessary. On a success, the contact might share information, but won’t do anything too risky to help. On a raise, the contact is willing to leak sensitive information, but stops short of outright betrayal. Two or more raises means the heroine has pushed the right buttons and can count on serious help. The Connection will risk serious consequences for the heroine. If she needs financial assistance, the contact may provide a little more than he’s comfortable with. If the heroine asks for muscle, the contact delivers either one expert (a safe-cracker, wheel-man, security expert, etc) or fi ve average fi ghter- types for the contact’s particular organization (a mob boss sends fi ve thugs, the Army sends fi ve infantrymen, etc.).",
            requirements: [],
            rank: Rank.Novice,
        },
        {
            title: "Strong Willed",
            description: "Characters with strong willpower use their voice, steely stares, or quick wits to unnerve their opponents. Strong Willed adds +2 to a character’s Intimidate and Taunt rolls, as well as his Spirit and Smarts rolls when resisting Tests of Will attacks. (a mob boss sends fi ve thugs, the Army sends fi ve infantrymen, etc.). Strong Willed",
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Intimidation", level: 2},
                {type: SWADE_RequirementType.skill, title: "Taunt", level: 2},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Beast Bond",
            description: "Some heroes can exert incredible will over their animal companion. These characters may spend their own bennies for any animals under their control, including mounts, pet dogs, familiars, and so on.",
            requirements: [],
            rank: Rank.Novice,
        },
        {
            title: "Beast Master",
            description: "Animals like your hero, and won’t attack him unless he attacks them first or they are enraged for some reason. His “animal magnetism” is so great he’s attracted a loyal animal of some sort as well. This is typically a dog, wolf, or raptor of some sort, though the GM may allow other companions if it fi ts the setting. If the beast is killed, another comes in 2d6 days if possible.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Danger Sense",
            description: "Your hero can sense when something bad is about to happen. Anytime he’s about to be the victim of a surprise attack, ambush, or other nasty surprise, he gets a Notice roll at -2 just before the attack or event occurs. If successful, the character knows something is about to happen and may take appropriate action against it. This means the hero is on Hold for the fi rst round of a combat. Should the hero fail his roll, he still follows the normal Surprise rules, if applicable.",
            requirements: [],
            rank: Rank.Novice,
        },
        {
            title: "Healer",
            description: "A character with this Edge adds +2 to all Healing rolls, whether natural or magical in nature. Up to five companions traveling with a Healer add the bonus to their natural healing rolls as well.",
            requirements: [
                {type: SWADE_RequirementType.attribute, attribute: BaseAttribute.Spirit, level: 3},
            ],
            rank: Rank.Novice,
        },
        {
            title: "Dead Shot (Shooting)",
            description: "The character doubles his total damage when making a successful Shooting or Throwing attack this round.",
            // Wild Card
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Shooting", level: 4},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Dead Shot (Throwing)",
            description: "The character doubles his total damage when making a successful Shooting or Throwing attack this round.",
            // Wild Card
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Throwing", level: 4},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Mighty Blow",
            description: "The character doubles his total damage when making a successful Fighting attack this round.",
            // Wild Card
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Fighting", level: 4},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Power Surge (Faith)",
            description: "This Edge is for those characters with Arcane Backgrounds. When dealt a Joker, the character recovers 2d6 Power Points. He may not exceed his usual limit.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Faith", level: 4},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Power Surge (Spellcasting)",
            description: "This Edge is for those characters with Arcane Backgrounds. When dealt a Joker, the character recovers 2d6 Power Points. He may not exceed his usual limit.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: "Spellcasting", level: 4},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Power Surge (Weird Science)",
            description: "This Edge is for those characters with Arcane Backgrounds. When dealt a Joker, the character recovers 2d6 Power Points. He may not exceed his usual limit.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: 'Weird Science', level: 4},
            ],
            rank: Rank.Seasoned,
        },
        {
            title: "Followers",
            description: "Heroes often acquire dedicated warbands, “merry men,” or others who voluntarily follow the hero on his adventures. Each time this Edge is chosen, 5 followers join the hero’s band. Casualties are not automatically replaced, so a hero may need to choose this Edge again on occasion to replenish his losses. The followers must have some way to eat and earn income, and generally want a piece of whatever loot, treasure, or other rewards the hero acquires. Otherwise, they are completely dedicated to their idol and risk their lives for him under any normal conditions. In general, they won’t knowingly throw their lives away, but special circumstances or those who have been with the hero for a few years might. The GM determines the followers’ statistics, but in general, use the Soldier archetype presented later in this book. Followers generally come with only basic equipment depending on their particular setting (warriors in fantasy come with at least leather armor and short swords, for example). The hero must purchase any additional equipment for his Followers himself.",
            requirements: [],
            rank: Rank.Legendary,
        },
        {
            title: "Professional",
            description: "The character is an expert at a particular Trait. His Trait becomes d12+1. This Edge may be selected more than once, but it may never be applied to the same Trait twice.",
            // Wild Card
            requirements: [
                // TODO d12 in affected Trait.,
            ],
            rank: Rank.Legendary,
        },
        {
            title: "Expert",
            description: "As above, but the Trait increases to d12+2.",
            requirements: [
                // Professional in affected Trait,
            ],
            rank: Rank.Legendary,
        },
        {
            title: "Master",
            description: "The character’s Wild Die increases to a d10 when rolling a particular Trait of his choice. This Edge may be chosen multiple times, though it only affects a particular Trait once.",
            //Wild Card
            requirements: [
                //Expert in affected Trait.,
            ],
            rank: Rank.Legendary,
        },
        {
            title: "Sidekick",
            description: "A character who triumphs over evil time and time again becomes an inspiration to others. Eventually, one of these young crusaders may attempt to join the hero in his epic quests. The hero gains a Novice Rank sidekick. The sidekick is a Wild Card, gains experience as usual, and has abilities that complement or mimic his hero’s. In general, the player character should control his sidekick just like any other allied character. Of course, the sidekick may occasionally cause trouble (by getting captured, running into danger when he’s not supposed to, etc.). The player should be prepared for his “Edge” to occasionally become a “Hindrance.” If the sidekick dies, he isn’t replaced unless the hero chooses this Edge again.",
            // Wild Card
            requirements: [],
            rank: Rank.Legendary,
        },
        {
            title: "Tough as Nails",
            description: "Your hero is a grizzled veteran. Increase his Toughness by +1.",
            requirements: [],
            rank: Rank.Legendary,
        },
        {
            title: "Improved Tough as Nails",
            description: "Increase your hero’s Toughness by another +1.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: 'Tough as Nails'},
            ],
            rank: Rank.Legendary,
        },
        {
            title: "Weapon Master",
            description: "Increase your hero’s Parry by +1.",
            requirements: [
                {type: SWADE_RequirementType.skill, title: 'Fighting', level: 5},
            ],
            rank: Rank.Legendary,
        },
        {
            title: "Master of Arms",
            description: "Increase your hero’s Parry by another +1.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: 'Weapon Master'},
            ],
            rank: Rank.Legendary,
        },
    ],
    hindrances: [
        {
            title: "All Thumbs",
            description: "Some people just aren’t good with modern devices. Characters with this drawback suffer a -2 penalty to the Repair skill at all times. In addition, when a hero uses a mechanical or electronic device, a roll of 1 on his skill die (regardless of his Wild Die) means the device is broken. The damage usually requires a Repair roll at -2 and 1d6 hours to fix.",
            type: HindranceType.Minor,
        },
        {
            title: "Anemic",
            type: HindranceType.Minor,
            description: "Your hero is particularly susceptible to sickness, disease, environmental effects, and fatigue. He subtracts 2 from all Vigor rolls made to resist Fatigue checks, poison, disease, and the like.",
        },
        {
            title: "Arrogant",
            type: HindranceType.Major,
            description: "Your hero doesn’t think he’s the best—he knows he is. Whatever it is—swordsmanship, kung fu, running—there is no one who can touch his skills and he flaunts it every chance he gets. Winning just isn’t enough for your hero. He must completely dominate his opponent. Anytime there is even a shadow of a doubt as to who is the better, he must humiliate his opponent and prove he can snatch victory any time he wishes. He is the kind of man who disarms an opponent in a duel just so he can pick the sword up and hand it back with a smirk. Arrogant heroes always look for the “master” in battle, attacking lesser minions only if they get in the way.",
        },
        {
            title: "Bad Eyes (Minor)",
            type: HindranceType.Minor,
            description: "Your hero’s eyes just aren’t what they used to be. With glasses, there’s no penalty and the Hindrance is only Minor. Should he lose his glasses, generally a 50% chance when he’s wounded, or no chance with a “nerd-strap”, he suffers a -2 penalty to any Trait roll made to shoot or Notice something more than 5”, 10 yards, distant. In low-tech settings where the hero cannot wear glasses, Bad Eyes is a Major Hindrance. He must subtract 2 from Trait rolls made to attack or notice things 5” or more away.",
        },
        {
            title: "Bad Eyes (Major)",
            type: HindranceType.Major,
            description: "Your hero’s eyes just aren’t what they used to be. With glasses, there’s no penalty and the Hindrance is only Minor. Should he lose his glasses, generally a 50% chance when he’s wounded, or no chance with a “nerd-strap”, he suffers a -2 penalty to any Trait roll made to shoot or Notice something more than 5”, 10 yards, distant. In low-tech settings where the hero cannot wear glasses, Bad Eyes is a Major Hindrance. He must subtract 2 from Trait rolls made to attack or notice things 5” or more away.",
        },
        {
            title: "Bad Luck",
            type: HindranceType.Major,
            description: "Your hero is a little less lucky than most. He gets one less benny per game session than normal. A character cannot have both Bad Luck and Good Luck.",
        },
        {
            title: "Big Mouth",
            type: HindranceType.Minor,
            description: "Loose lips sink ships, the saying goes. Your hero’s could drown an armada. Your character can’t keep a secret very well. He reveals plans and gives away things best kept among friends, usually at the worst possible times.",
        },
        {
            title: "Blind",
            type: HindranceType.Major,
            description: "Your hero is completely without sight. He suffers a -6 to all physical tasks that require vision—which is most everything, and -2 to most social tasks as he can’t “read” those he’s interacting with as well as others. On the plus side, Blind characters gain their choice of a free Edge to compensate for this particularly deadly Hindrance.",
        },
        {
            title: "Bloodthirsty",
            type: HindranceType.Major,
            description: "Your hero never takes prisoners unless under the direct supervision of a superior. This can cause major problems in a military campaign unless your superiors condone that sort of thing. Your hero suffers -4 to his Charisma, but only if his cruel habits are known.",
        },
        {
            title: "Cautious",
            type: HindranceType.Minor,
            description: "Some folks gather too much intelligence. This character personifies over-cautiousness. He never makes rash decisions and likes to plot things out in detail long before any action is taken.",
        },
        {
            title: "Clueless",
            type: HindranceType.Major,
            description: "Your hero isn’t as aware of his world as most others. He suffers -2 to Common Knowledge rolls.",
        },
        {
            title: "Code of Honor",
            type: HindranceType.Major,
            description: "Honor is very important to your character. He keeps his word, won’t abuse or kill prisoners, and generally tries to operate within his world’s particular notion of proper gentlemanly or ladylike behavior.",
        },
        {
            title: "Curious",
            type: HindranceType.Major,
            description: "It killed the cat, and it might kill your hero as well. Curious characters are easily dragged into any adventure. They have to check out everything and always want to know what’s behind a potential mystery.", 
        },
        {
            title: "Death Wish",
            type: HindranceType.Minor,
            description: "Having a death wish doesn’t mean your hero is suicidal—but he does want to die after completing some important goal. Maybe he wants revenge for the murder of his family, or maybe he’s dying from disease and wants to go out in a blaze of glory. He won’t throw his life away for no reason, but when there’s a chance to complete his goal, he’ll do anything—and take any risk—to achieve it. This Hindrance is usually Minor unless the goal is relatively easily fulfilled very rare.",
        },
        {
            title: "Delusional (Minor)",
            type: HindranceType.Major,
            description: "Your hero believes something that is considered quite strange by everyone else. Minor Delusions are harmless or the character generally keeps it to himself, the government puts sedatives in soft drinks, dogs can talk, we’re all just characters in some bizarre game, etc. With a Major Delusion, he expresses his view on the situation frequently and it can occasionally lead to danger,the government is run by aliens, hospitals are deadly, I’m allergic to armor, zombies are my friends.",
        },
        {
            title: "Delusional (Major)",
            type: HindranceType.Major,
            description: "Your hero believes something that is considered quite strange by everyone else. Minor Delusions are harmless or the character generally keeps it to himself, the government puts sedatives in soft drinks, dogs can talk, we’re all just characters in some bizarre game, etc. With a Major Delusion, he expresses his view on the situation frequently and it can occasionally lead to danger,the government is run by aliens, hospitals are deadly, I’m allergic to armor, zombies are my friends.",
        },
        {
            title: "Doubting Thomas",
            type: HindranceType.Minor,
            description: "Some people don’t believe in the supernatural until they’re halfway down some creature’s gullet. Doubting Thomases are skeptics who try their best to rationalize supernatural events. Even once a Doubting Thomas realizes the supernatural exists, he still tries to rationalize weird events, following red herrings or ignoring evidence. Doubting Thomases suffer -2 to their Guts checks when confronted with undeniable supernatural horror.", 
        },
        {
            title: "Elderly",
            type: HindranceType.Major,
            description: "Your hero is getting on in years, but he’s not quite ready for the nursing home. His Pace is reduced by 1, and his Strength and Vigor drop a die type to a minimum of d4, and cannot be raised thereafter. On the plus side, the wisdom of his years grants the hero 5 extra skill points that may be used for any skills linked to Smarts.",
        },
        {
            title: "Enemy (Minor)",
            type: HindranceType.Minor,
            description: "Someone out there hates your hero and wants him dead. The value of the Hindrance depends on how powerful the enemy is and how often he might show up. A Minor Enemy might be a lone gunslinger out for vengeance. A Major Enemy might be a supernatural gunslinger with a hate-on for your hero. If the enemy is one day defeated, the GM should gradually work in a replacement, or the hero may buy off the Hindrance by sacrifi cing a leveling opportunity.",
        },
        {
            title: "Enemy (Major)",
            type: HindranceType.Major,
            description: "Someone out there hates your hero and wants him dead. The value of the Hindrance depends on how powerful the enemy is and how often he might show up. A Minor Enemy might be a lone gunslinger out for vengeance. A Major Enemy might be a supernatural gunslinger with a hate-on for your hero. If the enemy is one day defeated, the GM should gradually work in a replacement, or the hero may buy off the Hindrance by sacrifi cing a leveling opportunity.",
        },
        {
            title: "Greedy (Minor)",
            type: HindranceType.Minor,
            description: "Your miserly hero measures his worth in treasure. If a Minor Hindrance, he argues bitterly over any loot acquired during play. If a Major Hindrance, he fi ghts over anything he considers unfair, and may even kill for his “fair share.”",
        },
        {
            title: "Greedy (Major)",
            type: HindranceType.Major,
            description: "Your miserly hero measures his worth in treasure. If a Minor Hindrance, he argues bitterly over any loot acquired during play. If a Major Hindrance, he fi ghts over anything he considers unfair, and may even kill for his “fair share.”",
        },
        {
            title: "Habit (Minor)",
            type: HindranceType.Minor,
            description: "Your warrior has an annoying and constant habit of some sort. Maybe she picks her nose, says “y’know” in every sentence, or chews gum like it’s going out of style. A Minor Habit irritates those around her but isn’t dangerous. Your hero suffers a -1 Charisma. A Major Habit is a physical or mental addiction of some sort that is debilitating or possibly even deadly. This includes drug use, chronic drinking, or perhaps even an addiction to virtual reality in a high-tech setting. A character who doesn’t get his fi x must make a Fatigue check every 24 hours thereafter, see Fatigue. The first failed roll makes the character Fatigued, then Exhausted. The final result is a coma for hard drug use, or a bad case of the shakes for things like alcohol or VR. Medical care may ease the symptoms. Otherwise the victim must live with the penalties for 1d6 days. Afterwards, the hero must buy off the Hindrance by sacrificing an opportunity to level up, or he eventually falls back into his dependency.", 
        },
        {
            title: "Habit (Major)",
            type: HindranceType.Major,
            description: "Your warrior has an annoying and constant habit of some sort. Maybe she picks her nose, says “y’know” in every sentence, or chews gum like it’s going out of style. A Minor Habit irritates those around her but isn’t dangerous. Your hero suffers a -1 Charisma. A Major Habit is a physical or mental addiction of some sort that is debilitating or possibly even deadly. This includes drug use, chronic drinking, or perhaps even an addiction to virtual reality in a high-tech setting. A character who doesn’t get his fi x must make a Fatigue check every 24 hours thereafter, see Fatigue. The first failed roll makes the character Fatigued, then Exhausted. The final result is a coma for hard drug use, or a bad case of the shakes for things like alcohol or VR. Medical care may ease the symptoms. Otherwise the victim must live with the penalties for 1d6 days. Afterwards, the hero must buy off the Hindrance by sacrificing an opportunity to level up, or he eventually falls back into his dependency.", 
        },
        {
            title: "Hard of Hearing (Minor)",
            type: HindranceType.Minor,
            description: "Characters who have lost some or all of their hearing have this disadvantage. As a Minor Hindrance, it subtracts 2 from all Notice rolls made to hear, including awaking due to loud noises. A Major Hindrance means the character is deaf. She cannot hear and automatically fails all Notice rolls that depend on hearing. 17",
        },
        {
            title: "Hard of Hearing (Major)",
            type: HindranceType.Major,
            description: "Characters who have lost some or all of their hearing have this disadvantage. As a Minor Hindrance, it subtracts 2 from all Notice rolls made to hear, including awaking due to loud noises. A Major Hindrance means the character is deaf. She cannot hear and automatically fails all Notice rolls that depend on hearing. 17",
        },
        {
            title: "Heroic",
            type: HindranceType.Major,
            description: "Your hero never says no to a person in need. She doesn’t have to be happy about it, but she always comes to the rescue of those she feels can’t help themselves. She’s the first one to run into a burning building, usually agrees to hunt monsters for little or no pay, and is generally a pushover for a sob story.",
        },
        {
            title: "Illiterate",
            type: HindranceType.Minor,
            description: "Your hero cannot read. He can probably sign his name and knows what a STOP sign says, but can do little else. He also doesn’t know much about math either. He can probably do 2+2=4, but multiplication and the like are beyond him. Illiterates can’t read or write in any language, by the way, no matter how many they actually speak.",
        },
        {
            title: "Lame",
            type: HindranceType.Major,
            description: "A past wound has nearly crippled your hero. His basic Pace is reduced by 2 and he rolls only a d4 for running rolls. A character’s Pace may never be reduced below 1.",
        },
        {
            title: "Loyal",
            type: HindranceType.Minor,
            description: "Your character may not be a hero, but he’d give his life for his friends. This character can never leave a man behind if there’s any chance at all he could help.",
        },
        {
            title: "Mean",
            type: HindranceType.Minor,
            description: "Your hero is ill-tempered and disagreeable. No one really likes him, and he has trouble doing anything kind for anyone else. He must be paid for his troubles and doesn’t even accept awards graciously. Your hero suffers -2 to his Charisma.",
        },
        {
            title: "Obese",
            type: HindranceType.Minor,
            description: "Particularly large people often have great difficulty in dangerous physical situations. Those who carry their weight well have the Brawny Edge. Those who don’t handle it very well are Obese. A character cannot be both Brawny and Obese. An Obese hero adds 1 to his Toughness, but his Pace is decreased by 1 and his running die is a d4. Obese characters may also have difficulty finding armor or clothing that fits, fitting into tight spaces, or even riding in confined spaces such as coach airplane seats or compact cars.",
        },
        {
            title: "One Arm",
            type: HindranceType.Major,
            description: "Whether by birth or battle, your hero has lost an arm. Fortunately, his other arm is ,now, his “good” one. Tasks that require two hands, such as Climbing, suffer a -4 modifier.",
        },
        {
            title: "One Eye",
            type: HindranceType.Major,
            description: "Your hero has had an eye gouged out by some nefarious villain in his past. If he doesn’t wear a patch or buy a glass replacement ,typically $500, he suffers -1 to his Charisma for the grotesque wound. He suffers -2 to any Trait rolls that require depth perception, such as Shooting or Throwing, jumping from one mast to another, and so on.",
        },
        {
            title: "One Leg",
            type: HindranceType.Major,
            description: "With a peg, One Leg acts exactly like the Lame Hindrance, reducing Pace by 2 and running rolls are now a d4. Without a peg, the character’s Pace is 2 and he can never run. He also suffers -2 to Traits that require mobility, such as Climbing and Fighting. A character with one leg also suffers a -2 penalty to his Swimming skill and Pace.",
        },
        {
            title: "Outsider",
            type: HindranceType.Minor,
            description: "In a society made up of only a few types of people, your hero isn’t one of them. An Indian in a Western town, an alien in a sci-fi game of human marines, or an orc in a party of elves, dwarves, and humans are all examples of outsiders. These people are also likely to raise prices on the Outsider, ignore pleas for help, and generally treat him as if he’s of a lower class than the rest of their society. In addition to the roleplaying effects above, your hero’s Charisma suffers a -2 modifi er among all but his own people.",
        },
        {
            title: "Overconfident",
            type: HindranceType.Major,
            description: "There’s nothing out there your hero can’t defeat. At least that’s what he thinks. He believes he can do most anything and never wants to retreat from a challenge. He’s not suicidal, but he certainly takes on more than common sense dictates.",
        },
        {
            title: "Pacifist (Minor)",
            type: HindranceType.Minor,
            description: "Your hero absolutely despises violence . Minor pacifism means he only fights when given no other choice, and never allows the killing of prisoners or other defenseless victims. Major Pacifists won’t fight living characters under any circumstances. They may defend themselves, but won’t do anything to permanently harm sentient, living creatures. Note that undeniably evil creatures, undead, demons and the like, are fair game, however. A Major Pacifist might also fight with nonlethal methods, such as with his fists. Such characters only do so when obviously threatened, however.",
        },
        {
            title: "Pacifist (Major)",
            type: HindranceType.Major,
            description: "Your hero absolutely despises violence . Minor pacifism means he only fights when given no other choice, and never allows the killing of prisoners or other defenseless victims. Major Pacifists won’t fight living characters under any circumstances. They may defend themselves, but won’t do anything to permanently harm sentient, living creatures. Note that undeniably evil creatures, undead, demons and the like, are fair game, however. A Major Pacifist might also fight with nonlethal methods, such as with his fists. Such characters only do so when obviously threatened, however.",
        },
        {
            title: "Phobia (Minor)",
            type: HindranceType.Minor,
            description: "Phobias are overwhelming and irrational fears that stay with a hero for the rest of his life. Whenever a character is in the presence of his phobia, he subtracts 2 from all his Trait tests as a Minor Hindrance, and 4 if the fear is a Major Phobia. Phobias shouldn’t be too obvious— everyone should be afraid of vampires, for example, so it’s not a phobia—it’s common sense. Instead, the phobia usually centers on some random element the mind focused on during whatever encounter caused such a fright. Remember, phobias are irrational fears.",
        },
        {
            title: "Phobia (Major)",
            type: HindranceType.Major,
            description: "Phobias are overwhelming and irrational fears that stay with a hero for the rest of his life. Whenever a character is in the presence of his phobia, he subtracts 2 from all his Trait tests as a Minor Hindrance, and 4 if the fear is a Major Phobia. Phobias shouldn’t be too obvious— everyone should be afraid of vampires, for example, so it’s not a phobia—it’s common sense. Instead, the phobia usually centers on some random element the mind focused on during whatever encounter caused such a fright. Remember, phobias are irrational fears.",
        },
        {
            title: "Poverty",
            type: HindranceType.Minor,
            description: "It’s said a fool and his money are soon parted. Your hero is that fool. He starts with half the usual money for your setting and just can’t seem to hang onto funds acquired after play. In general, the player should halve his total funds every game week or so.",
        },
        {
            title: "Quirk",
            type: HindranceType.Minor,
            description: "Your hero has some minor foible that is usually humorous, but can occasionally cause him trouble . A swashbuckler may always try to first slash his initials on his foes before attacking, a dwarf may brag constantly about his culture, or a snobby debutante might not eat, drink, or socialize with the lower class.",
        },
        {
            title: "Small",
            type: HindranceType.Major,
            description: "Your character is either very skinny, very short, or both relative to his particular race. Subtract 1 from your hero’s Toughness for his reduced stature.",
        },
        {
            title: "Stubborn",
            type: HindranceType.Minor,
            description: "Your hero always wants his way and never admits he’s wrong. Even when it’s painfully obvious he’s made a mistake, he tries to justify it with half-truths and rationalizations. never that is usually",
        },
        {
            title: "Ugly",
            type: HindranceType.Minor,
            description: "Your hero hit more than a few ugly sticks on his way down the tree of life. His Charisma is lowered by 2, and he is generally shunned by members of the opposite sex.",
        },
        {
            title: "Vengeful (Minor)",
            type: HindranceType.Minor,
            description: "Your character always attempts to right a wrong he feels was done to him. If this is a Minor Hindrance, he usually seeks vengeance legally. If this is a Major Hindrance, he’ll kill to see it done.",
        },
        {
            title: "Vengeful (Major)",
            type: HindranceType.Major,
            description: "Your character always attempts to right a wrong he feels was done to him. If this is a Minor Hindrance, he usually seeks vengeance legally. If this is a Major Hindrance, he’ll kill to see it done.",
        },
        {
            title: "Vow (Minor)",
            type: HindranceType.Minor,
            description: "The character has a vow of some sort. Whether it’s Major or Minor depends on the Vow itself. Some may have Vows to particular orders or causes, to the Hippocratic Oath, to rid the world of evil, and so on. The danger in fulfi lling the Vow and how often it might come into play determines the level of the Hindrance. Whatever the Vow, it’s only a Hindrance if it actually comes into play from time to time and causes the character some discomfort.",
        },
        {
            title: "Vow (Major)",
            type: HindranceType.Major,
            description: "The character has a vow of some sort. Whether it’s Major or Minor depends on the Vow itself. Some may have Vows to particular orders or causes, to the Hippocratic Oath, to rid the world of evil, and so on. The danger in fulfi lling the Vow and how often it might come into play determines the level of the Hindrance. Whatever the Vow, it’s only a Hindrance if it actually comes into play from time to time and causes the character some discomfort.",
        },
        {
            title: "Wanted (Minor)",
            type: HindranceType.Minor,
            description: "Your hero has committed some crime in his past and will be arrested if discovered by the authorities. This assumes the setting actually has laws and police officers to enforce them. The level of the Hindrance depends on how serious the crime was. A hero with numerous unpaid parking tickets ,in a game where he might have to drive occasionally, has a Minor Hindrance, as does someone wanted for more serious crimes away from the main campaign area. Being accused of murder is a Major Hindrance in almost any setting.",
        },
        {
            title: "Wanted (Major)",
            type: HindranceType.Major,
            description: "Your hero has committed some crime in his past and will be arrested if discovered by the authorities. This assumes the setting actually has laws and police officers to enforce them. The level of the Hindrance depends on how serious the crime was. A hero with numerous unpaid parking tickets ,in a game where he might have to drive occasionally, has a Minor Hindrance, as does someone wanted for more serious crimes away from the main campaign area. Being accused of murder is a Major Hindrance in almost any setting.",
        },
        {
            title: "Yellow",
            type: HindranceType.Major,
            description: "Not everyone has ice water in his veins. Your hero is squeamish at the sight of blood and gore and terrifi ed of coming to harm. He subtracts 2 from all of his Guts checks.",
        },
        {
            title: "Young",
            type: HindranceType.Major,
            description: "Children are sometimes forced to go on dangerous adventures through unfortunate circumstances. Think carefully before choosing this Hindrance, for your character starts at a signifi cant disadvantage. Young heroes are generally 8-12 years old ,in human years—you must adjust this for races with different aging paradigms,. They have only 3 points to adjust their attributes and 10 skill points. On the plus side, youths like these have a fair amount of luck. They draw one extra benny at the beginning of each game session. This is in addition to any additional bennies gained from such things as the Luck or Great Luck Edges. If the character should live long enough to mature, the Hindrance doesn’t have to be bought off, he’s already paid the price for the Hindrance by starting at a disadvantage. He stops getting the extra benny when he reaches 18 years of age however ,or the age of adulthood in your particular setting.",
        },
    ],
    skills: [
        {
            title: "Spellcasting",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Starting Power Points: 10\nStarting Powers: 3\nMagicians range from powerful wizards to vile cultists. They draw on raw supernatural energy to fuel their eldritch fires. This energy often infuses the worlds in which they live, and is drawn forth with elaborate rituals, words of power, runes, or perhaps even dark sacrifi ces. Wizards are often quite weak early in their careers, but are forces to be reckoned with as they become powerful sorcerers.\n• Backlash: When a wizard rolls a 1 on his Spellcasting die (regardless of his Wild Die), he is automatically Shaken. This can cause a wound",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Arcane Background"},
            ],
        },
        {
            title: "Faith",
            base: BaseAttribute.Spirit,
            rank: Rank.Novice,
            description: "Starting Power Points: 10\nStarting Powers: 2\n Those who draw on miracles are priestly types or holy champions. Their power comes from a divine presence of some sort, including gods, nature, or spirits. Their powers are usually invoked with a few words of prayer or by performing established rituals. Protector: Those who cast miracles are champions of their particular religions. Good priests vow to protect the innocent, fi ght evil, and obey all other tenets of their particular religion. Evil priests typically vow to defeat those who oppose their religion, or simply to cause as much misery and strife as possible. The player and Game Master should come up with a simple list of what is important to the character’s religion and use this as a guide. Champions who violate their beliefs are temporarily or permanently forsaken by their chosen deity. Minor sins give the character a -2 to his Faith rolls for one week. Major sins rob him of all arcane powers for one week. Mortal sins cause the character to be forsaken until the penitent hero completes some great quest or task of atonement to regain his lost powers.",
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Arcane Background"},
            ],
        },
        {
            title: "Psionics",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Starting Power Points: 10\n Starting Powers: 3\n Psionicists have discovered how to tap into their own psychic powers. They can manipulate matter, create fire, or control their own bodies with but a thought. • Brainburn: When a psionic character rolls a 1 on his Psionics die (regardless of his Wild Die), he is automatically Shaken. On a critical failure, the character lets out a psychic scream that causes him to be Shaken along with all allies in a Large Burst Template who fail a Spirit roll. This can cause a wound", 
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Arcane Background"},
            ],
        },
        {
            title: "Weird Science",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Starting Power Points: 10 (but see below)\n Starting Powers: 1\n Weird Science is the creation of strange and powerful devices. It differs from regular science in that some element of the arcane is involved. Maybe it’s just generic “super-science,” or perhaps it’s divinely (or demonically) inspired. Maybe the science itself is relatively sound, but it derives power from an arcane source, such as ghost rock in Deadlands, or some other magical mineral or essence in a steampunk fantasy game. Weird Science is also different in that each new power is actually a new “gizmo.” The player must write down exactly what the device is when he gains the power. An inventor with the invisibility power, for instance, actually has an invisibility belt, cloak, etc. Players are encouraged to give their devices pseudo-scientific names as well (“Dr. Zee’s chromatic disfibulating device!”). Each device comes with its own Power Points equal to the inventor’s Power Points. An inventor with the bolt power and 10 Power Points, for example, could make a ray gun that fires electrical beams. The gun has 10 Power Points it can use to fire the beams just like a wizard would cast the bolt spell. Malfunction: Weird science devices are never perfect technology. They often suffer from frequent, spectacular, and deadly malfunctions. If a gadgeteer uses a device and rolls a 1 on his skill die (regardless of his Wild Die), it has malfunctioned in some way. The gadgeteer may not use that power again until it’s repaired, which requires a Repair roll and 2d6 hours worth of work.", 
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Arcane Background"},
            ],
        },
        {
            title: "Super Powers",
            base: BaseAttribute.None,
            rank: Rank.Novice,
            description: "Starting Power Points: 20\n Starting Powers: 1\n Characters with super powers gain their abilities through strange circumstances, such as being bitten by irradiated creatures, exposure to strange chemicals, or perhaps by finding alien artifacts. This particular level of power is intended for relatively low-level “pulp” heroes. More powerful super types are dealt with in specific Savage Settings. Super powers work a little differently from most other Arcane Backgrounds—each power is its own skill and has no linked attribute. A hero with the armor and bolt powers, for example, also has an Armor and a Bolt skill he uses to enable it. That means it’s more expensive for a character to improve his powers, but he starts with more Power Points than other arcane types so that he can use his abilities more often. Best of all, there are no drawbacks for super powers as there are with other types of arcane powers—the power either works or it doesn’t", 
            requirements: [
                {type: SWADE_RequirementType.edge, title: "Arcane Background"},
            ],
        },
        {
            title: "Boating",
            base: BaseAttribute.Agility,
            rank: Rank.Novice,
            description: "Characters with this skill can handle most any boat common to their setting. They generally know how to handle most common tasks associated with their vessels as well (tying knots, simple engine repair, etc).",
            requirements: [],
        },
        {
            title: "Climbing",
            base: BaseAttribute.Strength,
            rank: Rank.Novice,
            description: " This is the skill characters use to ascend walls, trees, or cliff-sides. No roll is usually needed to ascend ladders, ropes, or trees with lots of limbs unless the GM feels there’s a good reason (being chased, wounded, etc).\n Those who have high Climbing skill are those who frequently climb cliffs, walls, and other diffi cult surfaces. Characters about to ascend a difficult surface must make a Climbing roll every 10” (20 yards). The skill roll is modified by the conditions below.\n During combat, characters ascend at half their Strength per round if using ropes or with decent hand- or footholds. See the Falling rules should a character suffer a mishap.\n Climbing Modifiers:\n\tSituation\tModifier\n\tClimbing equipment\t+2\n\tAdvanced climbing equipment\t+4\n\tScarce or thin handholds\t-2\n\tWet surface\t-2",
            requirements: [],
        },
        {
            title: "Driving",
            base: BaseAttribute.Agility,
            rank: Rank.Novice,
            description: "Driving allows your hero to drive ground and hover vehicles common to his setting.",
            requirements: [],
        },
        {
            title: "Fighting",
            base: BaseAttribute.Agility,
            rank: Rank.Novice,
            description: "Fighting covers all hand-to-hand (melee) attacks. The TN to hit an opponent is his Parry (2 plus half his Fighting).",
            requirements: [],
        },
        {
            title: "Gambling",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Gambling is useful in many settings, from the saloons of the Old West to the barracks of most armies. Here’s a quick way to simulate about a half-hour of gambling without having to roll for every single toss of the dice or hand of cards.\n\n First have everyone agree on the stakes. Five dollars, 5 gold coins, etc., is recommended for a typical game. Now have everyone in the game make a Gambling roll. The lowest total pays the highest total the difference times the stake. The next lowest pays the second highest the difference times the stake, and so on. If there’s an odd man left in the middle, he breaks even.\n\nCheating: A character who cheats adds +2 to his roll. The GM may raise or lower this modifier depending on the particulars of the game or the method of cheating. If the player ever rolls a 1 on his skill die (regardless of his Wild Die), he’s caught. The consequences of this depend on the setting, but are usually quite harsh.",
            requirements: [],
        },
        {
            title: "Guts",
            base: BaseAttribute.Spirit,
            rank: Rank.Novice,
            description: "Guts reflects a hero’s bravery. Characters are often called on to make Guts checks when they witness grisly scenes or encounter particularly horrific monsters. The GM should see the Fear table for the effects of failure.",
            requirements: [],
        },
        {
            title: "Healing",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Healing is the art of stopping wounds and treating existing injuries. See the Healing rules for specific information.",
            requirements: [],
        },
        {
            title: "Intimidation",
            base: BaseAttribute.Spirit,
            rank: Rank.Novice,
            description: "Intimidation is the art of frightening an opponent with sheer force of will, veiled or overt threats, or sometimes just really big guns. This is an opposed roll between the hero’s Intimidation and his opponent’s Spirit. See Tests of Will for the game effects.",
            requirements: [],
        },
        {
            title: "Investigation",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "A character skilled in Investigation knows how to make good use of libraries, newspaper morgues, the internet, or other written sources of information. To get information from people rather than books and computers, use the Streetwise skill.",
            requirements: [],
        },
        {
            title: "Knowledge",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Knowledge is a catch-all skill that must have a focus of some sort, such as Knowledge (Occult) or Knowledge (Science). The player can choose the focus of his character’s knowledge, which should reflect his background and education. An archaeologist, for example, should have Knowledge (History) and Knowledge (Archaeology). The skill can be taken multiple times with different focuses to refl ect different areas of expertise. General focuses such as Science are acceptable, but the GM should give a bonus to a character who has a more relevant focus, such as Knowledge (Biology). Some suggested Knowledge focuses are: Area Knowledge, Battle (used in Mass Combats), Computers, Electronics, History, Journalism, various languages, Law, Medicine (though actually caring for someone is the Healing skill), Science, or Tactics.",
            requirements: [],
        },
        {
            title: "Lockpicking",
            base: BaseAttribute.Agility,
            rank: Rank.Novice,
            description: "Lockpicking is the ability to bypass mechanical and electronic locks. Lockpicking is also be used to disarm the catches and triggers on traps, unless a more relevant skill seems appropriate for a particular trap.",
            requirements: [],
        },
        {
            title: "Notice",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Notice is a hero’s general alertness and ability to search for items or clues. This covers hearing rolls, detecting ambushes, spotting hidden weapons and even scrutinizing other characters to see if they’re lying, frightened, and so on.",
            requirements: [],
        },
        {
            title: "Persuasion",
            base: BaseAttribute.Spirit,
            rank: Rank.Novice,
            description: "Persuasion is the ability to talk or trick others into doing what you want. Nonplayer characters start at one of five different attitudes: Hostile, Uncooperative, Neutral, Friendly, or Helpful. A successful Persuasion roll improves the NPC’s attitude one step, or two with a raise. Failure, on the other hand, decreases the character’s attitude by a step, or two if a 1 is rolled on the Persuasion die (regardless of the Wild Die). Persuasion is always modified by a character’s Charisma. The GM has more detailed information on nonplayer characters and their reactions.",
            requirements: [],
        },
        {
            title: "Persuasion",
            base: BaseAttribute.Agility,
            rank: Rank.Novice,
            description: "Piloting allows a character to fl y airplanes, helicopters, jet packs, and any other fl ying devices common to his setting.",
            requirements: [],
        },
        {
            title: "Repair",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Repair is the ability to fix gadgets, vehicles, weapons, and other machines. Characters suffer a -2 penalty to their rolls if they don’t have access to basic tools.",
            requirements: [],
        },
        {
            title: "Riding",
            base: BaseAttribute.Agility, 
            rank: Rank.Novice,
            description: "Riding allows you to mount, control, and ride any beast common to your setting. Players should note that mounted characters use the lowest of their Fighting or Riding skills when fi ghting from horseback.",
            requirements: [],
        },
        {
            title: "Shooting",
            base: BaseAttribute.Agility, 
            rank: Rank.Novice,
            description: "Shooting covers all attempts to hit a target with a ranged weapon such as a bow, pistol, or rocket launcher. The basic Target Number to hit is 4 as usual, though there are a number of important modifiers such as range that frequently come into play.",
            requirements: [],
        },
        {
            title: "Stealth",
            base: BaseAttribute.Agility,
            rank: Rank.Novice,
            description: "Stealth is the ability to both hide and move quietly, as well as palm objects and pick pockets. In many Savage Worlds games, knowing exactly when your hero has been spotted and when he’s not can be critical. Here are detailed rules for how to sneak up on foes and infi ltrate enemy lines. Start by fi guring out if the “guards” your heroes are sneaking up on are “active” or “inactive.” Inactive guards aren’t paying particularly close attention to their surroundings. The group need only score a standard success on their individual Stealth rolls to avoid being seen. Failing a Stealth roll in the presence of inactive guards makes them active. Active guards make opposed Notice rolls against the sneaking characters’ Stealth skills. Failing a roll against active guards means the sneaking character is spotted. Apply the following modifi ers to all Stealth rolls.\nStealth Modifiers:\n\tSituation\tModifier\nCrawling\t+2\n\tRunning\t-2\n\tDim light\t+1\n\tDarkness\t+2\n\tPitch darkness\t+4\n\tLight cover\t+1\n\tMedium cover\t+2\n\tHeavy cover\t+4\nThe Last Step: Sneaking to within 5” of a foe (usually to get close enough for a melee attack) requires an opposed Stealth roll versus the target’s Notice, whether the guard is active or inactive.\n Movement Rate: Outside of combat, each Stealth roll covers moving up to five times the character’s Pace. In combat, the Stealth roll covers only a single round of movement.\nStealth for Groups: Out of combat, make only one Stealth roll for each like group of characters (a group roll). Use the lowest movement rate to determine how much ground is covered as well. The observers also make a group roll to Notice their foes.\n Once a combat breaks down into rounds, Stealth and Notice rolls are made on an individual basis.",
            requirements: [],
        },
        {
            title: "Streetwise",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Streetwise characters are able to gather information from the street, saloons, or other contacts through bribes, threats, or carousing. Finding written information in libraries and the like is covered by the Investigation skill. Streetwise is always modified by a character’s Charisma modifier.",
            requirements: [],
        },
        {
            title: "Survival",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Survival allows a character to find food, water, or shelter in hostile environments. A character may only make one roll per day. A successful roll finds sustenance for one person, a raise on the roll finds food and water for fi ve adults. Horses and other large beasts count as two adults. Children, camels or others with small appetites count as half. Those who benefit from the roll do not have to make Fatigue rolls for the day for food, water, or shelter.",
            requirements: [],
        },
        {
            title: "Swimming",
            base: BaseAttribute.Agility,
            rank: Rank.Novice,
            description: "Swimming determines if a character fl oats or sinks in water, as well as how fast he can move within it. A character’s Pace is half his Swimming skill in inches per turn in normal water round up. Choppy water counts as rough terrain and halves this rate. Characters may not “run” while swimming for extra movement. Should it become important, characters can hold their breath for 5 x their Vigor in seconds, or half that if they weren’t prepared.",
            requirements: [],
        },
        {
            title: "Taunt",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Taunt is a test of will attack against a person’s pride through ridicule, cruel jokes, or one-upmanship. This is an opposed roll against the target’s Smarts. See Test of Wills for the effects of a successful Taunt.",
            requirements: [],
        },
        {
            title: "Throwing",
            base: BaseAttribute.Agility,
            rank: Rank.Novice,
            description: "Throwing governs all sorts of thrown weapons, from hand grenades to knives, axes, and spears. Throwing works just like the Shooting skill, and uses all the same modifiers.",
            requirements: [],
        },
        {
            title: "Tracking",
            base: BaseAttribute.Smarts,
            rank: Rank.Novice,
            description: "Tracking allows a character to follow the tracks of one or more individuals in any type of terrain. Each roll generally covers following the tracks for one mile, but the GM may adjust this dramatically for more specific or small scale searches. Apply the modifiers below to each roll.\nTracking Modifiers\n\tSituation\tModifier\n\tTracking more than 5 individuals\t+2\n\tRecent snow\t+4\n\tMud\t+2\n\tDusty area\t+1\n\tRaining\t-4\n\tTracking in poor light\t-2\n\tTracks are more than one day old\t-2\n\tTarget attempted to hide tracs\t-2",
            requirements: [],
        },
    ],
    default: false,
}
