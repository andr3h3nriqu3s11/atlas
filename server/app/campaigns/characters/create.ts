import { CampaignType, Character, CreateCharacter } from '@ref/types';
import { prisma } from 'app/app';
import { error } from 'app/utils';
import {FastifyInstance, FastifyRequest} from 'fastify';
import { export_character, find_include } from './SWADE_Utils';
import { AuthenticationHeaders } from 'app/authentication';

export const create = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/add`, {
        schema: {
            description: 'Endpoint used to add a character to a campaign',
            tags: ['Characters', 'Campaign'],
            body: {
                type: 'object',
                properties: {
                    name: {type: 'string'},
                    campaign_id: {type: 'string'},
                }
            },
            headers: AuthenticationHeaders,
        }
    }, async (req: FastifyRequest<{Body: CreateCharacter}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign} = await req.authenticate_verifyCampaign(body.campaign_id)

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
                        campaign_id: swade_campaign.id
                    },
                    include: {
                        ...find_include,
                        campaign: {
                            include: {
                                campaign: true,
                            }
                        }
                    }
                });

                return export_character(character);
            } catch (e) {
                console.log(e);
                throw new Error(e.message);
            }
            
        } else
            throw new Error('Unreachable');
    })
}
