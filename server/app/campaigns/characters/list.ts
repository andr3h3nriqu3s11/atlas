import { CampaignType, campaign_interaction, character_base} from '@ref/types';
import { prisma } from 'app/app';
import {FastifyRequest, FastifyInstance} from 'fastify';

export const list = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/list`, {
        schema: {
            description: 'Endpoint used list characters in a campaign',
            tags: ['Characters', 'Campaign'],
            body: {
                type: 'object',
                properties: {
                    campaign_id: {type: 'string'},
                }
            }
        }
    }, async (req: FastifyRequest<{Body: campaign_interaction}>): Promise<character_base[]> => {
        const {body} = req;
        const {campaign} = await req.authenticate_verifyCampaign(body.campaign_id, false)

        if (campaign.type === CampaignType.SWADE) {
            return await prisma.sWADE_CharacterSheet.findMany({
                where: {
                    campaign_id: body.campaign_id
                },
                select: {
                    name: true,
                    id: true,
                    campaign_id: true
                }
            });
        } else
            throw new Error('Unreachable');
    })
}
