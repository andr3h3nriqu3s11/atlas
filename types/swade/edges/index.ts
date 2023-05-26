import { BaseAttribute, Rank, SWADE_RequirementType } from "..";
import { campaign_interaction } from "../../campaign";


export interface CreateEdge {
    title: string;
    rank: Rank;
    description: string;
}

export interface UpdateEdge extends Partial<CreateEdge> {
    id: string;
}

export type CreateEdgeRequirement = 
({
    id: string,
    level?: number,
} & (
    {type: SWADE_RequirementType.edge, edge_id: string} | 
    {type: SWADE_RequirementType.skill, skill_id: string} | 
    {type: SWADE_RequirementType.attribute, attribute: BaseAttribute}
));

export type RemoveEdgeRequirement = {
    id: string,
} & (
    {type: SWADE_RequirementType.edge, edge_id: string} | 
    {type: SWADE_RequirementType.skill, skill_id: string} |
    {type: SWADE_RequirementType.attribute, attribute: string}
);

export interface EdgeCharacterPair extends campaign_interaction {
    character_id: string,
    edge_id: string,
}

export interface AddEdgeCharacter extends EdgeCharacterPair {
    level: number
}

export interface BaseEdge {
    title: string,
    rank: Rank,
    id: string,
    description: string
}

export interface CharacterEdge {
    id: string
    title: string,
    description: string,
    rank: Rank
}

export interface Edge extends BaseEdge {
    requirements: EdgeRequirements[];
}

export type EdgeRequirements = 
    {
        id: string,
    } &
    (
        {
            type: SWADE_RequirementType.attribute,
            attribute: string
            level: number
        } |
        {
            type: SWADE_RequirementType.skill,
            skill_id: string,
            skill_title: string
            level: number
        } |
        {
            type: SWADE_RequirementType.edge,
            edge_id: string,
            edge_title: string
        }
    )
;
