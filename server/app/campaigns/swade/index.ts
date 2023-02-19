import { FastifyInstance } from "fastify";
import { set_campaing_swade_edges } from "./edges";
import { set_campaing_swade_hindrances } from "./hindrances";

export const setUpCampaingns = (fastify: FastifyInstance, baseUrl: string) => {
    const url = `${baseUrl}/swade`;

    set_campaing_swade_edges(fastify, url);
    set_campaing_swade_hindrances(fastify, url);
}
