import { FastifyInstance } from "fastify";
import { CreateTemplateHandler, CreateTemplateSchema } from "./create";
import { DeleteTemplateHandler, DeleteTemplateSchema } from "./delete";
import { setUpTemplateField } from "./field";
import { GetTemplateHandler, GetTemplateSchema } from "./get";
import { UpdateTemplateHandler, UpdateTemplateSchema } from "./update";

export const setUpTemplate = (baseUrl: string, fastify: FastifyInstance) => {

	const url = `${baseUrl}/template`;

	fastify.post(url, CreateTemplateSchema, CreateTemplateHandler);

	fastify.put(`${url}/:id`, UpdateTemplateSchema, UpdateTemplateHandler);

	fastify.get(url, GetTemplateSchema, GetTemplateHandler);

	fastify.delete(`${url}/:id`, DeleteTemplateSchema, DeleteTemplateHandler);

	setUpTemplateField(fastify, baseUrl);

}