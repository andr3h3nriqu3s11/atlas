import {FastifyRequest} from 'fastify';
import {CampaignType, Campaign, ListCampaign, UserType} from '@ref/types';
import { prisma } from 'app/app';
import { export_swade_campaign, find_include } from 'app/campaigns/characters/SWADE_Utils';
import { T, Requests } from 'app/utils';

export const post = new Requests()
.uri('s')
.description('List campaigns')
.tags('Campaign')
.authHeaders()
.body(T.object({
    type: T.enum(["SWADE"]),
}, {required: ['type']}))
.handle(async (
    req: FastifyRequest<{ Body: ListCampaign<CampaignType>, }>, 
    reply
): Promise<Campaign<CampaignType>[]> => {
    const {user} = await req.authenticate();
    const {body} = req;

    if (body.type === CampaignType.SWADE) {
        if (user.userType === UserType.DM) {
            const data = await prisma.campaign.findMany({
                include: {
                    SWADE_Campaign: {
                        include: {
                            characters: {
                                include: find_include(user)
                            }
                        }
                    },
                }
            });
            return data.map(export_swade_campaign);
        }

        const data = await prisma.campaign.findMany({
            include: {
                SWADE_Campaign: {
                    include: {
                        characters: {
                            where: {
                                creator_id: user.id
                            },
                            include: find_include(user),
                        }
                    }
                },
            }
        });
        return data.map(export_swade_campaign);
    } else 
        reply.error(400, 'Invalid Campaign');
});
