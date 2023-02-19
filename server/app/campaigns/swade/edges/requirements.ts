import {FastifyInstance, FastifyRequest} from 'fastify';
import {SWADE_RequirementType, create_edge_requirement, Edge, BaseAttribute, remove_edge_requirement} from '@ref/types';
import { prisma } from 'app/app';
import { swade_export_edge } from 'app/campaigns/characters/SWADE_Utils';

export const add = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/requirement/add`, {
        schema: {
            description: 'Endpoint used to add a requirement to a edge',
            tags: ['Skill', 'Swade'],
        }
    }, async (req: FastifyRequest<{Body: create_edge_requirement}>, reply): Promise<Edge> => {
        await req.authenticate_dm();

        const {body} = req;

        const edge = await prisma.sWADE_Edge.findUnique({
            where: { id: body.id, }, 
            include: { requirements: true }
        });

        if (!edge)
            reply.error(404, 'Target edge not found');

        if (body.type == SWADE_RequirementType.skill) {
            const required_skill = await prisma.sWADE_Skill.findUnique({
                where: {
                    id: body.skill_id
                }
            });

            if (!required_skill)
                reply.error(404, 'Required skill not found');

            if (edge.requirements.some((skill_req) => skill_req.skill_id === required_skill.id))
                reply.error(400, 'Required skill already added to update remove and add again');

            await prisma.sWADE_Edge_requirements.create({
                data: {
                    target_id: body.id,
                    skill_id: body.skill_id,
                    type: body.type,
                    level: body.level
                }
            })
        } else if (body.type == SWADE_RequirementType.edge) {
            const required_edge = await prisma.sWADE_Edge.findUnique({
                where: {
                    id: body.edge_id
                }
            });

            if (!required_edge)
                reply.error(404, 'Required edge not found');

            if (edge.requirements.some((skill_req) => skill_req.edge_id === required_edge.id))
                reply.error(400, 'Required edge already added to update remove and add again');

            await prisma.sWADE_Edge_requirements.create({
                data: {
                    target_id: body.id,
                    edge_id: body.edge_id,
                    type: body.type,
                    level: body.level
                }
            })
        } else if (body.type === SWADE_RequirementType.attribute) {
            if (!Object.values(BaseAttribute).includes(body.attribute))
                reply.error(400, 'Invalid attribute');

            if (edge.requirements.some((skill_req) => skill_req.attribute === body.attribute))
                reply.error(400, 'Required attribute already added to update remove and add again');

            await prisma.sWADE_Edge_requirements.create({
                data: {
                    target_id: body.id,
                    attribute: body.attribute,
                    type: body.type,
                    level: body.level
                }
            })
        } else 
            reply.error(400, 'Invalid type');

        return swade_export_edge(await prisma.sWADE_Edge.findUnique({
            where: {
                id: body.id
            },
            include: {
                requirements: {
                    include: {
                        edge: true,
                        skill: true,
                    }
                }
            }
        }));
    })
}

export const remove = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/requirement/remove`, {
        schema: {
            description: 'Endpoint used to add a requirement to a edge',
            tags: ['Edge', 'Swade'],
        }
    }, async (req: FastifyRequest<{Body: remove_edge_requirement}>, reply): Promise<Edge> => {
        await req.authenticate_dm();

        const {body} = req;

        const edge = await prisma.sWADE_Edge.findUnique({
            where: { id: body.id, },
            include: { requirements: true }
        });

        if (!edge)
            reply.error(404, 'Target Edge not found');

        if (body.type == SWADE_RequirementType.skill) {
            const required_skill = await prisma.sWADE_Skill.findUnique({
                where: {
                    id: body.skill_id
                }
            });

            if (!required_skill)
                reply.error(404, 'Required skill not found');

            const ids = edge.requirements.filter((skill_req) => skill_req.skill_id === required_skill.id);

            if (ids.length === 0)
                reply.error(400, 'Required skill not part of requirements');

            await prisma.sWADE_Edge_requirements.delete({
                where: {
                    id: ids[0].id
                }
            });
        } else if (body.type == SWADE_RequirementType.edge) {
            const required_edge = await prisma.sWADE_Edge.findUnique({
                where: {
                    id: body.edge_id
                }
            });

            if (!required_edge)
                reply.error(404, 'Required edge not found');

            const ids = edge.requirements.filter((skill_req) => skill_req.edge_id === required_edge.id)

            if (ids.length === 0)
                reply.error(400, 'Required edge not part of requirements');

            await prisma.sWADE_Edge_requirements.delete({
                where: {
                    id: ids[0].id
                }
            });
        } else if (body.type === SWADE_RequirementType.attribute) {
            const ids = edge.requirements.filter((skill_req) => skill_req.edge_id === body.attribute);

            if (ids.length === 0)
                reply.error(400, 'Required attribute not part of requirements');
            
            await prisma.sWADE_Edge_requirements.delete({
                where: {
                    id: ids[0].id
                }
            });
        } else 
            reply.error(400, 'Invalid type');

        return swade_export_edge(await prisma.sWADE_Edge.findUnique({
            where: {
                id: body.id
            },
            include: {
                requirements: {
                    include: {
                        edge: true,
                        skill: true,
                    }
                }
            }
        }));

    })
}
