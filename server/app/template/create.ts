import { FastifyRequest, RouteShorthandOptions } from "fastify";
import { CreateTemplateRequestBody, TemplateType } from '@ref/types';
import { requestBuilder } from "app/utils/requestBuilder";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { error } from "app/utils";
import { prisma } from "app/app";

export const CreateTemplateSchema: RouteShorthandOptions = {
	schema: {
		body: {
			type: 'object',
			required: ["worldSettingId", "type", "name"],
			properties: {
				worldSettingId: {type: 'string'},
				type: {enum: [TemplateType.Character, TemplateType.Item]},
				name: {type: 'string'},
				description: {type: 'string'}
			}
		}
	}
}

interface CreateTemplateRequest extends FastifyRequest {
	body: CreateTemplateRequestBody,
}

export const CreateTemplateHandler = requestBuilder(async (req: CreateTemplateRequest, reply) => {
	try {
		return await prisma.template.create({data: req.body});
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') error(reply, 400, 'Teamplte with that name already exists');
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003') error(reply, 400, 'World Setting id does not exist');
		throw e;
	}
}, {authenticate: true, justDm: true })