import {FastifyInstance, FastifyRequest} from 'fastify';
import {create_skill_requirement, remove_skill_requirement, RequirementType, Skill} from '@ref/types';
import { prisma } from 'app/app';
import { export_skill } from 'app/campaigns/characters/SWADE_Utils';

export const add = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/requirement/add`, {
        schema: {
            description: 'Endpoint used to add a requirement to a skill',
            tags: ['Skill', 'Swade'],
        }
    }, async (req: FastifyRequest<{Body: create_skill_requirement}>, reply): Promise<Skill> => {
        await req.authenticate_dm();

        const {body} = req;

        const skill = await prisma.sWADE_Skill.findUnique({
            where: {
                id: body.id,
            },
            include: {
                requirements: true
            }
        });

        if (!skill)
            reply.error(404, 'Target Skill not found');

        if (body.type == RequirementType.skill) {
            const required_skill = await prisma.sWADE_Skill.findUnique({
                where: {
                    id: body.skill_id
                }
            });

            if (!required_skill)
                reply.error(404, 'Required skill not found');

            if (skill.requirements.some((skill_req) => skill_req.skill_id === required_skill.id))
                reply.error(400, 'Required skill already added to update remove and add again');

            await prisma.sWADE_Skills_Requirement.create({
                data: {
                    target_id: body.id,
                    skill_id: body.skill_id,
                    type: body.type,
                    level: body.level
                }
            })
        } else if (body.type == RequirementType.edge) {
            const required_edge = await prisma.sWADE_Edge.findUnique({
                where: {
                    id: body.edge_id
                }
            });

            if (!required_edge)
                reply.error(404, 'Required edge not found');

            if (skill.requirements.some((skill_req) => skill_req.edge_id === required_edge.id))
                reply.error(400, 'Required edge already added to update remove and add again');

            await prisma.sWADE_Skills_Requirement.create({
                data: {
                    target_id: body.id,
                    edge_id: body.edge_id,
                    type: body.type,
                    level: body.level
                }
            })
        } else 
            reply.error(400, 'Invalid type');

        return export_skill(await prisma.sWADE_Skill.findUnique({
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
            description: 'Endpoint used to add a requirement to a skill',
            tags: ['Skill', 'Swade'],
        }
    }, async (req: FastifyRequest<{Body: remove_skill_requirement}>, reply): Promise<Skill> => {
        await req.authenticate_dm();

        const {body} = req;

        const skill = await prisma.sWADE_Skill.findUnique({
            where: {
                id: body.id,
            },
            include: {
                requirements: true
            }
        });

        if (!skill)
            reply.error(404, 'Target Skill not found');

        if (body.type == RequirementType.skill) {
            const required_skill = await prisma.sWADE_Skill.findUnique({
                where: {
                    id: body.skill_id
                }
            });

            if (!required_skill)
                reply.error(404, 'Required skill not found');

            if (!skill.requirements.some((skill_req) => skill_req.skill_id === required_skill.id))
                reply.error(400, 'Required skill not part of requirements');
            
            const target = await prisma.sWADE_Skills_Requirement.findFirst({
                where: {
                    target_id: skill.id,
                    skill_id: required_skill.id,
                }
            });

            if (!target)
                reply.error(500, 'unreachable')

            await prisma.sWADE_Skills_Requirement.delete({
                where: {
                    id: target.id
                }
            });
        } else if (body.type == RequirementType.edge) {
            const required_edge = await prisma.sWADE_Edge.findUnique({
                where: {
                    id: body.edge_id
                }
            });

            if (!required_edge)
                reply.error(404, 'Required edge not found');

            if (skill.requirements.some((skill_req) => skill_req.edge_id === required_edge.id))
                reply.error(400, 'Required edge not part of requirements');

            const target = await prisma.sWADE_Skills_Requirement.findFirst({
                where: {
                    target_id: skill.id,
                    edge_id: required_edge.id,
                }
            });

            if (!target)
                reply.error(500, 'unreachable')

            await prisma.sWADE_Skills_Requirement.delete({
                where: {
                    id: target.id
                }
            });
        } else 
            reply.error(400, 'Invalid type');

        return export_skill(await prisma.sWADE_Skill.findUnique({
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
