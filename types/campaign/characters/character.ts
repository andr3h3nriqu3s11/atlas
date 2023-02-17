import {Rank} from '../../swade';
import {Campaign, SWADE_Campaign} from '..';

export interface create_character {
    name: string;
    campaign_id: string;
}

export type Character<T extends Campaign = Campaign> = T extends SWADE_Campaign ? swade_character : character_base;


interface character_base {
    id: string;
    name: string;
    campaign_id: string;
}

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
    
    // TODO
    skills: any[]
    // TODO
    edges: any[]
    // TODO
    hidrances: any[]
    // TODO
    items: any[]
}

export type update_character<T extends Campaign = Campaign> = T extends SWADE_Campaign ? update_character_swade : update_base;

interface update_base {
    id: string;
    campaign_id: string;
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
