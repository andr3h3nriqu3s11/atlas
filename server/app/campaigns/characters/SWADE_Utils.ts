import {SWADE_CharacterSheet_item,SWADE_CharacterSheet, SWADE_CharacterSheet_Skill, SWADE_CharacterSheet_edge, SWADE_CharacterSheet_hidrances, SWADE_CharacterSheet_Logs} from '@prisma/client'

import {Rank} from '@ref/types/swade';
import {swade_character} from '@ref/types';

export const find_include = {
    skills: true,
    logs: true,
    edges: true,
    items: true, 
    hidrances: true
}

export const export_character = (character: SWADE_CharacterSheet & {
    skills: SWADE_CharacterSheet_Skill[];
    edges: SWADE_CharacterSheet_edge[];
    hidrances: SWADE_CharacterSheet_hidrances[];
    items: SWADE_CharacterSheet_item[];
    logs: SWADE_CharacterSheet_Logs[];
}): swade_character => ({
    id: character.id,
    name: character.name,
    campaign_id: character.campaign_id,
    rank: character.rank as Rank,
    edges: character.edges,
    items: character.items,
    vigor: character.vigor,
    skills: character.skills,
    smarts: character.smarts,
    spirit: character.spirit,
    agility: character.agility,
    strength: character.strength,
    hidrances: character.hidrances,
    atributesPoints: character.attributePoints,
    skillPoints: character.skillPoints
})
