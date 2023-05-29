import {FastifyInstance, FastifyReply} from 'fastify';
import { setUpAddCampaign } from './CreateCampaign';
import { set_up_campaign_characters } from './characters';
import { prisma } from 'app/app';
import { set_up_skills } from './skills';
import { setUpCampaignList } from './ListCampaign';
import { setUpSwade } from './swade';
import { setUpImport } from './Import';

export const setUpCampaingns = (fastify: FastifyInstance, baseUrl: string) => {

    const url = `${baseUrl}/campaing`;
    
    setUpAddCampaign(fastify, url);
    setUpCampaignList(fastify, url);
    setUpImport(fastify, url);

    setUpSwade(fastify, url);

    set_up_campaign_characters(fastify, url);
    set_up_skills(fastify, url);
}

export const get_id = async (id: string, reply: FastifyReply) => {
    const campaign = await prisma.campaign.findUnique({where: {id}});

    if (!campaign)
        reply.error(404, 'Campaign not found');

    return campaign;
}
