import { FastifyInstance } from "fastify";
import { CreateSettingHandler, CreateSettingSchema } from "./create";
import { DeleteSettingHandler, DeleteSettingSchema } from "./delete";
import { GetSettingHandler, GetSettingSchema } from "./get";
import { UpdateSettingHandler, UpdateSettingSchema } from "./update";


export const setUpWorldSetting = (baseUrl: string, fastify: FastifyInstance)=> {
	const url = `${baseUrl}/setting`;

	fastify.post(`${url}`, CreateSettingSchema, CreateSettingHandler);

	fastify.get(`${url}`, GetSettingSchema, GetSettingHandler);

	fastify.put(`${url}/:id`, UpdateSettingSchema, UpdateSettingHandler);

	fastify.delete(`${url}/:id`, DeleteSettingSchema, DeleteSettingHandler);
}
