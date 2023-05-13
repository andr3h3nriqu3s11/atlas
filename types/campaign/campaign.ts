import {CampaignType} from '.';

export type Campaign<Type extends CampaignType> = Type extends CampaignType.SWADE ? SWADE_Campaign : BaseCampaign;

interface BaseCampaign {
    id: string;
    title: CampaignType;
    dateCreation: string;
}

export interface SWADE_Campaign extends BaseCampaign {
    characters: unknown[];
    type: CampaignType.SWADE;
};
