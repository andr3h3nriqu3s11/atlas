import {FastifyInstance, FastifyRequest} from 'fastify';
import {CampaignType, CampaignTyped, Edge} from '@ref/types';
import { prisma } from 'app/app';
import { swade_export_edge } from 'app/campaigns/characters/SWADE_Utils';
import { AuthenticationHeaders } from 'app/authentication';

export const list = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/list`, {
        schema: {
            description: 'Endpoint used to list a swade edges',
            tags: ['Edge', 'Swade'],
            headers: AuthenticationHeaders,
            body: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ["SWADE"],
                    },
                }
            }
        }
    }, async (req: FastifyRequest<{Body: CampaignTyped}>, reply): Promise<Edge[]> => {
        await req.authenticate();

        const {body} = req;

        if (body.type === CampaignType.SWADE) {
            const skills = await prisma.sWADE_Edge.findMany({
                include: {
                    requirements: {
                        include: {
                            edge: true,
                            skill: true
                        }
                    }
                }
            });

            return skills.map(swade_export_edge);
        } else
            reply.error(400, 'Invalid type');

    })
}
