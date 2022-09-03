import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TemplateFieldType, TemplateType, UpdateTemplateFieldRequestBody, UpdateTemplateRequestBody } from "@ref/types";
import { prisma } from "app/app";
import { error } from "app/utils";
import { requestBuilder } from "app/utils/requestBuilder";
import { FastifyRequest, RouteShorthandOptions } from "fastify";

export const UpdateTemplateFieldSchema: RouteShorthandOptions = {
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
				label: {type: 'string'},
				type: {enum: [TemplateFieldType.string, TemplateFieldType.boolean, TemplateFieldType.dropbox, TemplateFieldType.number]},
				value: {type: 'string'},
				defaultValue: {type: 'string'},
				max: {type: 'number'},
				min: {type: 'number'}
			}
		}
	}
}

interface UpdateTemplateRequest extends FastifyRequest {
	params: {
		id: string
	},
	body: UpdateTemplateFieldRequestBody
}

export const UpdateTemplateFieldHandler = requestBuilder(async (req: UpdateTemplateRequest, reply) => {
	try {
        // Ignore any request to change the template id
        delete req.body.templateId;

		let template = await prisma.templateField.update({where: {id: req.params.id}, data: req.body});
		if (!template) error(reply, 404, 'Template Field not found');
		return template;
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') error(reply, 400, 'Template Field with that name already exists');
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003') error(reply, 400, 'Template id does not exist');
		throw e;
	}
}, {authenticate: true, justDm: true});