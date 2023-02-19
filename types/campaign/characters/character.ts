import {Rank, CharacterSkill} from '../../swade';
import {Campaign, SWADE_Campaign} from '..';


export interface campaign_interaction {
    campaign_id: string
}

export interface create_character extends campaign_interaction{
    name: string;
}

export interface skill_character_pair extends campaign_interaction {
    character_id: string,
    skill_id: string,
}

export interface add_skill_character extends skill_character_pair {
    level: number
}

export type Character<T extends Campaign = Campaign> = T extends SWADE_Campaign ? swade_character : character_base;

export interface character_base extends campaign_interaction {
    id: string;
    name: string;
}

// I kown that this is useless in this scale but it will be usefull later on
export type CharacterBase<T extends Campaign = Campaign> = T extends SWADE_Campaign ? character_base : character_base;

export interface swade_character extends character_base {

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
    // TODO
    edges: any[]
    // TODO
    hidrances: any[]
    // TODO
    items: any[]
}

export type update_character<T extends Campaign = Campaign> = T extends SWADE_Campaign ? update_character_swade : update_base;

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
