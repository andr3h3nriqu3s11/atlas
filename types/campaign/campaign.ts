import {CampaignType} from '.';

export type Campaign = SWADE_Campaign;

interface BaseCampaign {
    id: string;
    title: CampaignType;
    dateCreation: string;
}

export interface SWADE_Campaign extends BaseCampaign {
    characters: unknown[];
    type: CampaignType.SWADE;
};
