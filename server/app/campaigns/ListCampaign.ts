import {FastifyInstance, FastifyRequest} from 'fastify';
import {CampaignType, Campaign, ListCampaign, UserType} from '../../ref/types';
import { prisma } from 'app/app';
import { AuthenticationHeaders } from 'app/authentication';
import { export_swade_campaign } from './characters/SWADE_Utils';

export const setUpCampaignList = (fastify: FastifyInstance, base: string) => {
    fastify.post(`${base}s`, {
        schema: {
            description: 'Create a campaign',
            tags: ['Campaign'],
            body: {
                type: 'object',
                properties: {
                    type: {
                        type: "string",
                        enum: ['SWADE']
                    },
                }
            },
            headers: AuthenticationHeaders,
        }
    }, async (
        req: FastifyRequest<{ Body: ListCampaign<CampaignType>, }>, 
        reply
    ): Promise<Campaign<CampaignType>[]> => {
        const token = await req.authenticate();

        const {body} = req;

        if (body.type === CampaignType.SWADE) {
            
            if (token.user.userType === UserType.DM) {
                const data = await prisma.campaign.findMany({
                    include: {
                        SWADE_Campaign: {
                            include: {
                                characters: true
                            }
                        },
                    }
                });

                return data.map(export_swade_campaign);
            }

            const data = await prisma.campaign.findMany({
                where: {
                    SWADE_Campaign: {
                        characters: {
                            some: {
                                id: token.userId
                            }
                        }
                    }
                },
                include: {
                    SWADE_Campaign: {
                        include: {
                            characters: true
                        }
                    },
                }
            });

            return data.map(export_swade_campaign);
        } else 
            reply.error(400, 'Invalid Campaign');
    });
}
