import {BaseAttribute, Rank} from '../index'

export type create_skill = {
    title: string,
    base: BaseAttribute,
    rank: Rank
}

export type create_skill_requirement = {
    id: string,
    level?: number,
} & ({type: RequirementType.edge, edge_id: string} | {type: RequirementType.skill, skill_id: string});

export type remove_skill_requirement = {
    id: string,
} & ({type: RequirementType.edge, edge_id: string} | {type: RequirementType.skill, skill_id: string});

export type update_skill = {
    id: string,
    title?: string,
    base?: BaseAttribute,
    rank?: Rank
}

export interface Skill {
    title: string,
    base: BaseAttribute,
    rank: Rank,
    id: string
    requirements: SkillRequirement[]
}

export enum RequirementType {
    skill = "skill",
    edge = "edge"
}

export type SkillRequirement = {
    target_id: string,
    level?: number
} & ({
    type: RequirementType.edge,
    edge_id: string,
    edge_title: string
} | {
    type: RequirementType.skill,
    skill_id: string,
    skill_title: string
})
