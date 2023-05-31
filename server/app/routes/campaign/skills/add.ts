import { FastifyRequest } from 'fastify';
import { CampaignType, CreateSkill, Skill } from '@ref/types';
import { BaseAttribute, Rank } from '@ref/types';
import { prisma } from 'app/app';
import { swade_export_skill } from 'app/campaigns/characters/SWADE_Utils';
import { Requests, T } from 'app/utils';

export const post = new Requests()
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
