import {FastifyInstance, FastifyRequest} from 'fastify';
import {CampaignType, CampaignTyped, Skill} from '@ref/types';
import { prisma } from 'app/app';
import { swade_export_skill } from 'app/campaigns/characters/SWADE_Utils';

export const list = (fastify: FastifyInstance, baseUrl: string) => {
    fastify.post(`${baseUrl}/list`, {
        schema: {
            description: 'Endpoint used to list a swade skill',
            tags: ['Skill', 'Swade'],
        }
    }, async (req: FastifyRequest<{Body: CampaignTyped}>, reply): Promise<Skill[]> => {
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
        } else
            reply.error(400, 'Invalid type');

    })
}
