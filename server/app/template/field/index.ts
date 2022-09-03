import { FastifyInstance } from "fastify";
import { createTemplateFieldHandler, CreateTemplateFieldSchema } from "./create";
import { DeleteTemplateFieldHandler, DeleteTemplateFieldSchema } from "./delete";
import { UpdateTemplateFieldHandler, UpdateTemplateFieldSchema } from "./update";

export const setUpTemplateField = (fastify: FastifyInstance, baseURL: string) => {

    const url = `${baseURL}/field`;

    fastify.post(url, CreateTemplateFieldSchema, createTemplateFieldHandler);

    fastify.put(`${url}/:id`, UpdateTemplateFieldSchema, UpdateTemplateFieldHandler);

    fastify.delete(`${url}/:id`, DeleteTemplateFieldSchema, DeleteTemplateFieldHandler);

}