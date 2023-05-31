import {FastifyInstance, FastifyReply} from 'fastify';
import { set_up_campaign_characters } from './characters';
import { prisma } from 'app/app';
import { set_up_skills } from './skills';

export const setUpCampaingns = (fastify: FastifyInstance, baseUrl: string) => {

    const url = `${baseUrl}/campaing`;

    set_up_campaign_characters(fastify, url);
    set_up_skills(fastify, url);
}

/**
  * @deprecated use the one on request
  */
export const get_id = async (id: string, reply: FastifyReply) => {
    const campaign = await prisma.campaign.findUnique({where: {id}});

    if (!campaign)
        reply.error(404, 'Campaign not found');

    return campaign;
}
