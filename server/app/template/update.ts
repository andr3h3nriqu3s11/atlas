import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TemplateType, UpdateTemplateRequestBody } from "@ref/types";
import { prisma } from "app/app";
import { error } from "app/utils";
import { requestBuilder } from "app/utils/requestBuilder";
import { FastifyRequest, RouteShorthandOptions } from "fastify";

export const UpdateTemplateSchema: RouteShorthandOptions = {
	schema: {
		params: {
			type: 'object',
			required: ['id'],
			properties: {
				id: {type: 'string'}
			}
		},
		body: {
			type: 'object',
			properties: {
				name: {type: 'string'},
				type: {enum: [TemplateType.Character, TemplateType.Item]},
				description: {type: 'string'},
				worldSettingId: {type: 'string'}
			}
		}
	}
}

interface UpdateTempalteRequest extends FastifyRequest {
	params: {
		id: string
	},
	body: UpdateTemplateRequestBody
}

export const UpdateTemplateHandler = requestBuilder(async (req: UpdateTempalteRequest, reply) => {
	try {
		let template = await prisma.template.update({where: {id: req.params.id}, data: req.body});
		if (!template) error(reply, 400, 'Template not found');
		return template;
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') error(reply, 400, 'Teamplte with that name already exists');
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003') error(reply, 400, 'World Setting id does not exist');
		throw e;
	}
}, {authenticate: true, justDm: true});