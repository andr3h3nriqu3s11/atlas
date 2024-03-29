import { campaign_interaction } from "../../campaign"

export enum HindranceType {
    Major = "major",
    Minor = "minor",
    Major_Minor = "major_minor",
}

export interface create_hindrance {
    title: string
    description: string
    type: HindranceType
}

export interface Hindrance extends create_hindrance {
    id: string
}

export interface update_hindrance extends Partial<Hindrance>{
    id: string
}

export interface HindranceCharacterPair extends campaign_interaction {
    character_id: string,
    hindrance_id: string,
}

export interface AddHindranceCharacter extends HindranceCharacterPair {
    level?: HindranceType
}
