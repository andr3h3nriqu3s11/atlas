import {FastifyInstance, FastifyRequest} from 'fastify';
import {CampaignType, Campaign, ListCampaign, UserType} from '../../ref/types';
import { prisma } from 'app/app';
import { AuthenticationHeaders } from 'app/authentication';
import { export_swade_campaign, find_include } from './characters/SWADE_Utils';
import { T } from 'app/utils';

export const setUpCampaignList = (fastify: FastifyInstance, base: string) => {
    fastify.post(`${base}s`, {
        schema: {
            description: 'Create a campaign',
            tags: ['Campaign'],
            body: T.object({
                type: T.enum(["SWADE"]),
            }, {required: ['type']}),
            headers: AuthenticationHeaders,
        }
    }, async (
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
}
