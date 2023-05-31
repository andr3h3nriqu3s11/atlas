import { Campaign, CampaignType, Character, UserType, campaign_interaction} from '@ref/types';
import { prisma } from 'app/app';
import { AuthenticationHeaders } from 'app/utils';
import { FastifyRequest, FastifyInstance } from 'fastify';
import { T } from 'app/utils';
import { export_character, find_include } from './SWADE_Utils';

export const list = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/list`, {
        schema: {
            description: 'Endpoint used list characters in a campaign',
            tags: ['Characters', 'Campaign'],
            body: T.object({
                campaign_id: T.string(),
            }, {required: ['campaign_id']}),
            headers: AuthenticationHeaders,
        }
    }, async (req: FastifyRequest<{Body: campaign_interaction}>): Promise<Character<Campaign<CampaignType>>[]> => {
        const {body} = req;
        const {campaign, token: {user}} = await req.authenticate_verifyCampaign(body.campaign_id, false)

        if (campaign.type === CampaignType.SWADE) {
            
            const swade_campaign = await prisma.sWADE_Campaign.findUnique({
                where: {
                    campaign_id: body.campaign_id,
                }
            });

            // TODO fix this any
            let where: any = {
                campaign_id: swade_campaign.id,
                OR: [
                    {visible: true},
                    {creator_id: user.id}
                ]
            }

            if (user.userType === UserType.DM)
                where = {
                    campaign_id: swade_campaign.id
                };

            console.log(where, "test", user);

            const data = await prisma.sWADE_CharacterSheet.findMany({
                where,
                include: find_include(user),
            });

            return data.map(export_character);
        } else
            throw new Error('Unreachable');
    })
}
