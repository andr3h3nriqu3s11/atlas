import { error } from 'app/utils';
import {FastifyInstance, FastifyRequest} from 'fastify';
import {CreateCampaign, CampaignType, Campaign, SWADE_Campaign, CampaignStatus} from '../../ref/types';
import { prisma } from 'app/app';
import { AuthenticationHeaders } from 'app/authentication';

export const setUpAddCampaign = (fastify: FastifyInstance, base: string) => {
    fastify.post(`${base}/add`, {
        schema: {
            description: 'Create a campaign',
            tags: ['Campaign'],
            body: {
                type: 'object',
                properties: {
                    title: {
                        type: "string"
                    },
                    type: {
                        type: "string",
                        enum: ['SWADE']
                    },
                }
            },
            headers: AuthenticationHeaders,
        }
    }, async (
        req: FastifyRequest<{
            Body: CreateCampaign<CampaignType>,
        }>, 
        reply
    ): Promise<Campaign<CampaignType>> => {
        const token = await req.authenticate_dm();

        const  {body} = req;

        if (body.type === CampaignType.SWADE) {
            const campaign = await prisma.campaign.create({
                data: {
                    title: body.title,
                    type: body.type,
                    creator_id:  token.userId,
                    status: CampaignStatus.character_editing_mode,
                }
            });
        

            const SWADE_campaign = await prisma.sWADE_Campaign.create({
                data: {
                    campaign_id: campaign.id
                }
            });
            
            return {
                title: campaign.title,
                type: CampaignType.SWADE,
                id: campaign.id,
                dateCreation: campaign.dateCreated.toISOString(),
                //TODO
                characters: [],
            } as SWADE_Campaign
        } else 
            return error(reply, 400, 'Invalid Campaign');

        //throw new Error('unrechable');
    });
}
