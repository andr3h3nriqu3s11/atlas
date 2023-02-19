import {FastifyInstance, FastifyRequest} from 'fastify';
import {CampaignType, create_skill, Skill} from '@ref/types';
import { BaseAttribute, Rank } from '@ref/types';
import { error } from 'app/utils';
import { prisma } from 'app/app';
import { swade_export_skill } from 'app/campaigns/characters/SWADE_Utils';

export const create = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/add`, {
        schema: {
            description: 'Endpoint used to add a swade skill',
            tags: ['Skill', 'Swade'],
            body: {
                type: 'object',
                properties: {
                    title: {type: 'string'},
                    base: {type: 'string'},
                    rank: {type: 'string'},
                    type: {type: 'string'},
                }
            }
        }
    }, async (req: FastifyRequest<{Body: create_skill}>, reply): Promise<Skill> => {
        await req.authenticate_dm();

        const {body} = req;

        if (body.type === CampaignType.SWADE) {
            if (!Object.values(BaseAttribute).includes(body.base))
                return error(reply, 400, 'base has an invalid value');

            if(!Object.values(Rank).includes(body.rank))
                return error(reply, 400, 'rank has an invalid value');

            if (!body.title)
                return error(reply, 400, 'title has an invalid value');

            const list_skills = await prisma.sWADE_Skill.count({
                where: {
                    title: body.title,
                }
            });

            if (list_skills !== 0)
                return error(reply, 400, 'A skill with that name already exists');

            const skill = await prisma.sWADE_Skill.create({
                data: {
                    title: body.title,
                    rank: body.rank,
                    base: body.base
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
        } else
            reply.error(400, 'Invalid type');
    })
}
