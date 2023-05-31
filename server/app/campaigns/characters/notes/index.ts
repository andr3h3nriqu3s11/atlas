import { FastifyInstance } from "fastify";
import { create, remove, update } from "./manipulation";
import { list } from "./list";

export function setUpNotes (fastify: FastifyInstance, baseUrl: string) {
    const url = `${baseUrl}/notes`;
    create(fastify, url);
    update(fastify, url);
    remove(fastify, url);
    list(fastify, url);
}
