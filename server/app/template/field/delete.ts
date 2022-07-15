import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TemplateFieldType, TemplateType, UpdateTemplateFieldRequestBody, UpdateTemplateRequestBody } from "@ref/types";
import { prisma } from "app/app";
import { error } from "app/utils";
import { requestBuilder } from "app/utils/requestBuilder";
import { FastifyRequest, RouteShorthandOptions } from "fastify";

export const DeleteTemplateFieldSchema: RouteShorthandOptions = {
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

interface DeleteTemplateRequest extends FastifyRequest {
	params: {
		id: string
	}
}

export const DeleteTemplateFieldHandler = requestBuilder(async (req: DeleteTemplateRequest, reply) => {
	try {
		let templateField = await prisma.templateField.delete({where: {id: req.params.id}});
		if (!templateField) error(reply, 404, 'Template Field not found');
		return {};
	} catch (e) {
		throw e;
	}
}, {authenticate: true, justDm: true});