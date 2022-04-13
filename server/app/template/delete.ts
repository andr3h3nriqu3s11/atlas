import { prisma } from "app/app";
import { error } from "app/utils";
import { requestBuilder } from "app/utils/requestBuilder";
import { FastifyRequest, RouteShorthandOptions } from "fastify";

export const DeleteTemplateSchema: RouteShorthandOptions = {
	schema: {
		params: {
			type: 'object',
			required: ['id'],
			properties: {
				id: {type: 'string'}
			}
		},
	}
}

interface DeleteTempalteRequest extends FastifyRequest {
	params: {
		id: string
	}
}

export const DeleteTemplateHandler = requestBuilder(async (req: DeleteTempalteRequest, reply) => {
	let template = await prisma.template.delete({where: {id: req.params.id}});
	if (!template) error(reply, 400, 'Template not found');
	return template;
}, {authenticate: true, justDm: true});