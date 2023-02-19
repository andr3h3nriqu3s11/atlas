import {SWADE_CharacterSheet_item,SWADE_CharacterSheet, SWADE_CharacterSheet_Skill, SWADE_CharacterSheet_edge, SWADE_CharacterSheet_hidrances, SWADE_CharacterSheet_Logs, SWADE_Skills_Requirement, SWADE_Skill, SWADE_Edge, SWADE_Edge_requirements} from '@prisma/client'

import {BaseAttribute, CharacterSkill, Rank, SWADE_RequirementType, Skill, SkillRequirement, Edge, EdgeRequirements, CharacterEdge} from '@ref/types/swade';
import {swade_character, SWADE_Campaign, CampaignType} from '@ref/types';
import { prisma } from 'app/app';

export const find_include = {
    skills: {
        include: {
            skill: true
        }
    },
    logs: true,
    edges: {
        include: {
            edge: true
        }
    },
    items: true, 
    hidrances: true
}

export const prisma_export_character = async (id: string) => export_character(await prisma.sWADE_CharacterSheet.findUnique({
    where: { id },
    include: find_include,
}))

export const export_character = (character: SWADE_CharacterSheet & {
    skills: SWADE_ExportableCharacterSkill[];
    edges: SWADE_ExportableCharacterEdge[];
    hidrances: SWADE_CharacterSheet_hidrances[];
    items: SWADE_CharacterSheet_item[];
    logs: SWADE_CharacterSheet_Logs[];
}): swade_character => ({
    id: character.id,
    name: character.name,
    campaign_id: character.campaign_id,
    rank: character.rank as Rank,
    edges: character.edges.map(swade_export_character_edge),
    items: character.items,
    vigor: character.vigor,
    skills: character.skills.map(swade_export_character_skill),
    smarts: character.smarts,
    spirit: character.spirit,
    agility: character.agility,
    strength: character.strength,
    hidrances: character.hidrances,
    atributesPoints: character.attributePoints,
    skillPoints: character.skillPoints
})


export type SWADE_ExportableCharacterSkill = SWADE_CharacterSheet_Skill & { skill: SWADE_Skill }

export const swade_export_character_skill = (skill: SWADE_ExportableCharacterSkill): CharacterSkill<SWADE_Campaign> => ({
    campaignType: CampaignType.SWADE,
    id: skill.skill_id,
    level: skill.level,
    rank: skill.skill.rank as Rank,
    base: skill.skill.base as BaseAttribute,
    title: skill.skill.title
})

export type SWADE_ExportableSkill = SWADE_Skill & {
    requirements:  SWADE_ExportableSkillRequirement[]
};

export const swade_export_skill = (skill: SWADE_ExportableSkill): Skill<SWADE_Campaign> => ({
    campaignType: CampaignType.SWADE,
    title: skill.title,
    base: skill.base as BaseAttribute,
    rank: skill.rank as Rank,
    id: skill.id,
    requirements: skill.requirements.map(swade_export_skill_requirement)
});

export type SWADE_ExportableSkillRequirement = SWADE_Skills_Requirement & {edge?: SWADE_Edge, skill: SWADE_Skill};

export const swade_export_skill_requirement = (skillRequirement: SWADE_ExportableSkillRequirement): SkillRequirement<SWADE_Campaign> => ({
    campaignType: CampaignType.SWADE,
    type: skillRequirement.type as Exclude<SWADE_RequirementType, SWADE_RequirementType.attribute>,
    level: skillRequirement.level,
    target_id: skillRequirement.target_id,
    edge_id: skillRequirement.edge_id,
    skill_id: skillRequirement.skill_id,
    edge_title: skillRequirement.edge?.title,
    skill_title: skillRequirement.skill?.title,
});

//
// Edges
//

export type SWADE_ExportableCharacterEdge = SWADE_CharacterSheet_edge & { edge: SWADE_Edge }

export const swade_export_character_edge = (edge: SWADE_ExportableCharacterEdge): CharacterEdge => ({
    description: edge.edge.description,
    title: edge.edge.title,
    rank: edge.edge.rank as Rank,
    id: edge.id
})

export type SWADE_ExportableEdge = SWADE_Edge & {
    requirements:  SWADE_ExportableSkillRequirement[]
};

export const swade_export_edge = (edge: SWADE_ExportableEdge): Edge => ({
    title: edge.title,
    rank: edge.rank as Rank,
    id: edge.id,
    description: edge.description,
    requirements: edge.requirements.map(swade_export_edge_requirement)
});

export type SWADE_ExportableEdgeRequirement = SWADE_Edge_requirements & {edge?: SWADE_Edge, skill: SWADE_Skill};

export const swade_export_edge_requirement = (edgeRequirement: SWADE_ExportableEdgeRequirement): EdgeRequirements => ({
    type: edgeRequirement.type as SWADE_RequirementType,
    level: edgeRequirement.level,
    id: edgeRequirement.target_id,
    edge_id: edgeRequirement.edge_id,
    skill_id: edgeRequirement.skill_id,
    edge_title: edgeRequirement.edge?.title,
    skill_title: edgeRequirement.skill?.title,
    attribute: edgeRequirement.attribute
});
