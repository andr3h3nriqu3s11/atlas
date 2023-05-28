import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import { CreateEdge, Edge, UpdateEdge } from '@ref/types';
import { Rank } from '@ref/types';
import { prisma } from 'app/app';
import { swade_export_edge } from 'app/campaigns/characters/SWADE_Utils';
import { AuthenticationHeaders } from 'app/authentication';

export const create = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/add`, {
        schema: {
            description: 'Endpoint used to add a swade edge',
            tags: ['Edge', 'Swade'],
            body: {
                type: 'object',
                properties: {
                    title: {type: 'string'},
                    rank: {type: 'string'},
                    description: {type: 'string'},
                }
            },
            headers: AuthenticationHeaders,
        }
    }, async (req: FastifyRequest<{Body: CreateEdge}>, reply): Promise<Edge> => {
        await req.authenticate_dm();

        const {body} = req;

        return addEdge(reply, body);
    })
}

export async function addEdge(reply: FastifyReply, body: CreateEdge): Promise<Edge> {
    if(!Object.values(Rank).includes(body.rank))
        reply.error(400, 'rank has an invalid value');

    if (!body.title)
        reply.error(400, 'title has an invalid value');

    if (!body.description)
        reply.error(400, 'title has an invalid value');

    const list_edges = await prisma.sWADE_Edge.count({
        where: {
            title: body.title,
        }
    });

    if (list_edges !== 0)
        reply.error(400, 'A edge with that name already exists');

    const skill = await prisma.sWADE_Edge.create({
        data: {
            title: body.title,
            rank: body.rank,
            description: body.description
        },
        include: {
            requirements: {
                include: {
                    edge: true,
                    skill: true
                }
            }
        }
    });

    return swade_export_edge(skill);
}

export const update = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.put(`${baseUrl}/update`, {
        schema: {
            description: 'Update swade edge',
            tags: ['Edge', 'Swade']
        }
    }, async (req: FastifyRequest<{Body: UpdateEdge}>, reply): Promise<Edge> => {
        await req.authenticate_dm();

        const {body} = req;

        const skill = await prisma.sWADE_Edge.findUnique({
            where: {
                id: body.id
            }
        });
        
        if (!skill)
            reply.error(404, 'Edge not found');

        if (body.rank && !Object.values(Rank).includes(body.rank))
            reply.error(400, 'rank has an invalid value');

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
            where: {
                id: body.id
            }, 
            data: {
                ...body
            },
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
}
