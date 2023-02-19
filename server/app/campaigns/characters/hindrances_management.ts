import { CampaignType, Character } from '@ref/types';
import { add_hindrance_character, hindrance_character_pair } from '@ref/types/swade/hindrance';
import { prisma } from 'app/app';
import {FastifyInstance, FastifyRequest} from 'fastify';
import { prisma_export_character } from './SWADE_Utils';

export const hindrance_add = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/hindrance/add`, {
        schema: {
            description: 'Endpoint used to add a hindrance to a character',
            tags: ['Characters', 'Campaign', 'Hindrance'],
            body: {
                type: 'object',
                properties: {
                    character_id: {type: 'string'},
                    hindrance_id: {type: 'string'},
                    level: {type: 'number'}
                }
            }
        }
    }, async (req: FastifyRequest<{Body: add_hindrance_character}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign} = await req.authenticate_verifyCampaign(body.campaign_id);
        
        if (campaign.type !== CampaignType.SWADE) 
            reply.error(400, 'Hindrance only avaliable on SWADE');

        const character = await prisma.sWADE_CharacterSheet.findUnique({
            where: { id: body.character_id },
            include: {
                hindrances: true
            }
        }); 

        if (!character)
            reply.error(404, 'Character not found')

        if (character.hindrances.some(hindrance => hindrance.id === body.hindrance_id))
            reply.error(400, 'Character already has that hindrance');

        const hindrance = await prisma.sWADE_Hindrances.findUnique({
            where: {
                id: body.hindrance_id
            },
        });
        
        if (!hindrance)
            reply.error(404, 'Edge not found');

        // TODO point calculations
        
        await prisma.sWADE_CharacterSheet_hindrances.create({
            data: {
                character_id: body.character_id,
                hindrance_id: body.hindrance_id
            }
        });

        return prisma_export_character(body.character_id);
    })
}


export const hidrance_remove = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/hindrance/remove`, {
        schema: {
            description: 'Endpoint used to add a hindrance to a character',
            tags: ['Characters', 'Campaign', 'Hindrance'],
            body: {
                type: 'object',
                properties: {
                    character_id: {type: 'string'},
                    hindrance_id: {type: 'string'},
                }
            }
        }
    }, async (req: FastifyRequest<{Body: hindrance_character_pair}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign} = await req.authenticate_verifyCampaign(body.campaign_id);

        if (campaign.type !== CampaignType.SWADE) 
            reply.error(400, 'Invalid campaign type')

        const character = await prisma.sWADE_CharacterSheet.findUnique({
            where: {
                id: body.character_id
            },
            include: {
                hindrances: true,
            }
        }); 

        if (!character)
            reply.error(404, 'Character not found')

        const hindrance_pair = character.hindrances.filter(hindrance => hindrance.hindrance_id === body.hindrance_id);

        if (hindrance_pair.length === 0)
            reply.error(400, 'Character does not have edge');

        await prisma.sWADE_CharacterSheet_hindrances.delete({
            where: {
                id: hindrance_pair[0].id
            }
        });

        return prisma_export_character(body.character_id);
    })
}
