import { SWADE_CharacterSheet } from '@prisma/client';
import { CampaignType, Character, update_character, update_character_swade } from '@ref/types';
import { Rank } from '@ref/types/swade';
import { prisma } from 'app/app';
import { error } from 'app/utils';
import {FastifyInstance, FastifyRequest} from 'fastify'
import { prisma_export_character } from './SWADE_Utils';

export const update = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.put(`${baseUrl}/update`, {
        schema: {
            description: 'Update user',
            tags: ['Campaign', 'Characters']
        }
    }, async (req: FastifyRequest<{Body: update_character}>, reply): Promise<Character> => {
        const {body} = req;
        const {campaign} = await req.authenticate_verifyCampaign(body.campaign_id);

        if (campaign.type === CampaignType.SWADE) {
            
            const character = await prisma.sWADE_CharacterSheet.findUnique({
                where: {
                    id: body.id
                },
            });

            if (character)
                return error(reply, 404, 'Character not found on campaign');

            if (body.name && body.name !== character.name) {
                const check_character = await prisma.sWADE_CharacterSheet.findFirst({
                    where: {
                        campaign_id: body.campaign_id,
                        name: body.name
                    }
                });

                if (check_character)
                    return error(reply, 409, 'Character already with that name already exists on the campaign');
            }

            const targets = ["vigor", "smarts", "spirit", "agility", "strength"];

            let diff = 0;

            for (const target of targets) {
                if (body[target]) 
                    continue;

                if (body[target] < 0)
                    return error(reply, 400, `${target} needs to be a positive value`);

                diff += character[target] - body[target];
            }

            const attributePoints = character.attributePoints - diff;

            if (attributePoints < 0)
                return error(reply , 400, 'Too many attribute points spent');

            if (body.rank && !Object.values(Rank).includes(body.rank))
                return error(reply, 400, 'Invalid Rank');
                
            delete body.campaign_id
            delete body.id
            
            await prisma.sWADE_CharacterSheet.update({
                where: {
                    id: character.id
                },
                data: {
                    ...body,
                    attributePoints
                }
            });

            await add_log(character, body, attributePoints);

            // TODO check if skill points need to be recalulated
            return prisma_export_character(character.id);
        } else
            throw Error('Unrechanble');
    });
}

async function add_log(character: SWADE_CharacterSheet, body: update_character_swade, attributePoints: number) {
    
    let message = '';
    
    if (character.attributePoints !== attributePoints) {
        message += `Attribute Points: ${character.attributePoints} => ${attributePoints}\n`;
    }

    for (const name in body) {
        if (body[name] !== character[name])
            message += `Attribute Points: ${character[name]} => ${body[name]}\n`;
    }

    await prisma.sWADE_CharacterSheet_Logs.create({
        data: {
            character_id: character.id,
            message
        }
    });
}
