import {Campaign, CampaignType, SWADE_Campaign} from '.';
import { BaseAttribute, CreateEdge, create_hindrance, SWADE_RequirementType, Rank } from '../swade';

export interface CreateCampaign<Type extends CampaignType> {
    title: string;
    type: Type;
}

export interface ListCampaign<Type extends CampaignType> {
    type: Type
}

export type ImportCampaign<Type extends Campaign<CampaignType>> = Type extends SWADE_Campaign ? ({
    campaign_type: CampaignType.SWADE,
    edges: (CreateEdge & {
        requirements: CreateEdgeImportRequirement[],
    })[],
    skills: (ImportSkill & {
        requirements: CreateSkillImportRequirement[],
    })[],
    hindrances: create_hindrance[],
    default?: boolean,
}) : never;

export type CreateEdgeImportRequirement = 
({
    level?: number,
} & (
    {type: SWADE_RequirementType.edge, title: string} | 
    {type: SWADE_RequirementType.skill, title: string} | 
    {type: SWADE_RequirementType.attribute, attribute: BaseAttribute}
));

export type ImportSkill = {
    title: string,
    base: BaseAttribute,
    rank: Rank,
    description: string,
}

export type CreateSkillImportRequirement = {
    level?: number,
    title: string,
    type: SWADE_RequirementType.edge | SWADE_RequirementType.skill
};
