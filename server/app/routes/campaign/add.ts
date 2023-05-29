import { T, Requests } from 'app/utils';
import {FastifyRequest} from 'fastify';
import {CreateCampaign, CampaignType, Campaign, SWADE_Campaign, CampaignStatus} from '@ref/types';
import { prisma } from 'app/app';

export const post = new Requests()
.description('Create a campaign')
.tags('Campaign')
.authHeaders()
.body(T.object({
    title: T.string(),
    type: T.enum(['SWADE'])
}, {required: ['title', 'type']}))
.handle(async (
    req: FastifyRequest<{
        Body: CreateCampaign<CampaignType>,
    }>, 
    reply
): Promise<Campaign<CampaignType>> => {
    const token = await req.authenticate_dm();

    const {body} = req;

    if (body.type === CampaignType.SWADE) {
        const campaign = await prisma.campaign.create({
            data: {
                title: body.title,
                type: body.type,
                creator_id:  token.userId,
                status: CampaignStatus.character_editing_mode,
            }
        });

        await prisma.sWADE_Campaign.create({
            data: {
                campaign_id: campaign.id
            }
        });

        return {
            title: campaign.title,
            type: CampaignType.SWADE,
            id: campaign.id,
            dateCreation: campaign.dateCreated.toISOString(),
            // There are no characters so there is no need to complicate things
            characters: [],
        } as SWADE_Campaign
    } else 
        return reply.error(400, 'Invalid Campaign');
})
