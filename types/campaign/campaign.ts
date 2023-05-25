import {CampaignType, swade_character} from '.';

export type Campaign<Type extends CampaignType> = Type extends CampaignType.SWADE ? SWADE_Campaign : BaseCampaign;

interface BaseCampaign {
    id: string;
    title: string;
    type: CampaignType;
    dateCreation: string;
}

export interface SWADE_Campaign extends BaseCampaign {
    characters: swade_character[];
    type: CampaignType.SWADE;
};
