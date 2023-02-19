import { BaseAttribute, Rank, update_skill, Skill } from '@ref/types/swade';
import { prisma } from 'app/app';
import { swade_export_skill } from 'app/campaigns/characters/SWADE_Utils';
import { error } from 'app/utils';
import {FastifyInstance, FastifyRequest} from 'fastify'

export const update = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.put(`${baseUrl}/update`, {
        schema: {
            description: 'Update swade skill',
            tags: ['Skill', 'Swade']
        }
    }, async (req: FastifyRequest<{Body: update_skill}>, reply): Promise<Skill> => {
        await req.authenticate_dm();

        const {body} = req;

        const skill = await prisma.sWADE_Skill.findUnique({
            where: {
                id: body.id
            }
        });
        
        if (!skill)
            return error(reply, 404, 'Skill not found');

        if (body.base && !Object.values(BaseAttribute).includes(body.base))
            return error(reply, 400, 'base has an invalid value');

        if (body.rank && !Object.values(Rank).includes(body.rank))
            return error(reply, 400, 'rank has an invalid value');

        if (body.title) {
            const find_skill = await prisma.sWADE_Skill.findFirst({
                where: {
                    title: body.title
                }
            });
            if (find_skill)
                return error(reply, 400, 'a skill with this title already exists');
        }

        const result = await prisma.sWADE_Skill.update({
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

        return swade_export_skill(result);
    });
}
