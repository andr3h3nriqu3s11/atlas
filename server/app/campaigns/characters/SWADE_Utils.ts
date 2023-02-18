import {SWADE_CharacterSheet_item,SWADE_CharacterSheet, SWADE_CharacterSheet_Skill, SWADE_CharacterSheet_edge, SWADE_CharacterSheet_hidrances, SWADE_CharacterSheet_Logs, SWADE_Skills_Requirement, SWADE_Skill, SWADE_Edge} from '@prisma/client'

import {BaseAttribute, Rank, RequirementType, Skill, SkillRequirement} from '@ref/types/swade';
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

export type ExportableSkill = SWADE_Skill & {
    requirements:  ExportableSkillRequirement[]
};

export const export_skill = (skill: ExportableSkill): Skill => ({
    title: skill.title,
    base: skill.base as BaseAttribute,
    rank: skill.rank as Rank,
    id: skill.id,
    requirements: skill.requirements.map(export_skill_requirement)
});

export type ExportableSkillRequirement = SWADE_Skills_Requirement & {edge?: SWADE_Edge, skill: SWADE_Skill};

export const export_skill_requirement = (skillRequirement: ExportableSkillRequirement): SkillRequirement => ({
    type: skillRequirement.type as RequirementType,
    level: skillRequirement.level,
    target_id: skillRequirement.target_id,
    edge_id: skillRequirement.edge_id,
    skill_id: skillRequirement.skill_id,
    edge_title: skillRequirement.edge?.title,
    skill_title: skillRequirement.skill?.title,
});
