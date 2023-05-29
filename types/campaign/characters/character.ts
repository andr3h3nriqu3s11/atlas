import {Rank, CharacterSkill, CharacterEdge, Hindrance} from '../../swade';
import {Campaign, CampaignType, SWADE_Campaign} from '..';

export interface campaign_interaction {
    campaign_id: string,
}

export interface DeleteCharacterNote extends campaign_interaction {
    id: string,
}

export interface CharacterInteraction extends campaign_interaction {
    character_id: string
}

export interface CreateCharacter extends CharacterInteraction {
    name: string;
    npc?: boolean;
}

export interface CreateCharacterNote extends CharacterInteraction {
    note: string;
    visible?: boolean;
}

export interface ChangeCharacterNote extends campaign_interaction {
    id: string;
    note?: string;
    visible?: boolean;
}

export interface SkillCharacterPair extends CharacterInteraction {
    skill_id: string,
}

export interface AddSkillCharacter extends SkillCharacterPair {
    level: number
}

export type Character<T extends Campaign<CampaignType> = Campaign<CampaignType>> = T extends SWADE_Campaign ? swade_character : character_base<T>;

export interface character_base<Type extends Campaign<CampaignType>> extends campaign_interaction {
    id: string;
    name: string;
    dead: boolean;
    npc: boolean;
    visible: boolean;
    notes: CharacterNote<Type>[];
}

// I kown that this is useless in this scale but it will be usefull later on
export type CharacterBase<T extends Campaign<CampaignType> = Campaign<CampaignType>> = T extends SWADE_Campaign ? character_base<T> : character_base<T>;

export type CharacterNote<T extends Campaign<CampaignType>> =  T extends SWADE_Campaign ? swade_character_note : never;

export interface swade_character_note {
    character_id: string;
    creator_id: string;
    id: string;
    note: string;
    visisble: boolean;
}

export interface swade_character extends character_base<Campaign<CampaignType.SWADE>> {

    // Atributes
    agility: number 
    smarts: number
    spirit: number
    strength: number
    vigor: number

    rank: Rank;

    skillPoints: number;
    atributesPoints: number;
    
    skills: CharacterSkill[]
    edges: CharacterEdge[]
    hindrances: Hindrance[]
    // TODO
    items: any[]
}

export type UpdateCharacter<T extends Campaign<CampaignType> = Campaign<CampaignType>> = T extends SWADE_Campaign ? update_character_swade : update_base;

interface update_base extends campaign_interaction {
    id: string;
}

export interface update_character_swade extends update_base{

    name?: string;

    // Atributes
    agility?: number 
    smarts?: number
    spirit?: number
    strength?: number
    vigor?: number

    rank?: Rank;
}
