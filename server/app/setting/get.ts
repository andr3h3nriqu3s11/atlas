import { prisma } from "app/app";
import { requestBuilder } from "app/utils/requestBuilder";
import { FastifyRequest, RouteShorthandOptions } from "fastify";

export const GetSettingSchema: RouteShorthandOptions = {
	schema: {
		querystring: {
			type: 'object',
			properties: {
				id: {type: "string"}
			}
		}
	}
}

interface GetSettingRequest extends FastifyRequest {
	query: {
		id?: string
	}
}

export const GetSettingHandler = requestBuilder(async (req: GetSettingRequest) => {

	return prisma.worldSetting.findMany({
		where: {
			id: req.query.id
		}
	});

}, {authenticate: true})