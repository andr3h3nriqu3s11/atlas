import { Campaign, CampaignType, Character, CreateCharacter, Rank, UpdateCharacter, UserType, campaign_interaction, update_character_swade} from '@ref/types';
import { prisma } from 'app/app';
import { FastifyRequest } from 'fastify';
import { T, Requests } from 'app/utils';
import { export_character, find_include, prisma_export_character } from 'app/utils/SWADE_Utils';
import { SWADE_CharacterSheet } from '@prisma/client';

// List
export const post = new Requests()
.authHeaders()
.description('Endpoint used list characters in a campaign')
.tags('Characters', 'Campaign')
.body(T.object({
    campaign_id: T.string(),
}))
.handle(async (req: FastifyRequest<{Body: campaign_interaction}>): Promise<Character<Campaign<CampaignType>>[]> => {
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
});

export const put = new Requests()
.authHeaders()
.description('Endpoint used to add a character to a campaign')
.tags('Characters', 'Campaign')
.body(T.object({
    name: T.string(),
    campaign_id: T.string(),
    npc: T.boolean(false),
}, {required: ['name', 'campaign_id']}))
.handle(async (req: FastifyRequest<{Body: CreateCharacter}>, reply): Promise<Character> => {
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

export const patch = new Requests()
.authHeaders()
.description('Update user\nNote: type to complex check Requests')
.tags('Campaign', 'Characters')
.handle(async (req: FastifyRequest<{Body: UpdateCharacter}>, reply): Promise<Character> => {
    const {body} = req;
    const {campaign, token: {user}} = await req.authenticate_verifyCampaign(body.campaign_id);

    if (campaign.type === CampaignType.SWADE) {

        const character = await prisma.sWADE_CharacterSheet.findUnique({ where: { id: body.id } });

        if (character)
            reply.error(404, 'Character not found on campaign');

        if (character.creator_id !== user.id && user.userType !== UserType.DM)
            reply.error(400, "You can not change this character");

        if (body.name && body.name !== character.name) {
            const check_character = await prisma.sWADE_CharacterSheet.findFirst({
                where: {
                    campaign_id: body.campaign_id,
                    name: body.name
                }
            });

            if (check_character)
                reply.error(409, 'Character already with that name already exists on the campaign');
        }

        const targets = ["vigor", "smarts", "spirit", "agility", "strength"];

        let diff = 0;

        for (const target of targets) {
            if (body[target]) 
                continue;

            if (body[target] < 0)
                reply.error(400, `${target} needs to be a positive value`);

            diff += character[target] - body[target];
        }

        const attributePoints = character.attributePoints - diff;

        if (attributePoints < 0)
            reply.error(400, 'Too many attribute points spent');

        if (body.rank && !Object.values(Rank).includes(body.rank))
            reply.error(400, 'Invalid Rank');

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
        return prisma_export_character(character.id, user);
    } else
        throw Error('Unrechanble');
});

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
