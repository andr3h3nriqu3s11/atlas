import {CampaignType} from '.';

export interface CreateCampaign<Type extends CampaignType> {
    title: string;
    type: Type;
}
