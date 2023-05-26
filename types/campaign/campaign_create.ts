import {CampaignType, SWADE_Campaign} from '.';

export interface CreateCampaign<Type extends CampaignType> {
    title: string;
    type: Type;
}

export interface ListCampaign<Type extends CampaignType> {
    type: Type
}

