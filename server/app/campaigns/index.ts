import {FastifyInstance, FastifyReply} from 'fastify';
import { setUpAddCampaign } from './CreateCampaign';
import { set_up_campaign_characters } from './characters';
import { prisma } from 'app/app';
import { error } from 'app/utils';
import { set_up_skills } from './skills';

export const setUpCampaingns = (fastify: FastifyInstance, baseUrl: string) => {

    const url = `${baseUrl}/campaing`;
    
    setUpAddCampaign(fastify, url);

    set_up_campaign_characters(fastify, url);
    set_up_skills(fastify, url);
}

export const get_id = async (id: string, reply: FastifyReply) => {
    const campaign = await prisma.campaign.findUnique({where: {id}});

    if (!campaign)
        return error(reply, 404, 'Campaign not found');

    return campaign;
}
