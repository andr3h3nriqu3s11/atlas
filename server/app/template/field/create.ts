import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TemplateFieldResponse, CreateTemplateFieldRequestBody, TemplateFieldType } from "@ref/types";
import { prisma } from "app/app";
import { error } from "app/utils";
import { requestBuilder } from "app/utils/requestBuilder";
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";

export const CreateTemplateFieldSchema: RouteShorthandOptions = {
	schema: {
		body: {
			type: 'object',
			required: ['templateId', 'name', 'label', 'type', 'value', 'defaultValue'],
			properties: {
				templateId: {type: 'string'},
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

interface CreateTemplateFieldRequest extends FastifyRequest {
    body: CreateTemplateFieldRequestBody
}

export const createTemplateFieldHandler = requestBuilder(async (req: CreateTemplateFieldRequest, reply: FastifyReply): Promise<TemplateFieldResponse> => {
	try {
		let response = await prisma.templateField.create({data: req.body});
		return response as TemplateFieldResponse;
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') error(reply, 400, 'Template with that name already exists');
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003') error(reply, 400, 'World Setting id does not exist');
		throw e;
	}
}, {authenticate: true, justDm: true});