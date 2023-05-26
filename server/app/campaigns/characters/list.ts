import { CampaignType, campaign_interaction, character_base} from '@ref/types';
import { prisma } from 'app/app';
import { AuthenticationHeaders } from 'app/authentication';
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
            },
            headers: AuthenticationHeaders
        }
    }, async (req: FastifyRequest<{Body: campaign_interaction}>): Promise<character_base[]> => {
        const {body} = req;
        const {campaign, token} = await req.authenticate_verifyCampaign(body.campaign_id, false)

        if (campaign.type === CampaignType.SWADE) {
            // TODO fix this any
            let where: any = {
                campaign_id: body.campaign_id,
                OR: [
                    {visible: true},
                    {creator_id: token.user.id}
                ]
            }

            if (token.user.authorized)
                where = {
                    campaign_id: body.campaign_id
                };

            return await prisma.sWADE_CharacterSheet.findMany({
                where,
                select: {
                    name: true,
                    id: true,
                    campaign_id: true,
                    dead: true,
                    npc: true,
                }
            });
        } else
            throw new Error('Unreachable');
    })
}
