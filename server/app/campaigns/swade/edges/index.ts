import { FastifyInstance } from 'fastify';
import { create, update } from './mutation';
import { add, remove } from './requirements';

export const set_campaing_swade_edges = (fastify: FastifyInstance, baseUrl: string) => {
    const url = `${baseUrl}/edges`;
    create(fastify, url);
    update(fastify, url);

    // Requirements
    add(fastify, url);
    remove(fastify, url);
}
