import { Campaign, CampaignType, SWADE_Campaign } from '../../campaign';
import {BaseAttribute, Rank } from '../index'

type CampaignT = Campaign<CampaignType>;

export type CreateSkill = {
    type: CampaignType.SWADE
    title: string,
    base: BaseAttribute,
    rank: Rank
} & {
    type: never
}

export type CreateSkillRequirement = 
({
    campaignType:  CampaignType.SWADE
    id: string,
    level?: number,
} & ({type: SWADE_RequirementType.edge, edge_id: string} | {type: SWADE_RequirementType.skill, skill_id: string}));

export type RemoveSkillRequirement = {
    campaignType:  CampaignType.SWADE
    id: string,
} & ({type: SWADE_RequirementType.edge, edge_id: string} | {type: SWADE_RequirementType.skill, skill_id: string});

export type UpdateSkill = {
    campaignType:  CampaignType.SWADE
    id: string,
    title?: string,
    base?: BaseAttribute,
    rank?: Rank
}

export type CharacterSkill<T extends CampaignT = CampaignT> = T extends SWADE_Campaign ? SWADE_CharacterSkill : never;

export interface SWADE_CharacterSkill {
    campaignType: CampaignType.SWADE
    id: string
    title: string,
    base: BaseAttribute,
    rank: Rank,
    level: number,
}

export type Skill<T extends CampaignT = CampaignT> = T extends SWADE_Campaign ? SWADE_Skill : never;

export interface SWADE_Skill {
    campaignType: CampaignType.SWADE
    title: string,
    base: BaseAttribute,
    rank: Rank,
    id: string
    requirements: SkillRequirement<SWADE_Campaign>[]
}

export type SkillRequirement<T extends CampaignT = CampaignT> = T extends SWADE_Campaign ? SWADE_SkillRequirement : never;

export enum SWADE_RequirementType {
    skill = "skill",
    edge = "edge",
    attribute = "attribute"
}

export type SWADE_SkillRequirement = {
    campaignType: CampaignType.SWADE,
    target_id: string,
    level?: number
} & ({
    type: SWADE_RequirementType.edge,
    edge_id: string,
    edge_title: string
} | {
    type: SWADE_RequirementType.skill,
    skill_id: string,

    skill_title: string
})
