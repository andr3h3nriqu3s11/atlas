import { CampaignType, campaign_interaction, CharacterInteraction, Campaign, SWADE_Campaign } from "..";

export type CharacterNote<T extends Campaign<CampaignType>> =  
    T extends SWADE_Campaign ? 
        swade_character_note : 
        never;

export interface swade_character_note {
    character_id: string;
    creator_id: string;
    id: string;
    note: string;
    visisble: boolean;
}

export interface CreateCharacterNote extends CharacterInteraction {
    note: string;
    visible?: boolean;
}

export interface DeleteCharacterNote extends campaign_interaction {
    id: string,
}

export interface ChangeCharacterNote extends campaign_interaction {
    id: string;
    note?: string;
    visible?: boolean;
}

