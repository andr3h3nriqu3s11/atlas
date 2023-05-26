import {FastifyInstance, FastifyRequest} from 'fastify';
import {CampaignType, CampaignTyped, Edge, Hindrance} from '@ref/types';
import { prisma } from 'app/app';
import { swade_export_edge } from 'app/campaigns/characters/SWADE_Utils';
import { export_hindrance } from '.';
import { AuthenticationHeaders } from 'app/authentication';

export const list = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/list`, {
        schema: {
            description: 'Endpoint used to list a swade edges',
            tags: ['Edge', 'Swade'],
            headers: AuthenticationHeaders,
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
