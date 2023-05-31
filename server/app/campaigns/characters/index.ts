import { create } from "./create";
import { FastifyInstance } from "fastify";
import { update } from "./updates";
import { skill_add, skill_remove } from "./skills_management";
import { edge_add, edge_remove } from "./edges_management";
import { hindrance_add, hidrance_remove } from "./hindrances_management";
import { setUpNotes } from "./notes";
import { list } from "./list";

export const set_up_campaign_characters = (fastify: FastifyInstance, baseUrl: string) => {
    const url = `${baseUrl}/characters`;

    create(fastify, url);
    update(fastify, url);
    list(fastify, url);

    skill_add(fastify, url);
    skill_remove(fastify, url);

    edge_add(fastify, url);
    edge_remove(fastify, url);

    hindrance_add(fastify, url);
    hidrance_remove(fastify, url);

    setUpNotes(fastify, url);
}

