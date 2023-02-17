import { create } from "./create";
import { FastifyInstance } from "fastify";
import { update } from "./updates";

export const set_up_campaign_characters = (fastify: FastifyInstance, baseUrl: string) => {
    const url = `${baseUrl}/characters`;

    create(fastify, url);
    update(fastify, url);
}
