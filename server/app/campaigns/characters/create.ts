import { CampaignStatus, CampaignType, Character, create_character, UserType } from '@ref/types';
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
    }, async (req: FastifyRequest<{Body: create_character}>, reply): Promise<Character> => {
        const token = await req.authenticate();

        const {body} = req;

        const campaign = await prisma.campaign.findUnique({
            where: {
                id: body.campaign_id
            }
        });

        if (!campaign) 
            return error(reply, 404, 'Campaign not found');

        if (campaign.status !== CampaignStatus.character_editing_mode && token.user.userType == UserType.PLEB)
            return error(reply, 401, 'You can not create a character in playing mode if you are not the dm');
        
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
