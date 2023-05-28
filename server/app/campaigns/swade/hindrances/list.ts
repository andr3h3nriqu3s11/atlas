import {FastifyInstance, FastifyRequest} from 'fastify';
import {CampaignType, CampaignTyped, Hindrance} from '@ref/types';
import { prisma } from 'app/app';
import { export_hindrance } from '.';
import { AuthenticationHeaders } from 'app/authentication';

export const list = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/list`, {
        schema: {
            description: 'Endpoint used to list a swade edges',
            tags: ['Hindrance', 'Swade'],
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
        },
    }, async (req: FastifyRequest<{Body: CampaignTyped}>, reply): Promise<Hindrance[]> => {
        await req.authenticate();

        const {body} = req;

        if (body.type === CampaignType.SWADE) {
            const skills = await prisma.sWADE_Hindrances.findMany({ });
            return skills.map(export_hindrance);
        } else
            reply.error(400, 'Invalid type');

    })
}
