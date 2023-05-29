import { CampaignType, Character, CreateCharacter } from '@ref/types';
import { prisma } from 'app/app';
import {FastifyInstance, FastifyRequest} from 'fastify';
import { export_character, find_include } from './SWADE_Utils';
import { AuthenticationHeaders } from 'app/authentication';
import { T } from 'app/utils';

export const create = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/add`, {
        schema: {
            description: 'Endpoint used to add a character to a campaign',
            tags: ['Characters', 'Campaign'],
            body: T.object({
                name: T.string(),
                campaign_id: T.string(),
                npc: T.boolean(false),
            }, {required: ['name', 'campaign_id']}),
            headers: AuthenticationHeaders,
        }
    }, async (req: FastifyRequest<{Body: CreateCharacter}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign, token} = await req.authenticate_verifyCampaign(body.campaign_id, true)

        if (campaign.type === CampaignType.SWADE) {

            const swade_campaign = await prisma.sWADE_Campaign.findFirst({
                where: {
                    campaign_id: campaign.id
                },
            });

            const check_character = await prisma.sWADE_CharacterSheet.findFirst({
                where: {
                    campaign_id: swade_campaign.id,
                    name: body.name,
                }
            }); 

            if (check_character)
                reply.error(400, 'Character with that name already exists');
            
            try {
                const character = await prisma.sWADE_CharacterSheet.create({
                    data: {
                        name: body.name,
                        campaign_id: swade_campaign.id,
                        creator_id: token.user.id,
                        npc: body.npc,
                    },
                    include: {
                        ...find_include(token.user),
                        campaign: {
                            include: {
                                campaign: true,
                            }
                        }
                    }
                });

                return export_character(character);
            } catch (e) {
                throw new Error(e.message);
            }
        } else
            throw new Error('Unreachable');
    })
}
