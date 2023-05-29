import {FastifyInstance, FastifyRequest} from 'fastify';
import {CampaignType, CreateSkill, Skill} from '@ref/types';
import { BaseAttribute, Rank } from '@ref/types';
import { prisma } from 'app/app';
import { swade_export_skill } from 'app/campaigns/characters/SWADE_Utils';
import { AuthenticationHeaders } from 'app/utils';

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
                    description: {type: 'string'},
                }
            },
            headers: AuthenticationHeaders,
        }
    }, async (req: FastifyRequest<{Body: CreateSkill}>, reply): Promise<Skill> => {
        await req.authenticate_dm();

        const {body} = req;

        if (body.type === CampaignType.SWADE) {
            if (!Object.values(BaseAttribute).includes(body.base))
                reply.error(400, 'base has an invalid value');

            if(!Object.values(Rank).includes(body.rank))
                reply.error(400, 'rank has an invalid value');

            if (!body.title)
                reply.error(400, 'title has an invalid value');

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
        } else
            reply.error(400, 'Invalid type');
    })
}
