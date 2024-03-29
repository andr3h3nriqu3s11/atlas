import { FastifyRequest} from 'fastify';
import {CampaignType, SWADE_RequirementType, Skill, CreateSkillRequirement, RemoveSkillRequirement} from '@ref/types';
import { prisma } from 'app/app';
import { swade_export_skill } from 'app/utils/SWADE_Utils';
import { Requests } from 'app/utils';

export const put = new Requests()
.authHeaders()
.description('Endpoint used to add a requirement to a skill\nNote: Type is to complex check Requests class')
.tags('Skill', 'Swade')
.handle(async (req: FastifyRequest<{Body: CreateSkillRequirement}>, reply): Promise<Skill> => {
    await req.authenticate_dm();
    const {body} = req;

    if (body.campaignType === CampaignType.SWADE) {
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

        if (body.type == SWADE_RequirementType.skill) {
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
        } else if (body.type == SWADE_RequirementType.edge) {
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
        } else reply.error(400, 'Invalid type');

        return swade_export_skill(await prisma.sWADE_Skill.findUnique({
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
    } else
        reply.error(400, 'Invalid campaign type')
});

export const del = new Requests()
.authHeaders()
.description('Endpoint used to add a requirement to a skill\nNote: Type is to complex check Requests class')
.tags('Skill', 'Swade')
.handle(async (req: FastifyRequest<{Body: RemoveSkillRequirement}>, reply): Promise<Skill> => {
    await req.authenticate_dm();
    const {body} = req;

    if (body.campaignType == CampaignType.SWADE) {
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

        if (body.type == SWADE_RequirementType.skill) {
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
        } else if (body.type == SWADE_RequirementType.edge) {
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

        return swade_export_skill(await prisma.sWADE_Skill.findUnique({
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
    } else
        reply.error(400, 'Invalid campaign type');
});
