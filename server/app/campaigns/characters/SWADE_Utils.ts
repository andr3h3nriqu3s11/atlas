import {SWADE_CharacterSheet_item,SWADE_CharacterSheet, SWADE_CharacterSheet_Skill, SWADE_CharacterSheet_edge, SWADE_CharacterSheet_hindrances, SWADE_CharacterSheet_Logs, SWADE_Skills_Requirement, SWADE_Skill, SWADE_Edge, SWADE_Edge_requirements, SWADE_Hindrances, SWADE_Campaign as prisma_SWADE_Campaign, Campaign as prisma_Campaign, SWADE_CharacterSheet_Note} from '@prisma/client'

import {BaseAttribute, CharacterSkill, Rank, SWADE_RequirementType, Skill, SkillRequirement, Edge, EdgeRequirements, CharacterEdge, Hindrance, HindranceType} from '@ref/types/swade';
import {swade_character, SWADE_Campaign, CampaignType, UserType, CharacterNote, Campaign} from '@ref/types';
import { TokenDBUser, prisma } from 'app/app';

export function swade_export_character_note (note: SWADE_CharacterSheet_Note): CharacterNote<Campaign<CampaignType.SWADE>> {
    return {
        character_id: note.character_id,
        creator_id: note.creator_id,
        visisble: note.visible,
        id: note.id,
        note: note.note
    }
}

export const find_include = (user: TokenDBUser) => ({
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
    hindrances: {
        include: {
            hindrance: true
        }
    },
    campaign: {
        include: {
            campaign: true,
        }
    },
    notes: user.userType === UserType.DM ? {} : {
        where: {
            OR: [
                {visible: true},
                {creator_id: user.id}
            ]
        }
    },
});

export const prisma_export_character = async (id: string, user: TokenDBUser) => export_character(await prisma.sWADE_CharacterSheet.findUnique({
    where: { id },
    include: find_include(user), 
}))

export const export_character = (character: SWADE_CharacterSheet & { campaign: prisma_SWADE_Campaign & { campaign: prisma_Campaign }} & {
    skills: SWADE_ExportableCharacterSkill[];
    edges: SWADE_ExportableCharacterEdge[];
    hindrances: SWADE_ExportableHindrance[];
    items: SWADE_CharacterSheet_item[];
    logs: SWADE_CharacterSheet_Logs[];
    notes: SWADE_CharacterSheet_Note[];
}): swade_character => ({
    id: character.id,
    name: character.name,
    campaign_id: character.campaign.campaign.id,
    dead: character.dead,
    visible: character.visible,
    npc: character.npc,
    rank: character.rank as Rank,
    edges: character.edges.map(swade_export_character_edge),
    items: character.items,
    vigor: character.vigor,
    skills: character.skills.map(swade_export_character_skill),
    smarts: character.smarts,
    spirit: character.spirit,
    agility: character.agility,
    strength: character.strength,
    hindrances: character.hindrances.map(swade_export_character_hindarance),
    atributesPoints: character.attributePoints,
    skillPoints: character.skillPoints,
    notes: character.notes.map(swade_export_character_note),
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
    requirements: skill.requirements.map(swade_export_skill_requirement),
    description: skill.description,
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

//
// Hindrances
//

export type SWADE_ExportableHindrance = SWADE_CharacterSheet_hindrances & { hindrance: SWADE_Hindrances};

export const swade_export_character_hindarance = (hindrance: SWADE_ExportableHindrance): Hindrance => ({
    id: hindrance.hindrance.id,
    title: hindrance.hindrance.title,
    description: hindrance.hindrance.description,
    type: hindrance.hindrance.type as HindranceType,
})

//
// Campaign
//

export const export_swade_campaign = (data: prisma_Campaign & {
    SWADE_Campaign: prisma_SWADE_Campaign & {
        characters: SWADE_CharacterSheet[]
    }
}): SWADE_Campaign => ({
    type: CampaignType.SWADE,
    title: data.title,
    id: data.id,
    dateCreation: data.dateCreated.toISOString(),
    characters: data.SWADE_Campaign.characters.map(export_character)
});
