import { campaign_interaction } from "../../campaign"

export interface create_hindrance {
    title: string
    description: string
}

export interface Hindrance extends create_hindrance {
    id: string
}

export interface update_hindrance extends Partial<Hindrance>{
    id: string
}

export interface hindrance_character_pair extends campaign_interaction {
    character_id: string,
    hindrance_id: string,
}

export interface add_hindrance_character extends hindrance_character_pair {
    level: number
}
