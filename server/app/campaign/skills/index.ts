import { FastifyInstance } from "fastify";
import { update } from './updates';
import { create } from './create';
import { add, remove } from './requirements';
import { list } from "./list";

export const set_up_skills = (fastify: FastifyInstance, baseUrl: string) => {
    const url = `${baseUrl}/skills`;

    create(fastify, url);
    update(fastify, url);
    list(fastify, url);
    
    // Requirements
    add(fastify, url);
    remove(fastify, url);
}
