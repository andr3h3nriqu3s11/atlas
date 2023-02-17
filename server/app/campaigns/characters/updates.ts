import { SWADE_CharacterSheet } from '@prisma/client';
import { CampaignStatus, CampaignType, Character, update_character, update_character_swade, UserType } from '@ref/types';
import { Rank } from '@ref/types/swade';
import { prisma } from 'app/app';
import { error } from 'app/utils';
import {FastifyInstance, FastifyRequest} from 'fastify'
import { get_id } from '..';
import { export_character, find_include } from './SWADE_Utils';

export const update = (fastify: FastifyInstance, baseUrl: string) => {
    
    
    fastify.put(`${baseUrl}/update`, {
        schema: {
            description: 'Update user',
            tags: ['Campaign', 'Characters']
        }
    }, async (req: FastifyRequest<{Body: update_character}>, reply): Promise<Character> => {
        const token = await req.authenticate();

        const {body} = req;

        const campaign = await get_id(body.campaign_id, reply);

        if (campaign.status !== CampaignStatus.character_editing_mode && token.user.userType !== UserType.DM)
            return error(reply, 401, 'You can not edit in the middle of playing');
        
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

            const return_character = await prisma.sWADE_CharacterSheet.findUnique({
                where: {
                    id: character.id
                },
                include: find_include
            });


            // TODO check if skill points need to be recalulated

            return export_character(return_character);
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
