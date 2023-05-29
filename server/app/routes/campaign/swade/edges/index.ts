import {FastifyRequest} from 'fastify';
import {CampaignType, CampaignTyped, Edge, Rank, UpdateEdge} from '@ref/types';
import { prisma } from 'app/app';
import { swade_export_edge } from 'app/campaigns/characters/SWADE_Utils';
import { Requests, T } from 'app/utils';

export const post = new Requests()
.authHeaders()
.description('Endpoint used to list a swade edges')
.tags('Edge', 'Swade')
.body(T.object({
    type: T.enumO(CampaignType)
}))
.handle(async (req: FastifyRequest<{Body: CampaignTyped}>, reply): Promise<Edge[]> => {
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
});

export const put = new Requests()
.authHeaders()
.description('Update swade edge')
.tags('Edge', 'Swade')
.body(T.object({
    title: T.string(),
    rank: T.enumO(Rank),
    description: T.string(),
    id: T.string(),
}, {required: ['id']}))
.handle(async (req: FastifyRequest<{Body: UpdateEdge}>, reply): Promise<Edge> => {
    await req.authenticate_dm();
    const {body} = req;

    const skill = await prisma.sWADE_Edge.findUnique({ where: { id: body.id } });

    if (!skill)
        reply.error(404, 'Edge not found');

    if (body.title) {
        const find_skill = await prisma.sWADE_Edge.findFirst({
            where: {
                title: body.title
            }
        });
        if (find_skill)
            reply.error(400, 'a edge with this title already exists');
    }

    const result = await prisma.sWADE_Edge.update({
        where: { id: body.id }, 
        data: body ,
        include: {
            requirements: {
                include: {
                    edge: true,
                    skill: true
                }
            }
        }
    });

    return swade_export_edge(result);
});

export const del = new Requests()
.authHeaders()
.description('Delete swade edge')
.tags('Edge', 'Swade')
.body(T.object({
    id: T.string(),
}))
.handle(async (req: FastifyRequest<{Body: {id: string}}>, reply): Promise<Record<string, string>> => {
    await req.authenticate_dm();
    const {body: data} = req;

    const skill = await prisma.sWADE_Hindrances.findUnique({ where: { id: data.id } });
    if (!skill) reply.error(404, 'Hindrance not found');

    await prisma.sWADE_Edge.delete({ where: { id: skill.id, } });

    return {};
});
