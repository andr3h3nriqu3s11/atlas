import { prisma } from "app/app";
import { requestBuilder } from "app/utils/requestBuilder";
import { FastifyRequest, RouteShorthandOptions } from "fastify";

export const GetTemplateSchema: RouteShorthandOptions = {
	schema: {
		querystring: {
			type: 'object',
			properties: {
				id: {type: 'string'},
				includeFields: {type: 'boolean'}
			}
		}
	}
}

interface GetTemplateRequest extends FastifyRequest {
	query: {
		id?: string;
		includeFields?: boolean;
	}
}

export const GetTemplateHandler = requestBuilder(async (req: GetTemplateRequest) => {
	return await prisma.template.findMany({
		where: {
			id: req.query.id
		},
		include: {
			templateFields: req.query.includeFields,
			worldSetting: true,
		}
	});
}, {authenticate: true});