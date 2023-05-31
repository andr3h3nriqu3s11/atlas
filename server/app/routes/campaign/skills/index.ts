import { FastifyRequest } from 'fastify';
import { BaseAttribute, CampaignType, CampaignTyped, CreateSkill, Rank, Skill, UpdateSkill } from '@ref/types';
import { prisma } from 'app/app';
import { swade_export_skill } from 'app/utils/SWADE_Utils';
import { Requests, T } from 'app/utils';

export const post = new Requests()
.authHeaders()
.description('Endpoint used to list a swade skill')
.tags('Skill', 'Swade')
.body(T.object({
    type: T.enumO(CampaignType)
}))
.handle(async (req: FastifyRequest<{Body: CampaignTyped}>, reply): Promise<Skill[]> => {
    await req.authenticate();
    const {body} = req;

    if (body.type === CampaignType.SWADE) {
        const skills = await prisma.sWADE_Skill.findMany({
            include: {
                requirements: {
                    include: {
                        edge: true,
                        skill: true
                    }
                }
            }
        });

        return skills.map(swade_export_skill);
    } else reply.error(400, 'Invalid type');
});

export const put = new Requests()
.authHeaders()
.description('Endpoint used to add a swade skill')
.tags('Skill', 'Swade')
.body(T.object({
    title: T.string(),
    base: T.enumO(BaseAttribute),
    rank: T.enumO(Rank),
    type: T.enumO(CampaignType),
    description: T.string(),
}))
.handle(async (req: FastifyRequest<{Body: CreateSkill}>, reply): Promise<Skill> => {
    await req.authenticate_dm();
    const {body} = req;

    if (body.type === CampaignType.SWADE) {
        const list_skills = await prisma.sWADE_Skill.count({
            where: {
                title: body.title,
            }
        });

        if (list_skills !== 0)
            reply.error(400, 'A skill with that name already exists');

        const skill = await prisma.sWADE_Skill.create({
            data: {
                title: body.title,
                rank: body.rank,
                base: body.base,
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

        return swade_export_skill(skill);
    } else reply.error(400, 'Invalid type');
});

export const patch = new Requests()
.authHeaders()
.description('Update swade skill')
.tags('Skill', 'Swade')
.body(T.object({
    id: T.string(),
    campaignType: T.enumO(CampaignType),
    title: T.string(),
    base: T.enumO(BaseAttribute),
    rank: T.enumO(Rank)
}, {required: ['id', 'campaignType']}))
.handle(async (req: FastifyRequest<{Body: UpdateSkill}>, reply): Promise<Skill> => {
    await req.authenticate_dm();
    const {body} = req;

    const skill = await prisma.sWADE_Skill.findUnique({
        where: {
            id: body.id
        }
    });

    if (!skill)
        return reply.error(404, 'Skill not found');

    if (body.title) {
        const find_skill = await prisma.sWADE_Skill.findFirst({
            where: {
                title: body.title
            }
        });
        if (find_skill) return reply.error(400, 'a skill with this title already exists');
    }

    const result = await prisma.sWADE_Skill.update({
        where: {
            id: body.id
        }, 
        data: body,
        include: {
            requirements: {
                include: {
                    edge: true,
                    skill: true
                }
            }
        }
    });

    return swade_export_skill(result);
})
