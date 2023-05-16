import { CampaignType, Character, CreateCharacter } from '@ref/types';
import { prisma } from 'app/app';
import { error } from 'app/utils';
import {FastifyInstance, FastifyRequest} from 'fastify';
import { export_character, find_include } from './SWADE_Utils';

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
            }
        }
    }, async (req: FastifyRequest<{Body: CreateCharacter}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign} = await req.authenticate_verifyCampaign(body.campaign_id)

        if (campaign.type === CampaignType.SWADE) {

            const check_character = await prisma.sWADE_CharacterSheet.findFirst({
                where: {
                    campaign_id: body.campaign_id,
                    name: body.name,
                }
            }); 

            if (check_character)
                return error(reply, 400, 'Character with that name already exists');

            const character = await prisma.sWADE_CharacterSheet.create({
                data: {
                    name: body.name,
                    campaign_id: body.campaign_id
                },
                include: find_include
            });

            return export_character(character);
        } else
            throw new Error('Unreachable');
    })
}
