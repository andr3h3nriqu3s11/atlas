import {FastifyInstance, FastifyRequest} from 'fastify';
import { error } from 'app/utils';
import { prisma } from 'app/app';
import { create_hindrance, Hindrance, update_hindrance } from '@ref/types/swade/hindrance';
import { export_hindrance } from '.';

export const create = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/add`, {
        schema: {
            description: 'Endpoint used to add a swade hindrance',
            tags: ['Hindrance', 'Swade'],
            body: {
                type: 'object',
                properties: {
                    title: {type: 'string'},
                    rank: {type: 'string'},
                    description: {type: 'string'},
                }
            }
        }
    }, async (req: FastifyRequest<{Body: create_hindrance}>, reply): Promise<Hindrance> => {
        await req.authenticate_dm();

        const {body} = req;

        if (!body.title)
            return error(reply, 400, 'title has an invalid value');

        if (!body.description)
            return error(reply, 400, 'title has an invalid value');

        const list_hindrance = await prisma.sWADE_Hindrances.count({
            where: {
                title: body.title,
            }
        });

        if (list_hindrance !== 0)
            return error(reply, 400, 'A hindrance with that name already exists');

        const hindrance = await prisma.sWADE_Hindrances.create({
            data: {
                title: body.title,
                description: body.description
            },
        });

        return export_hindrance(hindrance);
    })
}

export const update = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.put(`${baseUrl}/update`, {
        schema: {
            description: 'Update swade hindrance',
            tags: ['Hindrance', 'Swade']
        }
    }, async (req: FastifyRequest<{Body: update_hindrance}>, reply): Promise<Hindrance> => {
        await req.authenticate_dm();

        const {body} = req;

        const skill = await prisma.sWADE_Hindrances.findUnique({
            where: {
                id: body.id
            }
        });
        
        if (!skill)
            return error(reply, 404, 'Hindrance not found');

        if (body.title) {
            const find_skill = await prisma.sWADE_Hindrances.findFirst({
                where: {
                    title: body.title
                }
            });
            if (find_skill)
                return error(reply, 400, 'a edge with this title already exists');
        }

        const result = await prisma.sWADE_Hindrances.update({
            where: {
                id: body.id
            }, 
            data: {
                ...body
            },
        });

        return export_hindrance(result);
    });
}