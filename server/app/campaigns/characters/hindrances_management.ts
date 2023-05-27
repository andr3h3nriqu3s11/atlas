import { CampaignType, Character, UserType } from '@ref/types';
import { AddHindranceCharacter, HindranceCharacterPair } from '@ref/types/swade/hindrance';
import { prisma } from 'app/app';
import {FastifyInstance, FastifyRequest} from 'fastify';
import { prisma_export_character } from './SWADE_Utils';
import { AuthenticationHeaders } from 'app/authentication';

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
            },
            headers: AuthenticationHeaders,
        }
    }, async (req: FastifyRequest<{Body: AddHindranceCharacter}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign, token: {user}} = await req.authenticate_verifyCampaign(body.campaign_id, true);
        
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

        if (character.creator_id !== user.id && user.userType !== UserType.DM)
            reply.error(400, 'You can not change this user');

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
            },
            headers: AuthenticationHeaders,
        }
    }, async (req: FastifyRequest<{Body: HindranceCharacterPair}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign, token: {user}} = await req.authenticate_verifyCampaign(body.campaign_id, true);

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

        if (character.creator_id !== user.id && user.userType !== UserType.DM)
            reply.error(400, "You can not edit this character");

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
