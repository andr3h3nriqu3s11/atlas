import { FastifyInstance } from "fastify";
import { update } from './updates';
import { create } from './create';
import { add, remove } from './requirements';

export const set_up_campaign_characters = (fastify: FastifyInstance, baseUrl: string) => {
    const url = `${baseUrl}/skills`;

    create(fastify, url);
    update(fastify, url);
    
    // Requirements
    add(fastify, url);
    remove(fastify, url);
}
