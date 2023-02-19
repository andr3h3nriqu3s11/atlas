export * from './campaign_create';
export * from './campaign';

export * from './characters';

export enum CampaignType {
    SWADE = 'SWADE',
};

export interface CampaignTyped {
    type: CampaignType
}

export enum CampaignStatus {
    character_editing_mode = "character_editing_mode",
    playing_mode = "playing_mode",
}
